CREATE TABLE IF NOT EXISTS recipin.cmp_recipecollection (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    recipeid int REFERENCES recipin.recipe (id),
    collectionid int REFERENCES recipin.collection (id)
);