changeTime = async() => {
    let x = 8; //每次执行函数，初始化 x 的值
    app.on('update',function(){
        if(x > 19){
            app.skyEffect = null;
            app.skyBox = 'MilkyWay';
             return;
            //console.log(1)
        }else{
            x += 0.1
            effect.time = x;
            app.skyEffect = effect;
        }
    })
}
