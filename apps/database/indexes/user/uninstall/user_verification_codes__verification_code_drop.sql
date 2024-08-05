/*
Drop index on user_verification_codes (verification_code).

**/

CALL DeleteIndex( 'user_verification_codes', 'user_verification_codes_code' );

