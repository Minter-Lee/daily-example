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

    /**
     * [大整数求积]
     * @param  {[String]} cand  [multiplicand，被乘数]
     * @param  {[String]} cator [multiplicator，乘数]
     * @return {[String]}               [积]
     */
    function bigIntMul(cand, cator) {
        var candArr = cand.split(''),
              catorArr = cator.split(''),
              // 进位数 carry
              c = 0,    
              // 最后结果
              result = '',  
              //中间结果集
              middleResultList = [], 
              // 乘数结果映射表
              resultMap = {
                   0:[0],
                   1:candArr
              }, 
              candArrIndex = candArr.length - 1,
              catorArrIndex = catorArr.length - 1;
    
        // 1.迭代乘数
        for( var i = catorArrIndex; i >= 0; i--) {
            // 每一位乘数与被乘数的结果
            var middleResult = [];
    
            // 2. 判定是否存于临时结果集中，若不存在再行计算
            if(!resultMap[catorArr[i]]){

                // 3. 迭代被乘数，计算该乘数位与被乘数的积
                for( var j = candArrIndex; j >= 0; j--) {
                    var r = ((candArr[j]) * catorArr[i]) + parseInt(c);
                    if (r > 9) {
                        var temp = r.toString().split('');
                        c = temp[0];
                        r = temp[1];
                    }else {
                        c = 0;
                    }
                    middleResult.unshift(r);
                }

                // 最后一次还存在进位数，追加至最高位
                if (c > 0) {
                    middleResult.unshift(c);
                }
    
                // 4. 存入临时结果序列减免第二次计算循环次数
                resultMap[catorArr[i]] = middleResult.concat();
            }else {
                middleResult = resultMap[catorArr[i]].concat();
            }
    
            // 5. 根据乘数位数对计算结果逐一补零
            var zeroCount = catorArrIndex - i;
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

    /**
     * [大整数求积]
     * @param  {[String]} cand  [multiplicand，被乘数]
     * @param  {[String]} cator [multiplicator，乘数]
     * @return {[String]}               [积]
     */
    function bigIntMul2(cand, cator) {
        var result = cand;
        for(var i = 1 ; i < parseInt(cator); i++) {
            result = bigNumPlus(result, cand);
        }

        return result;
    }

    // 私有标准借位法求差，并返回最后借位数
    function _bigNumSub(bigNum1, bigNum2) {
        var bigNum1Array = bigNum1.split(''),
            bigNum2Array = bigNum2.split(''),
            b = 0, // 标识每次借位数，默认是0
            result = [];
    
        // 由于bigNumArray在不断递减，所以length每次都需要重新获取 
        while(bigNum1Array.length || bigNum2Array.length) {
            // 分别获取数据末位，相减求差，再减入进位数b
            var r = ( parseInt(bigNum1Array.pop()) || 0 ) 
                    - ( parseInt(bigNum2Array.pop()) || 0 ) 
                    - parseInt(b);

            // 归零本位借位数
            b = 0;
            
            // 判定差大小，累加借位数，重新计算该位差，直到>0
            while( r < 0 ) {
                b++;
                r = parseInt(r)+parseInt(10*b); 
            }

            // 从前注入结果集
            result.unshift(r);
        }

        // 删除由于位数差异产生的多余的0
        while(result.length > 1 && result[0] === 0){
            result.shift();
        }        

        return {
            result: result,
            b: b
        }
    }
    
    // 私有大整数减法负数处理
    function _bigNumSubMinus(bigNum1,bigNum2) {
        var result =  _bigNumSub(bigNum1, bigNum2).result;
        result.unshift('-');
        return result;
    }
    
    // 公有API减法
    function bigNumSub(bigNum1,bigNum2) {
        var result = [];
        
        // 判定长短，确认大小
        if(bigNum1.length >= bigNum2.length) {
            var re =  _bigNumSub(bigNum1, bigNum2);
            result = re.result;
            
            // 若还存在借位数，调换被减数和减数
            if (re.b > 0 ){
                result = _bigNumSubMinus(bigNum2, bigNum1);
            }
        } else  {
            // 绝对长度小于减数，调换被减数位置
            result = _bigNumSubMinus(bigNum2, bigNum1);
        }
        
        return result.join('');
    }

    /**
     * [bigIntDivi 大整数相除]
     * @param  {[String]} dend [dividend 被除数]
     * @param  {[String]} sor  [divisor 除数]
     * @param  {[Number]} decimal  [小数 默认保留10位]
     * @return {[String]}      [商]
     */
    function bigIntDivi(dend, sor, decimal) {
        var result = [],
              // 多保留以为用于四舍五入
              decimal = (decimal || 10) + 1;

        // 1.相减至负数，累加循环次数
       var resultInt = _bigIntDiviSub(dend, sor);

        result.push(resultInt.digit);
        dend = resultInt.dend;

        // 2.判定是否已经除尽，没除尽加小数点并根据设定的次数补零，继续减
        if (dend != '0') {
            result.push('.');
            for(var i = 0; i < decimal; i++) {
                dend+='0';
                var resultDeci = _bigIntDiviSub(dend, sor);
                result.push(resultDeci.digit);
                dend = resultDeci.dend;
                if (dend == '0') {
                    break;
                }
            }
        }

        // 3. 判定最后一位，确认是否需要四舍五入
        var lastDecimal = parseInt(result[result.length-1]); 
        if (lastDecimal > 5) {
            var intDigit = result[0].toString().split(''),
                  deciDigit = result.slice(1),
                  // 清空结果集，重新注入结果
                  result = [];

            deciDigit.unshift(0);
            // 整理小数位，进行四舍五入，并通过parseFloat，格式化多余的0
            deciDigit = parseFloat(parseFloat(deciDigit.join('')).toFixed(decimal - 1));

            // 判定四舍五入后是否进位，若进位intDigit加1
            if (deciDigit >= 1) {
                var lastInt = parseInt(intDigit[intDigit.length - 1]);
                // 判定个位数值，规避一部分大整数相加
                if ( lastInt < 9) {
                    intDigit.pop();
                    intDigit.push(lastInt ++);
                }else{
                    intDigit = bigNumPlus(intDigit.join(''), '1').split('');
                }
            }
            // 注入整数部分
            result.push(intDigit.join(''));
            deciDigit = deciDigit.toString().split('').slice(2).join('');
            // 判定舍入后是否还存在小数
            if (deciDigit.length > 0 && parseInt(deciDigit) != 0 ) {
                result.push('.');
                result.push(deciDigit);
            }
        }else {
            result.pop();
        }    

        return result.join('');
    }

    /**
     * [_bigIntDiviSub 私有除法使用的减法]
     * @param  {[String]} dend [dividend 被除数]
     * @param  {[String]} sor  [divisor 除数]
     * @return {[Object]}      [包含循环次数digit和求差后的被除数]
     */
    function _bigIntDiviSub(dend, sor) {
        var digit = 0;
        while (1) {
            digit ++;
            dend = bigNumSub(dend, sor);
            // 判定计算结果是否为负
            if (dend.split('')[0] === '-') {
                // 加回多减的除数即除数 - calDend的绝对值
                dend = bigNumSub(sor,dend.substr(1));
                digit --;
                break;
            } else if (dend == '0'){
                break;
            }
        }
        return {
            digit: digit,
            dend: dend
        }
    }