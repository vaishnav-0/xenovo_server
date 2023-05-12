alter table "public"."ad_shares" add constraint "ad_shares_user_id_ad_id_key" unique ("user_id", "ad_id");
