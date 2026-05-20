const pool = require("../database/db");
const { findModulosRespondidosByUsuario } = require("./questoes.repositories");

async function findUsuarioByCertificadoHash(certificadoHash) {
  const result = await pool.query(
    ` 
    SELECT 
    id_usuario, 
    nome, 
    cpf, 
    certificado_hash 
    FROM usuarios 
    WHERE certificado_hash = $1 
    LIMIT 1 
    `,
    [certificadoHash],
  );

  return result.rows[0] || null;
}

async function findModulos() {
  const result = await pool.query(` 
    SELECT 
    id_modulo, 
    titulo 
    FROM modulos m 
    ORDER BY 
    id_modulo ASC 
  `);

  return result.rows;
}

function groupTentativasByModulo(tentativas) {
  return tentativas.reduce((groups, tentativa) => {
    const idModulo = Number(tentativa.id_modulo);

    if (!groups.has(idModulo)) {
      groups.set(idModulo, []);
    }

    groups.get(idModulo).push(tentativa);

    return groups;
  }, new Map());
}

function mapModulo(modulo, tentativas) {
  return {
    idModulo: modulo.id_modulo,
    titulo: modulo.titulo,
    metaQuestoes: Number(tentativas[0]?.questoes) || 0,

    notasTentativas: tentativas.map((tentativa) => ({
      nota: Number(tentativa.nota) || 0,
      metaQuestoes: Number(tentativa.questoes) || 0,
      tentativa: tentativa.tentativa,
      concluida:
        Number(tentativa.questoes_respondidas) >= Number(tentativa.questoes),
      inicioEm: tentativa.inicio,
      fimEm: tentativa.fim,
    })),
  };
}

function getCertificatePeriod(modulosConcluidos) {
  const dates = modulosConcluidos
    .flatMap((modulo) => modulo.notasTentativas)
    .filter((tentativa) => tentativa.concluida)
    .flatMap((tentativa) => [tentativa.inicioEm, tentativa.fimEm])
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  return {
    inicioEm: dates[0]?.toISOString() || null,
    fimEm: dates[dates.length - 1]?.toISOString() || null,
  };
}

async function findCertificadoByHash(certificadoHash) {
  const usuario = await findUsuarioByCertificadoHash(certificadoHash);

  if (!usuario) {
    return null;
  }

  const modulosRows = await findModulos();
  const tentativas = await findModulosRespondidosByUsuario(usuario.id_usuario);
  const tentativasByModulo = groupTentativasByModulo(tentativas);

  const modulos = [];
  const modulosConcluidos = [];

  for (const moduloRow of modulosRows) {
    const idModulo = Number(moduloRow.id_modulo);
    const tentativasDoModulo = tentativasByModulo.get(idModulo) || [];
    const modulo = mapModulo(moduloRow, tentativasDoModulo);
    modulos.push(modulo);

    let moduloConcluido = false;

    for (const tentativa of modulo.notasTentativas) {
      if (tentativa.concluida) {
        moduloConcluido = true;
        break;
      }
    }

    if (moduloConcluido) {
      modulosConcluidos.push(modulo);
    }
  }

  if (!modulos.length || modulosConcluidos.length !== modulos.length) {
    return {
      indisponivel: true,
      motivo:
        "Certificado indisponível: Conclusão de todos os módulos obrigatória",
    };
  }

  const periodo = getCertificatePeriod(modulosConcluidos);

  return {
    aluno: {
      nome: usuario.nome,
      cpf: usuario.cpf,
    },

    certificado: {
      certificadoHash: usuario.certificado_hash,
      codigoValidacao: usuario.certificado_hash,
      emitidoEm: periodo.fimEm,
      inicioEm: periodo.inicioEm,
      fimEm: periodo.fimEm,
    },

    progresso: {
      modulosConcluidos,
    },
  };
}

module.exports = {
  findCertificadoByHash,
};
