const { Router } = require("express");
const { createUsuario } = require("../repositories/usuarios.repositories");

const router = Router();

router.post("/", async function(req,res){
    const {nome,email,cpf,senha} = req.body;

    if(!cpf || !nome || !senha){
        return res.status(400).json({message: "Nome, email e senha são obrigatórios"});
    }
    const result = await createUsuario(nome,email,cpf,senha);
    res.send(result);
})

module.exports = router;