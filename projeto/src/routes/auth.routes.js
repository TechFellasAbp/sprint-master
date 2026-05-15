const { Router } = require("express");
const {
  findUsuarioByCpfAndSenha,
} = require("../repositories/usuarios.repositories");
const { createToken } = require("../utils/jwt");

const router = Router();

router.post("/login", async function(req, res) {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ message: "CPF e senha são obrigatórios" });
  }

  try {
    const usuario = await findUsuarioByCpfAndSenha(cpf, senha);
    const token = createToken({id_usuario:usuario.id_usuario});
    return res.status(200).json({
      token,
      nome: usuario.nome,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

module.exports = router;

/*
Código para testar o login (caso não retorne erro quer dizer que foi efetuado com sucesso):

curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"cpf": "11223344556", "senha": "teste1"}'
*/
