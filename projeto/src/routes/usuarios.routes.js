const { Router } = require("express");
const { createUsuario, updateUsuarioCpf, findUsuarioById } = require("../repositories/usuarios.repositories");

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

router.patch("/:idUsuario/cpf", async function(req,res){
    const idUsuario = getIdUsuario(req.params);

    if(!idUsuario){
        return res.status(400).json({message: "id_usuario inválido"});
    }

    const {cpf} = req.body;
    if(!cpf){
        return res.status(400).json({message: "CPF inválido"});
    }
    try{
        const result = await updateUsuarioCpf(idUsuario, cpf);
        if(!result){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        const usuario = await findUsuarioById(result.id_usuario);
        return res.status(200).json(usuario)

    }catch(e){
        if(e && e.code == "23505"){
            return res.status(404).json({
                message:"Já existe usuário com o CPF informado"
            });
        }
        return res.status(404).json({
            message:"Erro interno do servidor."
        });
    }
})

function getIdUsuario(params){
    const idUsuario = Number(params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0){
        return null;
    }
    return idUsuario;
}


module.exports = router;
