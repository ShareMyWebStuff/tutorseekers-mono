CREATE PROCEDURE DeleteIndex
(
    tablename    VARCHAR(64),
    indexname    VARCHAR(64),
)
BEGIN

    IF EXISTS ( SELECT * INTO IndexExists
        FROM    INFORMATION_SCHEMA.STATISTICS
        WHERE   table_schema = database()
        AND     table_name   = tablename
        AND     index_name   = indexname;
    ) THEN
        ALTER TABLE  tablename DROP index indexname;
    END IF;
END
