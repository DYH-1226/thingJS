//等待时间 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//摄像机飞行函数
/**
 * positionList = {
 *      'position':position,
 *      'target': target,
 *      'time':time,
 * }
 * depend --->>> app
 */
const cameraFly = (positionList, depend) => {
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

const lampsPosition = {
    'lamps_up': [0,0,-5],
    'lamps_down': [0,0,5],
    'lamps_left': [-5,0,0],
    'lamps_right': [5,0,0]
}


var curLight;
/**
 * 
 * @param {*} position -- position
 * @param {*} target -- target
 * @param {*} a -- app
 */
const createSpotLight = (position, target, a) => {
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

const lampsEvents = async(a,b,c,d) =>{
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
    await delay(3000);

    for(let i in d){
        //console.log(i +'----->>>>>'+ d[i])
        d[i].forEach(item=>{
            createSpotLight(c.Math.addVector(item.position, [0, 6, 0]), c.Math.addVector(item.position, lampsPosition[i]), a)
        })
    }
    await delay(1000);
    cameraFly({
        'position': [6.202130874561801,85.4102534064279,97.09936120942668],
        'target': [7.33983090000432,-11.602171385449429,-84.92860142298288],
        'time': 2000
    }, a);
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
const carPosition = (a) =>{
    return ()=> cameraFly(carPositionList,a)
}

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
const hospitalPosition = (a) =>{
    return () => cameraFly(hospitalList, a)
}


/**
 * 
 * @param {*} a -- effect
 * @param {*} b -- app
 * @returns 
 */
const skyBlue = (a, b) => {
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
const skyBlack = (a, b, c, d) => {
    return async() =>{
        //清除路灯
        if(a.query('.SpotLight')[0]){
            //console.log(a.query('.SpotLight')[0])
            let spotLightThing = a.query('.SpotLight')
            for(let i=0; i < spotLightThing.length; i++){
                spotLightThing[i].destroy()
            }
            lampsEvents(a,b,c,d);
        }else{
            lampsEvents(a,b,c,d);
        }
    }
}