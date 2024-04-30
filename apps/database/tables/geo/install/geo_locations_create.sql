/*
Table       : geo_locations

Description : This table contains the location data for each town, city, village in the UK

**/
CREATE TABLE IF NOT EXISTS geo_locations
(
    country_id              SMALLINT UNSIGNED   NOT NULL,
    location_id             INTEGER UNSIGNED    NOT NULL,
    location                VARCHAR(200)        NOT NULL,
    lc_location             VARCHAR(200)        NOT NULL,
    region_id               INTEGER UNSIGNED    NULL
) ENGINE=InnoDB;
