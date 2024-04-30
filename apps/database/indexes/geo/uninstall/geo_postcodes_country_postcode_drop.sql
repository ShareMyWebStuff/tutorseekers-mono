/*
Drop index on geo_postcodes (country_id, postcode_id).

**/

DROP INDEX IF EXISTS geo_postcodes_country_postcode ON geo_postcodes;
