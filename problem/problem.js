    function bigNumPlus(bigNum1,bigNum2) {
        var bigNum1Array = bigNum1.split(''),
        bigNum2Array = bigNum2.split(''),
        c = 0, // 标识每次进位数，默认是0
        result = []; // 结果存储
        
        // 由于bigNumArray在不断递减，所以length每次都需要重新获取
        while(bigNum1Array.length || bigNum2Array.length || c) {
            // 1. 分别获取数据末位，相加求和，再加入进位数c
            var r = (parseInt(bigNum1Array.pop()) || 0) + ( parseInt(bigNum2Array.pop()) || 0) + parseInt(c);
            // 2. 判定和大小，大于9时，根据结果除10来获取整数和余数
            if( r > 9 ) {
                // 因为是除10，所以表明，r的十分位即是除十取整结果，个位即为取余结果
                var rArray = r.toString().split('');
                c = rArray[0];
                r = rArray[1];
            }else {
                // 4. 若小于9，进位数归零
                c = 0;
            }
            // 5. 从前注入结果集
            result.unshift(r);
        }

        return result.join('');
    }

    function bigIntMul(bigNum1, bigNum2) {
        var bigNum1Array = bigNum1.split(''),
              bigNum2Array = bigNum2.split(''),
              c = 0,
              result = '',  // 最后结果
              middleResultList = [], //中间结果集
              resultMap = {
                   0:[0],
                   1:bigNum1Array
              }, // 乘数结果映射表
              length1 = bigNum1Array.length - 1,
              length2 = bigNum2Array.length - 1;
    
        // 1.迭代乘数
        for( var i = length2; i >= 0; i--) {
            // 每一位乘数与被乘数的结果
            var middleResult = [];
    
            // 2. 判定是否存于临时结果集中，若不存在再行计算
            if(!resultMap[bigNum2Array[i]]){
                // 3. 迭代被乘数，计算该乘数位与被乘数的积
                for( var j = length1; j >= 0; j--) {
                    var r = (bigNum1Array[j] * bigNum2Array[i]) + parseInt(c);
                    if (r > 9) {
                        c = r.toString().split('')[0];
                        r = r.toString().split('')[1];
                    }else {
                        c = 0;
                    }
                    middleResult.unshift(r);
                }

                if (c > 0) {
                    middleResult.unshift(c);
                }
    
                // 4. 存入临时结果序列减免第二次计算循环次数
                resultMap[bigNum2Array[i]] = middleResult.concat();
            }else {
                middleResult = resultMap[bigNum2Array[i]].concat();
            }
    
            // 5. 根据乘数位数对计算结果逐一补零
            var zeroCount = length2 - i;
            while(zeroCount-- > 0) {
                middleResult.push(0);
            } 
            middleResultList.push(middleResult.join(''));
        }
    
        // 使用大整数加法累加所有中间结果
        result = middleResultList.pop();
        while(middleResultList.length > 0) {
            result = bigNumPlus(result, middleResultList.pop());
        }
        return result;
    }