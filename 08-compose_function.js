const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');
const {
	map,
	filter,
	pushReducer,
	isEvenFilter,
	isNot2Filter,
	doubleMap,
} = require('./07-currying_map');

/*
How we produce our reducer before:
isNot2Filter(isEvenFilter(doubleMap(pushReducer)))

Our compose needs to do this:
compose(f, g)(x) === f(g(x))

so:
compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer) ===
	isNot2Filter(isEvenFilter(doubleMap(pushReducer)))

Why we passing pushReducer in a argument and not leting with default?
	Becouse we want our compose function to be a combinator!
combinator is a function that creates a function with a relashionship in the functions, so we need to
knowing in functional programming by: BCombinator or Bluebird
 */

const compose = (...functions) => {
	return functions.reduce((acc, fn) => {
		return (...args) => fn(acc(...args), x => x);
	});
};


var r = [1, 2, 3, 4].reduce(
	isNot2Filter(isEvenFilter(doubleMap(pushReducer))),
	[]
); // [ 8 ]
console.log('Inner calling:', r);

const cleanNumbersXf = compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer);
var rWithOurComposeFunction = [1, 2, 3, 4].reduce(
	cleanNumbersXf,
	[]
); // [ 8 ]
console.log('Our compose function', rWithOurComposeFunction);

/* Now our composition works! It works becouse the filters and map function receives and returns a reducer.
	now, let's create some function to compose this to us */
// [1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap)), []) // [ 8 ]

// @todo: refatorar e colocar em vários arquivos diferentes para fazer uma timeline
