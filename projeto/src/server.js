const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const router = require("./routes");

dotenv.config({
    quiet: true,
    path: path.resolve(__dirname, "..", ".env")
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");
const pagesPath = path.join(publicPath, "pages");
const assetsPath = path.join(publicPath, "assets");
const imagensQuestoesPath = path.join(
    __dirname,
    "infra",
    "init",
    "seed-data",
    "imagens",
)

app.listen(PORT, function(){
    console.log(`Rodando na porta ${PORT}`);
});

app.use("/", express.static(pagesPath));
app.use("/assets", express.static(assetsPath));
app.use("/imagens/questoes", express.static(imagensQuestoesPath));
app.use("/api", router);

app.use(function(_req,res){
    res.redirect("404.html");
})

app.listen(PORT,function(){
    console.log(`Rodando em http://localhost:${PORT}`);
});
