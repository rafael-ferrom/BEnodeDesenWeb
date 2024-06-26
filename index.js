const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/usersController');
const taskRoutes = require('./controllers/tasksController');

const porta = 8080;

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

mongoose.connect('mongodb+srv://admin:admin@crup-app.qn2y6aw.mongodb.net/crud-app?retryWrites=true&w=majority&appName=crup-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(porta, () => {
            console.log('Banco de dados conectado com sucesso!');
            console.log(`Servidor rodando em http://localhost:${porta}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
