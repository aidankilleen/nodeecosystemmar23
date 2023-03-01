console.log("Server Starting");

import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helmet from 'helmet';
import https from 'https';
import fs from 'fs';

const prisma = new PrismaClient()

dotenv.config();

const port = 443;  // default port for https
const expiresIn = "1h";
const SECRET_KEY:string = `${process.env["SECRET_KEY"]}`;
const baseUrl = `/api/members`;

const server = express();

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(helmet());


// install auth middleware 
// ignore the /auth/ endpoints
server.use(/^(?!\/auth).*$/, (req, res, next) => {
    let status = 200;
    let message = "";

    if (req.headers.authorization == undefined) {
        status = 401;
        message = "not authorized";
        return res.status(status).json({status, message});
    }

    let pieces = req.headers.authorization.split(' ');

    if (pieces.length != 2 || pieces[0] != "Bearer") {
        status = 401;
        message = "bearer token missing";
        return res.status(status).json({status, message});
    }

    let token = pieces[1];
    if (!verifyToken(token)) {
        status = 401;
        message = "token authentication failed";
        return res.status(status).json({status, message});
    }

    next();
});

function createToken(payload: any) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function verifyToken(token: string) {

    try {
        return jwt.verify(token, SECRET_KEY);
    } catch(ex) {
        return false;
    }
}

async function authenticate(password:string, hash: string) {

    let result = await bcrypt.compare(password, hash);
    return result;
}

// auth methods
server.post("/auth/login", async (req, res) => {

    let credentials = req.body;
    let status = 200;
    let message = "";

    let user;

    try {
        user = await prisma.user.findFirstOrThrow({
            where: {
                email: credentials.email ? credentials.email : ""
            }
        });
    } catch(ex) {
        status =401;
        message = "invalid credentials";
        return res.status(status).json({status, message});
    }

    if (! await authenticate(credentials.password, `${user?.hash}`)) {

        status = 401;
        message = "invalid credentials";
        return res.status(status).json({status, message});
    }

    // produce JWT
    const {hash, ...payload} = user;
    let token = createToken(payload);

    return res.json({token});
    
});

server.post("/auth/register", async (req, res) => {

    const userData = req.body;
    const {password, ...user} = userData;

    let status: number = 200;
    let message: string = "";

    user.hash = await bcrypt.hash(password, 12);

    try {
        let addedUser = await prisma.user.create({
            data: user
        });
        return res.json(addedUser);
    
    } catch(ex) {

        status = 400;
        message = "Can't register new user"
        return res.status(400).json({status, message});
    }
});


// api methods
server.get(baseUrl, async (req, res) => {

    let members = await prisma.member.findMany();
    res.json(members);
});

server.get(`${baseUrl}/:id`, async (req, res) => {

    let id = parseInt(req.params.id);
    try {
        let member = await prisma.member.findFirstOrThrow({
            where: { id }
        });
        res.json(member);
   
    } catch(ex) {
        res.sendStatus(404);
    }
});

server.post(baseUrl, async (req, res) => {

    let memberToAdd = req.body;
    try {
        let addedMember = await prisma.member.create({
            data: memberToAdd
        })
        return res.json(addedMember);
    
    } catch(ex) {
        return res.sendStatus(400);
    }
});

server.put(`${baseUrl}/:id`, async (req, res) => {

    const id = parseInt(req.params.id);

    const userToUpdate = req.body;

    const updatedUser = await prisma.member.update({
        where: { id }, 
        data: userToUpdate
    });

    return res.json(userToUpdate);
});

server.delete(`${baseUrl}/:id`, async (req, res) => {

    const id = parseInt(req.params.id);

    try {
        const member = await prisma.member.delete({
            where: { id }
        }) ;
        return res.json(member);
  
    } catch(ex) {

        const status = 400;
        let message = "Bad request (related records?) or user not found";
        
        // TODO - get debugging working in the ide when working with a typescript project

/*
        if (ex instanceof PrismaClientKnownRequestError) {
            let e = ex as PrismaClientKnownRequestError;

            message = e.meta?.message as string;
        }
        */
        return res.status(400).json({status, message});
    }
    
});

/*
server.listen(port, ()=> {
    console.log(`Server started - listening on port ${port}`);
});
*/

const options = {
    key: fs.readFileSync(`./security/cert.key`), 
    cert: fs.readFileSync(`./security/cert.pem`)
}
https.createServer(options, server)
    .listen(port, () => {
        console.log("Server running using https");
    });







