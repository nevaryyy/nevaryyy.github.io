// JavaScript Document

var selected=0;
var speed=3300;
var pageIndex=1;
var totalPage=-1;

var timer=null;

var xmlHttp=null;


function showImg(){
	var img=document.getElementById("img0");
	img.src=imageInfo.image[selected].src;
	img.parentNode.setAttribute("href",imageInfo.image[selected].url);
	document.getElementById("text0").innerHTML=imageInfo.image[selected].title;
}

function calcTotalPage(a,b){
	var r=a/b;
	if (a%b>0)
		r++;
	return r;
}

function showCmt(){
	var len=commentInfo.comments.length;
	
	if (totalPage==-1)
		totalPage=calcTotalPage(len,10);
	
	for (var i=len-(pageIndex-1)*10-1,j=1;j<=10;i--,j++){
		if (i<0){
			document.getElementById("comment_user"+j).innerHTML="";
			document.getElementById("comment_content"+j).innerHTML="";
		}
		else{
			document.getElementById("comment_user"+j).innerHTML=commentInfo.comments[i].username;
			document.getElementById("comment_content"+j).innerHTML=commentInfo.comments[i].comment;
		}
	}
	
	document.getElementById("pageIndex").innerHTML="第"+pageIndex+"页";
	document.getElementById("pageIndex_1").innerHTML="第"+pageIndex+"页";
}

function init(){
	
	showImg();
	showCmt();
	
	var imgArea=document.getElementById("imgArea");
	var leftJ=document.getElementById("leftJ");
	var rightJ=document.getElementById("rightJ");
	
	imgArea.onmouseout=function (event){
		var x=event.offsetX;
		var y=event.offsetY;
		var width=imgArea.offsetWidth;
		var height=imgArea.offsetHeight;
//		alert(x+" "+y+" "+width+" "+height);
		if (x<0||x>width||y<0||y>height){
			leftJ.style.display="none";
			rightJ.style.display="none";
			timer=setTimeout("show()",speed);
		}
	}
	imgArea.onmouseover=function (){
		leftJ.style.display="block";
		rightJ.style.display="block";
		clearTimeout(timer);
	}
	leftJ.onclick=function(){
		selected=(selected+3)%4;
		showImg();
	}
	rightJ.onclick=function(){
		selected=(selected+1)%4;
		showImg();
	}
	
	timer=setTimeout("show()",speed);
}

function show(){
	selected=(selected+1)%4;
	showImg();
	timer=setTimeout("show()",speed);
}

function comment(){
	
	var cmt=document.getElementById("userComment").value;
	var newCmt={
		"username":"匿名用户",
		"comment":cmt
	};
	
	commentInfo.comments.push(newCmt);
	totalPage=calcTotalPage(commentInfo.comments.length,10);
	showCmt();
	
//	alert(commentInfo.comments.length);
	document.getElementById("userComment").value="";
}

function pageup(){
	if (pageIndex==1)
		return;
	pageIndex--;
	showCmt();
}

function pagedown(){
	if (pageIndex==totalPage)
		return;
	pageIndex++;
	showCmt();
}