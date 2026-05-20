const { Router } = require("express");
const {
  findCertificadoByHash,
} = require("../repositories/certificados.repositories");

const router = Router();

router.get("/hash/:hash", async function (req, res) {
  const certificadoHash = String(req.params.hash || "").trim();

  if (!certificadoHash) {
    return res.status(400).json({
      message: "Hash do certificado obrigatório",
    });
  }

  try {
    const certificado = await findCertificadoByHash(certificadoHash);

    if (!certificado) {
      return res.status(404).json({
        message: "Certificado inexistente para o hash informado",
      });
    }

    if (certificado.indisponivel) {
      return res.status(409).json({
        message: certificado.motivo,
      });
    }

    return res.status(200).json(certificado);
  } catch (e) {
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

module.exports = router;

/* 
Comando para pegar certificado de um usuário:
curl -X GET http://localhost:3000/api/certificados/hash/HASH_DO_USUARIO 
*/
