
    /**
     * [deciSupZero 将小数点提取并根据规则补零]
     * @param  {[type]} bigNum1 [有理数]
     * @param  {[type]} bigNum2 [有理数]
     * @return {[Object]}         [返回补零后的大整数，以及原始的两位数的小数位数]
     */
    function deciSupZero(bigNum1, bigNum2) {
        var bigNum1Arr = bigNum1.split('.'),
              bigNum2Arr = bigNum2.split('.'),
              deci1 = bigNum1Arr[1],
              deci2 = bigNum2Arr[1],
              deci1Len = deci1.length,
              deci2Len = deci2.length,
              length = Math.max(deci1Len,deci2Len);

        // 根据最大位数补零
        while (length - deci1.length > 0) {
            deci1+='0';
        }

        while (length - deci2.length > 0) {
            deci2+='0';
        }

        return {
            deci1Len: deci1Len,
            deci2Len: deci2Len,
            bigNum1: bigNum1Arr[0].concat(deci1).join(''),
            bigNum2: bigNum2Arr[0].concat(deci2).join('')
        }
    }

    /**
     * [bigDeciCaluate 小数计算]
     * @param  {[String]} num1   [大有理数]
     * @param  {[String]} num2   [大有理数]
     * @param  {[Function]} method [加法减法]
     * @return {[String]}        [计算结果]
     */
    function bigDeciCaluate(num1,num2,method) {
        // 补零转化为整数
        var caluate = deciSupZero(num1,num2);
        // 根据传入的方法计算出结果
        var result = method(caluate.bigNum1,caluate.bigNum2);
        // 根据要补充的小数位置，向前追加0补位
        while(result.length <= caluate.deciLocation){
            result = '0'+result;
        }
        // 向结果追加小数点
        result = result.split('').splice(-(caluate.deciLocation),0,'.').join('');

        return result;
    }

    /**
     * [大有理数小数加法]
     * @param  {[type]} bigNum1 [有理数]
     * @param  {[type]} bigNum2 [有理数]
     * @return {[String]}         [计算结果]
     */
    function bigDeciPlus (bigNum1,bigNum2) {
         // 补零转化为整数
        var cal = deciSupZero(bigNum1,bigNum2),
              result = bigNumPlus(cal.bigNum1,cal.bigNum2);

        result = deciSupPoint(result.cal.defaultDeciLocation);
        return result;
    }

    function bigDeciSub (bigNum1,bigNum2) {
         // 补零转化为整数
        var cal = deciSupZero(bigNum1,bigNum2);

    }

    function bigDeci (bigNum1,bigNum2) {
         // 补零转化为整数
        var cal = deciSupZero(bigNum1,bigNum2);

    }

    function bigDeciPlus (bigNum1,bigNum2) {
         // 补零转化为整数
        var cal = deciSupZero(bigNum1,bigNum2);

    }

    /**
     * [deciSupPoint 补充小数点]
     * @param  {[type]} bigNum       [计算后结果集]
     * @param  {[type]} deciLocation [小数点位数]
     * @return {[String]}              [补充后最终结果]
     */
    function deciSupPoint (bigNum, deciLocation) {
         // 根据要补充的小数位置，向前追加0补位
        while(bigNum.length <= deciLocation){
            bigNum = '0'+bigNum;
        }
        // 向结果追加小数点
        bigNum = bigNum.split('').splice(-(deciLocation),0,'.').join('');

        // 判定结果还包含小数点，去除末位的无效0
        if(bigNum.indexof('.') > 0) {
            while(bigNum.slice(-1) === 0) {
                bigNum.slice(0,bigNum.length-1);
            }
        }

        return bigNum;
    }
