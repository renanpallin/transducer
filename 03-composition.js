const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

// xf = transformation function
const map = (xf, array) => {
	return array.reduce((acc, val) => {
		acc.push(xf(val));
		return acc;
	}, []);
};
var m = map(doubleTheNumber, [1, 2, 3, 4]); // [ 2, 4, 6, 8 ]

const filter = (predicate, arr) => {
	return arr.reduce((acc, val) => {
		if (predicate(val)) acc.push(val);
		return acc;
	}, []);
};
var f = filter(evenOnly, [1,2,3,4]) // [2, 4]

console.log(m)
console.log(f)
/*
	We still can't compose our map and filter.
	Refactoring map and filter to return reducers
 */

// const map = (xf, array) => {
// 	return (acc, val) => {
// 		acc.push(xf(val));
// 		return acc;
// 	};
// };

// const filter = (predicate, arr) => {
// 	return (acc, val) => {
// 		if (predicate(val)) acc.push(val);
// 		return acc;
// 	};
// };

// [1, 2, 3, 4]
// 	.reduce(filter(evenOnly), [])
// 	.reduce(map(doubleTheNumber), []); // [4, 8]

// 	Now we have some kind of reducerCreator,
// 	but still have to iterate multiple times to apply


// // Hardcoding a composition
// const filterThatDoubles = predicate => {
// 	return (acc, val) => {
// 		if (predicate(val)) return map(doubleTheNumber)(acc, val);
// 		return acc;
// 	}
// }
// [1, 2, 3, 4].reduce(filterThatDoubles(evenOnly), []) // [4, 8]

// Now we're currying a filter function that receives the map reducer
// const filter = predicate => reducer => (acc, val) =>
// 	predicate(val) ? reducer(acc, val) : acc; // <= Por algum motivo, dá erro quando tiro esse ';', aparece qeu o array abaixo é undefined
// same thing with the map
// const map = xf => reducer => (acc, val) => {
// 	return (acc, val) => {
// 		// Instead of manually push to acc, we're delegating to the reducer
// 		reducer(acc, xf(val));
// 		return acc;
// 	};
// };

// note: this coul'd be functional, rigth?
// const pushReducer = (acc, val) => {
// 	acc.push(val);
// 	return acc;
// }

// [1,2,3,4].reduce(filter(evenOnly)(map(doubleTheNumber)), []); // [ 4, 8 ]


// const isEvenFilter = filter(evenOnly);
// const isNot2Filter = filter(val => val !== 2);
// const doubleMap = map(doubleTheNumber);

/* Now our composition works! It works becouse the filters and map function receives and returns a reducer.
	now, let's create some function to compose this to us */
// [1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap)), []) // [ 8 ]

// @todo: refatorar e colocar em vários arquivos diferentes para fazer uma timeline