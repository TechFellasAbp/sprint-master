const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
    findProximaQuestaoByUsuario,
    findQuestaoDoExameByUsuario,
    findRespostaByExameEQuestao,
    inserirRespostaQuestao
} = require("../repositories/questoes.repositories");

const router = Router();

/*
curl -X GET http://localhost:3000/api/questoes/proxima-questao \
  -H "Authorization: Bearer SEU_TOKEN"
*/
router.get("/proxima-questao", authMiddleware, async function (req, res) {
  try {
    const questao = await findProximaQuestaoByUsuario(req.usuario.id_usuario);

    if (!questao) {
      return res
        .status(404)
        .json({ message: "nenhuma questão pendente encontrada" });
    }

    return res.status(200).json(questao);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

/*
curl -X POST http://localhost:3000/api/questoes/responder \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN"
  -d '{"id_exame":"11","id_questao":"21","resposta":"c"}'
*/
router.post("/responder", authMiddleware, async function (req, res) {
  try {
    console.log("body", req.body);
    const { id_exame, id_questao, resposta } = req.body;

    const respostaNormalizada = resposta.trim().toLowerCase();

    const questao = await findQuestaoDoExameByUsuario(req.usuario.id_usuario, id_exame, id_questao);

    if (!questao) {
      return res.status(404).json({
        message: "questão não encontrada para este exame",
      });
    }

    const respostaExistente = await findRespostaByExameEQuestao(
      id_exame,
      id_questao,
);

    if (respostaExistente) {
      return res.status(409).json({
        message: "questão já respondida",
      });
    }

    const nota = questao.alternativa_correta === respostaNormalizada ? 1 : 0;

    const respostaInserida = await inserirRespostaQuestao(id_exame, id_questao, respostaNormalizada,nota);

    return res.status(201).json(respostaInserida);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});


module.exports = router;