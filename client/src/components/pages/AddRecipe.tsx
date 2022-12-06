import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IRecipe } from "../../schemas";
import { Button, Divider, Form, Page, Panel } from "../ui"

const AddRecipe = () => {
    const { user } = useAuthContext();
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: user?.id || '', ingredients: [] })
    const [form, setForm] = useState<JSX.Element[]>();

    const getFormState = useCallback((data: IRecipe) => {
        setInput(data);
    }, [])

    const handleCreate = () => {
        for (let field of Object.keys(input)) {
            if (!input[field as keyof IRecipe]) return;
        }

        console.log('good to go!')
    }
    
    useEffect(() => {
        if (user) {
            setInput((prev: IRecipe) => {
                return {
                    ...prev,
                    authoruserid: user.id!
                }
            })
        }
    }, [user])

    useEffect(() => {
        setForm(
            new Form<IRecipe>({
                parent: "AddRecipe",
                keys: ["name", "preptime", "ingredients", "description"],
                labels: ["Recipe Name:", "Prep Time:", "Ingredients:", "Description:"],
                dataTypes: ['text', 'text', 'custom picker', 'text'],
                initialState: input,
                getState: getFormState
            }).mount()
        )
    }, [])

    
    return (
        <Page>
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel>
                { form }
                <Button onClick={handleCreate}>Create Recipe!</Button>
            </Panel>
        </Page>
    )
}

export default AddRecipe;