-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- create or replace function ad_not_expired(id uuid) returns boolean as $$
--     select exists (
--         select 1
--         from ads
--         where id = id
--           and expiry >= now()
--     );
-- $$ language sql;
DROP FUNCTION IF EXISTS ad_not_expired;