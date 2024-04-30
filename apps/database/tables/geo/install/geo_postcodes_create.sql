/*
Table       : geo_postcodes

Description : This table contains the postcode data

**/
CREATE TABLE IF NOT EXISTS geo_postcodes
(
    postcode_id             INTEGER UNSIGNED    NOT NULL,
    country_id              SMALLINT UNSIGNED   NOT NULL,
    postcode                VARCHAR(20)         NOT NULL,
    lc_postcode             VARCHAR(20)         NOT NULL,
    placename               VARCHAR(200)        NOT NULL,
    location_id             INTEGER UNSIGNED    NULL
) ENGINE=InnoDB;
