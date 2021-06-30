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
                createSpotLight(c.Math.addVector(d.lamps_up[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_up[i].position, [0,0,-5]),a);
            }
            for(let i=0;i<d.lamps_down.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_down[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_down[i].position, [0,0,5]));
            }
            for(let i=0;i<d.lamps_left.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_left[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_left[i].position, [-5,0,0]));
            }
            for(let i=0;i<d.lamps_right.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_right[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_right[i].position, [5,0,0]));
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
               // console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_up[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_up[i].position, [0,0,-5]), a);
            }
            for(let i=0;i<d.lamps_down.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_down[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_down[i].position, [0,0,5]));
            }
            for(let i=0;i<d.lamps_left.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_left[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_left[i].position, [-5,0,0]));
            }
            for(let i=0;i<d.lamps_right.length;i++){
                //console.log(i)
                createSpotLight(c.Math.addVector(d.lamps_right[i].position, [0, 6, 0]), c.Math.addVector(d.lamps_right[i].position, [5,0,0]));
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
