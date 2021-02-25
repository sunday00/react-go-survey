DROP FUNCTION IF EXISTS is_contains;

DELIMITER $$
CREATE FUNCTION is_contains(val JSON, mainId INT)
  RETURNS BOOL
  LANGUAGE SQL
  DETERMINISTIC

BEGIN
  DECLARE result BOOL;
  DECLARE arr JSON;
  DECLARE i INT;

  SET result=false;
  SET arr=(SELECT interested FROM survey WHERE id=mainId);
  SET i=0;

  loop1: WHILE ( i < JSON_LENGTH(val) ) DO

        IF JSON_CONTAINS(arr, JSON_EXTRACT(val, CONCAT('$[',i,']')), '$')
            THEN SET result=true;
        END IF;

      SET i=i+1;
  END WHILE;

  RETURN result;

END
$$
DELIMITER ;