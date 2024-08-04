/*
Drop index on user_verification_codes (verification_code).

**/

DROP INDEX IF EXISTS user_verification_codes_code ON user_verification_codes;
