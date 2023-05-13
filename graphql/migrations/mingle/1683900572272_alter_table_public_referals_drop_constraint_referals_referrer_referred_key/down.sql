alter table "public"."referals" add constraint "referals_referrer_referred_key" unique ("referrer", "referred");
