/*
Create an index on geo_postcodes (lc_postcode).

**/

CALL CreateIndex( 'geo_postcodes', 'geo_postcodes_lc_postcode', 'lc_postcode', false );
