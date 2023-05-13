alter table "public"."ads" add column "created_at" timestamptz
 null default now();
