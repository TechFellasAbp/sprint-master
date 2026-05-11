const { Router } = require("express");
const { createUsuario } = require("../repositories/usuarios.repositories");

const router = Router();

// POST api/usuarios
router.post("/", async function (req, res) {
  const { nome, email, cpf, senha } = req.body;

  //caso não seja enviado um desses campos, mostra uma mensagem com status de erro
  //isso evita que o backend receba mensagens erradas
  if (!cpf || !nome || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, e-mail e senha são obrigatórios" });
  }

  if (senha.trim().length < 6){
    return res.status(400).json({message: "A senha deve ter pelo menos 6 caracteres"})
  }

  try{
    const result = await createUsuario(nome, email, cpf, senha);
    res.send(result);
  } catch(e){
    console.log(e.message); //<- quando houver um erro interno, esse print ajuda a decifrar qual
    if(e && e.code == "23505"){
      return res.status(409).json({
        message: "Já existe usuário com os dados informados"
      });
    }
    return res.status(400).json({
      message: "Erro interno no servidor"
    });
  }
});

module.exports = router;
