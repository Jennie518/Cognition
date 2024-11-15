CREATE TABLE IF NOT EXISTS public.pairs
(
    id SERIAL PRIMARY KEY,
    participant_id integer,
    caregiver_id integer,
    room_id text COLLATE pg_catalog."default",
    CONSTRAINT unique_pair UNIQUE (caregiver_id, participant_id),
    CONSTRAINT pairs_caregiver_id_fkey FOREIGN KEY (caregiver_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pairs_participant_id_fkey FOREIGN KEY (participant_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pairs
    OWNER to zhanyijun;