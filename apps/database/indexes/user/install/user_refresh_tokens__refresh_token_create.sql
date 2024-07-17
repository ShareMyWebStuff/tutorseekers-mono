/*
Create an index on user_refresh_tokens (refresh_token).

**/

CALL CreateIndex( 'user_refresh_tokens', 'user_refresh_tokens__refresh_token', 'refresh_token', false );
