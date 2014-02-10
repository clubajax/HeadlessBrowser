define([
	'./htmlToHierarchy',
	'./attributeParser'
], function(htmlToHierarchy, attributeParser){
	
	return function (html){
		
		if(html.trim().indexOf('<') !== 0){
			// just text
			console.log('JUST TEXT');
			return html;
		}
		
		var
			createElement = global.createElement,
			tree = htmlToHierarchy(html),
			nodeObject;
			
		function createNode(opentag){
			var
				attrs = attributeParser(opentag),
				node = createElement(opentag.substring(1,opentag.indexOf(' ')));
			
			node.attributes = attrs;
			
			return node;
		}
		
		function walkTree(branch){
			var
				i,
				node = createNode(branch.opentag);
			
			if(branch.innerText){
				node.textContent = branch.innerText;
			}
			
			if(branch.children && branch.children.length){
				for(i = 0; i < branch.children.length; i++){
					node.appendChild(walkTree(branch.children[i]));
				}
			}
			return node;
		}
		
		nodeObject = walkTree(tree);
		
		//console.log('tree', tree);
		//console.log('\n\nnodeObject:', nodeObject);
		//console.log('attrs:', nodeObject.attributes);
		//console.log('style:', nodeObject.style);
		
		return nodeObject;
	};
});