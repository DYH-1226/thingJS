
THING.Utils.dynamicLoad(
    [
        'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
        'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
        'https://gw.alipayobjects.com/os/lib/antv/g2/4.1.17/dist/g2.min.js',
        'https://unpkg.com/@ant-design/charts@latest/dist/charts.min.js',
        'https://unpkg.com/@antv/data-set@0.11.8/build/data-set.js',

        // '/uploads/wechat/297701/file/aaa/index.css',
        //'/uploads/wechat/oLX7p04JJ5TfS-gwpkxvEFaSVNvg/file/小区/react-runtime.js',
        //'/uploads/wechat/297701/file/aaa/spack.js',
        
        '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/thingjsAllLink/index.css',
        '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/thingjsAllLink/runtime.js',
        '/uploads/wechat/oLX7p01vkbiJjRL76kkGzNz_ViSI/file/thingjsAllLink/spack.js'
    ],
    function () {
        // 加载场景代码 
        var app = new THING.App({ 
        url: '/api/scene/f090e2e8644ff4888d0d2624'
        });

        app.skyBox = 'MilkyWay';

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

        app.on('load',function(ev){
            ev.campus.ground.style.color = 	'#708090';
            // ev.campus.ground.style.opacity = 0.5;
            lamps_1 = app.query('ludeng01')
            lamps_2 = app.query('ludeng02')

            for(let i=0;i<lamps_1.length;i++){
                
                createSpotLight(THING.Math.addVector(lamps_1[i].position, [0, 6, 0]), THING.Math.addVector(lamps_1[i].position, [-3.15,0,0]));
            }
            // for(let item of lamps_2){
            //     console.log(item);   
            // }
            for(let i=0;i<lamps_2.length;i++){
                
                createSpotLight(THING.Math.addVector(lamps_2[i].position, [0, 6, 0]), THING.Math.addVector(lamps_2[i].position, [-3.15,0,0]));
                createSpotLight(THING.Math.addVector(lamps_2[i].position, [0, 6, 0]), THING.Math.addVector(lamps_2[i].position, [3.15,0,0]));
            }
            app.lighting = {
                mainLight: {
                    intensity: 0
                }
            };
        })


        const { jsx } = React.Runtime


        console.log(jsx)


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
            registerShape
        }
        const App = getSpack(options)

        ReactDOM.render(
            jsx(App, {})
            , document.getElementById('root')
        )
    }
)
