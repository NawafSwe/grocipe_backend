# grocipe_backend

# project instructions:

* this project can run locally.
* to run this project locally you need to make sure you have `npm, nodejs,mongodb` preinstalled in your machine.
* make sure to create your own .env files and fill the required variables such HOST,PORT,Database URI, API key for spoon
* to benign with the project please run the following commands:
    * ``npm run setup`` it will update npm and install the required packages.
    * `npm run dev` to run the server in development mode in your own machine.
    * `npm run start:prod`  to run the server in production mode.

* to do request with the spoon api you need an api key, please visit <a href="https://spoonacular.com/food-api">this<a/>
  and acquire an api key and put it in the ``.env`` files.

# Endpoints used in the iOS application:

I have created simple <a href="https://github.com/NawafSwe/Recipe-Founder">iOS app</a> demonstrate the backend functionalities, I mainly used the following endpoints

* ``/searchByIngredients`` which is search for recipes by ingredients, it is validated using express validator. To call
  this endpoint you need the following body:
  * ```js
      {"ingredients":["rice", "apple"], "number": "100"}```
  *   ```js 
      {"ingredients":["rice", "apple"], "number": "100" , "limitLicense": "true", "ranking":1, "ignorePantry":true} ``` 
  * Note that keys ``limitLicense, ranking, ignorePantry `` are optionals      
  
* ``/searchIngredientsById/:id`` which will search for recipe by its id and get its details such as image,name,preparation plan and time
    this end point only takes query, ``/searchIngredientsById/123`` in that case the id is 123
  

# Code documentation: 
  The code well  written and documented using jsDocs, and following MVC architecture. 
