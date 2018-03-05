DROP TABLE instructor;
DROP TABLE question;
DROP TABLE bank;

CREATE TABLE instructor(
uname VARCHAR(20) PRIMARY KEY,
passw VARCHAR(50)
);

CREATE TABLE bank(
bid NUMBER PRIMARY KEY,
difficulty NUMBER,
subject VARCHAR2(30)
);

CREATE TABLE question(
qid NUMBER PRIMARY KEY,
bid NUMBER,
text VARCHAR2(200),
option1 VARCHAR2(100),
option2 VARCHAR2(100),
option3 VARCHAR2(100),
option4 VARCHAR2(100),
correct NUMBER,
FOREIGN KEY (bid) REFERENCES bank(bid)
);

DROP SEQUENCE bank_seq;
DROP SEQUENCE question_seq;

CREATE SEQUENCE bank_seq START WITH 1;
CREATE SEQUENCE question_seq START WITH 1;

CREATE OR REPLACE TRIGGER new_bank
BEFORE INSERT ON bank
FOR EACH ROW
    BEGIN
    SELECT bank_seq.NEXTVAL
        INTO :new.bid
        FROM DUAL;
    END;
/

CREATE OR REPLACE TRIGGER new_question
BEFORE INSERT ON question
FOR EACH ROW
    BEGIN
    SELECT question_seq.NEXTVAL
        INTO :new.qid
        FROM DUAL;
    END;
/
SELECT * FROM question;
SELECT * FROM bank;
SELECT * FROM instructor;
INSERT INTO bank VALUES(0, 3, 'pls');
INSERT INTO question VALUES(0, 1, 'plswork', '1', '2', '3', '4', 1);
COMMIT;