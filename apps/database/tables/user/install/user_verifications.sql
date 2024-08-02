/*
Table       : user_verifications

Description : Contains the verifications a user creates, admin can use this to deal with account changes

	outstanding				True if outstanding verification for admin

	profile_photo			Profile has been uploaded and needs verification
	profile_video			Profile has been uploaded and needs verification

	photo					Photo has been uploaded and needs verification for verifying the person for the accout
	photo_id				Photo id has been uploaded and needs verification
	address_id				Address id has been uploaded and needs verification
	dbs						DBS has been uploaded and needs verification
	reference				Reference has been uploaded and needs verification
	group_name				Group name has been created and needs verification
	add_subject				Subject has been requested and needs verification
	profile_title			Profile title has been uploaded and needs verification
	about					About has been uploaded and needs verification


**/
-- DROP TABLE IF EXISTS user_verifications;
CREATE TABLE IF NOT EXISTS user_verifications (
	user_id					INT UNSIGNED        NOT NULL,
	outstanding				BOOLEAN				NOT NULL,
	profile_photo			BOOLEAN				NOT NULL,
	profile_video			BOOLEAN				NOT NULL,

	photo_vs_photo_id		BOOLEAN				NOT NULL,
	photo					BOOLEAN				NOT NULL,
	photo_id				BOOLEAN				NOT NULL,
	address_id				BOOLEAN				NOT NULL,
	dbs						BOOLEAN				NOT NULL,
	reference				BOOLEAN				NOT NULL,
	group_name				BOOLEAN				NOT NULL,
	add_subject				BOOLEAN				NOT NULL,
	profile_title			BOOLEAN				NOT NULL,
	about					BOOLEAN				NOT NULL,

	PRIMARY KEY	(user_id)
) ENGINE=InnoDB;
