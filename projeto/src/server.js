const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const router = require("./routes/usuarios.routes.js");

dotenv.config({quiet: true, 
    path: path.resolve(__dirname,"..",".env")
});

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT;
const publicpath = path.join(__dirname,"..","public");
const pagesPath = path.join(publicpath,"pages");
const assetsPath = path.join(publicpath,"assets");

app.use("/",express.static(pagesPath));
app.use("/assets", express.static(assetsPath));

app.use("/api", router);

app.use(function(_req,res){
    res.redirect("404.html");
})

app.listen(PORT,function(){
    console.log(`Rodando em http://localhost:${PORT}`);
});
