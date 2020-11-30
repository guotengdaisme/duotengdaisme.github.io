function $(elem){
    return document.querySelector(elem);
}

function $$(elem){
    return document.querySelectorAll(elem);
}
function width() {
    return document.documentElement.clientWidth;
}
function height() {
    return document.documentElement.clientHeight;
}

// 轮播图实现

function createCarousel(carouselId, datas) {
    var container = document.getElementById(carouselId);
    var carouselList = container.querySelector(".g_carousel-list");
    var indicator = container.querySelector(".g_carousel-indicator");
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");

    var curIndex = 0;//当前索引值

    function createCarouselElements() {
        var listHtml = "";
        var indHTML = "";

        for(var i = 0; i < datas.length; i++){
            var data = datas[i];
            if(data.link){
                listHtml += `<li>
                <a href="${data.link}" target="_blank">
                    <img src="${data.image}">
                </a>
                </li>`;
            } else {
                listHtml += `<li>
                <img src="${data.image}">
              </li>`;
              }
              indHTML += "<li></li>";
              carouselList.style.width = `${datas.length}00%`;
              carouselList.innerHTML = listHtml;
              indicator.innerHTML = indHTML;
        }
    }
    createCarouselElements();

    function setStatus() {
        carouselList.style.marginLeft = -curIndex * width() + 'px';

        var beforeSelected = indicator.querySelector(".selected");
        if(beforeSelected){
            beforeSelected.classList.remove("selected");
        } 

        indicator.children[curIndex].classList.add("selected");

        if(prev) {
            if(curIndex === 0) {
                prev.classList.add("disabled"); 
            } else {
                prev.classList.remove("disabled");
            }
        }
        if(next) {
            if(curIndex === datas.length - 1) {
                next.classList.add("disabled"); 
            } else {
                next.classList.remove("disabled");
            }
        }
    }
    // setStatus();

    function toPrev() {
        if(curIndex === 0){
            return;
        } else {
            curIndex--;
            setStatus();
        }
    }
    function toNext() {
        if(curIndex === datas.length - 1){
            return;

        } else {
            curIndex++;
            setStatus();
        }
    }
    var timer = null;
    function start(){
        if(timer){
            return;
        }
        timer = setInterval(function () {
            curIndex++;
            if(curIndex === datas.length){
                curIndex = 0;
            }
            setStatus();
        }, 2000)
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }
    start();

    if (prev) {
        prev.onclick = toPrev;
    }
    if (next) {
    next.onclick = toNext;
    }

    container.ontouchstart = function(e) {
        e.stopPropagation();
        var x = e.touches[0].clientX;
        stop();
        carouselList.style.transition = "none";
        var pressTime = Date.now();
        container.ontouchmove = function(e) {
            var dis = e.touches[0].clientX - x;
            carouselList.style.marginLeft = -curIndex * width() + dis + 'px';
    


        }
        container.ontouchend = function(e) {
            var dis = e.changedTouches[0].clientX - x; 
            start();
            carouselList.style.transition = "";
            container.ontouchmove = null;
            
            var duration = Date.now() - pressTime;

            if(duration < 300) {
                if(dis > 20 && curIndex > 0){
                    toPrev();
                } else if(dis < -20 && curIndex < datas.length - 1) {
                    toNext();
                } else {
                    setStatus();
                }
            } else {
                if(dis < width() / 2 && curIndex < datas.length - 1){
                    toNext();
                } else if(dis > width() / 2 && curIndex > 0) {
                    toPrev();
                } else {
                    setStatus();
                }
            }
        }
    }


 }
 // ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }
  