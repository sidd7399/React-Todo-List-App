const mongoose = require('mongoose');

/*
{
      "id": 1699973220864,
      "title": "asdfasdfa",
      "description": "asdfdf",
      "author": "asdfasd",
      "dateCreated": 1699973220864,
      "completedDate": 1699973223701,
      "complete": true
    },*/
const todoSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    title: String,
    description: String,
    author: String,
    dateCreated: Number,
    completedDate: Number,
    complete: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;