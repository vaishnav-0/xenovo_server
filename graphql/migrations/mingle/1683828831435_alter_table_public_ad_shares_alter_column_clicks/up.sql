alter table "public"."ad_shares" alter column "clicks" set default '0';
alter table "public"."ad_shares" alter column "clicks" set not null;
