#### 园区单独模型

- 路灯
    - 夜晚路灯颜色     color = # FFE4B5
    - 夜晚灯光效果     X轴正负 3.15
    - 定点设置光源    

- 地面
    - 地面先确定尺寸
    - 最下面铺万能地面，在万能地面上铺比万能地面稍微大点的普通地面，再在普通地面上圈地
    - 完成后删除普通地面
    - 夜间地板颜色 '#708090'
    **注意：各层地面的高度问题**

- 地面荧光效果

  ``````javascript
  campus.style.opacity = '0.5';
  campus.style.outlineColor = '#f0f0f0';
  campus.style.color = '#99FFFF';
  ``````

- 大楼 A 与 B
    - 坐标
    ```javascript
    yujiahu1.position = [-80.4179993,0.010000200000000348,-56.894001]
    yujiahu2.position = [71.1100006,0.01,-62.0730019]
    ```

- 



#### think

- 创建一个圆弧路径，让光源在其路径做运动

  ```javascript
  var path = [];
  var radius = 6;
  for (var degree = 0; degree <= 360; degree += 10) {
      var x = Math.cos(degree * 2 * Math.PI / 360) * radius;
      var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
      path.push(THING.Math.addVector(car1.position, [x, 0, z]));
  }
  ```

- 创建一个圆弧路径，让光源在其路径做运动

  ```javascript
    //这是一个垂直地面的半圆弧
    var path = [];
    var radius = 6;
    for (var degree = 90; degree >= -90; degree -= 10) {
        var y = Math.cos(degree * 2 * Math.PI / 360) * radius;
        var z = Math.sin(degree * 2 * Math.PI / 360) * radius;
        path.push(THING.Math.addVector(car1.position, [0, y, z]));
    }
  ```
- 