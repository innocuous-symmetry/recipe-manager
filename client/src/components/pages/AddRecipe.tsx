import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IRecipe } from "../../schemas";
import { Button, Divider, Form, Page, Panel } from "../ui"

const AddRecipe = () => {
    const authContext = useAuthContext();
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '', ingredients: [] })
    const [form, setForm] = useState<JSX.Element>();

    const getFormState = useCallback((data: IRecipe) => {
        setInput(data);
    }, [input])

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
        console.log(input);
    }, [input])
    
    return (
        <Page>
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel>
                <Form parent={input} _config={{
                    parent: "AddRecipe",
                    keys: ["name", "preptime", "course", "cuisine", "ingredients", "description"],
                    labels: ["Recipe Name:", "Prep Time:", "Course:", "Cuisine:", "Ingredients:", "Description:"],
                    dataTypes: ['text', 'text', 'custom picker', 'custom picker', 'custom picker', 'TINYMCE'],
                    initialState: input,
                    getState: getFormState,
                    richTextInitialValue: "<p>Enter recipe details here!</p>"
                }} />

                { form || <h2>Loading...</h2> }

                <Button onClick={handleCreate}>Create Recipe!</Button>
            </Panel>
        </Page>
    )
}

export default AddRecipe;