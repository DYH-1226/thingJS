

// 加载场景代码 
var app = new THING.App({ 
    url: 'https://www.thingjs.com/static/models/chinesehouse'
 });

 // 创建Thing
 var streetLamp_1 = app.create({
     type: 'Thing',
     name: '路灯_01',
     url: '/api/models/8991cc645350493d9b7c41f655953665/0/gltf/', 
     position: [0, 0, 0],
     angle: 0,
     complete: function () {
         console.log('thing created: ' + this.id);
     }
 });
 
 // 创建Thing
 var streetLamp_2 = app.create({
     type: 'Thing',
     name: '路灯_02',
     url: '/api/models/8991cc645350493d9b7c41f655953665/0/gltf/', 
     position: [0, 0, -5],
     angle: 0,
     complete: function () {
         console.log('thing created: ' + this.id);
     }
 });
 
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
      curLight.lookAt([22.896792920707853,1.5295426731505646,-3.9718268718217367]);
  }
 
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
 
 app.on('load', function(ev) {
     app.lighting = {
         mainLight: {
             intensity: 0
         }
     };
     createSpotLight(THING.Math.addVector(streetLamp_1.position, [1, 6, 0]), streetLamp_2.position);
  })
 