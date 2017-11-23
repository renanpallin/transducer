/* The libs that author uses:

https://github.com/jlongster/transducers.js?files=1
https://github.com/cognitect-labs/transducers-js

Both defines the `transducer protocol` (the @@transducer/*) in prototpes



Performance:
map and filter:
	million: 420.507ms
	million x2: 803.132ms
	million x4: 1594.131ms

transducer:
	million: 8.867ms
	million x2: 45.382ms
	million x4: 74.703ms

cognitect-labs/transducers-js:
	million x4: 87.216ms

A function that we didn't define and is very useful is the `take`. Example with
const t = cognitect-labs/transducers-js

const arr = [...'123456789'.split('').map(s => parseInt(s)), 10]
const res = t.sec(
	arr,
	t.compose(doubleAndEven, t.take(2))
);

console.log(res) // [4, 8]
The take does not split the arr of input, but limits the result of your transformations
take(5) = iterate UNTIL 5

How `take` works:
	they extends the transducer protocol with a boolean '@@transducer/reduced',
	with take sets to true when get all the values they need. All other operations
	check if this field is false before continue
	I think this can explain the little delay in theyrs whem compared to ours

cognitect-labs/transducers-js have a t.iterator too, that returns a LazyTransforms, that we can use with a generador:

function* makeNumbers() {
	let num = 1;
	while(true) yield num++;
}

const lazyNums = t.seq(makeNumbers(), doubleAndEven);
// Only evaluated when is called with .next()

}
*/