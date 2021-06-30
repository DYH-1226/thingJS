/**
 * 说明：创建App，url为园区地址（可选）
 *      使用App创建打开的三维空间我们称之为“场景”（scene）。场景包含地球、园区、模型等。
 *      创建App时，传入的url就是园区的地址，不传url则创建一个空的场景。园区可在CampusBuilder
 *      中创建编辑，有两种方法可以将园区添加到线上资源面板，方法如下：
 *          1. 园区保存后，会自动同步到网页同一账号下
 *          2. 园区保存后，导出tjs文件，在园区资源面板上传
 *      上面两种方式生成的园区资源均可在资源面板中双击自动生成脚本
 * 教程：ThingJS教程——>园区与层级——>场景与园区
 * 难度：★☆☆☆☆
 */










 // 加载场景代码 
 var app = new THING.App({
    url: 'https://www.thingjs.com/static/models/storehouse'  // 场景地址
});

app.on('load',function(){
    
    new THING.widget.Button('autoTime',autoTime)
     new THING.widget.Button('chongzhi',chongzhi)
})


// 创建提示
initThingJsTip(`使用 App 创建的三维空间称之为“场景”。有两种方法可以将客户端保存的园区添加到园区资源面板：<br>
    1. 园区保存后，会自动同步到网页同一账号下;<br>
    2. 园区保存后导出tjs文件，在园区资源面板上传。<br>`);




    
// 天空默认效果
var effect = {
    showHelper:undefined, // 显示光源位置
    turbidity:10, // 光源扩散大小
    rayleigh:2, // 大气散射
    time:8, // 时间 [0~24]
    beta:30, // 水平角度
};
app.skyEffect = effect;



chongzhi = () =>{
    effect.time = 8;
    //app.skyBox.destroy();
    app.skyEffect = effect;
    //app.skyEffect = null;
    //app.skyBox = 'BlueSky';
}
//给X一个值，小于24时令，停止
changeX = () =>{
    
    if(x>19){
        //app.skyEffect = null;
       // app.skyBox = 'BlueSky';
        //app.skyBox = 'MilkyWay';
        return
    }else{
        x += .04;
        console.log(effect.time)
        effect.time = x;
        app.skyEffect = effect;
    }
    
}
autoTime = () =>{
    x = 8
    setInterval('changeX()',2)  
    //clearInterval(setInterval('changeX()',2) );

}

