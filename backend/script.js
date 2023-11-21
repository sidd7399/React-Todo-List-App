const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./connection');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const app = express()
const port = 1234

app.use(cors());

const User = require('./User');
const Todo = require('./Todo');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.post('/register', bodyParser.json(), (req, res) => {
    const user = new User({
        id: Math.floor(Math.random() * 10000),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        username: req.body.username,
    });

    user.save().then((user) => {
        const token = jwt.sign({
            data: user,
        }, 'secret', { expiresIn: '1h' });

        res.send({
            "accessToken": token,
            "user": user,
        });
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.post('/login', bodyParser.json(), (req, res) => {
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        data: user,
                    }, 'secret', { expiresIn: '1h' });

                    res.send({
                        "accessToken": token,
                        "user": user,
                    });
                } else {
                    res.status(401).send({
                        "error": "Invalid email or password",
                    });
                }
            });
        } else {
            res.status(401).send({
                "error": "Invalid email or password",
            });
        }
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.get('/todos', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, 'secret');
    const userId = decoded.data.id;

    Todo.find({userId: userId}).then((todos) => {
        res.send(todos);
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.post('/todos', bodyParser.json(), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, 'secret');
    const userId = decoded.data.id;

    const todo = new Todo({
        id: Math.floor(Math.random() * 10000),
        userId: userId,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        complete: false,
        completedDate: null,
        dateCreated: Date.now(),
    });

    todo.save().then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.patch('/todos/:id', bodyParser.json(), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, 'secret');
    const userId = decoded.data.id;

    Todo.findOneAndUpdate({
        id: req.params.id,
        userId: userId,
    }, {
        complete: req.body.complete,
        completedDate: req.body.completedDate,
    }).then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.delete('/todos/:id', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, 'secret');
    const userId = decoded.data.id;

    Todo.findOneAndDelete({
        id: req.params.id,
        userId: userId,
    }).then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.send({ "error": err});
    });
});

app.listen(port, () => {
    connectToDatabase();
    console.log(`Example app listening at http://localhost:${port}`)
})