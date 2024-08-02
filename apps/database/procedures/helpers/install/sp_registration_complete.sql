/*

PROCEDURE : sp_registration_complete

DESCRIPTION   : This procedure completes the registration process

- Updates the user_login
- Inserts / Updates the user_details
- Creates a token for authentication

*/

DROP PROCEDURE IF EXISTS sp_registration_complete;

DELIMITER $$

CREATE PROCEDURE sp_registration_complete
				(
					IN	p_user_id				INT UNSIGNED,

					IN	p_tutor					BOOLEAN,
					IN	p_parent				BOOLEAN,
					IN	p_student				BOOLEAN,

					IN	p_email_verified		BOOLEAN,

					IN	p_title           		SMALLINT UNSIGNED,
					IN	p_firstname				VARCHAR(50),
					IN	p_lastname				VARCHAR(50),
					IN	p_preferred_name		VARCHAR(50),
					IN	p_gender				SMALLINT UNSIGNED,

					IN	p_address1				VARCHAR(80),
					IN	p_address2				VARCHAR(80),
					IN	p_town					VARCHAR(80),
					IN	p_county				VARCHAR(80),
					IN	p_postcode				VARCHAR(11),
					IN	p_country               VARCHAR(50),

					IN	p_phone					VARCHAR(20),
					IN	p_mobile				VARCHAR(20),

					IN	p_safeguarding			TINYINT UNSIGNED,
					IN	p_over_18				TINYINT UNSIGNED,
					IN	p_right_to_work			TINYINT UNSIGNED,
					IN	p_only_account			TINYINT UNSIGNED,
					IN	p_agree_terms			TINYINT UNSIGNED,

					IN	p_ip					VARCHAR(46),
					IN	p_ip_city				VARCHAR(100),
					IN	p_ip_country			VARCHAR(50)
				)
BEGIN
	DECLARE v_success		BOOLEAN;
	DECLARE v_user_id		INTEGER UNSIGNED;
    DECLARE v_affected_rows	INTEGER UNSIGNED;
    DECLARE v_changed_rows	INTEGER UNSIGNED;
	DECLARE v_location_id	INTEGER UNSIGNED;
	DECLARE v_country_id	MEDIUMINT UNSIGNED;
	DECLARE v_country_found BOOLEAN;
	DECLARE p_verified_by	BOOLEAN;
	DECLARE v_msg 			VARCHAR(100);

	SET v_success = false;

	SELECT country_id
	INTO   v_country_id
	FROM   geo_countries
	WHERE  country = p_country;
	
	IF (v_country_id IS NOT NULL) THEN

		SET v_country_found = true;
		SET    v_location_id = sf_geo_location_nearest_location_id_get( p_address2, p_town, p_county, p_postcode, v_country_id );

		SELECT user_id, profile_title INTO v_user_id, @pt FROM user_details_2 WHERE user_id = p_user_id;

		IF ( v_user_id IS NULL) THEN
			INSERT INTO user_details_2 ( 
				user_id, 
				title, 
				firstname, 
				lastname, 
				preferred_name, 
				gender, 
				address1, 
				address2, 
				town, 
				county, 
				postcode, 
				country_id, 
				phone, 
				mobile, 
				search_location_id
				) 
			VALUES (p_user_id, 
				p_title, 
				p_firstname, 
				p_lastname, 
				p_preferred_name, 
				p_gender, 
				p_address1, 
				p_address2, 
				p_town, 
				p_county, 
				p_postcode, 
				v_country_id, 
				p_phone, 
				p_mobile, 
				v_location_id
				 );
			SET v_user_id = p_user_id, v_affected_rows = row_count(), v_changed_rows = 0, v_success = CASE WHEN row_count() = 1 THEN true ELSE false END;
			
		ELSE
			UPDATE	user_details_2
			SET		title				= p_title,
					firstname			= p_firstname,
					lastname			= p_lastname,
					preferred_name		= p_preferred_name,
					gender				= p_gender,
					address1			= p_address1,
					address2			= p_address2,
					town				= p_town,
					county				= p_county,
					postcode			= p_postcode,
					country_id			= v_country_id,
					phone				= p_phone,
					mobile				= p_mobile,
					search_location_id	= v_location_id
			WHERE	user_id = v_user_id;
			SET v_affected_rows = 0, v_changed_rows = row_count(), v_success = true;
		END IF;

		DELETE FROM user_details_unverified WHERE user_id = v_user_id;

		IF ( v_success = true) THEN
			UPDATE	user_login_2
			SET		tutor_acc = p_tutor,
					parent_acc = p_parent,
					student_acc = p_student,
					validated = (p_email_verified),
					validated_email = p_email_verified
			WHERE	user_id	= v_user_id;
		END IF;

		-- If sucess we need to add the rows for verification and messages outstanding
		IF ( v_success = true) THEN
			DELETE FROM messages_unseen WHERE user_grp_id = v_user_id AND user_acc = true;
			INSERT INTO messages_unseen ( user_grp_id, user_acc, no_messages, no_profile_visits, no_favourites, reload_profile ) VALUES ( v_user_id, true, 0, 0, 0, false);
			SET v_success = CASE WHEN row_count() = 1 THEN true ELSE false END;
		END IF;

		IF ( v_success = true) THEN
			DELETE FROM user_verifications WHERE user_id = v_user_id;
			INSERT INTO user_verifications (user_id, outstanding, profile_photo, profile_video, photo_vs_photo_id, photo, photo_id, address_id, dbs, reference, group_name, add_subject, profile_title, about ) VALUES(  v_user_id,  false, false, false, false, false, false, false, false, false, false, false, false, false );
			SET v_success = CASE WHEN row_count() = 1 THEN true ELSE false END;
		END IF;

		-- Now record the ip address 
		IF ( p_ip IS NOT NULL) THEN
			CALL sp_user_ip_ins( p_user_id, p_ip, p_ip_city, p_ip_country );
		END IF;

	ELSE
		SET v_country_found = false;
		SET v_msg = CONCAT('Country does not exist (', p_country, ').');

	END IF;

 	SELECT v_user_id as inserted_id, v_affected_rows as affectedRows, v_changed_rows as changedRows, v_success as success, v_country_found as countryFound, v_msg as msg;

END $$
DELIMITER ;

