const { Router } = require("express");
const usuarios = require("./usuarios.routes");
const auth = require("./auth.routes");
const questoes = require("./questoes.routes");
const certificados = require("./certificados.routes");

const router = Router();

// http://localhost:3000/api/usuarios
// http://localhost:3000/api/questoes

router.use("/usuarios", usuarios);
router.use("/questoes", questoes);
router.use("/certificados", certificados);

router.use("/auth", auth);

router.use(function(_req, res){
    res.status(404).json({message: "Rota inexistente"});
});

module.exports = router;
