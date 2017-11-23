const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');
const {
	map,
	filter,
	pushReducer,
	isEvenFilter,
	isNot2Filter,
	doubleMap,
} = require('./07-currying_map');

const { compose } = require('./08-compose_function');

const cleanNumbersXf = compose(isNot2Filter, isEvenFilter, doubleMap)(
	pushReducer
);
var rWithOurComposeFunction = [1, 2, 3, 4].reduce(cleanNumbersXf, []); // [ 8 ]
console.log('Our compose function', rWithOurComposeFunction);

/*
Let's create a function to do everithing we're doing above:
 */
/**
 * Transduce function working only with objects that have a
 * reducer function (arrays)
 * @param  {Transform} xf         [Transformation function]
 * @param  {Reducer} reducer    [The inner reducer of composition]
 * @param  {any} seed       [Initial seed]
 * @param  {Array} collection [The collection to reduce]
 * @return {Function}            [description]
 */
const transduce = (xf, reducer, seed, collection) =>
	collection.reduce(xf(reducer), seed);

var rTransducer = transduce(
	compose(isNot2Filter, isEvenFilter, doubleMap),
	pushReducer,
	[],
	[1, 2, 3, 4]
);
console.log('With transduce function', rTransducer);

/*
We're in the right direction, but our collection needs to have the reducer method.
In the next file we going to make it more generic
 */