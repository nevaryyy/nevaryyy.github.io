// JavaScript Document

function search(info,key){
	var res=new Array();
	
	if (typeof key == "number"){
		for (var i in info)
			if (info[i].age==key)
				res.push(info[i]);
		if (res.length==0)
			return false;
		return res;
	}
	if (typeof key == "string"){
		//alert(person.name);
		for (var i in info){
			if (info[i].name==key)
				return info[i];
		}
		return false;
	}
	for (var i in info){
		var flag=true;
		if ("age" in key){
			if (key.age!=info[i].age)
				flag=false;
		}
		if ('name' in key){
			if (key.name!=info[i].name)
				flag=false;
		}
		if ('hometown' in key){
			if (key.hometown!=info[i].hometown)
				flag=false;
		}
		if (flag)
			res.push(info[i]);
	}
	if (res.length==0)
		return false;
	return res;
}