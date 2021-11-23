/*
 * 目前是完成了一个顺应原始思路的例子，还不够完善，
 * 可以从unitMap的优化方面再入手，简化实现逻辑
 * 
 */

var unitMap = [' ','十','百','千','万','亿','兆'];
var capMap = ['零','一','二','三','四','五','六','七','八','九','十'];

function toCap(n) {
    var na = n.toString().split('');
    var length = na.length;
    var result = [];
    var zero = capMap[0];
    var unitT = unitMap[4];

    for (let i = 0; i < length; i++ ){
        debugger
        var item = na[i];
        var cap = capMap[parseInt(item)];
        
        // 当前位数
        var nd = length - i;
        var unit;

        switch (nd) {
            case 5:
                unit = unitMap[4];
                break;
            case 9:
                unit = unitMap[5];
                break;
            case 13:
                unit = unitMap[6];
                break;
            default :
                // 计算位数余数，用于对应单位
                var unitN = nd%4;
                var unitNumber = (unitN === 0 ? 4 : unitN) - 1;
                unit = unitMap[unitNumber];
        }

        var isZero = false;
        if (result[result.length -1] === zero) {
            isZero = true;
        }

        // 对连续0处理
        if(cap === zero){
            // 连续0或末尾为0
            if ( isZero || i === length -1) {
                continue;
            }else{
                result.push(zero);
            }

            if (isZero && nd === 5) {
                result.pop();
                result.push(unitMap[4]);
            }

        }
        // else if( isZero && unit === unitT ){
        //     result.pop();
        // }
        else {
            result.push(cap + unit );
        }
    }

    console.info(result.join(''));
}