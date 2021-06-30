/**
 * 说明：创建聚光灯
 *      通过 app.create 生成聚光灯，具体参数调节
 *      按住'shift' 聚光灯可以追踪鼠标位置(开启'跟随物体'后失效)
 * 备注：场景中聚光灯数量过多会影响渲染性能
 * 难度：★☆☆☆☆
 */


// 加载场景代码 
var app = new THING.App({ 
    url: '/api/scene/a001878433268953dedcd86b'
 });
 /**
  * 引入场景预览脚本
  * 说明：引用该脚本需要传递参数，参数为创建的app对象、类型type，type的值有两种，scene和city，
  *      用于区分园区和地图、如果type值为city，需要额外传递参数，参数值为创建的map对象。
  * 注：
  *     1. 如果引入该脚本是预览园区，初始化方法示例为：init(app, 'scene', null)
  *     2. 如果引入该脚本是预览地图，则应在引用地图组件脚本complete回调中引用，初始化方法示例为：init(app, 'city', event.object)
  */
 // THING.Utils.dynamicLoad(['/uploads/wechat/5oiR5pyJ5pyA6ZW/55qE572R5ZCN5LiN5L+h5L2g5pWw5pWw/file/ScenePreview/AppPreview.v0.1.2.js'],
 //     function () {
 //         init(app, 'scene', null);  // 执行初始化
 //     }
 // )
 
 
 // 参数
 var dataObj = {
     'type': 'SpotLight',
     'lightAngle': 30,
     'intensity': 1,
     'penumbra': 0.5,
     'castShadow': false,
     'position': null,
     'height': 0,
     'color': 0xFFFFFF,
     'distance': null,
     'target': null,
     'helper': true,
     'follow': true,
 };
 // 叉车
 let car1;
 let car2;
 // 当前灯光
 let curLight;
 let curLightPosition;
 // 创建聚光灯方法
 function createSpotLight(position, target) {
     dataObj['lightAngle'] = 30;
     dataObj['intensity'] = 0.5;
     dataObj['penumbra'] = 0.5;
     dataObj['castShadow'] = false;
     dataObj['position'] = position;
     dataObj['distance'] = 25;
     dataObj['color'] = 0xFFFFFF;
     dataObj['helper'] = true;
     dataObj['follow'] = true;
     //创建聚光灯
     var spotLight = app.create(dataObj);
     curLight = spotLight;
     curLightPosition = spotLight.position;
     createSpotLightControlPanel(spotLight);
     curLight.lookAt([22.896792920707853,1.5295426731505646,-3.9718268718217367]);
 }
 
 /**
  * 灯光控制面板
  */
 function createSpotLightControlPanel() {
     var panel = new THING.widget.Panel({
         isDrag: true,
         titleText: "灯光参数调整",
         width: '260px',
         hasTitle: true
     });
     // 设置 panel 位置    
     panel.position = [10, 35];
     panel.addNumberSlider(dataObj, 'lightAngle').caption('灯光角度').step(1).min(0).max(180).isChangeValue(true).on('change', function(value) {
         curLight.lightAngle = value;
     });
     panel.addNumberSlider(dataObj, 'intensity').caption('亮度').step(0.01).min(0).max(1).isChangeValue(true).on('change', function(value) {
         curLight.intensity = value;
     });
     panel.addNumberSlider(dataObj, 'penumbra').caption('半影').step(0.01).min(0).max(1).isChangeValue(true).on('change', function(value) {
         curLight.penumbra = value;
     });
     panel.addNumberSlider(dataObj, 'distance').caption('距离').step(0.1).min(0).max(200).isChangeValue(true).on('change', function(value) {
         curLight.distance = value;
     });
     panel.addNumberSlider(dataObj, 'height').caption('高度').step(0.1).min(0).max(200).isChangeValue(true).on('change', function(value) {
         curLight.position = [curLightPosition[0], curLightPosition[1] + value, curLightPosition[2]];
     });
     panel.addBoolean(dataObj, 'castShadow').caption('影子').on('change', function(value) {
         curLight.castShadow = value;
     });
     panel.addBoolean(dataObj, 'helper').caption('辅助线').on('change', function(value) {
         curLight.helper = value;
     });
     panel.addBoolean(dataObj, 'follow').caption('跟随物体').on('change', function(value) {
         if (value) {
             curLight.lookAt(car1);
         } else {
             curLight.lookAt(null);
         }
     });
     panel.addColor(dataObj, 'color').caption('颜色').on('change', function(value) {
         curLight.lightColor = value;
     });
 
 }
 
 /**
  * 注册鼠标移动事件,检查是否按下'shift'键, 按下设置聚光灯跟随鼠标位置
  */
 app.on('mousemove', function(ev) {
     if (!curLight) {
         return;
     }
 
     if (!ev.shiftKey) {
         return;
     }
 
     var pickedPosition = ev.pickedPosition;
     console.log(ev.pickedPosition)
     if (pickedPosition) {
         curLight.lookAt(pickedPosition);
     }
 })
 
 /**
  * 注册场景load事件
  */
 app.on('load', function(ev) {
     // createTip();
     // 主灯强度设置为0,突出聚光灯效果
     app.lighting = {
         mainLight: {
             intensity: 0
         }
     };
 
     // 获取场景内id为'car01' 和 'car02' 的叉车
     car1 = app.query('ludeng111')[0];
     car2 = app.query('路灯2222')[0];
     floor1 = app.query('#floor111111')[0];
     floor2 = app.query('#floor22222')[0];

     floor1.style.color = '#DDA0DD';
     floor2.style.color = '#F0E68C';
     // 参数1: 在car2上方5米创建一个聚光灯
     // 参数2: 初始target设置为car1的位置
     createSpotLight(THING.Math.addVector(car2.position, [1, 6, 0]), car1.position);
 
     // 创建一个圆形路径
     var path = [];
     var radius = 6;
     for (var degree = 0; degree <= 360; degree += 10) {
         var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
         var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
         path.push(THING.Math.addVector(car1.position, [x, 0, z]));
     }
     // 让 car1 沿圆形路径运动
     car1.movePath({
         orientToPath: true, // 物体移动时沿向路径方向
         path: path,
         time: 10 * 1000,
         loopType: THING.LoopType.Repeat // 循环类型
     });
 
     initThingJsTip("左侧面板可对灯光参数进行调整。按住 shift 键，聚光灯可追踪鼠标位置");
     $(".warninfo3").css("left", "55%");
 })




obj1 = {
    "type":"Ground",
    "id":"1",
    "name":"1",
    "position":[0,0,0],
    "angles":[0,0,0],
    "scale":[1,1,1],
    "style":{
        "color":null,
        "opacity":1,
        "outlineColor":null,
        "alwaysOnTop":false,
        "glow":false,
        "innerGlow":false,
        "renderOrder":0
    }
}


obj2 = {"type":"Ground","id":"1","name":"1","position":[0,0,0],"angles":[0,0,0],"scale":[1,1,1],"style":{"color":null,"opacity":1,"outlineColor":null,"alwaysOnTop":false,"glow":false,"innerGlow":false,"renderOrder":0}}



obj3 = {
    "type":"Thing","id":"ludeng111","name":"ludeng111","position":[6.4489999,0.010000000000000009,-0.494],"angles":[0,0,0],"scale":[1,1,1],"style":{"color":null,"opacity":1,"outlineColor":null,"alwaysOnTop":false,"glow":false,"innerGlow":false,"renderOrder":0},"url":"https://model.3dmomoda.com/models/8991cc645350493d9b7c41f655953665/0/gltf"}