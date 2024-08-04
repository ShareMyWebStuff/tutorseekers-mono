/*
Create an index on user_login (email).

**/

CALL CreateIndex( 'user_verification_codes', 'user_verification_codes_code', 'verification_code', true );
