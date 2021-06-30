THING.Utils.dynamicLoad(
    [
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
    function () {
       
        // 加载场景代码 
        var app = new THING.App({ 
        url: '/api/scene/01c4b84dd57381cbd13706a6'
        });

        // 创建Thing
        // var obj = app.create({
        //     type: 'Thing',
        //     name: '干粉消防车',
        //     url: '/api/models/2F0966317E574844A97FB29A5DF8E8CA/0/gltf/', 
        //     position: [0, 0, 0],
        //     angle: 0,
        //     complete: function () {
        //         console.log('thing created: ' + this.id);
        //     }
        // });
        //app.camera.position = [189.76377100890974,112.28771242212646,228.74073664247607]
        //app.camera.target = [4.472,0.069,-97.685]
      
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
        // 加载完成事件 
        app.on('load', function (ev) {
            app.camera.flyTo({
                'position': [189.76377100890974,112.28771242212646,228.74073664247607],
                'target': [4.472,0.069,-97.685],
                'time': 5000
            });
            // console.log(app.camera.position) 
            // lamps_up = app.query('ludeng_up');
            // lamps_down = app.query('lamps_down');
            // lamps_left = app.query('ludeng_left');
            // lamps_right = app.query('ludeng_right');
            // for(let i=0;i<lamps_up.length;i++){
            //     createSpotLight(THING.Math.addVector(lamps_up[i].position, [0, 6, 0]), THING.Math.addVector(lamps_up[i].position, [0,0,-5]));
            // }
            // for(let i=0;i<lamps_down.length;i++){
            //     createSpotLight(THING.Math.addVector(lamps_down[i].position, [0, 6, 0]), THING.Math.addVector(lamps_down[i].position, [0,0,5]));
            // }
            // for(let i=0;i<lamps_left.length;i++){
            //     createSpotLight(THING.Math.addVector(lamps_left[i].position, [0, 6, 0]), THING.Math.addVector(lamps_left[i].position, [-5,0,0]));
            // }
            // for(let i=0;i<lamps_right.length;i++){
            //     createSpotLight(THING.Math.addVector(lamps_right[i].position, [0, 6, 0]), THING.Math.addVector(lamps_right[i].position, [5,0,0]));
            // }


            //for(let i=0;i<lamps_01.length;i++){
                //console.log(i);
                //createSpotLight(THING.Math.addVector(lamps_01[i].position, [0, 6, 0]), THING.Math.addVector(lamps_01[i].position, [-3.15,0,0]));
                //createSpotLight(THING.Math.addVector(lamps_1[i].position, [0, 6, 0]), THING.Math.addVector(lamps_1[i].position, [-3.15,0,0]));
            //}

            var campus=ev.campus;
            console.log('after load '+campus.id); 
            // 切换层级到园区
            //app.level.change(campus);
        });
        
        var effect = {
            showHelper:false, // 显示光源位置
            turbidity:10, // 光源扩散大小
            rayleigh:2, // 大气散射
            time:8, // 时间 [0~24]
            beta:30, // 水平角度
        };
        app.skyEffect = effect;

        // app.on('load', function(){
        //     let car01 = app.query('#1605');
        //     console.log(car01)
        // })

        //init = () => {
            
            // var effect = {
            // showHelper:false, // 显示光源位置
            // turbidity:10, // 光源扩散大小
            // rayleigh:2, // 大气散射
            // time:6, // 时间 [0~24]
            // beta:30, // 水平角度
            // };
            // app.skyEffect = effect;
        //}
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
                app.on('update',function(){
                    if(effect.time>19){

                        // 环境光对象
                        var ambientLight = {
                            intensity:0.1,
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
                            shadow:false,
                            intensity:0.4,
                            color: '16777215',
                            alpha:30,
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
                        app.skyEffect = null;
                        app.skyBox = 'MilkyWay';
                        return;
                    }else{
                        effect.time = effect.time + 0.1;
                        app.skyEffect = effect;
                    }
                })
                await delay(2500);
                lamps_up = app.query('ludeng_up');
                lamps_down = app.query('lamps_down');
                lamps_left = app.query('ludeng_left');
                lamps_right = app.query('ludeng_right');
                for(let i=0;i<lamps_up.length;i++){
                    createSpotLight(THING.Math.addVector(lamps_up[i].position, [0, 6, 0]), THING.Math.addVector(lamps_up[i].position, [0,0,-5]));
                }
                for(let i=0;i<lamps_down.length;i++){
                    createSpotLight(THING.Math.addVector(lamps_down[i].position, [0, 6, 0]), THING.Math.addVector(lamps_down[i].position, [0,0,5]));
                }
                for(let i=0;i<lamps_left.length;i++){
                    createSpotLight(THING.Math.addVector(lamps_left[i].position, [0, 6, 0]), THING.Math.addVector(lamps_left[i].position, [-5,0,0]));
                }
                for(let i=0;i<lamps_right.length;i++){
                    createSpotLight(THING.Math.addVector(lamps_right[i].position, [0, 6, 0]), THING.Math.addVector(lamps_right[i].position, [5,0,0]));
                }
                await delay(1000);
                app.camera.flyTo({
                    'position': [6.202130874561801,85.4102534064279,97.09936120942668],
                    'target': [7.33983090000432,-11.602171385449429,-84.92860142298288],
                    'time': 2000
                });
            },

            changeWhite: () => {
                // app.skyBox = null;
                // app.background = null;
                // app.skyEffect  = {
                //     showHelper:false, // 显示光源位置
                //     turbidity:10, // 光源扩散大小
                //     rayleigh:2, // 大气散射
                //     time:8, // 时间 [0~24]
                //     beta:30, // 水平角度
                // };
                //let aaa = app.query('SpotLight')
                console.log(curLight)
                // curLight.destroy()

                // app.on('update',function(){
                //     console.log(app.camera.position + '------' +app.camera.target)
                // }) 
            },

            fitObjectCar: () => {
                // 摄像机飞行到某位置
                app.camera.flyTo({
                    'position': [6.365986782783843,53.60942460218634,-96.15805504450411],
                    'target': [6.482144216404501,-0.008360768889106737,-102.49931260345745],
                    'time': 2000
                });        
            },
            fitObjectHospital: () => {
                app.camera.flyTo({
                    // app.camera.position = [2.607059096627628,137.3181982302635,155.6841459302317]
                    // app.camera.target = [2.9548203329970244,-0.5610923573313249,-102.85794597312325]
                    'position': [2.607059096627628,137.3181982302635,155.6841459302317],
                    'target': [2.9548203329970244,-0.5610923573313249,-102.85794597312325],
                    'time': 2000
                }); 
            }
        }
        const App = getSpack(options)

        ReactDOM.render(
            jsx(App, {})
            , document.getElementById('root')
        )
    }
)



