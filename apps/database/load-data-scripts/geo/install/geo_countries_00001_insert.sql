/*
Table       : geo_countries

Description : This script loads all the countries into the geo_countries table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/geo/geo_countries.csv'
REPLACE INTO TABLE geo_countries
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';
