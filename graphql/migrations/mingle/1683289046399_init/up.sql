SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    phone text,
    gender text,
    name text NOT NULL,
    "DOB" date,
    contacts integer NOT NULL
);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
