import { useCallback, useRef, useEffect, useState, createRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Button, Card, Divider, Form, Page, Panel } from "../ui"
import { IRecipe } from "../../schemas";
import API from "../../util/API";

const AddRecipe = () => {
    const { user, token } = useAuthContext();
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '', ingredients: [] })
    const [toast, setToast] = useState(<></>)

    const getFormState = useCallback((data: IRecipe) => {
        setInput(data);
    }, [input])

    const handleCreate = async () => {
        if (!token) return;

        for (let field of Object.keys(input)) {
            if (!input[field as keyof IRecipe]) {
                console.log(field);
                return;
            }
        }

        console.log('good to go!')

        const recipe = new API.Recipe(token);
        const result = await recipe.post(input);

        const recipeID = result.recipe.id;
        const recipeName = result.recipe.name;
        
        setToast(
            <Card>
                <p>Created recipe {recipeName} successfully!</p>
                <p>View your new recipe <a href={`/recipe/${recipeID}`}>here!</a></p>
            </Card>
        )
    }

    useEffect(() => {
        if (!user) return;
        user && setInput((prev: IRecipe) => {
            return {
                ...prev,
                authoruserid: user.id!
            }
        })
    }, [user])

    useEffect(() => {
        console.log(input);
    }, [input])
    
    return (
        <Page>
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel extraStyles="width-80">
                <Form parent={input} _config={{
                    parent: "AddRecipe",
                    keys: ["name", "preptime", "course", "cuisine", "ingredients", "description"],
                    labels: ["Recipe Name:", "Prep Time:", "Course:", "Cuisine:", "Ingredients:", "Description:"],
                    dataTypes: ['text', 'text', 'custom picker', 'custom picker', 'custom picker', 'TINYMCE'],
                    initialState: input,
                    getState: getFormState,
                    richTextInitialValue: "<p>Enter recipe details here!</p>"
                }} />

                <Button onClick={handleCreate}>Create Recipe!</Button>

                <div id="toast">{ toast }</div>
            </Panel>
        </Page>
    )
}

export default AddRecipe;