const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://krithiksehgal:vDOnhqCd41WBQoib@cluster0.rpx1gw0.mongodb.net/', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const Todo = require('./models/todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todo/new', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        status: req.body.status
    });
    await todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.status = !todo.status;
    await todo.save();
    res.json(todo);
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});