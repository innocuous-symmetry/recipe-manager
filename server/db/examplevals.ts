import pool from '.';

export default async function populate() {
    const setup = `SET ROLE postgres`

    const populateUsers = `
        INSERT INTO recipin.appusers
            (firstname, lastname, handle, email, password, active)
        VALUES
            ('Mikayla', 'Dobson', 'innocuoussymmetry', 'mikaylaherself@gmail.com', 'password1', true),
            ('Emily', 'Dobson', 'emjdobson', 'emily@email.com', 'password2', true),
            ('Montanna', 'Dobson', 'delayedlemon', 'montanna@email.com', 'password3', true),
            ('Christine', 'Riley', 'christine', 'christine@email.com', 'password4', true),
            ('Someone', 'Not active', 'someone', 'someone@email.com', 'notactive', false)
        ;
    `

    const populateRecipes = `
        INSERT INTO recipin.recipe
            (name, description, preptime, authoruserid)
        VALUES
            ('Pad Thai', 'noodles', '1 hour', 1),
            ('Tacos', null, '30 minutes', 1),
            ('Garlic knots', null, '1 hour', 4),
            ('Cacio e pepe', 'stinky pasta', '1 hour', 3)
        ;
    `

    const populateCollection = `
        INSERT INTO recipin.collection
            (name, active, ismaincollection, ownerid)
        VALUES
            ('Mikayla''s collection', true, true, 1),
            ('Emily''s collection', true, true, 2)
        ;
    `

    const allStatements: Array<string> = [
        setup, populateUsers, populateRecipes, populateCollection
    ]

    for (let s of allStatements) {
        try {
            await pool.query(s);
        } catch(e: any) {
            console.log('Last executed: ' + s);
            throw new Error(e);
        }
    }

    console.log("Example values inserted successfully. DB seed complete.");
}