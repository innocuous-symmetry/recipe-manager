import pool from '.';

export default async function populate() {
    const now = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long' }).format(Date.now())
    const setup = `SET ROLE postgres`

    const populateUsers = `
        INSERT INTO recipin.appusers
            (firstname, lastname, handle, email, password, active, isadmin, datecreated, datemodified)
        VALUES
            ('Mikayla', 'Dobson', 'innocuoussymmetry', 'mikaylaherself@gmail.com', '$2a$10$T9..JhNxfha86mQZNrwFo.CW7sR.d7w.9.T1M32aXL6r3vE2B.GhS', true, true, $1, $1),
            ('Emily', 'Dobson', 'emjdobson', 'emily@email.com', 'password2', true, false, $1, $1),
            ('Montanna', 'Dobson', 'delayedlemon', 'montanna@email.com', 'password3', true, false, $1, $1),
            ('Christine', 'Riley', 'christine', 'christine@email.com', 'password4', true, false, $1, $1),
            ('Someone', 'Not active', 'someone', 'someone@email.com', 'notactive', false, false, $1, $1),
            ('Verified', 'User', 'verifiedtestuser', 'verifieduser@test.com','$2a$10$7j1tE9mL3qAIMG8vwLsb2u1Mm3DC/7EdJI/X7KDBbQ9c34KmnLEMq', false, false, $1, $1)
        ;
    `

    const populateCuisines = `
        INSERT INTO recipin.cuisine (name, datecreated, datemodified, active) VALUES
            ('Thai', $1, $1, true),
            ('American', $1, $1, true),
            ('Tex Mex', $1, $1, true),
            ('Italian', $1, $1, true),
            ('Korean', $1, $1, true)
        ;
    `

    const populateCourses = `
        INSERT INTO recipin.course (name, datecreated, datemodified, active) VALUES
            ('Breakfast', $1, $1, true),
            ('Lunch', $1, $1, true),
            ('Dinner', $1, $1, true),
            ('Appetizers', $1, $1, true),
            ('Dessert', $1, $1, true)
        ;
    `

    const populateRecipes = `
        INSERT INTO recipin.recipe
            (name, description, preptime, authoruserid, cuisineid, courseid, datecreated, datemodified)
        VALUES
            ('Pad Thai', 'noodles', '1 hour', 1, 1, 3, $1, $1),
            ('Tacos', null, '30 minutes', 1, 3, 3, $1, $1),
            ('Garlic knots', null, '1 hour', 4, 4, 3, $1, $1),
            ('Cacio e pepe', 'stinky pasta', '1 hour', 3, 4, 3, $1, $1),
            ('Green beans', 'green beans', '30 minutes', 6, 1, 1, $1, $1)
        ;
    `

    const populateCollection = `
        INSERT INTO recipin.collection
            (name, active, ismaincollection, ownerid, datecreated, datemodified)
        VALUES
            ('Mikayla''s collection', true, true, 1, $1, $1),
            ('Emily''s collection', true, true, 2, $1, $1),
            ('Verified user collection', true, true, 6, $1, $1)
        ;
    `

    const populateIngredients = `
        INSERT INTO recipin.ingredient
            (name, description, datecreated, createdbyid)
        VALUES
            ('cucumber', 'vegetal', $1, 1),
            ('tofu', 'soy protein', $1, 1),
            ('cilantro', 'aromatic culinary herb', $1, 1),
            ('coffee', 'lifeblood', $1, 1)
        ;
    `

    const populateGroceryList = `
        INSERT INTO recipin.grocerylist
            (name, active, datecreated, datemodified, ownerid)
        VALUES
            ('Mikayla List 1', true, $1, $1, 1),
            ('Mikayla List 2', true, $1, $1, 1),
            ('Mom List 1', true, $1, $1, 2)
        ;
    `

    const populateFriendships = `
        INSERT INTO recipin.cmp_userfriendships
            (datecreated, active, pending, senderid, targetid)
        VALUES
            ($1, true, false, 1, 2),
            ($1, true, false, 1, 4),
            ($1, true, false, 2, 3),
            ($1, true, false, 1, 3)
        ;
    `

    const populateComments = `
        INSERT INTO recipin.recipecomments
            (commentbody, datecreated, recipeid, authorid)
        VALUES
            ('Very cool recipe!', $1, 2, 2),
            ('I love making this one', $1, 1, 2),
            ('Thanks for sharing this', $1, 1, 4)
        ;
    `

    const populateMeasurements = `
        INSERT INTO recipin.dropdownVals
            (name, datatype, datecreated)
        VALUES
            ('cup', 'MEASUREMENTS', $1),
            ('tablespoon', 'MEASUREMENTS', $1),
            ('teaspoon', 'MEASUREMENTS', $1),
            ('gram', 'MEASUREMENTS', $1),
            ('ounce', 'MEASUREMENTS', $1),
            ('fluid ounce', 'MEASUREMENTS', $1),
            ('pound', 'MEASUREMENTS', $1),
            ('breakfast', 'COURSE', $1),
            ('lunch', 'COURSE', $1),
            ('dinner', 'COURSE', $1),
            ('dessert', 'COURSE', $1),
            ('appetizer', 'COURSE', $1),
            ('side', 'COURSE', $1)
        ;   
    `

    const allStatements: Array<string> = [
        populateUsers, populateCuisines, populateCourses,
        populateCollection, populateIngredients, populateRecipes,
        populateGroceryList, populateFriendships, populateComments,
        populateMeasurements
    ];

    await pool.query(setup);

    for (let s of allStatements) {
        try {
            await pool.query(s, [now]);
        } catch(e: any) {
            console.error(e);
            console.log('Last executed: ' + s);
            process.exit(0);
        }
    }

    console.log("Example values inserted successfully. DB seed complete.");
}