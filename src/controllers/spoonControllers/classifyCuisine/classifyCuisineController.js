/* ----------------- importing packages ---------------- */
const  axios          = require('axios'),
       prepareRequest = require('./prepareRequest'),
       transformer    = require('./transformer');
       
/** @author Nawaf Alsharqi.
 * @async
 * @function
 * @name classifyCuisineRequest.
 * @param {Object} body that contains the data.
 * @return {Promise<Response>} http response contains data.
 * @throws {Error} throws an error if there is an error.
 * @description getting data from the api as http response.
 */
const classifyCuisineRequest = async (body) => {
    try {
       
       const request = prepareRequest(body);
       const response = await axios({
            method: 'POST',
            url: request.url,
            data: request.data,
               });
        const result =  response.data; 
        //const standardResult = transformer(result);
        return result;
    } catch (e) {
          console.log('error occurred in spoon classifyCuisine controller', e)
     }
   
};

module.exports = classifyCuisineRequest;