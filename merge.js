var realEditor;
var virtualEditor;

var changes = [];

/*
 * @param(changeObj) an object containing the fields line, from, to, insertedText, lastId, id
*/
function insert(changeObj) {
	changes.push(changeObj);
	let i = 0;
	for (i = changes.length - 1; i >= 0; i--) {
		if (changes[i].id === changeObj.lastId) {
			break;
		}
	}
	for (let j = i + 1; j < changes.length; j++) {
		modify(changeObj, changes[j]);
	}
}
