function test (a,b,c,d){
    return (a+b+c)*d;
}
// 典型的柯里化为有限参数柯里化方法
function curryingTest(a) {
    return function(b){
        return function (c){
            return function(d){
                return (a+b+c)*d;
            }
        }
    }
}
test(1,2,3,4);
curryingTest(1)(2)(3)(4);

// 对于未知个参数的柯里化改造如下
function currying(){
    var _args = [];
    return function(){
        // 延迟计算 最后一次调用才真正计算
        if(arguments.length === 0){
            // 将参数累加
            return fn.apply(this, _args);           
        }
        Array.prototype.push.apply(_args,[].slice.call(arguments));
        return arguments.callee;
    }
}

var currying = function (fn) {
    var _args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        Array.prototype.push.apply(_args, [].slice.call(arguments));
        return arguments.callee;
    }
};