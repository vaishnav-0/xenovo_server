create or replace function ad_not_expired(id uuid) returns boolean as $$
    select exists (
        select 1
        from ads
        where id = id
          and expiry >= now()
    );
$$ language sql;
