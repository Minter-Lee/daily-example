/**
 * [insertSort 插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const insertSort = (arr) => {
    let len = arr.length;
    // 1.从无序区循环
    for(let i = 1; i < len; i++) {
        // 2.与有序区最大元素比较
        if (arr[i] < arr[i-1]) {
            // 3.临时存为temp，待插入
            let temp = arr[i];
            // 4.将有序区最大为放入最后，注意此时有序区增加了一位
            arr[i] = arr[i-1];
            // 5.迭代有序区剩余元素并比较大小
            let j = i - 2;
            while( j >=0 && temp < arr[j]) {
                // 若temp还小，则将arr[j]下移一位
                arr[j+1] = arr[j];
                // j 递减 进行下次循环
                j--;
            }

            //根据j确定最后temp位置，注入
            arr[j+1] = temp;
        }
    }   
}

/**
 * [binaryInsertSort 二分插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const binaryInsertSort = (arr) => {
    let len = arr.length;

    // 1.从无序区开始迭代
    for(let i = 1; i < len; i++) {
        let start = 0,
            end = i - 1,
            temp = arr[i];
        // 2.判定start与end是否重叠
        while(start <= end) {
            // 3. 计算中间值，注意此处仅取整
            let middle = parseInt(( start + end ) / 2);
            // 4.当前值在后半部分，调整start
            if(temp > arr[middle]){
                start = middle + 1;
            }
            // 5.当前值在前半部分，调整end
            else {
                end = middle - 1;
            }
        }

        // 6.start与end重叠后，将有序区中start之后（包含start）的元素顺移一位
        for(let j = i -1; j >= start; j--) {
            arr[j + 1] = arr[j];
        }

        // 7.在start处插入当前元素，完成该元素的排序
        arr[start] = temp;
    }
}


/**
 * [shellSort 希尔插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const shellSort = (arr) => {
    let len = arr.length,
        gap = parseInt(len / 2);

    for(let i = 0; i < gap; i++) {
        let tempArr = [arr[i]];
        let g = gap;
        while (g <= len){
            tempArr.push(arr[g]);
            g += gap;
        }
        let sArr = insertSort(tempArr);
        let j = sArr.length-1;
        while(g > i) {
            g = g-gap;
            arr[g] = sArr[j];
            j--;
        }

        return insertSort(arr);
        
    }
}