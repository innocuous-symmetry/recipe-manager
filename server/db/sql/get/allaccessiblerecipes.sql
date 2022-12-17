SELECT * FROM recipin.recipe
WHERE authoruserid = $1
OR authoruserid IN (
    SELECT targetid FROM recipin.cmp_userfriendships
    WHERE senderid = $1
    UNION
    SELECT senderid FROM recipin.cmp_userfriendships
    WHERE targetid =$ 1
);