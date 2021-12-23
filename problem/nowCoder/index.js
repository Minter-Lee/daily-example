// 将css样式转化为Dom
/**
 * css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
2. -webkit-border-image 转换后的结果为 webkitBorderImage
 * 
 */
function cssStyle2DomStyle(sName) {
	const sNameArr = sName.split('-');
	if (sNameArr.length > 1) {
		let firstIndex = 1,
			domStyleStr = sNameArr[0];
		if (sName.charAt(0) === '-') {
			firstIndex = 2;
			domStyleStr = sNameArr[1];
		}

		for (let i = firstIndex; i < sNameArr.length; i++) {
			const styleName = sNameArr[i];
			domStyleStr += styleName.charAt(0).toUpperCase() + styleName.slice(1);
		}
		return domStyleStr;
	} else {
		return sName;
	}
}

// 正则模式
function cssStyle2DomStyle(sName) {
	return sName.replace(/^-/, '').replace(/-([a-z])/g, (s1, s2) => s2.toUpperCase());
}

// 简易累加器
function sum(arr) {
	return arr.reduce((prev, current) => prev + current, 0);
}

//移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
function removeWithoutCopy(arr, item) {
	const index = arr.indexOf(item);
	if (index > -1) {
		arr.splice(index, 1);
		return removeWithoutCopy(arr, item);
	}
	return arr;
}

function removeWithoutCopy(arr, item) {
	while (arr.indexOf(item) > -1) {
		arr.splice(arr.indexOf(item), 1);
	}
	return arr;
}

// 罗列所有非原型上的属性
function iterate(obj) {
	// 所有可枚举的实例属性
	return Object.keys(obj).map((item) => {
		return key + ': ' + obj[key];
	});

	const result = [];
	// 所有属性
	for (let i in obj) {
		if (obj.hasOwnProperty(i)) {
			result.push(`${i}: ${obj[i]}`);
		}
	}
	return result;

	// 所有实例属性
	return Object.getOwnPropertyNames(obj).map((item) => {
		return key + ': ' + obj[key];
	});
}

/**
 * 
 * 描述
页面中存在id=jsContainer的DOM元素。
该DOM元素内会给出一段随机文本，可能包含一些链接，比如https://www.baidu.com，或者 www.baidu.com?from=onlineExam，如果出现链接文本，请给该链接文本加上链接标签，用户点击后能直接在新窗口中打开该链接。
请完成 link 函数，完成该功能
1、container只有纯文本内容，不包含其他dom元素
2、识别所有以http://、https://或者www.开始的链接
3、所有www.开头的链接，默认使用 http 协议
4、所有链接在新窗口打开

 */

function link() {
	const dom = document.getElementById('jsContainer');
	dom.innerHTML = dom.innerText.replace(
		/^(http:\/\/|https:|www.)[\w\.\?\=\&#%]+/g,
		function (s1) {
			return `<a target='_blank' href=${/^www/.test(s1) ? 'http://' + s1 : s1} >${s1}</a>`;
		}
	);
}

/**
 * 
 * 描述
本题展示了一个简化版的搜索框智能提示功能，请按照如下要求完成suggest函数。
1、当输入框的值发生变化时，系统会调用suggest函数，用于显示/隐藏智能提示数据，参数items为一个字符串数组。
2、当items中的字符串和输入框的值匹配时，将匹配的数据依次渲染在ul下的li节点中，并显示.js-suggest节点，否则移除ul下的所有li节点，并隐藏.js-suggest节点
3、输入框的值需要移除两侧空白再进行匹配
4、输入框的值为空时，按照全部不匹配处理
5、字符串使用模糊匹配，比如"北大"能匹配"北大"和"北京大学"，但不能匹配"大北京"，即按照 /北.*?大.*?/ 这个正则进行匹配
6、通过在.js-suggest节点上添加/移除 hide 这个class来控制该节点的隐藏/显示
7、当前界面是执行 suggest(['不匹配数据', '根据输入框的值', '从给定字符串数组中筛选出匹配的数据，依次显示在li节点中', '如果没有匹配的数据，请移除所有li节点，并隐藏.js-suggest节点']) 后的结果
8、请不要手动修改html和css
9、不要使用第三方插件
10、请使用ES5语法
 */

function suggest(items) {
    let inputValue = document.querySelector('.js-input').value,
        suggestList = document.querySelector('.js-suggest'),
        suggestUl = document.querySelector(.ul),
        ulLength = suggestUl.length;
    
    // 清空上次结果
    for(let i = 0; i < ulLength; i++) {
        suggestUl.removeChild(document.querySelector('li'));
    }
    
    // 判定input值是否有效
    inputValue = inputValue.trim();
    if(!inputValue) {
        suggestList.classList.add('hide');
        return;
    }
    
    // 构建正则表达式
    let reg = '';
    const regKey = ['(',')','.',''?,'^','$','/','\\','*','[',']','{','}','|','+']
    for(let i of inputValue) {
        if(regKey.includes(i)) {
            i = '\\' + i;
        }
        reg += i+ '.*?';
    }
    reg = new RegExp(reg);
                    
    for(let i of items) {
        if(reg.test(i)) {
            let tip = document.createElement('li');
            tip.innerHTML = i;
            suggestUl.appendChild(tip);
        }
    }
    suggestList.appendChild(ul);
    
    if(suggestUl.children.length) {
        suggestList.classList.remove('hide');
    } else {
        suggestList.classList.add('hide');
    }
 }