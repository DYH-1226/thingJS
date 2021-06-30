

randomHexColor = () => { //随机生成十六进制颜色
    return ('#' + '00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}
changeBgc = () => {
    document.getElementById("demo").style.backgroundColor = randomHexColor();
}

randomChange = () => {
    setInterval('changeBgc()', 200)
}

randomChange()








randomHexColor = () => { //随机生成十六进制颜色
    return ('#' + '00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

changeBgc = () => {
    new Promise(function(resolve) {
        //console.log('7');
        b = '#'+ randomHexColor()
        resolve();
    }).then(function() {
        //console.log('8')
        //console.log(b)
        a.style.outlineColor = b
    })
    
}

function setOutlineColorLoop(){
    setInterval('changeBgc()', 200)
}






randomHexColor = () => { //随机生成十六进制颜色
    return ('#' + '00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

changeBgc = () => {
    a.style.outlineColor = '#'+ randomHexColor()   
}

function setOutlineColorLoop(){
    setInterval('changeBgc()', 400)
}