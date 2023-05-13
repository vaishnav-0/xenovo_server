alter table "public"."ad_shares" add constraint "ad_expired" check (ad_not_expired(ad_id));
