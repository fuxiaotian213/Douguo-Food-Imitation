var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
    function Page() {
        _classCallCheck(this, Page);
    }

    _createClass(Page, [{
        key: 'init',
        value: function init(offset, limit, num, fun) {
            var html = '';
            if (num == 0 || num <= limit) {
                return '';
            }
            var page = Math.floor(offset / limit) + 1;
            var total = Math.ceil(num / limit);

            html = '<div class="pages"><a href="javascript:;" onclick=\'' + (fun + '(' + 0 * limit + ',' + limit + ')') + '\' class="atou hide">\u9996\u9875</a>';
            if (page > 1) {
                html += '<a href="javascript:;" onclick=\'' + (fun + '(' + (page - 2) * limit + ',' + limit + ')') + '\' class="apre hide">\u4E0A\u4E00\u9875</a>';
            }
            var mintotal = page - 3 > 1 ? page - 3 : 1;
            var maxtotal = page + 3 > total ? total : page + 3;
            for (var i = mintotal; i <= maxtotal; i++) {
                if (i == page) {
                    html += '<a href="javascript:;" onclick=\'' + (fun + '(' + (i - 1) * limit + ',' + limit + ')') + '\' class="ali aon" >' + i + '</a>';
                } else {
                    html += '<a href="javascript:;" onclick=\'' + (fun + '(' + (i - 1) * limit + ',' + limit + ')') + '\' class="ali" >' + i + '</a>';
                }
            }
            if (page < total) {
                html += '<a href="javascript:;" onclick=\'' + (fun + '(' + page * limit + ',' + limit + ')') + '\' class="anext">\u4E0B\u4E00\u9875</a>';
            }
            html += '<a href="javascript:;" onclick=\'' + (fun + '(' + (total - 1) * limit + ',' + limit + ')') + '\' class="alast">\u672B\u9875</a></div>';
            var pageElement = document.getElementById("page");
            if (pageElement) {
                pageElement.innerHTML = '';
                pageElement.innerHTML = html;
            }
            // return html
        }
    }]);

    return Page;
}();
