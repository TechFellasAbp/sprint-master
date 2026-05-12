const pool = require("../database/db");
const { randomBytes, hash } = require("crypto");
const {hashPassword} = require("../utils/password");

/*
Para fazer o teste de insert com o POST, cole isso no terminal:
curl -X POST http://localhost:3000/api \
    -H "Content-Type: application/json" \
    -d '{"nome": "Ana", "email": "ana@email.com", "cpf": "12345678901", "senha": "123", "grupo": 1}'
*/

async function insertUsuario(client, nome, email, cpf, senha){
    const certificadoHash = randomBytes(24).toString("hex");
    const senhaCodificada = hashPassword(senha);

    const result = await client.query(
        `INSERT INTO usuarios (nome, email, cpf, senha, certificado_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id_usuario, nome, email, cpf, certificado_hash`,
            [nome, email, cpf, senhaCodificada, certificadoHash]
    );
    if(result && result.rowCount == 1){
        return result.rows[0];
    }
    return result.rows[0] || null;
}

async function findPrimeiroModuloId(client){
    const result = await client.query(`SELECT id_modulo FROM modulos ORDER BY id_modulo LIMIT 1`);
    return result.rows[0] || null;
}

async function findGrupoAleatorio(client, idModulo){
    const result = await client.query(
        `SELECT grupo FROM questoes WHERE id_modulo=$1 AND grupo IS NOT NULL GROUP BY grupo ORDER BY RANDOM() LIMIT 1`,
        [idModulo]
    );  
    return result.rows[0] || null;
}

async function insertExame(client, idModulo, idUsuario, grupo, tentativa){
    const result = await client.query(
        `INSERT INTO exames (id_modulo, id_usuario, grupo, tentativa)
            VALUES ($1, $2, $3, $4)
            RETURNING id_exame`,
        [idModulo, idUsuario, grupo, tentativa]
    );
}

async function createUsuario(nome, email, cpf, senha){
    const client = await pool.connect();
    try{
        await client.query("BEGIN");
        
        const usuario = await insertUsuario(client, nome, email, cpf, senha);

        const modulo = await findPrimeiroModuloId(client);
        if(!modulo){
            throw new Error("Nenhum módulo cadastrado para inicializar exame do usuário");
        }

        const grupo = await findGrupoAleatorio(client, modulo.id_modulo);
        if(!grupo){
            throw new Error("Nenhum grupo cadastrado para inicializar exame do usuário");
        }

        await insertExame(client, modulo.id_modulo, usuario.id_usuario, grupo.grupo, 1);

        await client.query("COMMIT");
        return {id_usuario: usuario.id, nome: usuario.nome, email: usuario.email, cpf: usuario.cpf};
    } catch(e){
        await client.query("ROLLBACK");
        throw e;
        return {error: "Problemas ao criar o usuário"};
    } finally {
        client.release();
    }
}

async function updateUsuarioCpf(idUsuario, cpf){
    const result = await pool.query(
        `UPDATE usuarios 
        SET cpf = $1
        WHERE id_usuario = $2
        RETURNING id_usuario
        `,
        [cpf,idUsuario],
    );
    return result.rows[0] || null;
}

async function findUsuarioById(idUsuario){
    const result = await pool.query(`
        SELECT id_usuario, nome, email, cpf
        FROM usuarios
        WHERE id_usuario = $1 
        `,[idUsuario],
    );

    return result.rows[0] || null;
}

module.exports = {
    createUsuario,
    updateUsuarioCpf,
    findUsuarioById
};
