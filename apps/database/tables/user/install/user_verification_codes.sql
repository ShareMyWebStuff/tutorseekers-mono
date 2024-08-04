/*
Table       : user_verification_codes

Description : This table contains the verification codes for verifying email addresses, SMS and password resets.

**/
-- DROP TABLE IF EXISTS user_verification_codes;
CREATE TABLE user_verification_codes (
  user_id           INT UNSIGNED      NOT NULL,
  reference_id      INT UNSIGNED      NULL,
  media_type        SMALLINT UNSIGNED NOT NULL,
  verification_code	VARCHAR(40)       NOT NULL,
  create_date       TIMESTAMP         NOT NULL  DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
-- Removed char set for MySQL v8
-- ) ENGINE=MyISAM DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE UNIQUE INDEX user_verification_codes_code ON user_verification_codes ( verification_code );

-- Create index on verification_code. This will allow us to find the codes quickerly.
-- CALL CreateIndex( 'user_verification_codes', 'user_verification_codes_code', 'verification_code', true );
