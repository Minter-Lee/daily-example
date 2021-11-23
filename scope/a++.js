var b = 1;
function a() {
    console.info('1',b);
    var b = 2;
    console.info('2',b++)
    console.info('4',b)
}
a()
console.info('3',b);