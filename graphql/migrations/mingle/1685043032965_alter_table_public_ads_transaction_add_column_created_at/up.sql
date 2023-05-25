alter table "public"."ads_transaction" add column "created_at" timestamptz
 not null default now();
