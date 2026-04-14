CREATE TEMP TABLE IF NOT EXISTS modulos_import (
  id_modulo INTEGER,
  titulo VARCHAR(255)
);

TRUNCATE TABLE modulos_import;

COPY modulos_import (id_modulo, titulo)
FROM '__SEED_DATA_DIR__/modulos.csv'
WITH (
  FORMAT csv,
  HEADER true,
  DELIMITER ';',
  ENCODING 'UTF8'
);

INSERT INTO public.modulos (id_modulo, titulo)
SELECT mi.id_modulo, mi.titulo
FROM modulos_import AS mi
ON CONFLICT (id_modulo)
DO UPDATE SET titulo = EXCLUDED.titulo;
