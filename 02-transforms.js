const toUpper = str => str.toUpperCase();
toUpper('hello'); // HELLO

const shout = str => `${str}!!`;
shout('hello'); // hello!

// Composition of functions
const scream = str => toUpper(shout(str))
scream('hello') // HELLO!!