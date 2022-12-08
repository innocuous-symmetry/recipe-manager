import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IRecipe } from "../../schemas";
import { Button, Divider, Form, Page, Panel } from "../ui"

const AddRecipe = () => {
    const authContext = useAuthContext();
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '', ingredients: [] })
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
        authContext.user && setInput((prev: IRecipe) => {
            return {
                ...prev,
                authoruserid: authContext.user!.id!
            }
        })
    }, [authContext])
    
    useEffect(() => {
        input.authoruserid && setForm(
            new Form<IRecipe>({
                parent: "AddRecipe",
                keys: ["name", "preptime", "ingredients", "description"],
                labels: ["Recipe Name:", "Prep Time:", "Ingredients:", "Description:"],
                dataTypes: ['text', 'text', 'custom picker', 'TINYMCE'],
                initialState: input,
                getState: getFormState,
                richTextInitialValue: "<p>Enter recipe details here!</p>"
            }).mount()
        )
    }, [input.authoruserid])

    useEffect(() => {
        console.log(input);
    }, [input])
    
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