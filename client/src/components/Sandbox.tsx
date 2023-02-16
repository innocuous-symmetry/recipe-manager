import Select, { MultiValue } from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { ICollection, IIngredient } from "../schemas";
import { Button, Page } from "./ui";
import API from "../util/API";
import { OptionType } from "../util/types";

export default function Sandbox() {
    const [ingredients, setIngredients] = useState<Array<IIngredient>>([]);
    const [collections, setCollections] = useState<Array<OptionType>>([]);
    const [newEntries, setNewEntries] = useState<Array<OptionType>>([]);
    const [selections, setSelections] = useState<Array<OptionType>>([]);
    const { user, token } = useAuthContext();

    function handleNewIngredient(name: string) {
        if (!user || !user.id) return;

        let maxID = 0;
        ingredients.forEach((entry: IIngredient) => {
            if (entry.id! > maxID) {
                maxID = entry.id!;
            }
        });

        const newEntry: OptionType = {
            label: name,
            value: maxID + 1
        }

        const newIngredient: IIngredient = {
            id: maxID + 1,
            name: name,
            createdbyid: user.id
        }

        setIngredients(prev => [...prev, newIngredient]);
        setNewEntries(prev => [...prev, newEntry]);
    }

    function handleChange(event: MultiValue<OptionType>) {
        setSelections(prev => [...prev, ...event])
    }

    async function bulkInsertIngredients() {
        if (!user || !token) return;

        console.log(newEntries.length - ingredients.length);
    }

    useEffect(() => {
        token && (async() => {
            const ingredients = new API.Ingredient(token);
            const collections = new API.Collection(token);

            const allIngredients = await ingredients.getAll();
            if (allIngredients) {
                setNewEntries(prev => [...prev, ...allIngredients]);
                setIngredients(allIngredients.map((each: IIngredient) => {
                    return { label: each.name, value: each.id }
                }));
            }

            const myCollections = await collections.getAllAuthored();
            if (myCollections) setCollections(myCollections.map((each: ICollection) => {
                return { label: each.name, value: each.id }
            }))
        })();
    }, [token])

    useEffect(() => {
        console.log(newEntries);
    }, [newEntries])

    return (
        <Page>
            <h1>Sandbox</h1>

            <p>Ingredients:</p>

            { ingredients 
                ? <Creatable isMulti value={selections} onChange={(value: MultiValue<OptionType>) => handleChange(value)} onCreateOption={handleNewIngredient} options={newEntries} /> 
                : <p>Loading...</p> 
            }

            <p>My collections:</p>
            { collections ? <Select options={collections} /> : <p>Loading...</p> }

            <Button onClick={bulkInsertIngredients}>Go</Button>
        </Page>
    )
}