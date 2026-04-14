CREATE TEMP TABLE questoes_import_raw (
  id_questao INTEGER,
  id_modulo INTEGER,
  grupo SMALLINT,
  numero SMALLINT,
  dificuldade VARCHAR(20),
  enunciado TEXT,
  alternativa_correta VARCHAR(10),
  alternativa_a TEXT,
  alternativa_b TEXT,
  alternativa_c TEXT,
  alternativa_d TEXT,
  imagem VARCHAR(255)
);

COPY questoes_import_raw (
  id_questao,
  id_modulo,
  grupo,
  numero,
  dificuldade,
  enunciado,
  alternativa_correta,
  alternativa_a,
  alternativa_b,
  alternativa_c,
  alternativa_d,
  imagem
)
FROM '__SEED_DATA_DIR__/questoes.csv'
WITH (
  FORMAT csv,
  HEADER true,
  DELIMITER ';',
  ENCODING 'UTF8'
);

INSERT INTO public.questoes (
  id_questao,
  id_modulo,
  grupo,
  numero,
  dificuldade,
  enunciado,
  alternativa_correta,
  alternativa_a,
  alternativa_b,
  alternativa_c,
  alternativa_d,
  imagem
)
SELECT
  q.id_questao,
  q.id_modulo,
  q.grupo,
  q.numero,
  q.dificuldade,
  q.enunciado,
  LOWER(TRIM(q.alternativa_correta))::CHAR(1),
  q.alternativa_a,
  q.alternativa_b,
  q.alternativa_c,
  q.alternativa_d,
  CASE
    WHEN q.imagem IS NULL THEN NULL
    WHEN UPPER(TRIM(q.imagem)) IN ('', 'NULL') THEN NULL
    ELSE TRIM(q.imagem)
  END
FROM questoes_import_raw AS q
ON CONFLICT (id_questao)
DO UPDATE SET
  id_modulo = EXCLUDED.id_modulo,
  grupo = EXCLUDED.grupo,
  numero = EXCLUDED.numero,
  dificuldade = EXCLUDED.dificuldade,
  enunciado = EXCLUDED.enunciado,
  alternativa_correta = EXCLUDED.alternativa_correta,
  alternativa_a = EXCLUDED.alternativa_a,
  alternativa_b = EXCLUDED.alternativa_b,
  alternativa_c = EXCLUDED.alternativa_c,
  alternativa_d = EXCLUDED.alternativa_d,
  imagem = EXCLUDED.imagem;
