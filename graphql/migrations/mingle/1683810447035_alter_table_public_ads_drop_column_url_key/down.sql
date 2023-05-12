comment on column "public"."ads"."url_key" is E'advertisements';
alter table "public"."ads" alter column "url_key" drop not null;
alter table "public"."ads" add column "url_key" text;
