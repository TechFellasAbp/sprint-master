const pool = require("../database/db");

async function findProximaQuestaoByUsuario(idUsuario) {
  const result = await pool.query(
    `
    WITH exame_atual AS (
      SELECT id_exame, id_modulo, grupo
      FROM exames
      WHERE id_usuario = $1
      ORDER BY id_exame DESC
      LIMIT 1
    )
    SELECT
      e.id_exame,
      q.id_questao,
      q.id_modulo,
      q.grupo,
      q.numero,
      q.dificuldade,
      q.enunciado,
      q.alternativa_a,
      q.alternativa_b,
      q.alternativa_c,
      q.alternativa_d,
      q.imagem
    FROM exame_atual e
    INNER JOIN questoes q
      ON q.id_modulo = e.id_modulo
     AND q.grupo IS NOT DISTINCT FROM e.grupo
    WHERE NOT EXISTS (
      SELECT 1
      FROM respostas r
      WHERE r.id_exame = e.id_exame
        AND r.id_questao = q.id_questao
    )
    ORDER BY q.numero ASC NULLS LAST, q.id_questao ASC
    LIMIT 1    `,
    [idUsuario],
  );

  return result.rows[0] || null;
}

async function findQuestaoDoExameByUsuario(idUsuario, idExame, idQuestao) {
  const result = await pool.query(
    `
    SELECT
      e.id_exame,
      q.id_questao,
      q.alternativa_correta
    FROM exames e
    INNER JOIN questoes q
      ON q.id_modulo = e.id_modulo
     AND q.grupo IS NOT DISTINCT FROM e.grupo
    WHERE e.id_usuario = $1
      AND e.id_exame = $2
    AND q.id_questao = $3
    LIMIT 1
    `,
    [idUsuario, idExame, idQuestao],
  );

  return result.rows[0] || null;
}

async function findRespostaByExameEQuestao(idExame, idQuestao) {
  const result = await pool.query(
    `
    SELECT
      id_resposta,
      id_exame,
      id_questao,
      resposta,
      nota,
      respondido_em
    FROM respostas
    WHERE id_exame = $1
      AND id_questao = $2
    LIMIT 1
    `,
    [idExame, idQuestao],
  );

  return result.rows[0] || null;
}

async function inserirRespostaQuestao (id_exame, id_questao, resposta, nota) {
  const result = await pool.query(
    `
    SELECT INTO respostas (id_exame,id_questoes,nota,resposta)
    VALUES ($1,$2,$3,$)
    RETURNING id_resposta, id_exame, id_questao, nota
    `,
    [id_exame, id_questao, nota, resposta],
  );

  return result.rows[0];
}

modules.exports = {
    findProximaQuestaoByUsuario,
    findQuestaoDoExameByUsuario,
    findRespostaByExameEQuestao,
    inserirRespostaQuestao
}