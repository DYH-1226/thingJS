


// 加载场景代码 
var app = new THING.App({ 
    url: '/api/scene/bc4ef788da6f18bc2a9e6b3e'
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
    
    //[3.0823465913413077,0.010000200010836124,0.2037725441507119]
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
        'color': 0xF00000,
        'distance': null,
        'target': null,
        'helper': false,
        'follow': true,
    };
    
    function createSpotLight(position, target) {
        dataObj['lightAngle'] = 30;
        dataObj['intensity'] = 0.5;
        dataObj['penumbra'] = 0.5;
        dataObj['castShadow'] = false;
        dataObj['position'] = position;
        dataObj['distance'] = 25;
        dataObj['color'] = 0xF00000;
        dataObj['helper'] = false;
        dataObj['follow'] = true;
        //创建聚光灯
        var spotLight = app.create(dataObj);
        curLight = spotLight;
        curLight.lookAt(target);
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
        createSpotLight(THING.Math.addVector(streetLamp_1.position, [0, 6, 0]), THING.Math.addVector(streetLamp_1.position, [-3.15,0,0]));
        createSpotLight(THING.Math.addVector(streetLamp_2.position, [0, 6, 0]), THING.Math.addVector(streetLamp_2.position, [3.15,0,0]));
    })
    