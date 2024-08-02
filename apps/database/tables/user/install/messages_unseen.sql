/*
Table       : messages_unseen

Description : Messages are sent to either users or mailbox's. This records the number of new messages a user isnt aware of.

user_grp_id			Id of user or unique mailbox id
user_acc			TRUE  - User id is a user id
                    FALSE - User id is a mailbox
no_messages			The number of new mesages a user or mailbox has received
no_profile_visits	The number of new profile visits a user or mailbox has received
no_favourites		The number of new favourites a user or mailbox has received

reload_profile		This flag requests the users browser to reload their profile.
					This could be because a photo, about, profile title has been found to be in error. The reload will allow the errors to be shown.

DROP TABLE IF EXISTS messages_unseen;
**/

CREATE TABLE IF NOT EXISTS messages_unseen (
	user_grp_id				INT UNSIGNED        NOT NULL,
	user_acc				BOOLEAN		        NOT NULL,
	-- mailbox					BOOLEAN		        NOT NULL,
	no_messages				SMALLINT UNSIGNED	NOT NULL,
	no_profile_visits		SMALLINT UNSIGNED	NOT NULL,
	no_favourites			SMALLINT UNSIGNED	NOT NULL,

	reload_profile			BOOLEAN				NOT NULL	DEFAULT false,

	PRIMARY KEY	(user_grp_id, user_acc)
) ENGINE=InnoDB;


