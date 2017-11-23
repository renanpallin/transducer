const { doubleTheNumber, doubleTwice, evenOnly } = require('./util');

/* Now we're currying a filter function that receives the map reducer
	filter function that receives a predicate and return a function that receives a
	reducer and return another one, making it possible the composition */
const filter = predicate => reducer => (acc, val) =>
	predicate(val) ? reducer(acc, val) : acc; // <= Por algum motivo, dá erro quando tiro esse ';', aparece qeu o array abaixo é undefined

// same thing with the map
const map = xf => reducer => (acc, val) => {
	// Instead of manually push to acc, we're delegating to the reducer
	return reducer(acc, xf(val));
};

/*
Now the map and filter has the same shpape, but map does not push things to acumulator anymore.
That's sad... pushReducer to the rescue!
// note: this could be immutable, rigth?
 */
const pushReducer = (acc, val) => {
	acc.push(val);
	return acc;
};

/* Same of before */
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const doubleMap = map(doubleTheNumber);
/* END - Same of before */

var r = [1, 2, 3, 4].reduce(
	isNot2Filter(isEvenFilter(doubleMap(pushReducer))),
	[]
); // [ 8 ]
// console.log(r);

/*
The composition works becouse in some point of the currying the maps and filters funcitons receives a reducer and returns another reducer. Now let's create a compose function that compose all the functions to us so we don't need to call one in the parameters of another all the time.
 */
module.exports = {
	map,
	filter,
	pushReducer,
	isEvenFilter,
	isNot2Filter,
	doubleMap,
};
