alter table "public"."ad_shares" alter column "clicks" drop not null;
ALTER TABLE "public"."ad_shares" ALTER COLUMN "clicks" drop default;
