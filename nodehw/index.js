console.log("Node Hello World Test App");

const express = require('express');

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require("fs");

const customMiddleWare = require('./customMiddleware');

const app = express();
const port = 80;

function saveMembers() {
    fs.writeFileSync("./members.json", JSON.stringify(jsondata, null, 4));
}

var hbs = exphbs.create({defaultLayout: 'main', extname:'.hbs'});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// read members from a file
let text = fs.readFileSync("./members.json");
let jsondata = JSON.parse(text);  

app.use(customMiddleWare);

app.use(bodyParser.json());   // middleware to read json objects from the body
app.use(express.static("public"));

app.post('/api/members', (req, res) => {

    let newMember = req.body;

    // find the maximum id in the current list
    let maxId = jsondata.members.reduce(
        (max, member) => {
            return max < member.id ? member.id : max;
        }, 
        jsondata.members[0].id);

    newMember.id = maxId + 1;

    // add the new user to the list...
    jsondata.members.push(newMember);

    saveMembers();

    return res.status(201).json(newMember);

});


app.put('/api/members/:id', (req, res) => {

    let id = parseInt(req.params.id);
    let memberToUpdate = req.body;

    if (id != memberToUpdate.id) {
        return res.sendStatus(500);
    }

    let index = jsondata.members.findIndex(member => member.id == id);
    if (index == -1) {
        return res.sendStatus(404);
    }

    jsondata.members.splice(index, 1, memberToUpdate);

    saveMembers();

    return res.json(memberToUpdate);

});





app.get('/', (req, res) => {

    res.render('home', {
        title: "Home page using handlebars", 
        message: "This is a message"
    });

    //res.send("<h1>Hello World</h1>");
});

app.get('/about', (req, res) => {

    let info = "Some information";

    res.render('about', {
        title: "About Us", 
        message: "This is the about page"
    });
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contact Us", 
        message: "This is the contact page"
    });
});

app.get('/members', (req, res) => {

    res.render('members', {
        title: "Member List", 
        members: jsondata 
    });
});

app.get('/members/:id', (req, res) => {

    let id = req.params.id;

    let member = jsondata.members.find(member => member.id == id);

    res.render('details', {
        title: `User Details ${id}`, 
        id, 
        member
    });
});

app.get('/api/members', (req, res) => {
    return res.json(jsondata.members);
});

app.get('/api/members/:id', (req, res) => {

    let id = req.params.id;
    let member = jsondata.members.find(member=> member.id == id);

    if (member) {
        return res.json(member);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/api/members/:id', (req, res) => {

    let id = req.params.id;
    let index = jsondata.members.findIndex(member => member.id == id);

    if (index != -1) {
        let member = jsondata[index];
        jsondata.members.splice(index, 1);

        saveMembers();

        return res.json(member);
    } else {
        res.sendStatus(404);
    }
});



app.listen(port, () => {
    console.log(`Server running listening on port ${ 3000 }`);
});






