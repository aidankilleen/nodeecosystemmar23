import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

import { Member } from './member';
import { MemberRepository } from './member.repository';
import { Colour, Credentials, Record, User } from './user.model';

const port = 80;
const server = express();

server.use(bodyParser.json());
server.use(express.static('public'));

const memberFile = "./members.json";


let user: User = new User(1, "aidan@gmail.com");

user.name = "Aidan Killeen";

console.log(user);


let user2: User = {
    id:1, 
    name:"Bob Byrne", 
    email: "bob@gmail.com", 
    company: "Professional Training Ltd"
}

console.log(user2);


let r = new Record(1, 1, "Car", Colour.red);



const repo:MemberRepository = new MemberRepository(memberFile);

// configure handlebars
server.engine('hbs', engine({
    defaultLayout:'layout', 
    extname: '.hbs' 
}));
server.set('view engine', 'hbs');

server.get('/members', (req, res) => {

    const members = repo.members;
    res.render('members', { members });
});


server.post('/auth/login', (req, res) => {

    const credentials:Credentials = req.body as Credentials;
    return res.json(credentials);
});



server.listen(port, () => {
    console.log(`Server listening on port ${ port }`)
});

// Original JS
// ES6

// TypeScript




