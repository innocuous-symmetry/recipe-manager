const API = import.meta.env.APISTRING || "http://localhost:8080/";

// on recipe route
export const getRecipeByID = async (id: string | number) => {
    const result = await fetch(API + 'recipe/' + id).then(response => response.json());
    return result;
}

export const getAllRecipes = async () => {
    const result = await fetch(API + 'recipe').then(response => response.json());
    return result;
}