export let a = 'a';
setTimeout(() => {
  a = 'aa';
}, 1000);
console.log('a', a);
