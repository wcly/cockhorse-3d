let box = document.getElementsByClassName('box')[0];
let img = box.getElementsByTagName('img');
let len = img.length;

//计算每张图片的旋转角度 
let deg = 360 / len;

//控制的当前选择角度
let nextDeg = 0;

window.onload = function () {
    //出场特效
    for (let i = 0; i < len; i++) {
        img[i].style.transform = `rotateY(${i * deg}deg) translateZ(300px)`;
        img[i].style.transition = `transform 0.5s linear ${(len - 1 - i) * 0.1}s`;
    }

    bindEvent();
    control();
}

// 鼠标拖拽事件
function bindEvent() {
    let container = document.getElementsByClassName('container')[0];
    let box = document.getElementsByClassName('box')[0];
    let lastX, lastY, nowX, nowY, roX = 0,
        roY = 0,
        disX, disY;
    let timer;

    container.onmousedown = function (e) {
        lastX = e.clientX;
        lastY = e.clientY;
        container.onmousemove = function (e) {
            nowX = e.clientX;
            nowY = e.clientY;

            disX = nowX - lastX;
            disY = nowY - lastY;

            roX -= disY * 0.2;
            roY += disX * 0.2;

            box.style.transform = `rotateX(${roX}deg) rotateY(${roY}deg)`;

            lastX = nowX;
            lastY = nowY;
        }

        container.onmouseup = function () {
            container.onmousemove = function () {
                return false
            };
            timer = setInterval(() => {
                disX *= 0.95;
                disY *= 0.95;

                roX -= disY * 0.4;
                roY += disX * 0.4;
                box.style.transform = `rotateX(${roX}deg) rotateY(${roY}deg)`;
                if (Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1) {
                    clearInterval(timer);
                }
            })
        }

        return false;
    }
}

//前进后退
function control() {
    let forward = document.getElementsByClassName('button__forward')[0];
    let backward = document.getElementsByClassName('button__backward')[0];
    let box = document.getElementsByClassName('box')[0];
    forward.onclick = () => {
        nextDeg -= deg;
        box.style.transform = `rotateX(0deg) rotateY(${nextDeg}deg)`;
        box.style.transition = `transform 0.38s linear`;
    }
    backward.onclick = () => {
        nextDeg += deg;
        box.style.transform = `rotateX(0deg) rotateY(${nextDeg}deg)`;
        box.style.transition = `transform 0.38s linear`;
    }
}