define(['./htmlToHierarchy'], function(htmlToHierarchy){
	
	function parse(html){
		
		var
			tree = htmlToHierarchy(html),
			nodeObject;
			
		function createNode(opentag){
			var
				i,
				atts = opentag.split(' '),
				attName, attValue,
				node = new Node(atts[0].replace('<', ''));
			
			//console.log('ATRRREGEXP', attrRegExp.exec(opentag));
			
			for(i = 1; i < atts.length; i++){
				
				
				// can't split atts on space, because of classes
				// maybe do a RegExp and make use of lastIndex to continue
				
				attName = (atts[i].split('=')[0] || '').trim();
				attValue = (atts[i].split('=')[1] || '').trim();
				if(attName === 'class'){
					attName = 'className';
				}
				console.log('  att', attName, attValue);
				if(attName === 'style'){
					node.style = attValue;
				}else{
					node.setAttribute(attName, attValue);
				}
			}
			return node;
		}
		
		function walkTree(obj){
			var
				i,
				node = createNode(obj.opentag);
			
			if(obj.children && obj.children.length){
				for(i = 0; i < obj.children.length; i++){
					node.childNodes.push(walkTree(obj.children[i]));
				}
			}
			return node;
		}
		
		nodeObject = walkTree(tree);
		
		console.log('tree', tree);
		console.log('\n\nnodeObject:', nodeObject);
	}
	
	return parse;
});