/**
 * [insertSort 插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const insertSort = (arr) => {
	let len = arr.length;
	// 1.从无序区循环
	for (let i = 1; i < len; i++) {
		// 2.与有序区最大元素比较
		if (arr[i] < arr[i - 1]) {
			// 3.临时存为temp，待插入
			let temp = arr[i];
			// 4.将有序区最大为放入最后，注意此时有序区增加了一位
			arr[i] = arr[i - 1];
			// 5.迭代有序区剩余元素并比较大小
			let j = i - 2;
			while (j >= 0 && temp < arr[j]) {
				// 若temp还小，则将arr[j]下移一位
				arr[j + 1] = arr[j];
				// j 递减 进行下次循环
				j--;
			}

			//根据j确定最后temp位置，注入
			arr[j + 1] = temp;
		}
	}
};

/**
 * [binaryInsertSort 二分插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const binaryInsertSort = (arr) => {
	let len = arr.length;

	// 1.从无序区开始迭代
	for (let i = 1; i < len; i++) {
		let start = 0,
			end = i - 1,
			temp = arr[i];
		// 2.判定start与end是否重叠
		while (start <= end) {
			// 3. 计算中间值，注意此处仅取整
			let middle = parseInt((start + end) / 2);
			// 4.当前值在后半部分，调整start
			if (temp > arr[middle]) {
				start = middle + 1;
			}
			// 5.当前值在前半部分，调整end
			else {
				end = middle - 1;
			}
		}

		// 6.start与end重叠后，将有序区中start之后（包含start）的元素顺移一位
		for (let j = i - 1; j >= start; j--) {
			arr[j + 1] = arr[j];
		}

		// 7.在start处插入当前元素，完成该元素的排序
		arr[start] = temp;
	}
};

/**
 * [shellSort 希尔插入排序]
 * @param {[Array]} arr 需要排序的数组
 * @return {[Array]}  arr 排序后的结果
 */
const shellSort = (arr) => {
	let len = arr.length,
		gap = parseInt(len / 2);

	for (let i = 0; i < gap; i++) {
		let tempArr = [arr[i]];
		let g = gap;
		while (g <= len) {
			tempArr.push(arr[g]);
			g += gap;
		}
		let sArr = insertSort(tempArr);
		let j = sArr.length - 1;
		while (g > i) {
			g = g - gap;
			arr[g] = sArr[j];
			j--;
		}

		return insertSort(arr);
	}
};

// 冒泡排序算法——有小到大 升序
const popSort = (a, result = []) => {
	const lastIndex = a.length - 1;
	// 从数组右侧开始逐个与前一个比较大小，小则换位置
	for (let i = lastIndex; i >= 0; i--) {
		let left = a[i - 1],
			right = a[i];
		// 前一个大于当前的，则交换位置
		if (left > right) {
			a[i - 1] = right;
			a[i] = left;
		}
	}
	// 向有序区记录一个，但是会增加空间成本，但会使得时间成本降低。
	result.push(a.shift());

	if (a.length === 0) {
		return result;
	} else {
		popSort(a, result);
	}
};

// 选择排序
const selectSort = (a, startIndex = 0) => {
	let minIndex = startIndex,
		index = startIndex + 1,
		length = a.length;
	// 先用线性查找法，找到最小的，然后与左侧无序第一个
	for (let i = index; i <= length; i++) {
		if (a[minIndex] > a[i]) {
			minIndex = i;
		}
	}

	// 交换位置，与左侧无序第一个
	let temp = a[minIndex];
	a[minIndex] = a[startIndex];
	a[startIndex] = temp;

	if (startIndex === a.length - 1) {
		console.info('结束了 === ', a, a.length, startIndex);
	} else {
		// 指向无序去第一个startIndex
		startIndex++;
		selectSort(a, startIndex);
	}
};

const insertSort2 = (a) => {
	// 有序区默认为a[0], 从a[1]开始插入比较。
	let startIndex = 0;
	for (let i = 1; i <= a.length; i++) {
		// 有序区最大值 大于无序区该值
		if (a[startIndex] > a[i]) {
			// 迭代有序区 0->i
			for (let j = i; j >= 0; j--) {
				// 当前值小于前一值， 需交换
				if (a[j] < a[j - 1]) {
					const temp = a[j];
					a[j] = a[j - 1];
					a[j - 1] = temp;
				}
			}
		}
		// 有序区扩大
		startIndex++;
	}
	console.info('a === ', a);
};

// 快速排序法
const quickSort = (a) => {
	// 随机取一个基准点pivot => [比P小]P[比P大] => 再对[]内继续这么排，直到为一个为止。
	// 为了方便就取中间的数
	let pIndex = Math.floor(a.length / 2);

	let left = [],
		right = [];

	for (let i = 0; i < a.length; i++) {
		// 中位数大于当前数
		if (a[pIndex] > a[i]) {
			left.push(a[i]);
			// 如果不用left right 单独记录
			// 先把这元素删了，然后加到左边，然后pIndex+1
			a.splice(i, 1);
			a.unshift(a[i]);
			pIndex++;
		} else if (a[pIndex] < a[i]) {
			right.push(a[i]);
		}
	}

	if (left.length > 1) {
		left = quickSort(left);
	}

	if (right.length > 1) {
		right = quickSort(right);
	}

	return left.concat([a[pIndex]]).concat(right);
};

// 快速排序法
const quickSort2 = (a) => {
	// 随机取一个基准点pivot => [比P小]P[比P大] => 再对[]内继续这么排，直到为一个为止。
	// 为了方便就取中间的数
	let pIndex = Math.floor(a.length / 2);

	for (let i = 0; i < a.length; i++) {
		// 中位数大于当前数，且为止不在标记为的左边
		if (a[pIndex] > a[i] && pIndex < i) {
			// 如果不用left right 单独记录
			// 先把这元素删了，然后加到左边，然后pIndex+1
			a.splice(i, 1);
			a.unshift(a[i]);
			pIndex++;
		} else if (a[pIndex] < a[i] && pIndex > i) {
            // 无法删第一个
			a.splice(i, 1);
			a.push(a[i]);
			pIndex--;
		}
	}

    // slice 返回了一个新对象，所以还是占了空间 用quicksort即可
	let left = a.slice(0, pIndex),
		right = a.slice(pIndex + 1, a.length - 1);

	if (left.length > 1) {
		left = quickSort(left);
	}

	if (right.length > 1) {
		right = quickSort(right);
	}

	return left.concat([a[pIndex]]).concat(right);
};
