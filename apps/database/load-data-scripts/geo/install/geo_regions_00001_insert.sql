/*
Table       : geo_regions

Description : This script loads all the regions into the geo_regions table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/geo/geo_regions.csv'
REPLACE INTO TABLE geo_regions
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
