
//   TODO (1): 设计时间切换，镜头运动轨迹
//      ----- 选择使用   app.camera.flyTo({
//                      position: [40.0, 10.0, 25.0],
//                      target: [8.0, -2.0, 4.0],
//                      time: 2000,
//                      });
//   TODO (2): time开始，执行time循环函数，到天黑，然后执行透明模型特效，添加边框闪烁
//      ------ async await 构建 new Promise函数
//
//   TODO (3): 再次点击，从黑夜变成白天，模型恢复正常。
//
//
//




// 加载场景

var app = new THING.App({
    url:'https://www.thingjs.com/static/models/storehouse'  //场景地址

})

app.on('load',function(){
     
    new THING.widget.Button('autoTime',autoTime)
})

// 天空默认效果
 var effect = {
    showHelper:undefined, // 显示光源位置
    turbidity:10, // 光源扩散大小
    rayleigh:2, // 大气散射
    time:0, // 时间 [0~24]
    beta:30, // 水平角度
};
app.skyEffect = effect;

new Promise(function changeX(){
    if(x>24){
        return
    }else{
        x += .01;
        console.log(x)
        effect.time = x;
        app.skyEffect = effect;
    }
})

new Promise(function autoTime(){
    setInterval('changeX()',2)
})




async function myFetch() {
    let response = await changeX();
}
 

obj = app.create({
    type: 'building',
    name: 'City_002_Y002',
    url: '/api/models/250d2e0c56d5477e8bc6422c4877442a/0/gltf/', 
    position: [18, 0, 8],
    style: {
        image: 'https://www.thingjs.com/citybuilder_console/upload/lineIcons/3d/lightFlow_strip05.png'
    }
});