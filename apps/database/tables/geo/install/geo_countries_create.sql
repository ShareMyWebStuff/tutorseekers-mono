/*
Table       : geo_countries

Description : This table contains the countries

**/
CREATE TABLE IF NOT EXISTS geo_countries (

    country_id              SMALLINT UNSIGNED    NOT NULL UNIQUE,
    country_code		    CHAR(2),
    country                 VARCHAR(50),
    lc_country              VARCHAR(50),

    PRIMARY KEY (country_id)
) ENGINE=InnoDB;
