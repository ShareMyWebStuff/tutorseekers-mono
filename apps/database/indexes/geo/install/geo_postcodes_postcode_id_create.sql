/*
Create an index on geo_postcodes (postcode_id).

**/

CALL CreateIndex( 'geo_postcodes', 'geo_postcodes_postcode_id', 'postcode_id', true );
