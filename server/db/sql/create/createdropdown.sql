CREATE TABLE IF NOT EXISTS recipin.dropdownVals (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    datatype VARCHAR CHECK(datatype in ('MEASUREMENTS', 'COURSE', 'INGREDIENT')),
    datecreated VARCHAR NOT NULL
);