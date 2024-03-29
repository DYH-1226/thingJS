/**
 * 说明：引用 js、css 资源
 * 	    默认js脚本和css样式会带上时间戳，且按urls数组中的顺序加载
 *      平台资源上传可点击查看链接 http://developer.thingjs.com/forum.php?mod=viewthread&tid=455
 *      示例中twitter-bootstrap, moment均为外部资源，因网络原因拷贝到了thingjs网站目录
 * 难度：★★☆☆☆
 */

 THING.Utils.dynamicLoad([
    '/static/vendor/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
    '/static/vendor/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
    '/static/vendor/moment/moment.js'],
    function () {
        // 加载场景代码 
        var app = new THING.App({
            url: 'https://www.thingjs.com/static/models/storehouse'
        });

        // 加载场景后执行
        app.on('load', function (ev) {
            var btn = createButton();
            createHtml(); 
            //  页面元素点击事件
            btn.on('click', function () {
                // 使用 moment 库获取当前时间
                var now = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log(now);
            })
        });
    })

/**
 * 利用模板字符串 创建页面元素并添加到div2d中
 */
function createButton() {
    // 使用 bootstrap 样式
    var template =
        `<button class="btn btn-default" type="button" style="position:absolute;left:20px;top:20px;z-index:2">当前时间</button>`;
    var btn = $('#div2d').append($(template));

    return btn;
}

// 以下脚本为例程提示说明专用
function createHtml() {
var html =
    `<div class="alert alert-warning warninfo3" role="alert" style="max-width:530px;font-size:16px;color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;position: absolute;top: 50px;left: 50%;transform: translateX(-50%);z-index: 999;padding: 15px;margin-bottom: 20px;border: 1px solid transparent;border-radius: 4px;">
    制作项目过程中，平台支持上传页面资源， js 和 css 可以通过 dynamicLoad 进行引用
    </div>`;
    $('#div2d').append($(html));
}