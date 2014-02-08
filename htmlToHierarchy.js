define([], function(){

	function htmlToHierarchy(html){
		var
			tags,
			lastType,
			limit = 10,
			startTagRegExp,
			endTagRegExp,
			nodes = [],
			nodeObject = {},
			current,
			id = 0,
			startTagRegExp = /<\/?\w+\s+[^>]*>/g,
			endTagRegExp = /<\/\w*>/;
			
		function uid(){
			return 'n-' + (id++);
		}
		
		function getChild(){
			var o = {
				id: uid()	
			};
			nodes.push(o);
			if(current){
				if(!current.children){ current.children = []; }
				current.children.push(o);
				o.parentId = current.id;
			}
			current = o;
			return current;
		}
		
		function getParent(){
			if(current.parentId){
				for(var i = 0; i < nodes.length; i++){
					if(nodes[i].id === current.parentId){
						current = nodes[i];
						break;
					}
				}
			}
			return current;
		}
		
		function indexes(){
			return {
				open: html.search(startTagRegExp),
				end: html.search(endTagRegExp)
			};
		}
		
		
		while(html.length){
			if(limit-- < 0){console.log('LIMIT!!');break;}
			
			// clear RegExp index
			startTagRegExp.lastIndex = 0;
			endTagRegExp.lastIndex = 0;
				
			html = html.trim();
			
			tags = indexes();
			
			if(tags.open === 0){
				nodeObject = getChild();
				nodeObject.opentag = startTagRegExp.exec(html);
				nodeObject.opentag = nodeObject.opentag[0];
				html = html.substring(nodeObject.opentag.length, html.length);
				lastType = 'open';
			}
				
			tags = indexes();
			
			console.log('\nopenIndex', tags.open);
			console.log('endIndex', tags.end);
			
			if(tags.open === 0){
				// next node
				continue;
			}
			
			
			if(tags.end > 0){
				// inner text
				nodeObject.innerText = html.substring(0, tags.end);
				html = html.replace(nodeObject.innerText, '');
				lastType = 'text';
			}
			
			tags = indexes();
			
			if(tags.end === 0){
				// starting with a closing tag
				if(lastType === 'close'){
					nodeObject = getParent();
				}
				nodeObject.closetag = endTagRegExp.exec(html);
				nodeObject.closetag = nodeObject.closetag[0];
				console.log('ender', nodeObject);
				html = html.substring(nodeObject.closetag.length, html.length);
				lastType = 'close';
				
				nodeObject = getParent();
			}
			
		
		}
		console.log('\n\n\n TREE PARSED', nodes.length);
		nodes.forEach(function(n){
			console.log(n);
		});
		console.log('\n\n\n');
		return nodes[0];
	}
	
	return htmlToHierarchy;
	
});