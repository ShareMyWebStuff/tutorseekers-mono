/*
Drops index on geo_distances (from_location_id, to_location_id).

**/

DROP INDEX IF EXISTS geo_distances_from_to_location ON geo_distances;
