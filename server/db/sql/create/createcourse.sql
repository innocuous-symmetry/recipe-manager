CREATE TABLE IF NOT EXISTS recipin.course (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name varchar NOT NULL,
    datecreated varchar NOT NULL,
    datemodified varchar NOT NULL,
    active boolean NOT NULL
);