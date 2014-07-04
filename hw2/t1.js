// JavaScript Document

function transform(i){
	var a=i.charCodeAt(0)-65;
	var b=i.charCodeAt(1);
	
	if ((a+b)%2==1)
		return a;
	return a+8;
}

function calc(a,b){
	if (a==0&&b==0)
		return 50;
	var c=parseFloat(a)+parseFloat(b);
	return a/c;
}

function forecast(stat,myId){
	var statArray=new Array;
	for (var i in stat){
		statArray[transform(i)]=stat[i];
	}
//	alert(statArray);
	var ans=new Array;
	for (var i=0;i<16;i++){
		ans[i]=new Array();
		for (var j=0;j<20;j++)
			ans[i][j]=0.0;
		ans[i][16]=1.0;
	}
	
	var used=new Array;
	for (var i=0;i<16;i++){
		used[i]=new Array;
		for (var j=0;j<16;j++)
			used[i][j]=false;
	}
	for (var k=1;k<=4;k++){
		for (var i=0;i<16;i++){
			var s=(((1<<(4-k))-1)<<k)&i;
			for (var j=0;j<(1<<k);j++)
				if ((s+j)!=i&&!used[i][s+j]){
					used[i][s+j]=true;
					ans[i][1<<(4-k)]+=ans[i][1<<(5-k)]*ans[s+j][1<<(5-k)]*calc(statArray[i],statArray[s+j]);
				}
		}
	//	alert(ans[0]);
	}
	
	var total=0.0;
	for (var i=0;i<16;i++)
		total+=ans[i][1];
	if (Math.abs(total-1)>0.001)
		return "总概率"+total+"不为1";

	return ans[transform(myId)][1];
}