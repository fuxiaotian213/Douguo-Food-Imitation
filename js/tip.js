function tip(options){
    var className = "fadetip";

    var text = options.text || "";
    var time = options.time || 1500;

    var div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    document.body.appendChild(div);
    
    // 简单的淡出动画
    fadeOut(div, time, function() {
        div.remove();
    });
}

// 淡出动画函数
function fadeOut(element, duration, callback) {
    element.style.opacity = '1';
    element.style.transition = 'opacity ' + duration + 'ms';
    setTimeout(function() {
        element.style.opacity = '0';
        setTimeout(callback, duration);
    }, 0);
}