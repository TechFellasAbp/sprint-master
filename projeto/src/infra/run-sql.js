const fs = require("fs/promises");
const path = require("path");
const pool = require("../database/db");

const projectRoot = path.resolve(__dirname, "..", "..");
const sqlDir = path.resolve(__dirname, "init");
const seedDataDir = path.resolve(sqlDir, "seed-data");

// A ordem importa: esse array define a sequência exata de execução dos scripts.
const sqlFiles = [
  "01_schema_modulos.sql",
  "02_schema_questoes.sql",
  "03_schema_usuarios.sql",
  "04_schema_exames.sql",
  "05_schema_respostas.sql",
  "06_seed_modulos.sql",
  "07_seed_questoes.sql",
];

async function runSqlFiles() {
  const files = sqlFiles.map((fileName) => path.join(sqlDir, fileName));

  if (files.length === 0) {
    throw new Error(`Nenhum arquivo .sql encontrado em ${sqlDir}`);
  }

  try {
    // Lê cada arquivo, ajusta caminhos locais e executa o SQL no banco configurado.
    for (const file of files) {
      let sql = await fs.readFile(file, "utf8");
      const relativeFile = path.relative(projectRoot, file).replaceAll(path.sep, "/");

      sql = prepareSql(sql);

      process.stdout.write(`Executando ${relativeFile}... `);
      await pool.query(sql);
      console.log("ok");
    }
  } finally {
    await pool.end();
  }

  console.log(`${files.length} arquivo(s) SQL executado(s).`);
}

function prepareSql(sql) {
  // O PostgreSQL espera caminhos com "/" no COPY, inclusive no Windows.
  const postgresPath = seedDataDir.replaceAll("\\", "/");

  // Substitui o placeholder usado nos .sql pelo caminho real dos arquivos CSV.
  return sql.replace(/__SEED_DATA_DIR__/g, postgresPath);
}

runSqlFiles().catch((error) => {
  console.error("Erro ao executar arquivos SQL:");
  console.error(error.message);
  process.exitCode = 1;
});
