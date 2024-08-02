/*
Table       : user_details_unverified

Description : If a user enters an profile title that is deemed inappropiate for this site it is marked invalid. The field is marked invalid on the user_details table and a reason is entered here.

**/
-- DROP TABLE IF EXISTS user_details_unverified;
CREATE TABLE IF NOT EXISTS user_details_unverified (
	user_id					INT UNSIGNED	NOT NULL,
	profile_title			VARCHAR(1000)	NOT NULL,
    
	PRIMARY KEY	(user_id)
) ENGINE=InnoDB;


