/*
Create an index on geo_distances (from_location_id, to_location_id).

**/

CALL CreateIndex( 'geo_distances', 'geo_distances_from_to_location', 'from_location_id, to_location_id', false );
