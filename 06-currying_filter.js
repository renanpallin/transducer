const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

/* Now we're currying a filter function that receives the map reducer */
const filter = predicate => reducer => (acc, val) =>
	predicate(val) ? reducer(acc, val) : acc; // <= Por algum motivo, dá erro quando tiro esse ';', aparece qeu o array abaixo é undefined

// Still the same map
const map = xf => (acc, val) => {
	acc.push(xf(val));
	return acc;
};

var r = [1, 2, 3, 4].reduce(filter(evenOnly)(map(doubleTheNumber)), []); // [ 4, 8 ]
console.log(r);

/* Since we're curriyng, we can give some meaninful names */
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const doubleMap = map(doubleTheNumber);

/* Now our composition works! It works becouse the filters and map function receives and returns a reducer.
	now, let's create some function to compose this to us */
var anotherR = [1, 2, 3, 4].reduce(isNot2Filter(isEvenFilter(doubleMap)), []); // [ 8 ]
console.log(anotherR);
