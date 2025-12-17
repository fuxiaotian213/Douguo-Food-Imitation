// 搜索
toHex.hexchars = "0123456789ABCDEF";
// 初始化全局变量
var currentSelIndex = -1;
var oldSelIndex = -1;

function toHex(B) {
	return toHex.hexchars.charAt(B >> 4) + toHex.hexchars.charAt(B & 15)
}
utfurl.okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function Search() {
	var B = "/caipu";
	var searchInput = document.getElementById("fu_global_search_inpt");
	if (searchInput && (searchInput.value == "" || searchInput.value == "搜索菜谱、菜单、食材、用户")) {
		searchInput.value = "搜索菜谱、菜单、食材、用户";
		location.href = B;
		return false;
	} else if (searchInput) {
		location.href = B+"/"+encodeURIComponent(searchInput.value);
	}
	return false;
}
var searchInput = document.getElementById("fu_global_search_inpt");
if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
            Search();
        }
    });
}
function Search2() {
	var searchForm = document.getElementById("searchForm2");
	var searchInput = document.getElementById("global_search_inpt2");
	var B = searchForm ? searchForm.getAttribute("action") : "/caipu";
	if (searchInput && (searchInput.value == "" || searchInput.value == "搜索菜谱、菜单、食材、用户")) {
		searchInput.value = "搜索菜谱、菜单、食材、用户";
		location.href = B + buildURL("");
		return false;
	} else if (searchInput) {
		location.href = B + buildURL(searchInput.value);
	}
	return false;
}
function buildURL(B) {
	B = B.replace(/^\s+|\s+$/g, "");
	B = B.replace(/\"/g, "”");
	B = B.replace(/\*/g, "");
	if (B == "") {
		return ""
	}
	s = utfurl(B);
	s = s.replace(/%20/g, "+");
	return s.replace(/%(5E|2E|2D|2F|3B|3F|40|2C|26|3A|3D|2B|24)/g, "_$1")
}
function utfurl(H) {
	var H = toutf8(H);
	var F;
	var E = "";
	for (var G = 0; G < H.length; G++) {
		if (utfurl.okURIchars.indexOf(H.charAt(G)) == -1) {
			E += "%" + toHex(H.charCodeAt(G))
		} else {
			E += H.charAt(G)
		}
	}
	return E
}
function toutf8(H) {
	var G, J;
	var F = "";
	var I = 0;
	while (I < H.length) {
		G = H.charCodeAt(I++);
		if (G >= 56320 && G < 57344) {
			continue
		}
		if (G >= 55296 && G < 56320) {
			if (I >= H.length) {
				continue
			}
			J = H.charCodeAt(I++);
			if (J < 56320 || G >= 56832) {
				continue
			}
			G = ((G - 55296) << 10) + (J - 56320) + 65536
		}
		if (G < 128) {
			F += String.fromCharCode(G)
		} else {
			if (G < 2048) {
				F += String.fromCharCode(192 + (G >> 6), 128 + (G & 63))
			} else {
				if (G < 65536) {
					F += String.fromCharCode(224 + (G >> 12), 128 + (G >> 6 & 63), 128 + (G & 63))
				} else {
					F += String.fromCharCode(240 + (G >> 18), 128 + (G >> 12 & 63), 128 + (G >> 6 & 63), 128 + (G & 63))
				}
			}
		}
	}
	return F
}
// 搜索建议词
function selectItem(D) {
	var globalSearchInpt = document.getElementById("fu_global_search_inpt");
	if (!globalSearchInpt) return;
	
	// 获取搜索内容
	searchContent = removeHTMLTag(globalSearchInpt.value);
	// 模拟搜索建议数据，与用户预期一致
	var mockSuggestions = ["减肥餐", "家常菜", "南瓜", "月子餐", "饼干", "宵夜", "土豆", "快手菜", "早餐", "口水鸡"];
	var B = '<ul id="ulItems">';
	for (i = 0; i < mockSuggestions.length; i++) {
		modnm = i + 1;
		B += '<li id="li_' + i + '" class="trackClick" module="42" onclick=searchJump(\'recipe\',\'' + mockSuggestions[i] + '\')><i>' + modnm + '.</i> <span id="si_' + i + '" class="op">' + mockSuggestions[i] + '</span></li>'
	}
	B += '</ul>';
	var sugg2 = document.getElementById("fu_mysu2");
	if (sugg2) {
		// 总是显示搜索建议，无论是点击还是输入
		sugg2.innerHTML = B;
		sugg2.style.display = 'block';
	}
	var ulItems = document.getElementById("ulItems");
	var C = ulItems ? ulItems.querySelectorAll("li").length : 0;
	if (D.keyCode == 38 || D.keyCode == 40) {
		if (C > 0) {
			oldSelIndex = currentSelIndex;
			if (D.keyCode == 38) {
				if (currentSelIndex == -1) {
					currentSelIndex = C - 1
				} else {
					currentSelIndex = currentSelIndex - 1;
					if (currentSelIndex < 0) {
						currentSelIndex = C - 1
					}
				}
				if (currentSelIndex != -1) {
					document.getElementById("li_" + currentSelIndex).style.backgroundColor = "#eaeaea";
					globalSearchInpt.value = document.getElementById("si_" + currentSelIndex).innerText
				}
				if (oldSelIndex != -1) {
					document.getElementById("li_" + oldSelIndex).style.backgroundColor = "#f4f4f4"
				}
			}
			if (D.keyCode == 40) {
				if (currentSelIndex == C - 1) {
					currentSelIndex = 0
				} else {
					currentSelIndex = currentSelIndex + 1;
					if (currentSelIndex > C - 1) {
						currentSelIndex = 0
					}
				}
				if (currentSelIndex != -1) {
					document.getElementById("li_" + currentSelIndex).style.backgroundColor = "#eaeaea";
					globalSearchInpt.value = document.getElementById("si_" + currentSelIndex).innerText
				}
				if (oldSelIndex != -1) {
					document.getElementById("li_" + oldSelIndex).style.backgroundColor = "#f4f4f4"
				}
			}
		}
	} else {
		if (D.keyCode == 13) {
			if (ulItems && ulItems.style.display != "none" && C > 0 && currentSelIndex != -1) {
				globalSearchInpt.value = document.getElementById("si_" + currentSelIndex).innerText;
				ulItems.style.display = "none";
				currentSelIndex = -1;
				oldSelIndex = -1
			}
		}
	}
}

function searchJump(C, D) {
	var globalSearchInpt = document.getElementById("fu_global_search_inpt");
	// 隐藏搜索建议
	var sugg2 = document.getElementById("fu_mysu2");
	if (sugg2) {
		sugg2.style.display = 'none';
	}
	if (globalSearchInpt) {
		globalSearchInpt.value = D;
	}
	if (C == 'recipe')
	{
		url = "/caipu/" + D;
	}else{
		url = "/search/" + C + "/" + D;
	}
	window.location.href = url;
}

function removeHTMLTag(B) {
	B = B.replace(/"/g, "");
	B = B.replace(/<\/?[^>]*>/g, "");
	B = B.replace(/<!*/g, "");
	B = B.replace(/\/>*/g, "");
	B = B.replace(/[ | ]*\n/g, "\n");
	B = B.replace(/"|'|-|<|>*/g, "");
	B = B.replace(/ /ig, "");
	return B
}