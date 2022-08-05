const sum =(a, b) => a+b;
const [, , n1, n2]=process.argv;
console.log(sum(+n1, +n2));