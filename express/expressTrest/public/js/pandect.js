/// 瀑布流ul系列 函数包装
function  waterfall(type,url,parm,data,className,className2){
	var timer = null;
	var page = 1;
	function appendHtml(data){
		var arr = data;
		var length = arr.length;
		console.log(length);
		var html = "";
		html+="<ul>";
		for(var i=0;i<length;i++){
			html+="<li><h2>"+arr[i].test+"</h2></li>";
		}
		html +="</ul>";
		document.querySelector(className).innerHTML+=html;
	}
	function showTips(count){
		clearTimeout(timer);

		var tips = document.querySelector(className2);
		tips.innerHTML = "为你刷新了"+count+"新闻";
		tips.style.opacity = 1;
		setTimeout(function(){
			tips.style.opacity = 0;
		},2000);
		
	}
	AJax(type,url+page,parm,function(data){
		var date = JSON.parse(data);
		showTips(date.length);
		appendHtml(date);
		console.log(date.length);
	});	
}
//滚动条  函数包装
function scrollBar(type,url,parm){
	var page = 1;
	window.onscroll = function(){
		page++;	
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var iHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
		var windowHeight = window.innerHeight;
		console.log(scrollTop,iHeight,windowHeight);
		if(scrollTop>=iHeight - windowHeight){
			AJax(type,url+page,parm,function(data){
				var date = JSON.parse(data);
				showTips(date.length);
				appendHtml(date);
				console.log(page);

			});
			console.log(page);
		}
	}
}
// 
//AJax 函数包装
function AJax(type,url,parm,callback){
	if(type === "GET"){
		var xhr = new XMLHttpRequest();
		xhr.open(type,url);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				//doSometing
				var data = xhr.responseText;
				
				callback(data);
			}
		}
	}else{
		var xhr = new XMLHttpRequest();
		xhr.open(type,url);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(parm);
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				//doSometing
				var data = xhr.responseText;
				
				callback(data);
			}
		}	
	}	
}
// 放大镜 函数包装
function magnfier(){
	// // 放大镜 等待窗口完全加载完毕    
	var show_small = document.querySelector(".show_small");
    var pointer = document.querySelector(".pointer");
    var hide = document.querySelector(".hide");
    var hideImg = document.querySelector(".hide img");
    show_small.onmouseover = function(){
        pointer.style.display = "block";
        hide.style.display = "block";
    }
    show_small.onmouseout = function(){
        pointer.style.display = "none";
        hide.style.display = "none";
    }
    show_small.onmousemove = function(event){
        var oEvent = event || window.event;
// 展示图与放大图的倍数  等于  指针范围与展示图的倍数
        var x = oEvent.clientX;
        var y = oEvent.clientY;
        var l = x - pointer.offsetWidth/2;
        var t = y - pointer.offsetHeight/2;

// 鼠标位置小于指针范围宽度一半时，指针范围水平方向的位置等于O
        if(x <= pointer.offsetWidth/2){
            l = 0;
            // 鼠标位置大于（展示图宽度减去指针范围的宽度）的一半时，
            // 指针范围水平方向的位置等于（展示图宽度减去指针范围的宽度）
        }else if(x >= show_small.offsetWidth - pointer.offsetWidth/2){
            l = show_small.offsetWidth - pointer.offsetWidth;
        }
        //鼠标位置小于指针范围宽度一半时，指针范围竖直方向的位置等于O
        if(y <= pointer.offsetHeight/2){
            t = 0;
        // 鼠标位置大于（展示图高度减去指针范围的高度）的一半时，
        // 指针范围竖直方向的位置等于（展示图高度减去指针范围的高度）  
        }else if(y >= show_small.offsetHeight - pointer.offsetHeight/2){
            t = show_small.offsetHeight - pointer.offsetHeight;
        }
        // 指针范围所在的位置
        pointer.style.left = l + "px";
        pointer.style.top = t + "px";


        var xishuX = l/(show_small.offsetWidth - pointer.offsetWidth);
        var xishuY = t/(show_small.offsetHeight - pointer.offsetHeight);
// 显示位置系数
        // pointer.innerText = "x:"+ xishuX + ";y:"+xishuY;
// 放大图片所显示的位置
        hideImg.style.left = -xishuX*(hideImg.offsetWidth - hide.offsetWidth) + "px";
        hideImg.style.top = -xishuY*(hideImg.offsetHeight - hide.offsetHeight) + "px";
		}
}
// 单个选项卡 函数包装
function tab(id){
	var btns = document.querySelectorAll(id+" ul li");
	var length = btns.length;
	for(var i = 0;i<length;i++){
		btns[i].index = i;
		btns[i].onclick = function(){
			for(var i = 0;i<length;i++){
				btns[i].className = '';
			}
			btns[this.index].className="active";
		}
	}
}
// 两个参数 可以运用两个选项卡
function tab_effect(id,type){
	if(type == "change_hide"){
		var btns = document.querySelectorAll(id+" ol li");
		var length = btns.length;
		var pics = document.querySelectorAll(id+" ul li");
		var picBox = document.querySelector(id+" ul");
		picBox.style.position = "relative";
		for(var i = 0;i<length;i++){
			pics[i].style.position = "absolute";
			pics[i].style.left = "0";
			pics[i].style.top = "0";
			pics[i].style.transition = "1.5s";
			btns[i].index = i;
			btns[i].onclick = function(){
				for(var i = 0;i<length;i++){
					btns[i].style.opacity= 1;
					pics[i].style.opacity= 0;

				}
				btns[this.index].style.opacity= 1;	
				pics[this.index].style.opacity= 1;	
			}
		}	
	}else if(type=="change_left"){
		var btns = document.querySelectorAll(id+" ol li");
		var length = btns.length;
		var pics = document.querySelectorAll(id+" ul li");
		var picBox = document.querySelector(id+" ul");
		
		// offsetWidth的宽度 
		console.log(picBox.offsetWidth);
		picBox.style.width = document.querySelector(id).offsetWidth * btns.length + "px";
		for(var i = 0;i<length;i++){
			pics[i].style.float = "left";
			pics[i].innerHTML = i+1;
			btns[i].index = i;
			btns[i].onclick = function(){
				picBox.style.marginLeft = -(this.index*document.querySelector(id).offsetWidth)+"px";	
			}
		}	
	}
	
}
// 横向轮播ul标签 函数包装
function marquee(className){
	var marquee = document.querySelector(className);
	var marquee_ul = document.querySelector(className+"ul");
	var marquee_width = marquee.clientWidth;
	var left = 0;
	var marquee_box = document.querySelector(className+".box");
	marquee_box.style.width = marquee_width*2 + "px";
	var newUl = marquee_ul.cloneNode(true);
	marquee_box.appendChild(newUl);
	//        cloneNode();

	var timer = null;
	timer = setInterval(function(){left --;if(Math.abs(left) >= marquee.clientWidth){left = 0;}marquee_box.style.left = left + "px";
	    // 0.01s/1px
	},10);
}
 function ground(parentObj,childObj,widthNum){ 
 	// parentObj-父元素,childObj-子元素,widthNum
    parentObj.innerHTML+=parentObj.innerHTML;
    parentObj.style.width=childObj.length*widthNum+"px";
    parentObj.style.left="-"+(childObj.length/2)*widthNum+"px";
    var timer=null;
    function run()
	    {
            if(parentObj.offsetLeft<0){
                parentObj.style.left=parentObj.offsetLeft+5+"px"
            }
            else{
                parentObj.style.left="-"+(childObj.length/2)*widthNum+"px"        
            }
	    }
    timer=setInterval(run,30);
    parentObj.onmouseover=function(){
        clearInterval(timer);
    }
    parentObj.onmouseout=function(){
	    clearInterval(timer);
	    timer=setInterval(run,30);
    }
}
// 小火箭回到顶部
function backTotop(){
		var bTbtn = document.querySelector(".bTbtn");
		var isTop = true;
		var timer = null;
		var iHeight = window.innerHeight;
		window.onscroll = function(){
			var top = document.body.scrollTop;
			if(top >=iHeight){
				bTbtn.style.display = "block";
			}else{
				bTbtn.style.display = "none"
			}
			if(!isTop){
				clearInterval(timer);
			}
			isTop = false;
		}
		bTbtn.onclick = function(){
			clearInterval(timer);
			timer = setInterval(fn,20);
			function fn(){
				var top = document.body.scrollTop;
				var sudu = Math.ceil(top/10);
				document.body.scrollTop = top - sudu;
				isTop = true;
				if(top == 0){
					clearInterval(timer);
				}
  			}			
		}
function cursor(className){

	var html="<div class='none'>";
	for (var i = 0; i <12; i++) {
		html+="<div class='li' style='background:red;'></div><div class='li' style='background:blue;'></div><div class='li' style='background:black;'></div><div class='li' style='background:gold;'></div>"
	}
	html+="</div>"
	document.querySelector("body").innerHTML=html;
			document.onmousemove=function(event){
				var oEvent=event||window.event;
				var div=document.querySelectorAll(className);
				for (var i = div.length - 1; i >0; i--) {0
					div[i].style.left=div[i-1].offsetLeft+"px";
					div[i].style.top=div[i-1].offsetTop+"px";
				}
				div[0].style.left=oEvent.clientX+"px";
				div[0].style.top=oEvent.clientY+"px";
			}
			var timer=setInterval(function(){
				var div=document.querySelectorAll(className);
				for (var i = div.length - 1; i >0; i--) {
					div[i].style.left=div[i-1].offsetLeft+"px";
					div[i].style.top=div[i-1].offsetTop+"px";
				}
			},10)
		}
	}
	// canvas画布 ,蜗牛型原生
	function draws(className){
	    var c = document.querySelector(className);
	    var ctx = c.getContext('2d');
	     ctx.translate(400,100);
	     
	     for(var i=0; i<1000; i++){
	         ctx.save();
	         ctx.transform(0.99,0,0,0.99,30,30);
	         ctx.rotate(Math.PI/16);
	         ctx.beginPath();
	         ctx.fillStyle = 'red';
	         ctx.globalAlpha = '0.4';
	         ctx.arc(0,0,50,0,Math.PI*2,true);
	         ctx.closePath();
	         ctx.fill();
	     }
	     
	     ctx.setTransform(1,0,0,1,10,10);    //将前面的矩阵恢复为最初的矩阵，即恢复最初的原点，然后将坐标原点改为(10,10),并以新的坐标绘制一个蓝色的矩形
	     ctx.fillStyle = 'blue';
	     ctx.fillRect(0,0,50,50);
	     ctx.fill();
	     
	}
	// canvas _中心放大_图片放大
function canvasCtx(cavsWidth,cavsHeight,dataImg){
	var canvas = document.querySelector('#canvas');
	var slider = document.querySelector("#scale_range");
	var ctx = canvas.getContext("2d");
	var watermarkCanvas=document.querySelector("#watermark_canvas")
	var watermarkCtx =watermarkCanvas.getContext("2d");
	watermarkCanvas.width =600;
	watermarkCanvas.height = 100;
	watermarkCtx.font= "bold 30px Arial"
	watermarkCtx.lineWidth ="1";
	watermarkCtx.fillStyle = "rgba(255,0,255,0.5)"
	watermarkCtx.textBaseline ="middle";
	watermarkCtx.fillText("github.com/XiaojunMr==兔宝",10,50)
	var image =new Image()
	function cavs(cavsWidth,cavsHeight,dataImg){
		canvas.width =cavsWidth;
		canvas.height= cavsHeight;
		var scale =slider.value;

		image.src=dataImg;
		image.onload = function(){
			drawImageByScale(scale);
			slider.onmousemove=function(){
				scale = slider.value;
				drawImageByScale(scale);
			}
		}
	}
	function drawImageByScale(scale){
		var imageWidth=cavsWidth*scale;
		var imageHeight=cavsHeight*scale;
		var dx =canvas.width/2-imageWidth/2;
		var dy =canvas.height/2-imageHeight/2;
		console.log(dx)
		console.log(dy)
		ctx.clearRect(0,0,canvas.width,canvas.height)
		ctx.drawImage(image,dx,dy,imageWidth,imageHeight)
		console.log(imageWidth)
		console.log(imageHeight)
		ctx.drawImage(watermarkCanvas,canvas.width-watermarkCanvas.width,canvas.height-watermarkCanvas.height)

	}
	cavs(cavsWidth,cavsHeight,dataImg);
}
// canvas 放大镜效果
function canvasDa(cavsWidth,cavsHeight,dataImg){
	var canvas =document.querySelector("#canvasDa");
		var cxt =canvas.getContext("2d");

		var offCanvas = document.querySelector("#offCanvas");
		var offCtx = offCanvas.getContext("2d");

		var scaleX;
		var scaleY;

		var image =new  Image();
		var isMouseDown = false;

		window.onload =function(){
			canvas.width =cavsWidth;
			canvas.height= cavsHeight;

			image.src=dataImg;
			image.onload =function(){
				offCanvas.width =image.width;
				offCanvas.height = image.height;
				scaleX=offCanvas.width/canvas.width;
				scaleY= offCanvas.height/canvas.height
				console.log(scaleX,scaleY);
				cxt.drawImage(image,0,0,canvas.width,canvas.height);
				offCtx.drawImage(image,0,0)
			}
		}
		console.log(canvas.getBoundingClientRect())
		function windowToCanvas(x,y){
			var  bbox = canvas.getBoundingClientRect();
			return{x: x-bbox.left,y:y-bbox.top}
			console.log(canvas.getBoundingClientRect())
		}
		canvas.onmousedown =function(e){
			e.preventDefault()
			var point =windowToCanvas(e.clientX,e.clientY);
			isMouseDown = true;
			drawCanvasWidthMagnifter(true,point)
		}
		canvas.onmousemove = function(e){
			e.preventDefault()
			if(isMouseDown == true){
				var point =windowToCanvas(e.clientX,e.clientY);
				drawCanvasWidthMagnifter(true,point);
			}

		}
		canvas.onmouseup = function(e){
			e.preventDefault()
			isMouseDown =false;
			drawCanvasWidthMagnifter(false)
		}
		canvas.onmouseout = function(e){
			e.preventDefault()
			isMouseDown =false;
			drawCanvasWidthMagnifter(false)
		}
		function drawCanvasWidthMagnifter(isShowMagnifier,point){
			cxt.clearRect(0,0,canvas.width,canvas.height);
			cxt.drawImage(image,0,0,canvas.width,canvas.height);
			if(isShowMagnifier ==true){
				darwMaginfier(point);
			}
		}
		function darwMaginfier(point){
			var imageLG_cx = point.x * scaleX;
			var imageLG_cy = point.y * scaleY;

			var mr = 100;

			var sx = imageLG_cx-mr/2;
			var sy = imageLG_cy-mr/2;

			var dx = point.x-mr/2;
			var dy = point.y-mr/2;
			cxt.save();
			console.log(point.x);
			cxt.lineWidth=5.0;
			cxt.strokeStyle ="#069"
			cxt.beginPath();
			cxt.arc(point.x,point.y,mr/2,0,Math.PI*2);
			cxt.stroke();
			cxt.clip();
			cxt.drawImage(offCanvas,sx,sy,mr,mr,dx,dy,mr,mr);
			console.log(2*mr);
			cxt.restore();
		}
}