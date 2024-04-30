/*
SELECT sf_geo_location_nearest_location_id_get( 'Streatham Hight Road', 'Streatham Hill', 'SW16 1HE' ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( 'Knaphill',             'Woking',         'GU21 2NT' ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( 'Knaphill',             'Woking',         'GU21'     ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( 'Knaphill',             'Woking',         'GU21 111'     ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( 'Knaphill',             'Woking',         ''         ) as location_id;


SELECT * FROM geo_locations where location_id = 7351;
SELECT * FROM geo_locations where location_id = 7564;
SELECT * FROM geo_locations where location_id = 18350;
SELECT * FROM geo_locations where location_id = 18314;
SELECT * FROM geo_locations where location_id = 18512;
*/

/*
	Name:			sf_geo_location_nearest_location_id_get

	Description:	Each user that registers we need to determine a location for them that we store in our database. This location can then be used in order to 
					find tutors / students that are local to them. We want to find a location as specific to the user as possible, hence we check postcode first,
					then partial postcode, then city and finally the address2. 

*/

/*
SELECT sf_geo_location_nearest_location_id_get( '',                     'Woking',         'Surrey',			'GU21 111'     ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( '',                     'Woking',         'Surrey',			'GU21 4DS'     ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( '',                     'Woking',         'Surrey',			'GU21 4'       ) as location_id;
SELECT sf_geo_location_nearest_location_id_get( '',                     'Woking',         'Surrey',			''             ) as location_id;

SELECT sf_geo_location_nearest_location_id_get( '',                     'Worthing',       'Surrey',			''             ) as location_id;
*/

CREATE FUNCTION sf_geo_location_nearest_location_id_get( p_address2 VARCHAR (80), p_town VARCHAR (80), p_region VARCHAR(100), p_postcode VARCHAR (11), p_country_id INTEGER ) RETURNS INTEGER UNSIGNED
BEGIN  
	DECLARE v_location_id INTEGER;
	DECLARE v_region_id   MEDIUMINT UNSIGNED;
  	DECLARE v_search      VARCHAR (210);
    DECLARE v_rc          INTEGER UNSIGNED;

	SET v_location_id = -1;

	-- 
	-- Check the postcode exists
	--
	IF p_postcode != '' THEN

		-- Only one postcode can be selected due to unique key on postcode
		SELECT	location_id
		INTO	v_location_id
		FROM	geo_postcodes
		WHERE	country_id 	= p_country_id 
		AND 	lc_postcode = replace(lower(p_postcode), ' ', '')
		LIMIT   1;

	END IF;

	--
	-- Check the city exists
	--
	IF v_location_id = -1 AND trim(p_town) != '' THEN

		-- Check the number of cities returned. Worthing / Attleborough have two.
		SELECT	COUNT(*)
		INTO	v_rc
		FROM	geo_locations
		WHERE	country_id 	= p_country_id 
		AND		lc_location = lower(trim(p_town));

		IF v_rc > 1 AND trim(p_region) != '' THEN

			SELECT	region_id
			INTO	v_region_id
			FROM	geo_regions
			WHERE	country_id	= p_country_id 
			AND 	lc_region	= lower(trim(p_region));

			IF (ROW_COUNT() = 1) THEN

				SELECT	COUNT(*)
				INTO	v_rc
				FROM	geo_locations
				WHERE	country_id 	= p_country_id
				AND 	region_id	= v_region_id
				AND		lc_location = lower(trim(p_town));

				IF v_rc = 1 THEN

					SELECT	location_id
					INTO	v_location_id
					FROM	geo_locations
					WHERE	country_id 	= p_country_id
					AND 	region_id	= v_region_id
					AND		lc_location = lower(trim(p_town));

				END IF;

			END IF;

		ELSEIF v_rc = 1 THEN

			SELECT	location_id
			INTO	v_location_id
			FROM	geo_locations
			WHERE	country_id = p_country_id 
			AND		lc_location = lower(trim(p_town));

		END IF;

	END IF;

	IF v_location_id = -1 AND p_address2 != '' THEN

		SELECT	COUNT(*)
		INTO	v_rc
		FROM	geo_locations
		WHERE	country_id 	= p_country_id 
		AND 	lc_location = lower(trim(p_address2));

		IF v_rc = 1 THEN

			SELECT	location_id
			INTO	v_location_id
			FROM	geo_locations
			WHERE	country_id 	= p_country_id 
			AND 	lc_location = lower(trim(p_address2));

		END IF;

	END IF;

	IF ( v_location_id = -1 ) THEN
		RETURN null;
	END IF;

	RETURN v_location_id;
END
