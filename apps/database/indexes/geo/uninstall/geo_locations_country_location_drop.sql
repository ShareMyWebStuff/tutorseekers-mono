/*
Drops index on geo_locations (country_id, location_id).

**/

DROP INDEX IF EXISTS geo_locations_country_location ON geo_locations;
