const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const Task = require('../models/Task');
const User = require('../models/Users');

const authenticateUser = async (req, res, next) => {
    const { userId } = req.body; 
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    req.user = user;
    next();
};

router.get('/', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        return res.json(tasks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticateUser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({
            id: randomUUID(),
            userId: req.user._id,
            title,
            description
        });
        await task.save();
        return res.json({
            message: 'Tarefa criada com sucesso!',
            task
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate(
            { id: req.params.id, userId: req.user._id },
            { title, description, status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        return res.json({
            message: 'Tarefa editada com sucesso!',
            task
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        return res.json({ message: 'Tarefa excluída com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/without-owner', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: null });
        return res.json(tasks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.put('/:id/assign-owner', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const task = await Task.findOneAndUpdate(
            { id: req.params.id },
            { userId: user._id },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        return res.json({
            message: 'Dono atribuído à tarefa com sucesso!',
            task
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;

