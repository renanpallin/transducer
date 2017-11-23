const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

// Still the same map
const map = (xf, array) => {
	return (acc, val) => {
		acc.push(xf(val));
		return acc;
	};
};

// Hardcoding a composition
const filterThatDoubles = predicate => {
	return (acc, val) => {
		if (predicate(val)) return map(doubleTheNumber)(acc, val);
		return acc;
	};
};
var r = [1, 2, 3, 4].reduce(filterThatDoubles(evenOnly), []); // [4, 8]
console.log(r);
