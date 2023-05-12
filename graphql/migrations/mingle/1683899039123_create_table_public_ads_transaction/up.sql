CREATE TABLE "public"."ads_transaction" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "ad" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("ad") REFERENCES "public"."ad_shares"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
