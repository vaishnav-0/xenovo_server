CREATE TABLE "public"."referals" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "referrer" text NOT NULL, "referred" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("referrer") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("referred") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."referals" IS E'referal data';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
