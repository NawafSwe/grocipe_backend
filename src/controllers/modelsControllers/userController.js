/* ----------------- importing files and models ---------------- */
const User = require('../../models/user');
const helper = require('../../helpers/userHelpers');
const Recipe = require('../../models/recipe');

/* ----------------- FUNCTIONS ---------------- */

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name getUsers
 * @return {list} it returns list of Users objects from the database if there is no error.
 * @return {Error} it returns an error message if there is an error.
 * @description gets all the users from the database, it has no params.
 *
 */
const getUsers = async () => {
	try {
		const response = await User.find({}).populate('recipes');
		return response;
	} catch (e) {
		console.log('error ocurred in userController at getUsers() ', e.message);
		return { message: ` something went wrong cannot get users error is ${e.message}` };
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name postUser
 * @param {Object}   user it is an Object of type user.
 * @return {Object} it returns the user that was added if there is no error.
 * @return {Error} it returns an error if there is an error.
 * @description add a user to the database.
 *
 */

const postUser = async (user) => {
	try {
		/*the process is to register the user using passport by passing user email and user name to be unique 
		passport will do the check for the database if the username or the email is taken or not.
		*/
		const registerUser = new User({ email: user.email, username: user.username });
		const response = await User.register(registerUser, user.password);

		if (user.age) {
			response.age = user.age;
			await response.save();
		}

		if (user.gender) {
			response.gender = user.gender;
			await response.save();
		}
		const formattedUser = await helper.formatUserObject(response);
		return formattedUser;
	} catch (e) {
		console.log('error ocurred in userController at postUser() ', e.message);
		return {
			message: `cannot post ${user.username} or ${user.email} it is already exists please pick another`
		};
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name putUser
 * @param {String} id it is the id of the user to be updated
 * @param {Object} user the object is of type User to take the information.
 * @return {Object} it returns the user that was updated if there is no error.
 * @return {Error} it returns an error if there is an error.
 * @description update a user information from the database.
 *
 */
const putUser = async (id, user) => {
	try {
		/* 
		using mongoose to re set a password we use a special method 'setPassword' 
		so we need to check carefully the keys to capture if there is password change in the body  */

		for (let [key, value] of Object.entries(user)) {
			if (key === 'password') {
				const fetchUser = await User.findById(id);
				await fetchUser.setPassword(value);
				await fetchUser.save();
			} else if (key === 'username') {
				await User.findByIdAndUpdate(id, { username: value });
			} else if (key === 'email') {
				await User.findByIdAndUpdate(id, { email: value });
			} else if (key === 'age') {
				await User.findByIdAndUpdate(id, { age: value });
			} else if (key === 'gender') {
				await User.findByIdAndUpdate(id, { gender: value });
			} else if (key === 'recipes') {
				const recipe = await value;
				console.log('recipe is ', recipe);
				await helper.postUserRecipe(id, recipe);
			}
		}
		const response = await User.findById(id).populate('recipes');
		const result = await helper.formatUserObject(response);
		return result;
	} catch (e) {
		console.log('error ocurred in userController at putUser() ', e.message);
		return { message: ` something went wrong cannot update the user with the id ${id}` };
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name getUserById
 * @param {String} id it is the id of the user to be updated
 * @return {Object} it returns the user that was updated if there is no error.
 * @return {Error} it returns an error if there is an error.
 * @description get a user information from the database.
 *
 */

const getUserById = async (id) => {
	try {
		const response = await User.findById(id).populate('recipes');

		return response;
	} catch (e) {
		console.log('error ocurred in userController at getUserById() ', e.message);
		return { message: ` something went wrong cannot get the user with the id ${id}` };
	}
};

/** @author Nawaf Alsharqi
 * @export
 * @async
 * @name deleteUser
 * @param {String} id it is the id of the user to be deleted
 * @return {Object} it returns the user that was deleted if there is no error.
 * @return {Error} it returns an error if there is an error.
 * @description  delete a user information from the database.
 *
 */
const deleteUser = async (id) => {
	try {
		const response = await User.findByIdAndDelete(id).populate('recipes');
		if (response.recipes) {
			for (let recipe of response.recipes) {
				await Recipe.findByIdAndDelete(recipe.id);
			}
		}
		return response;
	} catch (e) {
		console.log('error ocurred in userController at deleteUser() ', e.message);
		return { message: ` something went wrong cannot delete the user with the id ${id}` };
	}
};
/** @author Nawaf Alsharqi
 * @export
 * @async
 * @function
 * @name deleteUserRecipe.
 * @param {string} userId.
 * @param {string} recId.
 * @return {Recipes} returns user info with a recipes updated.
 * @description delete user reciep from database.
 */
const deleteUserRecipe = async (userId, recId) => {
	try {
		const response = await User.findById(userId).populate('recipes');

		for (let i = 0; i < response.recipes.length; i++) {
			if (response.recipes[i].id == recId) {
				await Recipe.findByIdAndRemove(recId);
				await response.recipes.splice(i, 1);
				await response.save();
			}
		}
		return response;
	} catch (e) {
		console.log(`error happened while deleting the user recipe ${e}`);
	}
};
/**
 * @type {{putUser: (function(String, Object): Error),
 * getUserById: (function(String): Error), postUser: (function(Object): Error),
 * deleteUserRecipe: (function(string, string): Recipes), getUsers: (function(): Error),
 * deleteUser: (function(String): Error)}}
 */
module.exports = { getUsers, postUser, putUser, deleteUser, getUserById, deleteUserRecipe };
