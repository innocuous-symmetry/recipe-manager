import pool from ".";
import { IIngredient, IRecipe, IUser } from "../schemas";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";
import { Collection } from "../models/collection";
import { Ingredient } from "../models/ingredient";
import AuthService from "../auth";
import now from "../util/now";

const auth = new AuthService();
const user = new User();

const collection = new Collection();
const ingredient = new Ingredient();

export default async function populate() {
    // register new users; initialize default collection
    const usr1: IUser = {
        firstname: "Mikayla",
        lastname: "Dobson",
        handle: "innocuoussymmetry",
        password: "coolpassword",
        email: "mikayla@mikayla.com",
        active: true,
        isadmin: true
    }

    const usr2: IUser = {
        firstname: "Emily",
        lastname: "Dobson",
        handle: "emjdobson",
        password: "coolpassword",
        email: "emily@emily.com",
        active: true,
        isadmin: false
    }

    const usr3: IUser = {
        firstname: "Montanna",
        lastname: "Dobson",
        handle: "delayedlemon",
        password: "coolpassword",
        email: "montanna@montanna.com",
        active: true,
        isadmin: false
    }

    const usr4: IUser = {
        firstname: 'someother',
        lastname: 'person',
        handle: 'someperson',
        password: 'coolpassword',
        email: 'someperson@email.com',
        active: false,
        isadmin: false
    }

    for (let usr of [usr1, usr2, usr3, usr4]) {
        await auth.register(usr);
    }

    /*

    // recipes onto new user profiles; insert into new default collections
    const rec1: IRecipe = {
        name: "Pad Thai",
        preptime: '1 hour',
        authoruserid: 1
    }

    const rec2: IRecipe = {
        name: "Bo ssam",
        preptime: '8 hours',
        authoruserid: 3
    }

    const rec3: IRecipe = {
        name: "Banana bread",
        preptime: '90 minutes',
        authoruserid: 2
    }

    const rec4: IRecipe = {
        name: "garlic confit",
        preptime: "2 hours",
        authoruserid: 3
    }

    for (let rec of [rec1, rec2, rec3, rec4]) {
        await recipe.post(rec.authoruserid as string, rec);
    }

    */

    // set up a couple of friendships
    // await user.addFriendship(1, 2);
    // await user.addFriendship(1, 3);
    // await user.addFriendship(2, 3);

    // await user.updateFriendship(1, 2, {
    //     active: true,
    //     pending: false
    // });

    // await user.updateFriendship(2, 3, {
    //     active: true,
    //     pending: false
    // })

    // // request and validate subscriptions
    // const usr1default = await collection.getUserDefault(1);
    // await collection.postSubscription(usr1default.id, 2);

    // const usr3default = await collection.getUserDefault(3);
    // await collection.postSubscription(usr3default.id, 1);

    // add some ingredients
    const ing1: IIngredient = {
        name: "cucumber",
        description: "vegetal",
        datecreated: now,
        createdbyid: 1
    }

    const ing2: IIngredient = {
        name: "tofu",
        description: "soy protein",
        datecreated: now,
        createdbyid: 1
    }

    const ing3: IIngredient = {
        name: 'garlic',
        description: "lifeblood",
        datecreated: now,
        createdbyid: 3
    }

    for (let ing of [ing1, ing2, ing3]) {
        await ingredient.post(ing);
    }
}