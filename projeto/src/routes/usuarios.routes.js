const { Router } = require("express");
const { 
  createUsuario, 
  updateUsuarioCpf, 
  updateUsuarioNome, 
  updateUsuarioEmail, 
  findUsuarioById ,
  updateUsuarioSenha
} = require("../repositories/usuarios.repositories");

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
        return res.status(400).json({message: "CPF inválido."});
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
});

// atualiza o espaco do nome
router.patch("/:idUsuario/nome", async function(req,res){
    const idUsuario = getIdUsuario(req.params);

    if(!idUsuario){
        return res.status(400).json({message: "id_usuario inválido"});
    }

    const { nome } = req.body;
    if(!nome){
        return res.status(400).json({message: "Nome obrigatório."});
    }
    try{
        const result = await updateUsuarioNome(idUsuario, nome);
        if(!result){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        const usuario = await findUsuarioById(result.id_usuario);
        return res.status(200).json(usuario)

    }catch(e){
        return res.status(404).json({
            message:"Erro interno do servidor."
        });
    }
});

// atualiza o espaço do email
router.patch("/:idUsuario/email", async function(req,res){
    const idUsuario = getIdUsuario(req.params);

    if(!idUsuario){
        return res.status(400).json({message: "id_usuario inválido"});
    }

    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Email obrigatório."});
    }
    try{
        const result = await updateUsuarioEmail(idUsuario, email);
        if(!result){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        const usuario = await findUsuarioById(result.id_usuario);
        return res.status(200).json(usuario)

    }catch(e){
        if(e && e.code == "23505"){
            return res.status(404).json({
                message:"Já existe usuário com o email informado"
            });
        }
        return res.status(404).json({
            message:"Erro interno do servidor."
        });
    }
});

// atualiza o espaço da senha
router.patch("/:idUsuario/senha", async function(req,res){
    const idUsuario = getIdUsuario(req.params);

    if(!idUsuario){
        return res.status(400).json({message: "id_usuario inválido"});
    }

    const { senha } = req.body;
    if(!senha){
        return res.status(400).json({message: "Senha obrigatória."});
    }

    if (senha.trim().length < 6){
    return res
    .status(400)
    .json({message: "A senha deve ter pelo menos 6 caracteres."})
  }

    try{
        const result = await updateUsuarioSenha(idUsuario, senha);
        if(!result){
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        const usuario = await findUsuarioById(result.id_usuario);
        return res.status(200).json(usuario)

    }catch(e){
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

/*
-- Comandos para testar diferentes sistemas do backend: --

Cadastro:
curl -X POST http://localhost:3000/api/usuarios \
    -H "Content-Type: application/json" \
    -d '{"nome": "Ana", "email": "ana17@email.com", "cpf": "12345678917", "senha": "123456", "grupo": 1}'

Atualizar CPF:
curl -X PATCH http://localhost:3000/api/usuarios/4/cpf \
    -H "Content-Type: application/json" \
    -d '{"cpf": "11223344556"}'

Atualizar nome:
curl -X PATCH http://localhost:3000/api/usuarios/4/nome \
    -H "Content-Type: application/json" \
    -d '{"nome": "maria eduarda"}'

Atualizar email:
curl -X PATCH http://localhost:3000/api/usuarios/4/email \
    -H "Content-Type: application/json" \
    -d '{"email": "fernanda@gmail.com"}'

Atualizar senha:
curl -X PATCH http://localhost:3000/api/usuarios/4/senha \
    -H "Content-Type: application/json" \
    -d '{"senha": "teste1"}'
*/
