let cols=3
let current=0
const main = document.getElementById('main');
const t=gsap.timeline()
let parts=[]

let images=[
'./animalimg/1.png',
'./animalimg/2.png',
'./animalimg/3.png',
'./animalimg/4.png',
'./animalimg/5.png',
'./animalimg/6.png',
'./animalimg/7.png',
]
for(let i in images){
    new Image().src=images[i]
}
for(let col=0;col<cols;col++){
let part= document.createElement('div')
part.classList.add('part')
let section=document.createElement('div')
section.classList.add('section')
let img =document.createElement('img')
img.src=images[current]
part.style.setProperty('--x',-100/cols*col +'vw')
main.appendChild(part)
part.appendChild(section)
section.appendChild(img)
parts.push(part)
}

parts[0].addEventListener('wheel',function(e){
    if(e.deltaY>40){
        current++  
        if(current>=images.length) {current=0}
        let next = document.createElement('div');
        next.className = 'section';
        let img=document.createElement('img')
        img.src=images[current]
        next.appendChild(img)
        parts[0].prepend(next);

            gsap.to(parts[0], {duration:2, y: -window.innerHeight }).then(function () {
                parts[0].children[1].remove();
                gsap.to(parts[0], { duration: 0, y: 0 });
            })
    }
    else{

    }
    })
    parts[1].addEventListener('wheel',function(e){
        if(e.deltaY>40){
            current++  
            if(current>=images.length) {current=0}
            let next = document.createElement('div');
            next.className = 'section';
            let img=document.createElement('img')
            img.src=images[current]
            next.appendChild(img)
            parts[1].appendChild(next);
                gsap.to(parts[1], {duration:2, y:-window.innerHeight }).then(function () {
                    parts[1].children[0].remove();
                    gsap.to(parts[1], { duration: 0, y: 0 });
                })
            
            
            
        
            
            }
        })
        parts[2].addEventListener('wheel',function(e){
            if(e.deltaY>40){
                current++  
                if(current>=images.length) {current=0}
                let next = document.createElement('div');
                next.className = 'section';
                let img=document.createElement('img')
                img.src=images[current]
                next.appendChild(img)
                parts[2].appendChild(next);
                    gsap.to(parts[2], {duration:2, y: -window.innerHeight }).then(function () {
                        parts[2].children[0].remove();
                        gsap.to(parts[2], { duration: 0, y: 0 });
                    })
                
                
                
            
                
                }
            })
        

        
        


        
    
    
// })


// let animOptions = {
//     duration: 2.3,
//     ease: Power4.easeInOut
// };

// function go(dir) {
//     if (!playing) {
//         playing = true;
//         if (current + dir < 0) current = images.length - 1;
//         else if (current + dir >= images.length) current = 0;
//         else current += dir;

//         function up(part, next) {
//             part.appendChild(next);
//             gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function () {
//                 part.children[0].remove();
//                 gsap.to(part, { duration: 0, y: 0 });
//             })
//         }

//         function down(part, next) {
//             part.prepend(next);
//             gsap.to(part, { duration: 0, y: -window.innerHeight });
//             gsap.to(part, { ...animOptions, y: 0 }).then(function () {
//                 part.children[1].remove();
//                 playing = false;
//             })
//         }



//         for (let p in parts) {
//             let part = parts[p];
//             let next = document.createElement('div');
//             next.className = 'section';
//             let img = document.createElement('img');
//             img.src = images[current];
//             next.appendChild(img);

//             if ((p - Math.max(0, dir)) % 2) {
//                 /**假如在第0張 :往下滾 (0-1)%2=1  往上滾 (0)%2=0 */
//                 down(part, next);//如果往下 p=0 p=2 第一張跟第三張往下   如果往上 p=1 第二張往下           
                
//             } else {
//                 up(part, next);//如果往下 p=1 第二張往上
//                                //如果往上 p=0 p=2 第一張跟第三張往下 
//             }
//         }
//     }
// }
// function wheel(e) {
//     // clearTimeout(scrollTimeout);
//     setTimeout(function () {
//         console.log(e.deltaY);
//         if (e.deltaY < -40) {
//             go(-1);
//         }
//         else if (e.deltaY >= 40) {
//             go(1);
//         }
//     })
// }
// parts[0].addEventListener('mousewheel', wheel, false);