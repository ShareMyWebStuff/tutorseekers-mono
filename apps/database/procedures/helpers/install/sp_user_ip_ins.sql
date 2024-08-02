/*

PROCEDURE : sp_user_ip_ins

DESCRIPTION   : This procedure saves the ip address the user is registering / login from.

*/

DROP PROCEDURE IF EXISTS sp_user_ip_ins;

DELIMITER $$

CREATE PROCEDURE sp_user_ip_ins
				(
					IN	p_user_id				INTEGER,
					IN	p_ip					VARCHAR(46),
					IN	p_city					VARCHAR(100),
					IN	p_country				VARCHAR(50)
				)
BEGIN

	DECLARE v_user_id INTEGER;
    DECLARE v_affected_rows INTEGER;
    DECLARE v_changed_rows INTEGER;

	SELECT user_id INTO v_user_id FROM user_ip_location WHERE user_id = p_user_id AND ip = p_ip;

    IF ( v_user_id IS NULL) THEN
		INSERT INTO user_ip_location ( user_id, ip, city, country, cnt ) 
		VALUES (p_user_id, p_ip, p_city, p_country, 1 );
        SET v_user_id = LAST_INSERT_ID(), v_affected_rows = row_count(), v_changed_rows = 0;
	ELSE
		UPDATE	user_ip_location 
		SET		cnt     = cnt + 1
		WHERE	user_id = v_user_id
		AND		ip      = p_ip;
        SET v_affected_rows = 0, v_changed_rows = row_count();
    END IF;

 	SELECT v_user_id as inserted_id, v_affected_rows as affectedRows, v_changed_rows as changedRows;

END $$
DELIMITER ;

