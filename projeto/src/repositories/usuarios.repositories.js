const pool = require("../database/db");
const {randomBytes} = require("crypto");

/*
Para fazer o teste de insert com o POST, cole isso no terminal:
curl -X POST http://localhost:3000/api \
    -H "Content-Type: application/json" \
    -d '{"nome": "Ana", "email": "ana@email.com", "cpf": "12345678901", "senha": "123", "grupo": 1}'
*/

async function insertUsuario(nome, email, cpf, senha){
    const certificado_hash = randomBytes(24).toString("hex");

    const result = await pool.query(
        `INSERT INTO usuarios (nome, email, cpf, senha, certificado_hash)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_usuario, nome, email, cpf, certificado_hash`,
                [nome, email, cpf, senha, certificado_hash]
    );
    if(result && result.rowCount == 1){
        return result.rows[0];
    }
    return null;
}

async function createUsuario(nome, email, cpf, senha){
    const usuario = await insertUsuario(nome, email, cpf, senha)
    if(!usuario){
        return {message: "Problemas ao criar o usuário"};
    }
    return usuario;
}

module.exports = {
    createUsuario
}
