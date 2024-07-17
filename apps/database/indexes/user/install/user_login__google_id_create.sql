/*
Create an index on user_login (google_id).

**/

CALL CreateIndex( 'user_login', 'user_login__google_id', 'google_id', true );