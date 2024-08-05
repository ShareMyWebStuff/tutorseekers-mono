/*
Drop index on user_login (google_id).

**/

CALL DeleteIndex( 'user_login', 'user_login__google_id' );

