/*
Create an index on user_login (email).

**/

CALL CreateIndex( 'user_verifications', 'user_verifications__outstanding', 'outstanding', false );
