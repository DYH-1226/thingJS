var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];
// 引用地图组件脚本
THING.Utils.dynamicLoad(
    [/*"https://www.thingjs.com/uearth/uearth.min.js"*/
    'https://www.thingjs.com/uearth/history/uearth.min.v1.7.8.14.js',
    'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
    'https://gw.alipayobjects.com/os/lib/antv/g2/4.1.17/dist/g2.min.js',
    'https://unpkg.com/@ant-design/charts@latest/dist/charts.min.js',
    'https://unpkg.com/@antv/data-set@0.11.8/build/data-set.js',

    '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/allThingsRight/spack.js',

    '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/allThingsRight/runtime.js',

    '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/allThingsRight/index.css',

    //'/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/allThingsRight/activeEvents.js',
    ],

// 加载场景代码 

    function () {

      // /**
      //   * 切换场景
      //   */
      //   function changeScene() {
      //     var url = curCampus.url;  //　当前园区url

      //     // 动态创建园区
      //     if (url === campusUrl[0].url) {
      //         createCampus(campusUrl[1]);
      //     } else {
      //         createCampus(campusUrl[0]);
      //     }
      // }

      // /**
      //  * 创建园区
      //  */
      // function createCampus(obj) {
      //     app.create({
      //         type: "Campus",
      //         url: obj.url,
      //         position: [0, 0, 0],
      //         visible: false, // 创建园区过程中隐藏园区
      //         complete: function (ev) {
      //             initThingJsTip('本例程通过动态创建场景，实现场景切换。场景切换后，双击进入建筑，可动态创建楼层。<br><br>当前位于：' + obj.name);
      //             curCampus.destroy();  // 新园区创建完成后删除之前的
      //             curCampus = ev.object;  // 将新园区赋给全局变量
      //             curCampus.fadeIn();  // 创建完成后显示（渐现）
      //             app.level.change(curCampus);  // 开启层级切换

      //             var building = app.query(".Building");  // 获取园区中的建筑
      //             // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
      //             for (var i = 0; i < building.length; i++) {
      //                 building[i].floors.destroy();
      //             }
      //         }
      //     });
      // }
        app.create({
            type: "Map",
            url: "https://www.thingjs.com/citybuilder_console/mapProject/config/TVRFeE5EWTVDaXR5QnVpbGRlckAyMDE5",
            complete: function (event) {              
                app.camera.flyTo({
                    'position': [2257832.94474213,3243888.130191108,5006290.557391178],
                    'target': [2257430.0510396324,3244055.473432924,5005896.288373646],
                    'time': 2000
                });            
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
                dataObj['intensity'] = 0.88;
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
        
        //等待时间 
        function delay(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // function loopTime(){
        //     console.log(1)
        //     // effect.time = 8
        //     // if(effect.time>19){
        //     //     // 环境光对象
        //     //     var ambientLight = {
        //     //         intensity:0.1,
        //     //         color: '16777215',
        //     //     };
        //     //     // 半球光照
        //     //     var hemisphereLight = {
        //     //         intensity:0,
        //     //         color: '16777215',
        //     //         groundColor: '2236962',
        //     //     };
        //     //     // 主灯光对象
        //     //     var mainLight = {
        //     //         shadow:false,
        //     //         intensity:0.4,
        //     //         color: '16777215',
        //     //         alpha:30,
        //     //         beta:30,
        //     //     };
        //     //     // 第二光源对象
        //     //     var secondaryLight = {
        //     //         shadow:false,
        //     //         intensity:0,
        //     //         color: '16777215',
        //     //         alpha:138,
        //     //         beta:0,
        //     //     };
        //     //     // 全局配置
        //     //     var config = {
        //     //         showHelper:false,
        //     //         ambientLight,
        //     //         hemisphereLight,
        //     //         mainLight,
        //     //         secondaryLight
        //     //     };
        //     //     app.lighting = config;
        //     // }else{
        //     //     app.skyEffect = effect;
        //     // }
        //     // effect.time = effect.time + 0.1;        
        // }
        
        //  暂停默认退出园区行为
        app.pauseEvent(THING.EventType.LeaveLevel, '.Campus', THING.EventTag.LevelSceneOperations);

        // 进入建筑摊开楼层
        app.on(THING.EventType.EnterLevel, '.Building', function (ev) {

            //控制其他建筑的显隐性
            var object = ev.object;
            var things = object.brothers.query('.Building');
            things.visible = true;

            var previous = ev.previous;  // 上一层级

            ev.current.expandFloors({
                'time': 1000,
                'complete': function () {
                    console.log('ExpandFloor complete ');
                }
            });
        }, 'customEnterBuildingOperations');
        // 进入建筑保留天空盒
        app.pauseEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelSetBackground);

        //  退出建筑关闭摊开的楼层
        app.on(THING.EventType.LeaveLevel, '.Building', function (ev) {
            var current = ev.current;  // 当前层级

            ev.object.unexpandFloors({
                'time': 500,
                'complete': function () {
                    console.log('Unexpand complete ');
                }
            });
        }, 'customLeaveBuildingOperations');

        var effect = {
            showHelper:false, // 显示光源位置
            turbidity:10, // 光源扩散大小
            rayleigh:2, // 大气散射
            time:6, // 时间 [0~24]
            beta:30, // 水平角度
        };
        app.skyEffect = effect;

        const { jsx } = React.Runtime
        
        document.getElementById('div2d')
            .appendChild(
                (() => {
                    const e = document.createElement('div')
                    e.id = 'root';
                    e.style.position = 'absolute';
                    e.style.zIndex = 999;
                    return e
                })()
            )

        // 自定义部分；
        let { Pie, Column, Radar,Gauge ,Progress, Bar, RingProgress,Line,Liquid } = window.charts;
        const { Chart,registerShape } = G2;
        const { DataView } = window.DataSet;
        const DataSet = window.DataSet;
        const options = {
            jsx,
            React,
            Pie, Column, Radar, Progress, Bar, RingProgress,
            DataView,
            Chart,
            DataSet,
            Gauge,
            Line,
            Liquid,
            registerShape,
            changeBlack: async() => {
                //清除路灯
                if(app.query('.SpotLight')[0]){
                    //console.log(app.query('.SpotLight')[0])

                    let spotLightThing = app.query('.SpotLight')
                    for(let i=0; i < spotLightThing.length; i++){
                        spotLightThing[i].destroy()
                    }
                    let x = 8; //每次执行函数，初始化 x 的值
                    app.on('update',function(){
                        if(x > 19){
                            // app.skyEffect = null;
                            // app.skyBox = 'MilkyWay';
                            return;
                            //console.log(1)
                        }else{
                            x += 0.1
                            effect.time = x;
                            app.skyEffect = effect;
                        }
                    }) 

                    await delay(3500);
                    lamps_up = app.query('ludeng_up');
                    lamps_down = app.query('lamps_down');
                    lamps_left = app.query('ludeng_left');
                    lamps_right = app.query('ludeng_right');
                    for(let i=0;i<lamps_up.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_up[i].position, [8, 10, 8]), THING.Math.addVector(lamps_up[i].position, [0,0,0]));
                    }
                    for(let i=0;i<lamps_down.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_down[i].position, [0, 6, 0]), THING.Math.addVector(lamps_down[i].position, [5,0,0]));
                    }
                    for(let i=0;i<lamps_left.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_left[i].position, [8, 10, 8]), THING.Math.addVector(lamps_left[i].position, [0,0,0]));
                    }
                    for(let i=0;i<lamps_right.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_right[i].position, [8, 10, 8]), THING.Math.addVector(lamps_right[i].position, [0,0,0]));
                    }
                    await delay(1000);
                    app.camera.flyTo({
                        'position': [2257654.6165234037,3243970.8472682876,5006104.011894565],
                        'target': [2257471.946257122,3244024.290719967,5005897.6031358],
                        'time': 2000
                    });   
                }else{
                    let x = 6; //每次执行函数，初始化 x 的值
                    app.on('update',function(){
                        if(x > 19){
                            // app.skyEffect = null;
                            // app.skyBox = 'MilkyWay';
                            return;
                            //console.log(1)
                        }else{
                            x += 0.1
                            effect.time = x;
                            app.skyEffect = effect;
                        }
                    }) 

                    await delay(3500);
                    lamps_up = app.query('ludeng_up');
                    lamps_down = app.query('lamps_down');
                    lamps_left = app.query('ludeng_left');
                    lamps_right = app.query('ludeng_right');
                    for(let i=0;i<lamps_up.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_up[i].position, [8, 10, 8]), THING.Math.addVector(lamps_up[i].position, [0,0,0]));
                    }
                    for(let i=0;i<lamps_down.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_down[i].position, [0, 6, 0]), THING.Math.addVector(lamps_down[i].position, [5,0,0]));
                    }
                    for(let i=0;i<lamps_left.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_left[i].position, [8, 10, 8]), THING.Math.addVector(lamps_left[i].position, [0,0,0]));
                    }
                    for(let i=0;i<lamps_right.length;i++){
                        createSpotLight(THING.Math.addVector(lamps_right[i].position, [8, 10, 8]), THING.Math.addVector(lamps_right[i].position, [0,0,0]));
                    }
                    await delay(1000);
                    app.camera.flyTo({
                        'position': [2257654.6165234037,3243970.8472682876,5006104.011894565],
                        'target': [2257471.946257122,3244024.290719967,5005897.6031358],
                        'time': 2000
                    });                
                }      

            },

            changeWhite: async() => {
                effect.time = 8;
                app.skyEffect = effect;
                let spotLightThing = app.query('.SpotLight')
                for(let i=0; i < spotLightThing.length; i++){
                    spotLightThing[i].destroy()
                }
                await delay(200);
                app.camera.flyTo({
                    'position': [2257832.94474213,3243888.130191108,5006290.557391178],
                    'target': [2257430.0510396324,3244055.473432924,5005896.288373646],
                    'time': 2000
                })
                // app.on('update', function(){
                //     console.log(app.camera.position +'+++++' + app.camera.target)
                // })
                
            },

            fitObjectCar: () => {
                // init();
                // 摄像机飞行到某位置
                app.camera.flyTo({
                    'position': [2257495.2570049646,3244074.6899869945,5005976.271262785],
                    'target': [2257450.86411081,3244040.3771614465,5005896.685656983],
                    'time': 2000
                });    
                //console.log(1)    
            },
            fitObjectHospital: () => {
                app.camera.flyTo({
                    'position': [2257832.94474213,3243888.130191108,5006290.557391178],
                    'target': [2257430.0510396324,3244055.473432924,5005896.288373646],
                    'time': 2000
                }); 
                //console.log(2) 
            }
        }
        const App = getSpack(options)

        ReactDOM.render(
            jsx(App, {})
            , document.getElementById('root')
        )
    }
);