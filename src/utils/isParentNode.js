// 是否是父节点
const isParentNode = function (parentObj, obj) {
	if (parentObj === obj) return false
	while (
		obj != undefined &&
		obj != null &&
		obj.tagName &&
		obj.tagName.toUpperCase() != 'BODY'
	) {
		if (obj == parentObj) {
			return true
		}
		obj = obj.parentNode
	}
	return false
}

export default isParentNode
