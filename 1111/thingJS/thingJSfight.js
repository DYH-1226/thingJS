

var app = new THING.App({ 
    url: '/api/scene/69a24f025d6f72c30e819498'
    });



    app.on('load', function (ev) {
        
        

        var campus=ev.campus;


        new THING.widget.Button('设置透明', setOpacity);
        new THING.widget.Button('外边框颜色变换', setOutlineColorLoop);

        marker = app.create({
                type: "Thing",
                name: '窗戶',
                offset: [-2, 0, 0],     
                url:  '/api/models/20160310153821520559396/0/gltf/', 
                parent: campus
            });
    
        function setOpacity() {
            
            console.log(campus.style)
            // var opacity = campus.style.opacity; 
            // var color = campus.style.color; 
            campus.style.opacity = '0.5';
            campus.style.outlineColor = '#F0F0F0';
            campus.style.color = '#99FFFF';
        }
    });
    function setOutlineColor() {
        switch(a.style.outlineColor){
            case '#F0F0F0':
                a.style.outlineColor = '#00FFFF'
                break;
            case '#00FFFF':
                a.style.outlineColor = '#FF66FF';
                break;
            case '#FF66FF':
                a.style.outlineColor = '#00FF00';
                break;
            default :
                break;
        }




        if(campus.style.outlineColor === '#F0F0F0'){
            campus.style.outlineColor = '#FF66FF';
        }else{
            campus.style.outlineColor = '#F0F0F0';
        }
    }
    function setOutlineColorLoop() {
        setInterval("setOutlineColor()", 500 );  
    }
