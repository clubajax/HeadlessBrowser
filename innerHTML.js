define([
	'./htmlToHierarchy',
	'./attributeParser'
], function(htmlToHierarchy, attributeParser){
	
	return function (html){
		
		var
			Node = global.Node,
			tree = htmlToHierarchy(html),
			nodeObject;
			
		function createNode(opentag){
			var
				attrs = attributeParser(opentag),
				node = new Node(opentag.substring(1,opentag.indexOf(' ')));
			
			node.attributes = attrs;
			
			return node;
		}
		
		function walkTree(branch){
			var
				i,
				node = createNode(branch.opentag);
			
			if(branch.children && branch.children.length){
				for(i = 0; i < branch.children.length; i++){
					node.children.push(walkTree(branch.children[i]));
				}
			}
			return node;
		}
		
		nodeObject = walkTree(tree);
		
		//console.log('tree', tree);
		console.log('\n\nnodeObject:', nodeObject);
		console.log('attrs:', nodeObject.attributes);
		console.log('style:', nodeObject.style);
		
		return nodeObject;
	};
});