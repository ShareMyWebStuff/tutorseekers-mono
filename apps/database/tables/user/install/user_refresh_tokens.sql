/*
Table       : user_refresh_tokens

Description : This table contains the a refresh token for the user

**/
CREATE TABLE IF NOT EXISTS user_refresh_tokens
(
	user_id						INTEGER UNSIGNED	NOT NULL,
	refresh_token				VARCHAR ( 500 )		NOT NULL,
	create_date       			TIMESTAMP       	DEFAULT CURRENT_TIMESTAMP,                              -- DateTime the refresh token was added
	
	PRIMARY KEY ( user_id, create_date )
) ENGINE=InnoDB;
