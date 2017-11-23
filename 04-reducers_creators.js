const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

/* Refactoring map and filter to return reducers */
const map = (xf, array) => {
	return (acc, val) => {
		acc.push(xf(val));
		return acc;
	};
};

const filter = (predicate, arr) => {
	return (acc, val) => {
		if (predicate(val)) acc.push(val);
		return acc;
	};
};

var r = [1, 2, 3, 4]
	.reduce(filter(evenOnly), [])
	.reduce(map(doubleTheNumber), []); // [4, 8]

console.log(r)


// 	Now we have some kind of reducerCreator,
// 	but still have to iterate multiple times to apply
