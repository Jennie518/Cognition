CREATE TABLE IF NOT EXISTS public.test_results
(
    id SERIAL PRIMARY KEY,
    participantid integer,
    blockno integer,
    coordx double precision,
    coordy double precision,
    coordt double precision,
    realpointid text COLLATE pg_catalog."default",
    realpointx double precision,
    realpointy double precision,
    fakepointid text COLLATE pg_catalog."default",
    fakepointx double precision,
    fakepointy double precision,
    speed double precision,
    pausevalue double precision,
    correctangle double precision,
    wrongangle double precision,
    err integer,
    errorcorrected integer
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.test_results
    OWNER to zhanyijun