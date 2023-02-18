import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Page, Panel } from "../ui";
import { IRecipe, IUser, IIngredient } from "../../schemas";
import { getRecipeByID } from "../../util/apiUtils";
import Protect from "../../util/Protect";
import API from "../../util/API";
import { useAuthContext } from "../../context/AuthContext";
import ResourceNotFound from "./StatusPages/404";

export default function Recipe() {
    const { user, token } = useAuthContext();
    const { id } = useParams();

    const [recipe, setRecipe] = useState<IRecipe | "no recipe">();
    const [userData, setUserData] = useState<IUser>();
    const [ingredientData, setIngredientData] = useState<IIngredient[]>([]);
    const [view, setView] = useState<JSX.Element>(<h1>Loading...</h1>);

    useEffect(() => {
        if (token && id) {
            (async() => {
                const recipeAPI = new API.Recipe(token);
                const result = await recipeAPI.getByID(id);
                if (result) {
                    setRecipe(result);
                } else {
                    setRecipe("no recipe");
                }
            })()
        }
    }, [token])

    useEffect(() => {
        if (recipe) {
            if (recipe === "no recipe") {
                setView(<ResourceNotFound><h2>We couldn't find a recipe with the ID {id}.</h2></ResourceNotFound>);
            } else {
                if (!user || !token) return;

                (async() => {
                    const ingredientAPI = new API.Ingredient(token);
                    const result = await ingredientAPI.getAllForRecipe(id!);
                    if (result.length) setIngredientData(result);
                })

                const selfAuthored = (recipe.authoruserid == user.id!);
                if (selfAuthored) {
                    setUserData(user);
                } else {
                    (async() => {
                        const userAPI = new API.User(token);
                        const foundUser = await userAPI.getByID(recipe.authoruserid as string);
                        setUserData(foundUser);
                    })();
                }
            }
        }
    }, [recipe])

    useEffect(() => {
        if (!userData) return;

        if (recipe && recipe !== "no recipe") {
            setView(
                <Protect redirect={`/recipe/${id}`}>
                    <h1>{recipe.name}</h1>
                    <h2>Provided courtesy of {userData.firstname} {userData.lastname}</h2>
    
                    <Divider />
    
                    <p>Prep time: {recipe.preptime}</p>
    
                    <Divider />
    
                    <h2>Ingredients:</h2>
                    { ingredientData.length
                        ? ingredientData.map((each: IIngredient) => <p>{each.name}</p>)
                        : "No ingredients for this recipe"
                    }

                    <Divider />

                    <div dangerouslySetInnerHTML={{ __html: (recipe.description || "")}}></div>
    
                </Protect>
            );
        }
    }, [userData, ingredientData]);

    return view
}