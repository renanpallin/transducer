const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

// xf = transformation function
const map = (xf, array) => array.reduce((acc, val) => {
	acc.push(xf(val));
	return acc;
}, []);
var m = map(doubleTheNumber, [1, 2, 3, 4]); // [ 2, 4, 6, 8 ]

const filter = (predicate, arr) => arr.reduce((acc, val) => {
		if (predicate(val)) acc.push(val);
		return acc;
	}, []);
var f = filter(evenOnly, [1,2,3,4]) // [2, 4]

console.log(m)
console.log(f)
/*
	We still can't compose our map and filter.
 */
