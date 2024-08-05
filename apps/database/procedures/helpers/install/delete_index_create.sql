CREATE PROCEDURE DeleteIndex
(
    tablename    VARCHAR(64),
    indexname    VARCHAR(64),
)
BEGIN

    DECLARE IndexExists INTEGER;

    SELECT  COUNT(1) INTO IndexExists
    FROM    INFORMATION_SCHEMA.STATISTICS
    WHERE   table_schema = database()
    AND     table_name   = tablename
    AND     index_name   = indexname;

    IF IndexExists > 0 THEN
        SET @sqlstmt = CONCAT('DROP', uniqueFlag,  ' INDEX ',indexname,' ON ',
        database(),'.',tablename,' (',columns,')');
        PREPARE st FROM @sqlstmt;
        EXECUTE st;
        DEALLOCATE PREPARE st;
        SELECT CONCAT('Created index ',indexname,' on table ', tablename) CreateIndexRes;

    END IF;
        
END
