var showPop = (function (){
    // 弹窗
    function showPop(id){
        var container = $("#" + id);
        container.style.display = "";
        if(id === "popVideo"){
           var deo = container.querySelector("video");
           deo.play();
        }
    }
    // 获取所有的关闭按钮
    var closes = $$(".pop_close");
    for(var i = 0; i < closes.length; i++){
        closes[i].onclick = function (){
            var container = this.parentElement.parentElement;
            container.style.display = "none";
        }
    }
    var vx = $(".pop_wx");
    var qq = $(".pop_qq");
    vx.onclick = function () {
        vx.classList.add("selected");
        qq.classList.remove("selected");
    }
    qq.onclick = function () {
        vx.classList.remove("selected");
        qq.classList.add("selected");
    }
    // 处理关闭视频弹窗时，视频暂停
    var closeBtn = $("#popVideo .pop_close");
    closeBtn.addEventListener("click", function () {
        $("#popVideo video").pause();
    });
    return showPop;
})();