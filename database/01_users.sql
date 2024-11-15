CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL PRIMARY KEY,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(50) COLLATE pg_catalog."default" NOT NULL,
    avatar text COLLATE pg_catalog."default",
    caption text COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_role_check CHECK (role::text = ANY (ARRAY['participant'::character varying, 'caregiver'::character varying]::text[]))
)
TABLESPACE pg_default;