/*
Table       : user_login

Description : This table contains the user login details

**/
CREATE TABLE IF NOT EXISTS user_login (
    user_id           INT	 UNSIGNED   NOT NULL AUTO_INCREMENT,                                -- Unique user identifier

    -- Account created with email / password
    email             VARCHAR(254)    NOT NULL,                                               -- Users email address (unique)
    password          CHAR(60)        CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,   -- Password hashed, null if google account

    -- Account created by google
    google_id         VARCHAR(25)     NULL,
    google_email      VARCHAR(254)    NOT NULL,                                               -- Users email address (unique)

    -- Account type
    tutor_acc         BOOLEAN         NOT NULL,                                               -- If the user is a tutor
    student_acc       BOOLEAN         NOT NULL,                                               -- If the user is a student
    parent_acc        BOOLEAN         NOT NULL,                                               -- If the user is a parent of the student
    admin_acc         BOOLEAN         DEFAULT false     NOT NULL,                             -- If the user can perform admin
  
    google_acc        BOOLEAN         NOT NULL,                                               -- Account created via google
    validated         BOOLEAN         DEFAULT false NOT NULL,                                 -- If the account has been validated by the user clicking on an email link
    validated_email   BOOLEAN         DEFAULT false NOT NULL,                                 -- If the users email address has been validated
    validated_mobile  BOOLEAN         DEFAULT false NOT NULL,                                 -- If the user enters a mobile, this is yes if the users mobile has been validated

    verified          BOOLEAN         DEFAULT false NOT NULL,                                 -- If the tutors account is verified - all the below are verified
    id_verified       BOOLEAN         DEFAULT false NOT NULL,                                 -- If the photo id is verified e.g. their passport or driving licence looks good
    photo_verified    BOOLEAN         DEFAULT false NOT NULL,                                 -- If a photo is verified e.g. their photo could be matched against their photo id when uploaded
    id_photo_verified BOOLEAN         DEFAULT false NOT NULL,                                 -- If the photo id is verified against an uploaded photo
    addr_verified     BOOLEAN         DEFAULT false NOT NULL,                                 -- If their addr if is verified e.g. their driving licence, utilitybill etc
    dbs_verified      BOOLEAN         DEFAULT false NOT NULL,                                 -- If the enhanced dbs check is valid
    refs_verified     BOOLEAN         DEFAULT false NOT NULL,                                 -- If the tutors references are good.

    create_date       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,                              -- DateTime the user registered
    PRIMARY KEY	(user_id)
) ENGINE=InnoDB;
