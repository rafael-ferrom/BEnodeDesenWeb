const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const User = require('../models/Users');

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nome, email, funcao } = req.body;
        const user = new User({
            id: randomUUID(),
            nome,
            email,
            funcao
        });
        await user.save();
        return res.json({
            mensagem: "Usuario adicionado com sucesso!",
            user
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { nome, email, funcao } = req.body;
        const user = await User.findOneAndUpdate({ id: req.params.id }, { nome, email, funcao }, { new: true });
        return res.json({
            mensagem: "Usuario editado com sucesso!",
            user
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await User.findOneAndDelete({ id: req.params.id });
        return res.json({
            mensagem: "Usuario deletado com sucesso!"
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/countByFuncao", async (req, res) => {
    try {
        const count = await User.aggregate([
            { $group: { _id: "$funcao", count: { $sum: 1 } } }
        ]);
        return res.json(count);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
