/*
Drop index on user_refresh_tokens (refresh_token).

**/

DROP INDEX IF EXISTS user_refresh_tokens__refresh_token ON user_refresh_tokens;
