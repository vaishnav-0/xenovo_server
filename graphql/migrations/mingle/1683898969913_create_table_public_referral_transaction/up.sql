CREATE TABLE "public"."referral_transaction" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "refferal" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("refferal") REFERENCES "public"."referals"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
