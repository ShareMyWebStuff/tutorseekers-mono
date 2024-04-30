/*
Table       : geo_distances

Description : This table contains the distances between locations

**/
CREATE TABLE IF NOT EXISTS geo_distances
(
    from_location_id        INTEGER UNSIGNED    NOT NULL,
    to_country_id           SMALLINT UNSIGNED   NOT NULL,
    to_location_id          INTEGER UNSIGNED    NOT NULL,
    distance                DECIMAL(4,2)        NULL,
    UNIQUE(from_location_id, to_country_id, to_location_id)
) ENGINE=InnoDB;
