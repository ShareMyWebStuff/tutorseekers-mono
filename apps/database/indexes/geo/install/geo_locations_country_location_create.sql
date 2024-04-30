/*
Create an index on geo_locations (country_id, location_id).

**/

CALL CreateIndex( 'geo_locations', 'geo_locations_country_location', 'country_id, location_id', true );
