SELECT
  recipin.cmp_usersubscriptions.collectionid    as collectionid,
  recipin.collection.ownerid                    as ownerid,
  recipin.cmp_usersubscriptions.usermemberid    as memberid,
  recipin.collection.name                       as collectionname,
  recipin.appusers.firstname                    as owner_first,
  recipin.appusers.lastname                     as owner_last
FROM recipin.collection
INNER JOIN recipin.appusers
ON recipin.collection.ownerid = recipin.appusers.id
INNER JOIN recipin.cmp_usersubscriptions
ON recipin.collection.id = recipin.cmp_usersubscriptions.collectionid
WHERE recipin.cmp_usersubscriptions.usermemberid = $1;