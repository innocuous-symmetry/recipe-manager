CREATE TABLE IF NOT EXISTS recipin.recipe (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name varchar NOT NULL,
    preptime varchar NOT NULL,
    datecreated varchar NOT NULL,
    datemodified varchar NOT NULL,
    description varchar,
    authoruserid int REFERENCES recipin.appusers (id),
    cuisineid int REFERENCES recipin.cuisine (id),
    courseid int REFERENCES recipin.course (id)
);