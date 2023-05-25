CREATE OR REPLACE VIEW ad_shares_completed AS
  SELECT ad_shares.*, ads.price
    FROM ad_shares JOIN ads ON ads.id = ad_shares.ad_id WHERE ads.expiry < now();
