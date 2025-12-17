//底部加关注
var J=false;
window.addEventListener('scroll', function() {
	var C=document.documentElement.scrollHeight-window.innerHeight-window.pageYOffset;
	if(C<=600&&!J){
		var B=document.createElement('iframe');
		B.setAttribute('width','136');
		B.setAttribute('height','24');
		B.setAttribute('frameborder','0');
		B.setAttribute('allowtransparency','true');
		B.setAttribute('marginwidth','0');
		B.setAttribute('marginheight','0');
		B.setAttribute('scrolling','no');
		B.setAttribute('border','0');
		B.setAttribute('src','https://widget.weibo.com/relationship/followbutton.php?language=zh_cn&width=136&height=24&uid=1647910344&style=2&;btn=light&dpc=1');
		var bonefans = document.querySelector('.bonefans');
		if(bonefans){
			bonefans.appendChild(B);
		}
		var D=document.createElement('iframe');
		D.setAttribute('frameborder','0');
		D.setAttribute('allowtransparency','true');
		D.setAttribute('scrolling','no');
		D.setAttribute('border','0');
		D.setAttribute('src','http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F2272056371&type=button_num&width=400&height=30&style=2');
		D.style.width='120px';
		D.style.height='30px';
		D.style.border='none';
		D.style.overflow='hidden';
		var A=document.createElement('iframe');
		A.setAttribute('width','178');
		A.setAttribute('height','24');
		A.setAttribute('frameborder','0');
		A.setAttribute('allowtransparency','true');
		A.setAttribute('scrolling','auto');
		A.setAttribute('marginwidth','0');
		A.setAttribute('marginheight','0');
		A.setAttribute('src','http://follow.v.t.qq.com/index.php?c=follow&a=quick&name=douguomeishi&style=5&t=1351091457260&f=1');
		J=true
	}
});
//关注
function guanzhu(that,user_id,_token,isMutual){
    var action = that.getAttribute("data-action").trim();
    
    // 模拟数据返回，用于测试弹窗功能
    var res = { errcode: 0, data: { rel: 1 } };
    
    if(action=="add"){
	if(res.data.rel==1){
		that.innerHTML = "已关注";
		tip({text: '关注成功', time: 1500});
	}else if(res.data.rel==3){
		if(isMutual==1){
			that.innerHTML = "互相关注";
			tip({text: '互相关注成功', time: 1500});
		}else{
			that.innerHTML = "已关注";
			tip({text: '关注成功', time: 1500});
		}
	}
	that.setAttribute("data-action","cancel");
	that.classList.add("hasgz");
    }else{
        that.setAttribute("data-action","add");
        that.innerHTML = "<span class='addicon'>＋</span> 关注";
        that.classList.remove("hasgz");
        tip({text: '已取消关注', time: 1500});
    }
}
//笔记点赞

// 关闭弹窗
function cmask(){
	var smask = document.querySelector(".fu_smask");
	var fancbox = document.querySelector(".fu_fancbox");
	if(smask) smask.style.display = 'none';
	if(fancbox) fancbox.style.display = 'none';
}
// 弹出登录框
function logshow(){
	var smask = document.querySelector(".fu_smask");
	var logbox = document.querySelector("#fu_log_box");
	if(smask) smask.style.display = 'block';
	if(logbox) logbox.style.display = 'block';
}
//上传食材图片


//删除提示框
function showMotai(title,callback) {
    var box = document.createElement("div");
    var btm = document.createElement("div");
    var infoBox = document.createElement("div");
    var remindInfo = document.createElement("p");
    var submit = document.createElement("button");
    var cancel = document.createElement("button");
    //整个模态框
    box.setAttribute("id", "deleteMotai");
    box.setAttribute("style", 'position: fixed;top: 0;left: 0;width:100vw;height: 100vh;');
    //底部遮罩层
    btm.setAttribute("style", "height: 100vh;background: black;opacity: 0.5;z-index: 999;");
    btm.onclick = function () {
        hiddenMotai()
    };
    //提示信息框
    infoBox.setAttribute("style", "position: fixed;width:420px;height:191px;margin-left:-210px;margin-top:-145px;top: 50%;left: 50%;background: #fff;border-radius: 8px;z-index: 1000;text-align: center;font-size: 0;");
    //提示信息
    remindInfo.setAttribute("style","margin-top:50px;margin-bottom:60px;font-size: 20px;line-height: 20px;text-align: center;font-weight: bold");
    remindInfo.innerHTML = title ;
    //确认按钮
    submit.innerHTML = "确认";
    submit.setAttribute("style","width:183px;height:42px;margin-right:10px;padding:0;border-radius:4px;background:#FFB31A;font-size: 18px;border: none;color: #ffffff;outline: none;cursor: pointer;")
    //取消按钮
    cancel.innerHTML = "取消";
    cancel.setAttribute("style", "width:183px;height:42px;padding:0;border-radius:4px;background:#cccccc;font-size: 18px;border: none;color: #ffffff;outline: none;cursor: pointer;");

    box.appendChild(btm);
    box.appendChild(infoBox);
    infoBox.appendChild(remindInfo);
    infoBox.appendChild(submit);
    infoBox.appendChild(cancel);
    document.body.appendChild(box);

    submit.onclick = function () {
        hiddenMotai();
        callback();
    };

    cancel.onclick = function () {
        hiddenMotai()
    };

}

//隐藏模态框
function hiddenMotai() {
    var deleteMotai = document.getElementById("deleteMotai");
    document.body.removeChild(deleteMotai);
}

function uploadImg(option) {
    if(typeof option.id == 'undefined'){
        throw "must appoint file id";
    }
    var id = option.id;
    var type = 4;
    var user_id = 0;

    if(typeof option.type !== 'undefined'){
        type = option.type;
    }
    if(typeof option.user_id !== 'undefined'){
        user_id = option.user_id;
    }

    var formFile = new FormData();
    var fileObj = document.getElementById(id).files.item(0);

    formFile.append("image", fileObj);
    formFile.append("type", type);
    formFile.append("user_id", user_id);
    
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://upload.qa.douguo.com/upload/image', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            if(typeof option.success === 'function') {
                option.success(result);
            }
        }
    };
    xhr.send(formFile);
}

function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}
function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}
function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}
function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}
function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}
function core_md5(a, b) {
    a[b >> 5] |= 128 << b % 32,
        a[(b + 64 >>> 9 << 4) + 14] = b;
    for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
        var h = c
            , i = d
            , j = e
            , k = f;
        c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936),
            f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586),
            e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819),
            d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330),
            c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897),
            f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426),
            e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341),
            d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983),
            c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416),
            f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417),
            e = md5_ff(e, f, c, d, a[g + 10], 17, -42063),
            d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162),
            c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682),
            f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101),
            e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290),
            d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329),
            c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510),
            f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632),
            e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713),
            d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302),
            c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691),
            f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083),
            e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335),
            d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848),
            c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438),
            f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690),
            e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961),
            d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501),
            c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467),
            f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784),
            e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473),
            d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734),
            c = md5_hh(c, d, e, f, a[g + 5], 4, -378558),
            f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463),
            e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562),
            d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556),
            c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060),
            f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353),
            e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632),
            d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640),
            c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174),
            f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222),
            e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979),
            d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189),
            c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487),
            f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835),
            e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520),
            d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651),
            c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844),
            f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415),
            e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905),
            d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055),
            c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571),
            f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606),
            e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523),
            d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799),
            c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359),
            f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744),
            e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380),
            d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649),
            c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070),
            f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379),
            e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259),
            d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551),
            c = safe_add(c, h),
            d = safe_add(d, i),
            e = safe_add(e, j),
            f = safe_add(f, k)
    }
    return Array(c, d, e, f)
}
function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}
function md5_ff(a, b, c, d, e, f, g) {
    return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}
function md5_gg(a, b, c, d, e, f, g) {
    return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}
function md5_hh(a, b, c, d, e, f, g) {
    return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}
function md5_ii(a, b, c, d, e, f, g) {
    return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}
function core_hmac_md5(a, b) {
    var c = str2binl(a);
    c.length > 16 && (c = core_md5(c, a.length * chrsz));
    for (var d = Array(16), e = Array(16), f = 0; 16 > f; f++)
        d[f] = 909522486 ^ c[f],
            e[f] = 1549556828 ^ c[f];
    var g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz);
    return core_md5(e.concat(g), 640)
}
function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b)
        , d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}
function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}
function str2binl(a) {
    for (var b = Array(), c = (1 << chrsz) - 1, d = 0; d < a.length * chrsz; d += chrsz)
        b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
    return b
}
function binl2str(a) {
    for (var b = "", c = (1 << chrsz) - 1, d = 0; d < 32 * a.length; d += chrsz)
        b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
    return b
}
function binl2hex(a) {
    for (var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++)
        c += b.charAt(a[d >> 2] >> d % 4 * 8 + 4 & 15) + b.charAt(a[d >> 2] >> d % 4 * 8 & 15);
    return c
}
function binl2b64(a) {
    for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; d < 4 * a.length; d += 3)
        for (var e = (a[d >> 2] >> 8 * (d % 4) & 255) << 16 | (a[d + 1 >> 2] >> 8 * ((d + 1) % 4) & 255) << 8 | a[d + 2 >> 2] >> 8 * ((d + 2) % 4) & 255, f = 0; 4 > f; f++)
            c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(e >> 6 * (3 - f) & 63);
    return c
}
var hexcase = 0
    , b64pad = ""
    , chrsz = 8;
// 登录
function login(){
    var cellphone = document.querySelector(".cellphone").value;
    var passp = document.getElementById("passport").value;
    var phonepreg = /^1[3456789]\d{9}$/;
    var cellerr = document.querySelector("#log-box .cellerr");
    var pwerr = document.querySelector("#log-box .pwerr");

    if(cellphone.length <= 0)
    {
        cellerr.innerHTML = '请输入正确的手机号码';
        return false;
    }else if(!phonepreg.test(cellphone)){
        cellerr.innerHTML = '请输入正确的手机号码';
        return false;
    }
    if(passp === ""){
        cellerr.innerHTML = '';
        pwerr.innerHTML = '请填写密码';
        return false;
    }
    
    // 原生JavaScript实现JSONP
    var script = document.createElement('script');
    script.src = 'https://passport.douguo.com/layout/login?callback=showmsg&username=' + cellphone + '&password=' + hex_md5(passp) + '&code=code&agent_type=web';
    document.body.appendChild(script);
    script.onload = function() {
        document.body.removeChild(script);
    };
}
function showmsg(res) {
    if(res.errno!==0){
        tip({text:res.errmsg})
    }else{
        window.location.href=window.location.href;
    }
}
function checkPhone() {
    var mobileElement = document.getElementById("fu_mobile");
    if (!mobileElement) return false;
    
    var cellphone = mobileElement.value.trim();
    var phonepreg = /^1[3456789]\d{9}$/;
    var cellerrElements = document.querySelectorAll(".fu_cellerr");
    
    if (cellphone.length <= 0) {
        cellerrElements.forEach(function(element) {
            element.innerHTML = '请填写您的手机号码';
        });
        return false;
    } else if (cellphone.length !== 11) {
        cellerrElements.forEach(function(element) {
            element.innerHTML = '手机号码必须为11位数字';
        });
        return false;
    } else if (!phonepreg.test(cellphone)) {
        cellerrElements.forEach(function(element) {
            element.innerHTML = '手机号码格式不正确，请输入11位有效数字';
        });
        return false;
    } else {
        cellerrElements.forEach(function(element) {
            element.innerHTML = '';
        });
        return true;
    }
}

