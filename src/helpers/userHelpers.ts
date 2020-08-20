/* ----------------------------- File Explanation  -----------------------------
this file is holding helpers functions to form custom requests from the server API by getting benefit
from a response that returned by the server to get other useful responses  */
const recipeController = require('../controllers/modelsControllers/recipeController');
const User = require('../models/user');

/** 'formatUserObject' function thats formats the user object to return it back without the password for security
 *
 * @param {Object} user  object of user that holds the info of a user
 * @return {Object} returns new formatted user object
 */

const formatUserObject = async (user: any) => {
    const userFormatted = {
        id: String,
        username: String,
        email: String,
        age: Number,
        gender: String,
        recipes: [],

    };
    userFormatted.id = user.id;
    if (user.username) {
        userFormatted.username = user.username;
    }
    if (user.email) {
        userFormatted.email = user.email;
    }
    if (user.age) {
        userFormatted.age = user.age;
    }
    if (user.gender) {
        userFormatted.gender = user.gender;
    }
    if (user.recipes) {
        userFormatted.recipes = user.recipes;
    }
    return userFormatted;
}