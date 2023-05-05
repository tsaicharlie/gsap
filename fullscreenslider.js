const cols = 7;
const main = document.getElementById('main');
let parts = [];

let images = [
    "images/1.png",
    "images/2.jpg",
    "images/3.png",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.png"
];
let current = 0;
let playing = false;

for (let i in images) {
    new Image().src = images[i];
}
//將畫面切成3攔
for (let col = 0; col < cols; col++) {
    let part = document.createElement('div');
    part.className = 'part';
    let el = document.createElement('div');
    el.className = "section";
    let img = document.createElement('img');
    img.src = images[current];
    el.appendChild(img);
    part.style.setProperty('--x',-100/cols*col + 'vw');//0 -33 -66 
    //main 設置了flex :1 每張圖片會等比例收縮 因此將圖片位置依序往左推
    part.appendChild(el);
    main.appendChild(part);
    parts.push(part);
}




// Cursor Pointer and Circle event
function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 36;
let sizeF = 60;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);




//表示當前的瀏覽器是否支援 ontouchstart 這個事件
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size + 'px');
cursorF.style.setProperty('--size', sizeF + 'px');

window.addEventListener('mousemove', function (e) {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = e.clientX - size / 2  + 'px';
    cursor.style.top  = e.clientY - size / 2  + 'px';
});

function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.top = cursorY - sizeF / 2 + 'px';
    cursorF.style.left = cursorX - sizeF / 2 + 'px';
    requestAnimationFrame(loop);
    //瀏覽器就會在每一幀之間都執行 loop 函式
}
loop();


// Rollover UP & Down Mouse Wheel Navigation
let animOptions = {
    duration: 2.3,
    ease: Power4.easeInOut
};

function go(dir) {
    if (!playing) {
        playing = true;
        if (current + dir < 0) current = images.length - 1;
        else if (current + dir >= images.length) current = 0;
        else current += dir;

        function up(part, next) {
            part.appendChild(next);
            gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function () {
                part.children[0].remove();
                gsap.to(part, { duration: 0, y: 0 });
            })
        }

        function down(part, next) {
            part.prepend(next);
            gsap.to(part, { duration: 0, y: -window.innerHeight });
            gsap.to(part, { ...animOptions, y: 0 }).then(function () {
                part.children[1].remove();
                playing = false;
            })
        }



        for (let p in parts) {
            let part = parts[p];
            let next = document.createElement('div');
            next.className = 'section';
            let img = document.createElement('img');
            img.src = images[current];
            next.appendChild(img);

            if ((p - Math.max(0, dir)) % 2) {
                /**假如在第0張 :往下滾 (0-1)%2=1  往上滾 (0)%2=0 */
                down(part, next);//如果往下 p=0 p=2 第一張跟第三張往下   如果往上 p=1 第二張往下           
                
            } else {
                up(part, next);//如果往下 p=1 第二張往上
                               //如果往上 p=0 p=2 第一張跟第三張往下 
            }
        }
    }
}



// Cursor Invent Target Touches
// let startY;
// let endY;
// let clicked = false;

// function mousedown(e) {
//     gsap.to(cursor, { scale: 4.5 });
//     gsap.to(cursorF, { scale: .4 });

//     clicked = true;
//     startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
// }

// function mouseup(e) {
//     gsap.to(cursor, { scale: 1 });
//     gsap.to(cursorF, { scale: 1 });

//     endY = e.clientY || endY;
//     if (clicked && startY && Math.abs(startY - endY) >= 40) {
//         go(!Math.min(0, startY - endY) ? 1 : -1);
//         clicked = false;
//         startY = null;
//         endY = null;
//     }
// }

// window.addEventListener('mousedown', mousedown, false);
// window.addEventListener('touchstart', mousedown, false);
// window.addEventListener('touchmove', function (e) {
//     if (clicked) {
//         endY = e.touches[0].clientY || e.targetTouches[0].clientY;
//     }
// }, false);
// window.addEventListener('touchend', mouseup, false);
// window.addEventListener('mouseup', mouseup, false);

//Mouse Wheel Scroll Transition
let scrollTimeout;
function wheel(e) {
    clearTimeout(scrollTimeout);
    setTimeout(function () {
        console.log(e.deltaY);
        if (e.deltaY < -40) {
            go(-1);
        }
        else if (e.deltaY >= 40) {
            go(1);
        }
    })
}
window.addEventListener('mousewheel', wheel, false);
// window.addEventListener('wheel', wheel, false);

