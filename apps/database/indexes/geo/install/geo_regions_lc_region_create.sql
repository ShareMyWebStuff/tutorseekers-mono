/*
Create an index on geo_regions (lc_region).

**/

CALL CreateIndex( 'geo_regions', 'geo_regions_lc_region', 'lc_region', false );