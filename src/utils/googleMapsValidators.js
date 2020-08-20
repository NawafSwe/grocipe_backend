/* eslint-disable indent */
const { body, param } = require('express-validator/check');

const validate = (method) => {
	switch (method) {
		case 'ingredients': {
			return [
				// eslint-disable-next-line quotes
				body(
					'location.length',
					'Invalid location please enter in this format ["12.1234","12.3124"]'
				)
					.exists()
					.equals('2'),
				body('location.*', 'invalid elements of the location [double , double ]')
					.toFloat()
					.isFloat(),
				body('radius', 'Enter a valid radius [Number]').exists().isInt(),
				body('type', 'type is not specified').exists(),
				body('keyword', 'enter a valid string').optional().isString(),
				body('language', 'enter a valid language ( en or ar )').optional().isIn(['en', 'ar']),
				body('minprice').custom((value, { req }) => {
					if (value < 0 || value > 4) {
						throw new Error('the minprice should be between 1 and 4');
					}
					return true;
				}),
				body('maxprice').custom((value, { req }) => {
					if (value < 0 || value > 4) {
						throw new Error('the minprice should be between 1 and 4');
					}
					return true;
				}),
				body('minprice').custom((value, { req }) => {
					if (req.body.maxprice) {
						if (value > req.body.maxprice) {
							throw new Error('the minprice should be less than the max price');
						}
						return true;
					}
					return true;
				}),
				body('opennow').optional().isBoolean(),
			];
		}
		case 'searchPlace': {
			return [
				// eslint-disable-next-line quotes
				body('input', 'Invalid input please a valid input').exists(),
				body(
					'inputtype',
					'Enter a valid inputtype. This can be one of either textquery or phonenumber'
				)
					.exists()
					.isIn(['textquery', 'phonenumber']),
			];
		}
		case 'nextPage': {
			return [param('id', 'Enter a valid ID').exists()];
		}
		case 'placeDetails': {
			return [
				body('place_id', 'Enter a valid place ID').exists(),
				body('language', 'Enter a valid language ar or en').optional().isIn(['ar', 'en']),
				body('region', 'enter a valid region : the only supported region is SA')
					.optional()
					.isIn(['SA']),
				body('sessiontoken').optional(),
				body('fields')
					.optional()
					.isIn([
						'address_component',
						'adr_address',
						'business_status',
						'formatted_address',
						'geometry',
						'icon',
						'name',
						'permanently_closed',
						'photo',
						'place_id',
						'plus_code',
						'type',
						'url',
						'utc_offset',
						'vicinity',
						'formatted_phone_number',
						'international_phone_number',
						'opening_hours',
						'website',
						'price_level',
						'rating',
						'review',
						'user_ratings_total',
					]),
			];
		}
		case 'placePhoto': {
			return [
				body('photoreference', 'Enter a photo reference').exists(),
				body('maxheight').custom((value, { req }) => {
					if (!value) {
						if (!req.body.maxwidth) {
							throw new Error('Enter either maxheight or maxwidth');
						}
						return true;
					}
					return true;
				}),
			];
		}
		case 'placeAutocomplete': {
			return [
				body('input', 'Enter a query string i.e. input=restaurant').exists(),
				body(
					'location.length',
					'Invalid location please enter in this format ["12.1234","12.3124"]'
				)
					.exists()
					.equals('2'),
				body('location.*', 'invalid elements of the location [double , double ]')
					.toFloat()
					.isFloat(),
				body('radius', 'Enter a valid radius [Number]').exists().isInt(),
			];
		}
	}
};

module.exports = validate;
