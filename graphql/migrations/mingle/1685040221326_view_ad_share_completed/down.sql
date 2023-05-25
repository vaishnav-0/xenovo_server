-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW ad_shares_completed AS
--   SELECT ad_shares.*, ads.price
--     FROM ad_shares JOIN ads ON ads.id = ad_shares.ad_id WHERE ads.expiry < now();

DROP VIEW ad_shares_completed;
