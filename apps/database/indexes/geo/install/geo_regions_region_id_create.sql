/*
Create an index on geo_regions (region_id).

**/

CALL CreateIndex( 'geo_regions', 'geo_regions_region_id', 'region_id', true );