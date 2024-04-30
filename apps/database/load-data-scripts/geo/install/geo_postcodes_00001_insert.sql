/*
Table       : geo_postcodes

Description : This script loads all the postcodes into the geo_postcodes table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/geo/geo_postcodes.csv'
REPLACE INTO TABLE geo_postcodes
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';
