/*
Create an index on geo_postcodes (country_id, postcode_id).

**/

CALL CreateIndex( 'geo_postcodes', 'geo_postcodes_country_postcode', 'country_id, postcode_id', true );
