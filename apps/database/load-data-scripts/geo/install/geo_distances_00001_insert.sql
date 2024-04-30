/*
Table       : geo_distances

Description : This script loads all the distances between locations into the geo_distances table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/geo/geo_distances.csv'
REPLACE INTO TABLE geo_distances
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';
