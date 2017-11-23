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
const { transduce } = require('./12-improving_tranduce');

/**
 * Evolution of `into` function.
 * This one seeds with the with the rigth type by its collections
 * [] for an array collection
 * {} for an object collection
 * @param  {Transform} xf  [Transformation function]
 * @param  {Iterable} collection [An iterable]
 * @return delegated to transduce
 */
const seq = (xf, collection) => {
	if (Array.isArray(collection))
		return transduce(xf, pushReducer, [], collection);
	else if (isPlainObject(collection)) {
		return transduce(xf, objectReducer, {}, collection);
	}
	throw new Error('unsupported collection type');
};

// var rArray = seq(map(x => x * 2), [1, 2, 3]);
// console.log(rArray);

// const flip = map(([k, v]) => ({ [v]: [k] }));
// var rFlibObject = seq(flip, { one: 1, two: 2, three: 3 });
// console.log(rFlibObject)
// ERROR: undefined is not a function
