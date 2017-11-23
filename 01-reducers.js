/* Transducer! */
// predicate
const isEven = n => n % 2 === 0;


// reducer :: accumlation, value -> value
const reducer = (acc, val) => {
	return acc + val;
}
reducer(10, 5) // 15

const objReducer = (acc, obj) => ({...acc, ...obj});
objReducer({ name: 'Renan', email: 'renanpallin@gmail.com' }, { nickname: 'renan' })
// { name: 'Renan',
//  email: 'renanpallin@gmail.com',
//  nickname: 'renan' }

const setReducer = (acc, val) => acc.add(val)
var a = setReducer(new Set(), 1) // Set { 1 }