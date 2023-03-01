console.log("Server Starting");

import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


const prisma = new PrismaClient()

const port = 80;
const baseUrl = `/api/members`;

const server = express();

server.use(express.static('public'));
server.use(bodyParser.json());

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

        // delete related records first
        //await prisma.salesrecord.deleteMany ({
        //    where: {
        //        memberId: id
        //    }
        //})

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


server.listen(port, ()=> {

    console.log(`Server started - listening on port ${port}`);
});






