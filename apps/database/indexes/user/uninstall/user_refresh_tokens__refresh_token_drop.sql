/*
Drop index on user_refresh_tokens (refresh_token).

**/

CALL DeleteIndex( 'user_refresh_tokens', 'user_refresh_tokens__refresh_token' );

