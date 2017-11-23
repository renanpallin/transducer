const {
	doubleTheNumber,
	doubleTwice,
	evenOnly,
	isPlainObject,
} = require('./util');

const {
	map,
	filter,
	pushReducer,
	isEvenFilter,
	isNot2Filter,
	doubleMap,
} = require('./07-currying_map');

const { compose } = require('./08-compose_function');
const { transduce } = require('./10-generic_transducer');

/* yes, we can! */

const objectReducer = (obj, value) => ({ ...obj, ...value });

// into([], xf, [1,2,3,4])
/**
 * Call the transducer with the rigth inner reducer
 * pushReducer for array
 * objectReducer for objects
 * ...
 * @param  {any} to       [Initial seed]
 * @param  {Transform} xf  [Transformation function]
 * @param  {Iterable} collection [An iterable]
 * @return delegated to transduce
 */
const into = (to, xf, collection) => {
	if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
	else if (isPlainObject(to))
		return transduce(xf, objectReducer, to, collection);
	throw new Error('`into` only suppors array and objectsas `to`');
};

var rIntoArray = into([], compose(map(x => x / 2), map(x => x * 10)), [
	1,
	2,
	3,
	4,
]);
// console.log(rIntoArray);

var iIntoObject = into(
	{},
	compose(map(val => ({ [val]: val })), filter(x => typeof x === 'number')),
	[1, 2, 3, 4, 'hello', () => 'world']
);
// console.log(iIntoObject);

module.exports = {
	into,
	objectReducer,
};
