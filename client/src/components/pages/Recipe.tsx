import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Page, Panel } from "../ui";
import { IRecipe, IUser, IIngredient, RecipeIngredient } from "../../schemas";
import { getRecipeByID } from "../../util/apiUtils";
import Protect from "../../util/Protect";
import API from "../../util/API";
import { useAuthContext } from "../../context/AuthContext";
import ResourceNotFound from "./StatusPages/404";
import { v4 } from "uuid";

export default function Recipe() {
    const { user, token } = useAuthContext();
    const { id } = useParams();

    const [recipe, setRecipe] = useState<IRecipe | "no recipe">();
    const [userData, setUserData] = useState<IUser>();
    const [ingredientData, setIngredientData] = useState<RecipeIngredient[]>([]);
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
        if (recipe && id) {
            if (recipe === "no recipe") {
                setView(<ResourceNotFound><h2>We couldn't find a recipe with the ID {id}.</h2></ResourceNotFound>);
            } else {
                if (!user || !token) return;

                // while ingredient data has not yet been mapped,
                // get ingredients and map them
                (!ingredientData.length) && (async() => {
                    const ingredientAPI = new API.Ingredient(token);
                    const result = await ingredientAPI.getAllForRecipe(id);
                    setIngredientData(result);
                })();

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
    }, [recipe, id])

    useEffect(() => {
        if (!userData) return;

        if (recipe && ingredientData && recipe !== "no recipe") {
            setView(
                <Protect redirect={`/recipe/${id}`}>
                    <h1>{recipe.name}</h1>
                    <h2>Provided courtesy of {userData.firstname} {userData.lastname}</h2>
    
                    <Divider />
    
                    <p>Prep time: {recipe.preptime}</p>
    
                    <Divider />
    
                    <h2>Ingredients:</h2>
                    { ingredientData.length
                        ? ingredientData.map((each: RecipeIngredient) => (
                            <div key={v4()}>
                                <p>{each.quantity} {each.quantity == 1 ? each.unit : (each.unit + "s")} {each.name}</p>
                            </div>
                        )) : <p>No ingredients for this recipe</p>
                    }

                    <Divider />

                    <div dangerouslySetInnerHTML={{ __html: (recipe.description || "")}}></div>
    
                </Protect>
            );
        }
    }, [userData, recipe, ingredientData, id]);

    useEffect(() => {
        if (!ingredientData.length || !token) return;
        for (let each of ingredientData) {
            (async() => {
                const ingredientAPI = new API.Ingredient(token);
                const result = await ingredientAPI.getByID(each.ingredientid!.toString());
                console.log(result);
            })();
        }
    }, [ingredientData, token])

    return view
}