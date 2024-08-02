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
DROP TABLE IF EXISTS user_verifications;
