/*
Create an index on geo_locations (location_id).

**/

CALL CreateIndex( 'geo_locations', 'geo_locations_location_id', 'location_id', true );
