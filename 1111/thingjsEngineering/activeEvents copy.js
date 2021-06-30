
//等待时间 
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//摄像机飞行函数
/**
 * positionList = {
 *      'position':position,
 *      'target': target,
 *      'time':time,
 * }
 * 
 * depend --->>> app
 */
function cameraFly(positionList, depend){
    depend.camera.flyTo({
        ...positionList
    })
}



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

var curLight;
/**
 * 
 * @param {*} position -- position
 * @param {*} target -- target
 * @param {*} a -- app
 */
function createSpotLight(position, target, a) {
    
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
    var spotLight = a.create(dataObj);
    //console.log(spotLight)
    //spotLight.lookAt(target)
    curLight = spotLight;
    curLight.lookAt(target);
}

/**
 * 
 * @param {*} a -- app 
 * @returns 
 */
const carPositionList = {
    'position': [6.365986782783843,53.60942460218634,-96.15805504450411],
    'target': [6.482144216404501,-0.008360768889106737,-102.49931260345745],
    'time': 2000
 }
function carPosition(a){
    return ()=> cameraFly(carPositionList,a)
}
// function carPosition(a){
//     return () =>{
//          a.camera.flyTo({
//             'position': [6.365986782783843,53.60942460218634,-96.15805504450411],
//             'target': [6.482144216404501,-0.008360768889106737,-102.49931260345745],
//             'time': 2000
//         });
//     }
//     //return function(){console.log(a)}
// }

/**
 * 
 * @param {*} a -- app 
 * @returns 
 */
const hospitalList = {
    'position': [2.607059096627628,137.3181982302635,155.6841459302317],
    'target': [2.9548203329970244,-0.5610923573313249,-102.85794597312325],
    'time': 2000
}
function hospitalPosition(a){
    return () => cameraFly(hospitalList, a)          
}


/**
 * 
 * @param {*} a -- effect
 * @param {*} b -- app
 * @returns 
 */
function skyBlue(a, b){
    return () =>{
        //console.log(a.time)
        a.time = 8;
        b.skyEffect = a;
        let spotLightThing = b.query('.SpotLight')
        for(let i=0; i < spotLightThing.length; i++){
            spotLightThing[i].destroy()
        }
    }
}

/**
 * (app, effect, THING, lamps)
 * @param {*} a -- app
 * @param {*} b -- effect
 * @param {*} c -- THING
 * @param {*} d -- lamps
 * @returns 
 */
function skyBlack(a, b, c, d){
    return async() =>{
        //清除路灯
        if(a.query('.SpotLight')[0]){
            //console.log(a.query('.SpotLight')[0])
            let spotLightThing = a.query('.SpotLight')
            for(let i=0; i < spotLightThing.length; i++){
                spotLightThing[i].destroy()
            }
            let x = 8; //每次执行函数，初始化 x 的值
            a.on('update',function(){
                if(x > 19){
                    // a.skyEffect = null;
                    // a.skyBox = 'MilkyWay';
                    return;
                    //console.log(1)
                }else{
                    x += 0.1
                    b.time = x;
                    a.skyEffect = b;
                }
            })
            await delay(2000);

            // d.lamps_up = a.query('ludeng_up');
            // lamps_down = a.query('lamps_down');
            // lamps_left = a.query('ludeng_left');
            // lamps_right = a.query('ludeng_right');

            for(let i=0;i<d.lamps_up.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_up[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_up[i].position, [0,0,-5]), a);
            }
            for(let i=0;i<d.lamps_down.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_down[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_down[i].position, [0,0,5]), a);
            }
            for(let i=0;i<d.lamps_left.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_left[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_left[i].position, [-5,0,0]), a);
            }
            for(let i=0;i<d.lamps_right.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_right[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_right[i].position, [5,0,0]), a);
            }
            await delay(1000);
            a.camera.flyTo({
                'position': [6.202130874561801,85.4102534064279,97.09936120942668],
                'target': [7.33983090000432,-11.602171385449429,-84.92860142298288],
                'time': 2000
            });   
        }else{
            let x = 8; //每次执行函数，初始化 x 的值
            a.on('update',function(){
                if(x > 19){
                    return;
                }else{
                    x += 0.1
                    b.time = x;
                    a.skyEffect = b;
                }
            }) 

            await delay(2000);
            // d.lamps_up = a.query('ludeng_up');
            // lamps_down = a.query('lamps_down');
            // lamps_left = a.query('ludeng_left');
            // lamps_right = a.query('ludeng_right');
            for(let i=0;i<d.lamps_up.length;i++){
               // console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_up[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_up[i].position, [0,0,-5]), a);
            }
            for(let i=0;i<d.lamps_down.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_down[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_down[i].position, [0,0,5]), a);
            }
            for(let i=0;i<d.lamps_left.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_left[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_left[i].position, [-5,0,0]), a);
            }
            for(let i=0;i<d.lamps_right.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_right[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_right[i].position, [5,0,0]), a);
            }
            await delay(1000);
            a.camera.flyTo({
                'position': [6.202130874561801,85.4102534064279,97.09936120942668],
                'target': [7.33983090000432,-11.602171385449429,-84.92860142298288],
                'time': 2000
            });                
        }   
    }   
}
