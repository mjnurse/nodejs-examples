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
