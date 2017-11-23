const doubleTheNumber = n => n * 2;
[1, 2, 3, 4].map(doubleTheNumber); // [2, 4, 6, 8]

const doubleTwice = n => doubleTheNumber(doubleTheNumber(n));
[1, 2, 3, 4].map(doubleTwice); // [ 4, 8, 12, 16 ]

const evenOnly = n => n % 2 === 0;

// wrong composition - functions signs mismatch!
const doubleAndEven = number => doubleTheNumber(evenOnly(number));

module.exports = {
	doubleTheNumber,
	doubleTwice,
	evenOnly,
};
