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
	/*
	UNTESTED
	Here any type of object (or list) can define a reducer in @@transducer/step
	and a function that returns a new value of itself in @@transducer/init in the
	prototype. Example with List from immutableJS

	// The push method returns a new List
	List.prototype['@@transducer/step'] = (list, value) => list.push(value)
	List.prototype['@@transducer/init'] = () => List()
	 */
	} else if (collection['@@transducer/step']){
		const init = collection['@@transducer/init']
			? collection['@@transducer/init']()
			: collection.constructor();
		return transduce(xf, collection['@@transducer/step'], init, collection)
	}
	throw new Error('unsupported collection type');
};

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
	/*
	UNTESTED
	Here any type of object (or list) can define a reducer in @@transducer/step
	and a function that returns a new value of itself in @@transducer/init in the
	prototype. Example with List from immutableJS

	// The push method returns a new List
	List.prototype['@@transducer/step'] = (list, value) => list.push(value)
	List.prototype['@@transducer/init'] = () => List()
	 */
	} else if (to['@@transducer/step']){
		const init = to['@@transducer/init']
			? to['@@transducer/init']()
			: to.constructor();
		return transduce(xf, to['@@transducer/step'], init, to)
	}
	throw new Error('`into` only suppors array and objectsas `to`');
};