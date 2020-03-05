# Generator Example

## Generator Code
File: generator-example.js
```javascript
// eslint-disable-next-line require-jsdoc
function pStep(step, x, y) {
  console.log( 'Step:', step+': x=', x, ', y=', y);
}

// eslint-disable-next-line require-jsdoc
function* add(x) {
  let y;
  pStep(1, x, y);
  yield x + 1;
  pStep(2, x, y);
  y = yield(null);
  pStep(3, x, y);
  y = 6;
  pStep(4, x, y);
  return x + y;
}

console.log('Declare Gen=add(3)');
const gen = add(3);

console.log('Call:', 1, 'Gen Returns:', gen.next());
console.log('Call:', 2, 'Gen Returns:', gen.next());
console.log('Call:', 3, 'Gen Returns:', gen.next());
console.log('Call:', 4, 'Gen Returns:', gen.next());
```

## Output
File: generator-example.out
```
> node generator-example.js

Declare Gen=add(3)
Step: 1: x= 3 , y= undefined
Call: 1 Gen Returns: { value: 4, done: false }
Step: 2: x= 3 , y= undefined
Call: 2 Gen Returns: { value: null, done: false }
Step: 3: x= 3 , y= undefined
Step: 4: x= 3 , y= 6
Call: 3 Gen Returns: { value: 9, done: true }
Call: 4 Gen Returns: { value: undefined, done: true }
```
