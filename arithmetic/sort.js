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