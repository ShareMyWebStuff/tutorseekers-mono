/*

PROCEDURE : sp_user_verification_code_ins

DESCRIPTION   : This procedure creates / recreates a verification code for a user for a specifiec media type.

*/
DROP PROCEDURE IF EXISTS sp_user_verification_code_ins;

DELIMITER $$

CREATE PROCEDURE sp_user_verification_code_ins
				(
					IN	p_user_id				INTEGER,
					IN	p_reference_id			INTEGER,
					IN	p_media_type			SMALLINT,
					IN	p_verification_code		VARCHAR(40)
				)
BEGIN

    DECLARE v_affected_rows INTEGER;
    DECLARE v_changed_rows INTEGER;


	DELETE FROM user_verification_codes WHERE user_id = p_user_id AND media_type = p_media_type AND (p_reference_id IS NULL OR p_reference_id = reference_id);

	INSERT INTO user_verification_codes ( user_id, reference_id, media_type, verification_code ) 
	VALUES (p_user_id, p_reference_id, p_media_type, p_verification_code );

    SET v_affected_rows = row_count(), v_changed_rows = 0;

 	SELECT p_user_id as inserted_id, v_affected_rows as affectedRows, v_changed_rows as changedRows;

END $$
DELIMITER ;

