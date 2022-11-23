import pool from '.';

export default async function populate() {
    const now = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'long' }).format(Date.now())
    const setup = `SET ROLE postgres`

    const populateUsers = `
        INSERT INTO recipin.appusers
            (firstname, lastname, handle, email, password, active, datecreated, datemodified)
        VALUES
            ('Mikayla', 'Dobson', 'innocuoussymmetry', 'mikaylaherself@gmail.com', 'password1', true, $1, $1),
            ('Emily', 'Dobson', 'emjdobson', 'emily@email.com', 'password2', true, $1, $1),
            ('Montanna', 'Dobson', 'delayedlemon', 'montanna@email.com', 'password3', true, $1, $1),
            ('Christine', 'Riley', 'christine', 'christine@email.com', 'password4', true, $1, $1),
            ('Someone', 'Not active', 'someone', 'someone@email.com', 'notactive', false, $1, $1)
        ;
    `

    const populateRecipes = `
        INSERT INTO recipin.recipe
            (name, description, preptime, authoruserid, datecreated, datemodified)
        VALUES
            ('Pad Thai', 'noodles', '1 hour', 1, $1, $1),
            ('Tacos', null, '30 minutes', 1, $1, $1),
            ('Garlic knots', null, '1 hour', 4, $1, $1),
            ('Cacio e pepe', 'stinky pasta', '1 hour', 3, $1, $1)
        ;
    `

    const populateCollection = `
        INSERT INTO recipin.collection
            (name, active, ismaincollection, ownerid, datecreated, datemodified)
        VALUES
            ('Mikayla''s collection', true, true, 1, $1, $1),
            ('Emily''s collection', true, true, 2, $1, $1)
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
            (datecreated, active, firstuserid, seconduserid)
        VALUES
            ($1, true, 1, 2),
            ($1, true, 1, 4),
            ($1, true, 2, 3),
            ($1, true, 1, 3)
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

    const allStatements: Array<string> = [
        populateUsers, populateRecipes, populateCollection,
        populateIngredients, populateGroceryList, populateFriendships,
        populateComments
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