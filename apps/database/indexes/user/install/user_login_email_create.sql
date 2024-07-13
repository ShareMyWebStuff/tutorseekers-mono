/*
Create an index on user_login (email).

**/

CALL CreateIndex( 'user_login', 'user_login_email', 'email', true );
