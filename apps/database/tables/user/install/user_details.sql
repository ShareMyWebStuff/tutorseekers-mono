/*
Table       : user_details

Description : This table contains the personal details for our users.

**/
CREATE TABLE IF NOT EXISTS user_details (
	user_id					INT UNSIGNED		NOT NULL,
    title           		SMALLINT UNSIGNED	NOT NULL,
	firstname				VARCHAR(50)			NOT NULL,
	lastname				VARCHAR(50)			NULL,
	gender					SMALLINT UNSIGNED	NULL,
	address1				VARCHAR(80)			NULL,
	address2				VARCHAR(80)			NULL,
	town					VARCHAR(80)			NOT NULL,
	county					VARCHAR(80)			NULL,
	postcode				VARCHAR(11)			NOT NULL,
	country_id      		SMALLINT UNSIGNED	NULL,
	phone					VARCHAR(20)			NULL,
	mobile					VARCHAR(20)			NULL,
	profile_title			VARCHAR(80)			NULL,

	photo_media_id			INT UNSIGNED		NULL,
	video_media_id			INT UNSIGNED		NULL,

	search_location_id		INT UNSIGNED		NULL,

	avg_rating				DECIMAL(3,2)		NULL,
	no_ratings				SMALLINT UNSIGNED	NULL,

	tutors_home				TINYINT UNSIGNED	NOT NULL	DEFAULT 1,
	tutor_travels			TINYINT UNSIGNED	NOT NULL	DEFAULT 1,
	tutor_online			TINYINT UNSIGNED	NOT NULL	DEFAULT 1,

	teacher					TINYINT UNSIGNED	NOT NULL	DEFAULT 1,
	in_education			TINYINT UNSIGNED	NOT NULL	DEFAULT 1,

	has_degree				TINYINT UNSIGNED	NOT NULL	DEFAULT 1,
	dbs						TINYINT UNSIGNED	NOT NULL	DEFAULT 1,
	dbs_verified			TINYINT UNSIGNED	NOT NULL	DEFAULT 1,

	avg_response			MEDIUMINT UNSIGNED  NULL,

	last_online				TIMESTAMP       	DEFAULT CURRENT_TIMESTAMP,                              -- DateTime the user registered
	create_date       		TIMESTAMP       	DEFAULT CURRENT_TIMESTAMP,                              -- DateTime the user registered

	profile_title_verified	BOOLEAN				NOT NULL	DEFAULT true,
	verified_by				INT UNSIGNED		NULL,
	
	PRIMARY KEY	(user_id)
) ENGINE=InnoDB;
