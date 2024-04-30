/*
Create an index on geo_distances (from_location_id).

**/

CALL CreateIndex( 'geo_distances', 'geo_distances_location_id', 'from_location_id', false );
