/*
Drop index on user_login (email).

**/

CALL DeleteIndex( 'user_login', 'user_login__email' );
