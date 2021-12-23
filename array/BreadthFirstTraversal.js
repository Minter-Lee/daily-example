function t(selectNode) {
	// 1.创建nodes，用于存储遍历结果
	var nodes = [];
	// 2.判定selectNode是否为空（若为空则不需要继续遍历下去，无子集了）
	if (selectNode != null) {
		// 3.创建queue数组用于存储计算的节点，顺序要求是广度优先遍历
		var queue = [];
		// 4.将本节点注入queue首位，用于计算使用
		queue.unShift(selectNode);
		// 5.判定queue数据长度，开始循环。
		while (queue.length != 0) {
			// 6.获取queue首位数据node，并注入到结果集nodes中
			var node = queue.shift();
			nodes.push(node);
			// 7.获取node子集children，循环遍历，注入到queue末尾，这样保证queue中节点顺序是广度优先
			var children = node.children;
			for (var i = 0; i <= children.length; i++) {
				queue.push(children[i]);
			}
		}
	}
	return nodes;
}

var treeObj = {
	code: 1,
	children: [
		{
			code: 2,
			children: [
				{
					code: 3
				},
				{
					code: 4
				}
			]
		},
		{
			code: 5,
			children: [
				{
					code: 6
				},
				{
					code: 7
				}
			]
		}
	]
};

const d = (tree, result = []) => {
	console.info('treeCode', tree.code);
	result.push(tree.code);
	if (tree.children && tree.children.length > 0) {
		d(tree.children[0], result);
		d(tree.children[1], result);
	}
	return result;
};

const result = d(treeObj);
console.info('result === ', result);
