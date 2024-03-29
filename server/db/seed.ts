import dotenv from 'dotenv';
import newPopulate from './newPopulate';
import populate from "./populate";
import pool from ".";
import fs from "fs";
import { appRoot } from "../appRoot";

dotenv.config();

(async function() {
    console.clear();

    const setRole = `
        SET ROLE postgres;
        DROP SCHEMA IF EXISTS recipin CASCADE;
        CREATE SCHEMA IF NOT EXISTS recipin;
    `

    const appusers =            fs.readFileSync(appRoot + '/db/sql/create/createappusers.sql').toString();
    const ingredient =          fs.readFileSync(appRoot + '/db/sql/create/createingredient.sql').toString();
    const collection =          fs.readFileSync(appRoot + '/db/sql/create/createcollection.sql').toString();
    const groceryList =         fs.readFileSync(appRoot + '/db/sql/create/creategrocerylist.sql').toString();
    const cuisine =             fs.readFileSync(appRoot + '/db/sql/create/createcuisine.sql').toString();
    const course =              fs.readFileSync(appRoot + '/db/sql/create/createcourse.sql').toString();
    const recipe =              fs.readFileSync(appRoot + '/db/sql/create/createrecipe.sql').toString();
    const recipecomments =      fs.readFileSync(appRoot + '/db/sql/create/createrecipecomments.sql').toString();
    const recipeingredient =    fs.readFileSync(appRoot + '/db/sql/create/createcmp_recipeingredient.sql').toString();
    const recipecollection =    fs.readFileSync(appRoot + '/db/sql/create/createcmp_recipecollection.sql').toString();
    const usersubscriptions =   fs.readFileSync(appRoot + '/db/sql/create/createcmp_usersubscriptions.sql').toString();
    const userfriendships =     fs.readFileSync(appRoot + '/db/sql/create/createcmp_userfriendships.sql').toString();
    const dropdownValues =      fs.readFileSync(appRoot + '/db/sql/create/createdropdown.sql').toString();

    const allStatements = [
        setRole, appusers, ingredient, collection, cuisine, course, 
        recipe, recipecomments, groceryList, recipeingredient, 
        recipecollection, usersubscriptions, userfriendships, dropdownValues
    ]

    try {
        for (let s of allStatements) {
            await pool.query(s);
        }
    } catch(e: any) {
        console.error(e);
        process.exit(0);
    }

    console.log("Database seed successful. Attempting to populate...");
    await populate();
    // await newPopulate();

    process.exit(1);
})();