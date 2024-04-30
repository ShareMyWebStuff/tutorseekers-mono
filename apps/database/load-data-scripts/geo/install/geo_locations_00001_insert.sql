/*
Table       : geo_locations

Description : This script loads all the locations into the geo_locations table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/geo/geo_locations.csv'
REPLACE INTO TABLE geo_locations
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';
