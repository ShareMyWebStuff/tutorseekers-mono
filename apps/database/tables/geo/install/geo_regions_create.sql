/*
Table       : geo_regions

Description : This table contains the regions in the UK

**/
CREATE TABLE IF NOT EXISTS geo_regions
(
    country_id              SMALLINT UNSIGNED   NOT NULL,
    region_id               INTEGER UNSIGNED    NOT NULL,
    region                  VARCHAR(200)        NOT NULL,
    lc_region               VARCHAR(200)        NOT NULL
) ENGINE=InnoDB;
