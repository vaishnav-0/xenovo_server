CREATE TABLE "public"."ad_proof" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "picture" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "public"."ad_shares"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."ad_proof" IS E'proof for shared ads';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
