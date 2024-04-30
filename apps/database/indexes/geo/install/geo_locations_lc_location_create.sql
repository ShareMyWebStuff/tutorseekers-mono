/*
Create an index on geo_locations (lc_location).

**/

CALL CreateIndex( 'geo_locations', 'geo_locations_lc_location', 'lc_location', false );
