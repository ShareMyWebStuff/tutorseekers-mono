/*
Drop index on user_verifications (outstanding).

**/

CALL DeleteIndex( 'user_verifications', 'user_verifications__outstanding' );
