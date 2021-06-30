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

// 创建Thing
var bigCarCap = app.create({
    type: 'Thing',
    name: '自行车棚',
    url: '/api/models/6AE597B87C8945D6B5D16D14CAEF5B98/0/gltf/', 
    position: [1, 0, 0],
    angle: 0,
    complete: function () {
        console.log('thing created: ' + this.id);
    }
});

// 创建Thing
var bigCar = app.create({
    type: 'Thing',
    name: '白色轿车',
    url: '/api/models/103e8e34e4114f03849c6a3c9c42c76d/0/gltf/', 
    position: [6, 0, 0],
    angle: 0,
    complete: function () {
        console.log('thing created: ' + this.id);
    }
});


app.on('load', function(){
    //console.log(bigCar)
    // 创建Thing 

    // let a = app.query('bigCar')
    // console.log(a)


    //thingLayer.add(geoPoint);
    

    //new THING.widget.Button('创建对象', createThings)
    //new THING.widget.Button('选取事件', selectThings)

    bigCar.add(bigCarCap);
    
    new THING.widget.Button('选取事件', selectThings)
    new THING.widget.Button('选取事件', deleteThings)

})

//createThings = () => {}
 
// selectThings = () => {
//     //var c = document.body.children;
//     //var c = document.getElementById("No1234567")
//     //console.log(xxx.isChildOf('bigCar')) 
//     console.log(bigCar.hasChild('xxx'))
// }
selectThings = () => {
    //console.log(bigCar.hasChild(bigCarCap))
    console.log(bigCar.children)
}

deleteThings = () => {
    bigCar.children[0].destroy()
}