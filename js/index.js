//ios兼容，离开页面再回来，飞速轮播
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
	hidden = "mozHidden";
	visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}
// 监听是否离开当前页面
document.addEventListener(visibilityChange, function() {
	if(document[hidden]){
		clearTimeout(timer);
		timer=null;
	}else{
		starttimer();
	}
}, false);
// 简单的动画函数
function animate(element, styles, duration, callback) {
	clearInterval(element.animationId);
	var start = {};
	var end = {};
	for (var prop in styles) {
		start[prop] = parseFloat(getComputedStyle(element)[prop]);
		end[prop] = parseFloat(styles[prop]);
	}
	var startTime = performance.now();
	function step(currentTime) {
		var elapsed = currentTime - startTime;
		var progress = Math.min(elapsed / duration, 1);
		for (var prop in start) {
			element.style[prop] = start[prop] + (end[prop] - start[prop]) * progress + (styles[prop].includes('px') ? 'px' : '');
		}
		if (progress < 1) {
			element.animationId = requestAnimationFrame(step);
		} else {
			if (callback) callback();
		}
	}
	element.animationId = requestAnimationFrame(step);
}
// 初始化
var index=1;
var timer=null;
// 获取轮播图容器的实际宽度
function getBannerWidth() {
    var banner = document.getElementById("banner");
    return banner ? banner.offsetWidth : 1000;
}
function starttimer(){
	clearTimeout(timer);
	timer=null;
	timer=setTimeout(function(){
		index+=1;
		var sw=getBannerWidth();
		var fu_blist = document.querySelector(".blist");
		if (fu_blist) {
			animate(fu_blist, {left: -index*sw+"px"}, 500, function() {
				// 动画完成后检查是否需要重置位置
				if(index==(pnum+1)){
					index=1;
					fu_blist.style.left = -index*sw+"px";
				}
			});
		}
		var fu_bpagesLi = document.querySelectorAll(".bpages li");
		fu_bpagesLi.forEach(function(li) {
			li.classList.remove("act");
		});
		if (fu_bpagesLi[index-1]) {
			fu_bpagesLi[index-1].classList.add("act");
		}
		starttimer();
	},2500);//定时
}
var sw=parseInt(window.innerWidth);
sw = sw<1000?1000:sw;
if(pnum>1){
	var blist = document.querySelector(".blist");
	if (blist) {
		blist.style.left = -index*sw+"px";
	}
	starttimer();
}
// 向左
var prev = document.querySelector(".prev");
if (prev) {
	prev.addEventListener("click", function(){
		index-=1;
		var sw=getBannerWidth();
		var blist = document.querySelector(".blist");
		if (blist) {
			if(index==0){
				// 当从第1张向左切换到第3张时，先将列表位置设为第3张之后，然后平滑过渡到第3张
				blist.style.left = -(pnum+1)*sw+"px";
				index=pnum;
				animate(blist, {left: -index*sw+"px"}, 500);
			} else {
				animate(blist, {left: -index*sw+"px"}, 500);
			}
		}
		var bpagesLi = document.querySelectorAll(".bpages li");
		bpagesLi.forEach(function(li) {
			li.classList.remove("act");
		});
		if (bpagesLi[index-1]) {
			bpagesLi[index-1].classList.add("act");
		}
	});
}
// 向右
var next = document.querySelector(".next");
if (next) {
	next.addEventListener("click", function(){
		index+=1;
		var sw=getBannerWidth();
		var fu_blist = document.querySelector(".blist");
		if (fu_blist) {
			animate(fu_blist, {left: -index*sw+"px"}, 500, function() {
				// 动画完成后检查是否需要重置位置
				if(index==(pnum+1)){
					index=1;
					fu_blist.style.left = -index*sw+"px";
				}
			});
		}
		var bpagesLi = document.querySelectorAll(".bpages li");
		bpagesLi.forEach(function(li) {
			li.classList.remove("act");
		});
		if (bpagesLi[index-1]) {
			bpagesLi[index-1].classList.add("act");
		}
	});
}
// 鼠标悬停暂停滚动
var fu_banner = document.getElementById("banner");
if (fu_banner) {
	fu_banner.addEventListener("mouseenter", function(){
		clearTimeout(timer);
		timer = null;
	});
	fu_banner.addEventListener("mouseleave", function(){
		if(!timer){
			clearTimeout(timer);
			timer = null;
			starttimer();
		}
	});
}
// 页码跳转
var bpages = document.querySelector(".bpages");
if (bpages) {
	bpages.addEventListener("click", function(e) {
		if (e.target.tagName === "LI") {
			clearTimeout(timer);
			sw=parseInt(window.innerWidth);
			sw = sw<1000?1000:sw;
			newindex = parseInt(e.target.getAttribute("data-page"));
			var fu_blist = document.querySelector(".blist");
			if (fu_blist) {
				if(index==pnum && newindex==1){
					animate(fu_blist, {left: -(pnum+1)*sw+"px"}, 500, function() {
						fu_blist.style.left = -1*sw+"px";
					});
				}else{
					animate(fu_blist, {left: -newindex*sw+"px"}, 500);
				}
			}
			index=newindex;
			e.target.classList.add("act");
			var siblings = Array.from(e.target.parentNode.children);
			siblings.forEach(function(sibling) {
				if (sibling !== e.target) {
					sibling.classList.remove("act");
				}
			});
		}
	});
}
// 更新头部未读消息数
var xhr = new XMLHttpRequest();
xhr.open('GET', '/message/unread?user_id=' + user_id);
xhr.onreadystatechange = function() {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200) {
			var res = JSON.parse(xhr.responseText);
			var header = document.getElementById("header");
			if (header) {
				var msgnum = header.querySelector(".msgnum");
				var boll = header.querySelector(".boll");
				if (msgnum && boll) {
					if(res.data.unread_count > 0){
						msgnum.style.display = "block";
						boll.style.display = "inline-block";
					}else{
						msgnum.style.display = "none";
						boll.style.display = "none";
					}
					msgnum.textContent = res.data.unread_count;
				}
			}
		}
	}
};
xhr.send();
// 窗口大小改变时重新计算轮播图宽度
window.addEventListener("resize", function() {
    var sw=getBannerWidth();
    var blist = document.querySelector(".blist");
    if (blist) {
        blist.style.left = -index*sw+"px";
    }
});