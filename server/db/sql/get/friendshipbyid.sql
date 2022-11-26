SELECT
  recipin.cmp_userfriendships.id,
  recipin.cmp_userfriendships.datecreated,
  recipin.appusers.id,
  recipin.appusers.firstname,
  recipin.appusers.lastname,
  recipin.appusers.handle,
  recipin.appusers.email
FROM recipin.cmp_userfriendships
INNER JOIN recipin.appusers
ON recipin.appusers.id = recipin.cmp_userfriendships.firstuserid
WHERE recipin.cmp_userfriendships.id = $1
UNION
SELECT
  recipin.cmp_userfriendships.id,
  recipin.cmp_userfriendships.datecreated,
  recipin.appusers.id,
  recipin.appusers.firstname,
  recipin.appusers.lastname,
  recipin.appusers.handle,
  recipin.appusers.email
FROM recipin.cmp_userfriendships
INNER JOIN recipin.appusers
ON recipin.appusers.id = recipin.cmp_userfriendships.seconduserid
WHERE recipin.cmp_userfriendships.id = $1;