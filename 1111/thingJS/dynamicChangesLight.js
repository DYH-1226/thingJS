/**
 * 说明：设置天空盒背景、背景色、图片背景
 * 功能：点击按钮、更换背景
 * 教程：ThingJS教程——>效果和环境——>背景
 * 备注：天空盒其实就是将一个立方体展开，然后在六个面上贴上对应的贴图，在实际
 *      的渲染中，将这个立方体始终罩在场景摄像机的周围，让场景摄像机始终处于
 *      这个立方体的中心位置，然后根据视线与立方体的交点的坐标，来确定究竟要
 *      在哪一个面上进行纹理采样。
 * 难度：★☆☆☆☆
 */
 var x = 0; 
 var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/storehouse',
    skyBox: 'Night'  // 设置天空盒
});

app.on('load', function () {
    initThingJsTip("天空盒是一个包裹整个场景的立方体，可以很好地渲染并展示整个场景环境。</br>点击左侧按钮，设置天空盒效果、背景色以及背景图片。");

    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [14.929613003036518, 26.939904587373245, 67.14964454354718],
        'target': [2.1474740033704594, 17.384929223259824, 10.177959375514941],
        'time': 2000
    });
    new THING.widget.Button('动态光源角度', add)
    new THING.widget.Button('skyBlue', skyBlue)
    new THING.widget.Button('milkyWay', milkyWay)
    new THING.widget.Button('night', night)
    new THING.widget.Button('changeBackground',changeBackground)
})
// 环境光对象
var ambientLight = {
    intensity:0.4,
    color: '16777215',
};
// 半球光照
var hemisphereLight = {
    intensity:0,
    color: '16777215',
    groundColor: '2236962',
};
// 主灯光对象
var mainLight = {
    shadow:true,
    intensity:0.5,
    color: '16777215',
    alpha:x,
    beta:30,
};
// 第二光源对象
var secondaryLight = {
    shadow:false,
    intensity:0,
    color: '16777215',
    alpha:138,
    beta:0,
};
// 全局配置
var config = {
    showHelper:false,
    ambientLight,
    hemisphereLight,
    mainLight,
    secondaryLight
};
app.lighting = config;

addAlpha = () =>{
    x += .5;
    console.log(x)
    mainLight.alpha = x;
    app.lighting = config;
}

add = () =>{
    setInterval('addAlpha()',50)
}



// 设置天空盒（目前仅能使用系统内置天空盒效果）
function skyBlue(){
    app.skyBox = 'BlueSky';
}
function milkyWay(){
    app.skyBox = 'MilkyWay';
}
function night(){
    app.skyBox = 'Night';
}

//动态改变天空盒
changeBackground = () =>{
    new Promise(resolve =>{
        setTimeout(()=>{
            app.skyBox = 'BlueSky';
            resolve(1)
        },3000)
    }).then(()=>{
        new Promise(resolve=>{
            setTimeout(()=>{
                app.skyBox = 'MilkyWay';
                resolve(2)
            },1000)
        })
    }).then(()=>{
        new Promise(resolve=>{
            setTimeout(()=>{
                app.skyBox = 'Night';
                resolve(3)
            },2000)
        })
    })
}

new THING.widget.Button('多云', function () {
    app.skyBox = 'CloudySky';
});

new THING.widget.Button('灰白', function () {
    app.skyBox = 'White';
});
new THING.widget.Button('暗黑', function () {
    app.skyBox = 'Dark';
});

// 背景色颜色可使用十六进制颜色或rgb字符串
new THING.widget.Button('设置背景色1', function () {
    app.background = '#0a3d62';
})
new THING.widget.Button('设置背景色2', function () {
    app.background = 'rgb(68,114,196)';
})

// 图片可在资源、页面资源上传
// 上传完成后，点击需要使用的图片，即可在代码编辑器中出现图片url地址
// 也可直接使用能访问的网络图片url
new THING.widget.Button('设置背景图片1', function () {
    app.background = 'https://www.thingjs.com/static/images/background_img_01.png';
})
new THING.widget.Button('设置背景图片2', function () {
    app.background = 'https://www.thingjs.com/static/images/background_img_02.png';
})

// 清除背景效果
new THING.widget.Button('清除背景', function () {
    app.skyBox = null;
    app.background = null;
})