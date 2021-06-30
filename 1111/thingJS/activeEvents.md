#### 白天黑夜函数
- app.update

- changeWhite
- changeBlack
- 夜晚路灯效果

#### 定时器启动与清理
```javascript
  // 定义定时任务
  function func(){console.log("hello")} 
  //启动定时器,func是参数，所以不能使用括号
  var interval = setInterval(func, 2000); //启动,func不能使用括号
  // 停止定时器
  /clearInterval(interval );
  // //重新启动即可
  interval = setInterval(func, 2000); 
```

#### 转换视角

- 开场园区进入视角，摄像机飞行 A ---> B
```javascript
    app.camera.flyTo({
        'position': [14.929613003036518, 26.939904587373245, 67.14964454354718], //飞行终点B的坐标
        'target': [2.1474740033704594, 17.384929223259824, 10.177959375514941], //初始坐标A
        'time': 2000
    });
```

- 使用函数，打印camera的position和target 
```javascript

  console.log(app.camera.position)
  console.log(app.camera.target)
189.76377100890974,112.28771242212646,228.74073664247607------4.472,0.069,-97.685

2.607059096627628,137.3181982302635,155.6841459302317------2.9548203329970244,-0.5610923573313249,-102.85794597312325
```

- 点击事件函数，点击物体，摄像机飞行 fitObject()

```javascript
  // 摄像机飞行到某位置
    app.camera.flyTo({
        object: obj,
        xAngle: 45,  // 绕物体自身X轴旋转角度
        yAngle: 90,  // 绕物体自身Y轴旋转角度
        radiusFactor: 3,  // 物体包围盒半径的倍数
        time: 2 * 1000,
        complete: function () {
        }
    });
```

#### 地图道路建筑群
```javascript
  //todo::

```


#### 闲置场景

- 场景缓慢旋转 展示状态

```javascript
  // 摄像机旋转 初始摄像机位置[3.692,0.02,-189.385]
    new THING.widget.Button('摄像机旋转', function () {
        initThingJsTip("摄像机同时环绕 Y 轴、X 轴旋转10度");
        app.camera.rotateAround({
            target: app.camera.target,
            yRotateAngle: 10,  // 环绕Y轴旋转角度(俯仰面（竖直面）内的角度)
            xRotateAngle: 10,  // 环绕X轴旋转角度(方位面（水平面）内的角度)
            time: 1000  // 环绕飞行的时间
        });
    });
```