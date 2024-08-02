/*
Table       : user_ip_location

Description : This table contains the ip addresses the user has connected from

**/
-- DROP TABLE IF EXISTS user_ip_location;
CREATE TABLE IF NOT EXISTS user_ip_location (
  user_id           INT UNSIGNED        NOT NULL,
  ip                VARCHAR(46)         NOT NULL,
  city              VARCHAR(100)        NULL,
  country           VARCHAR(50)         NULL,
  cnt               MEDIUMINT UNSIGNED  NOT NULL,
  create_date       TIMESTAMP           NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, ip)
) ENGINE=InnoDB;


