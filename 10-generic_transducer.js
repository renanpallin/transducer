const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');
const {
	map,
	filter,
	pushReducer,
	isEvenFilter,
	isNot2Filter,
	doubleMap,
} = require('./07-currying_map');

const compose = (...functions) => {
	return functions.reduce((acc, fn) => {
		return (...args) => fn(acc(...args), x => x);
	});
};

/**
 * Transduce function that works with anthing that implements the
 * Iterable protocol, like Maps, Sets, Strings or your own object.
 *
 * @param  {Transform} xf         [Transformation function]
 * @param  {Reducer} reducer    [The inner reducer of composition]
 * @param  {any} seed       [Initial seed]
 * @param  {[Iterable} collection [An iterable]
 * @return {Function}            [description]
 */
const transduce = (xf, reducer, seed, collection) => {
	// collection.reduce(xf(reducer), seed);
	const transformedReducer = xf(reducer);
	let acc = seed;
	for (const val of collection) {
		// console.log('calling transformedReducer', transformedReducer(acc, val))
		acc = transformedReducer(acc, val);
	}
	return acc;
};

// OLD ONE
var rTransducer = transduce(
	compose(isNot2Filter, isEvenFilter, doubleMap),
	pushReducer,
	[],
	[1, 2, 3, 4]
);
console.log('[transduce Array]', rTransducer);

const toUpper = str => str.toUpperCase();
var rTransducerString = transduce(
	map(toUpper),
	(str, char) => str + char, // string concatenation reducer
	'',
	'renan'
);
console.log('[transduce String]', rTransducerString); // RENAN

const isVowel = char => 'aeiou'.split('').includes(char.toLowerCase());
var rTransducerStringWithFilter = transduce(
	compose(map(toUpper), filter(isVowel)),
	(str, char) => str + char, // string concatenation reducer
	'',
	'renan'
);
console.log('[transduce String with filter]', rTransducerStringWithFilter); // EA

var numMap = new Map();
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);

var rTransducerWithMap = transduce(
	compose(isNot2Filter, isEvenFilter, doubleMap),
	pushReducer, // string concatenation reducer
	[],
	numMap.values()
);
console.log('[transduce Map]', rTransducerWithMap); // [4,6,8]
