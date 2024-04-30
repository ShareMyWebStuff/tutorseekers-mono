/*
Procedure: CreateIndex

Description: Creates the procedure which is run to create indexes on the tables

*/
DELIMITER $$

DROP PROCEDURE IF EXISTS `CreateIndex` $$
CREATE PROCEDURE `CreateIndex`
(
    tablename    VARCHAR(64),
    indexname    VARCHAR(64),
    columns      VARCHAR(64),
    uniqueindex  BOOLEAN
)
BEGIN

    DECLARE IndexExists INTEGER;
    DECLARE uniqueFlag  VARCHAR(10);

    SELECT  COUNT(1) INTO IndexExists
    FROM    INFORMATION_SCHEMA.STATISTICS
    WHERE   table_schema = database()
    AND     table_name   = tablename
    AND     index_name   = indexname;

    SET uniqueFlag ='';
    IF ( uniqueIndex = true ) THEN
        SET uniqueFlag = ' UNIQUE';
    END IF;

    IF IndexExists = 0 THEN
        SET @sqlstmt = CONCAT('CREATE', uniqueFlag,  ' INDEX ',indexname,' ON ',
        database(),'.',tablename,' (',columns,')');
        PREPARE st FROM @sqlstmt;
        EXECUTE st;
        DEALLOCATE PREPARE st;
        SELECT CONCAT('Created index ',indexname,' on table ', tablename) CreateIndexRes;

    ELSE
        SELECT CONCAT('Index ',indexname,' already exists on Table ', database(),'.',tablename) CreateIndexRes;   
    END IF;

END $$

DELIMITER ;