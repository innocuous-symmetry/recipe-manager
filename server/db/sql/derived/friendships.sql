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
WHERE firstuserid = $1 OR seconduserid = $1
AND cmp_userfriendships.active = true;