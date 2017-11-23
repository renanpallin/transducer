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

const { objectReducer } = require('./11-into_function');
/**
 * Transduce function that works with anthing that implements the
 * Iterable protocol, like Maps, Sets, Strings or your own object.
 *
 * @param  {Transform} xf         [Transformation function]
 * @param  {Reducer} reducer    [The inner reducer of composition]
 * @param  {any} seed       [Initial seed]
 * @param  {Iterable} collection [An iterable]
 * @return {Function}            [description]
 */
const transduce = (xf, reducer, seed, _collection) => {
	// collection.reduce(xf(reducer), seed);
	const transformedReducer = xf(reducer);
	let acc = seed;

	const collection = isPlainObject(_collection)
		? Object.values(_collection)
		: _collection;
	for (const val of collection) {
		acc = transformedReducer(acc, val);
	}
	return acc;
};

var rTransducerObj = transduce(map(doubleTheNumber), pushReducer, [], {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
});
// console.log('[transduce String]', rTransducerObj); // [ 2, 4, 6, 8 ]

module.exports = {
	transduce,
};
