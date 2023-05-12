CREATE TABLE "public"."ads" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "description" text NOT NULL, "image" text NOT NULL, "url_key" text NOT NULL, "url" text NOT NULL, PRIMARY KEY ("id") );COMMENT ON TABLE "public"."ads" IS E'advertisements';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
