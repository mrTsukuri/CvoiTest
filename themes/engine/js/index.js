import JsTabs from 'js-tabs';
import StarRating from 'star-rating.js';
import MmenuLight from 'mmenu-light';
import { Toast } from './../../../../node_modules/bootstrap/dist/js/bootstrap.esm.min';
// import IMask from 'imask';




// function parseHTML(html) {
//     const t = document.createElement('template');
//     t.innerHTML = html;
//     return t.content.cloneNode(true);
// }

//Swiper.use([Navigation, Thumbs]);

document.addEventListener('DOMContentLoaded', function () {
    //dropdawn
    function dropdawn(){          
        document.querySelectorAll('.dropdawn').forEach(item => {
          item.addEventListener("mouseover", function(){
            item.querySelector('.dropdawn-btn').classList.add('active');
            document.querySelectorAll('.dropdawn-menu').forEach(menu => menu.classList.remove('active'));
            item.querySelector('.dropdawn-menu').classList.add('active');            
          });          
        })
        document.querySelectorAll('.dropdawn').forEach(item => {          
          item.addEventListener("mouseleave", function(){
            let timer = setTimeout(function(){
              item.querySelector('.dropdawn-menu').classList.remove('active');
              item.querySelector('.dropdawn-btn').classList.remove('active');
            }, 200);
            item.addEventListener('mouseover', function(){
              item.querySelector('.dropdawn-btn').classList.add('active');
              item.querySelector('.dropdawn-menu').classList.add('active');
              clearTimeout(timer);              
            })                        
          })
        })
    }  
    dropdawn();
    //mask
    function isNumber(val) {
        return /^[-]?\d+$/.test(val);
    }          
    function format(targetInput, e) {        
        let tel = targetInput.value.replace(/[^0-9]/g, '');            
        let result = '';
        let position = getCursorPosition(targetInput);
        if (tel.length) {
          if ("0" !== tel[0] && "1" !== tel[0] && "2" !== tel[0] && "3" !== tel[0] && "4" !== tel[0] && "5" !== tel[0] && "6" !== tel[0] && "9" !== tel[0] || (tel = "7" + tel), "8" === tel[0])
                result = "7";
            else {
                if ("7" !== tel[0])
                    return;
                result = tel[0]
            }
            result = '+' + result,          
            result = result + " (" + tel.substring(1, 4),
            tel.length > 3 && (result = result + ") " + tel.substring(4, 7)),
            tel.length > 6 && (result = result + " " + tel.substring(7, 9)),
            tel.length > 9 && (result = result + "-" + tel.substring(9, 11))                              
        }                                      
        targetInput.value = result;               
        if (e.keyCode === 46 || e.keyCode === 8) {                     
            setCaretPosition(targetInput, position);            
        }        
    }
    function setCaretPosition(elem, caretPos) {
        let range = void 0;    
        if (elem.createTextRange) {    
            range = elem.createTextRange();    
            range.move('character', caretPos);    
            range.select();    
        } else {    
            elem.focus();    
            if (elem.selectionStart !== undefined) {    
                elem.setSelectionRange(caretPos, caretPos);    
            }    
        }    
    }            
    function getCursorPosition(element) {    
        let el = element;    
        let pos = 0;    
        if ('selectionStart' in el) {    
            pos = el.selectionStart;    
        } else if ('selection' in document) {    
            el.focus();    
            var Sel = document.selection.createRange();    
            var SelLength = document.selection.createRange().text.length;    
            Sel.moveStart('character', -el.value.length);    
            pos = Sel.text.length - SelLength;    
        }            
        return pos;    
    }    
    function formatUp(e){
        format(e.currentTarget, e);                
        if(isNumber(e.key) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){            
            format(e.currentTarget, e);
        }    
    }   
    function formatDown(e){                       
        if(!isNumber(e.key) && e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39){            
            e.preventDefault();
            e.stopPropagation();                      
        }
    }   
    document.querySelectorAll('input[type="tel"]').forEach(input => {               
        input.addEventListener('keydown', formatDown)
        input.addEventListener('keyup', formatUp)      
    })
    //marquee
    function handleMarquee(){
      const marquee = document.querySelectorAll('.js_marquee');
      let speed = 1;        
      
      marquee.forEach(function(el){
          const container = el.querySelector('.js_marquee-inner');
          const content = el.querySelector('.js_marquee-inner > *');
          //Get total width
          const  elWidth = content.offsetWidth;            
          
          //Duplicate content
          let clone = content.cloneNode(true);
          container.appendChild(clone);
          
          let progress = 1;
          function loop(){
              progress = progress-speed;
              if(progress <= elWidth*-1) {progress=0;}
              container.style.transform = 'translateX(' + progress + 'px)';
              container.style.transform += 'skewX(' + speed*0.4 + 'deg)';
              
              window.requestAnimationFrame(loop);
          }
          loop();
      });             
    };
    handleMarquee();
    // inputFile
    document.querySelectorAll('.input-file').forEach(item => {
        item.querySelector('input[type=file]').addEventListener('change', function(){        
            item.querySelector('.input-file-text').innerHTML = this.files[0].name;
        })
    })
  
    //map
    function init (){
        let points = [];
        document.querySelectorAll(".js_office_coordinates").forEach((function(item) {
            points[item.dataset.category] = new YMaps.GeoPoint(item.dataset.longitude, item.dataset.latitude);
        }));                 
        let map = new YMaps.Map(YMaps.jQuery("#YaMaps")[0]);
        // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
        
        // Стили для метки    
        let s = new YMaps.Style();        
        s.iconStyle = new YMaps.IconStyle();
        s.iconStyle.href = "images/map-icon.svg";
        s.iconStyle.size = new YMaps.Point(50, 50);
        s.iconStyle.offset = new YMaps.Point(-30, -40);        
        // Создание меток               
        for(let key in points){
            map.addOverlay(new YMaps.Placemark(points[key], {style: s}));
        }
        //map.addControl(new YMaps.Zoom(), new YMaps.ControlPosition(YMaps.ControlPosition.TOP_LEFT, new YMaps.Point(10, 30)));                
        // Перемещение по карте        
        if(document.querySelector('.map-address')){
            document.querySelector('.map-address').classList.add('active');
            map.setCenter(points[document.querySelector('.map-address').dataset.category], 18);        
            document.querySelectorAll('.map-address').forEach(item => {            
                item.addEventListener('click', () => {
                    document.querySelectorAll('.map-address').forEach(i => {
                        i.classList.remove('active');
                    });
                    item.classList.add('active');
                    map.panTo(points[item.dataset.category], {flying: 1});
                });            
            });
        }                                            
    }
    if(document.querySelector(".maploader")){
        document.querySelector('.maploader').addEventListener('click', function(){                    
            YMaps.load(init);                    
        });
        
    } else if(document.querySelector('#YaMaps')){
        YMaps.load(init);
    } 
    //rating
    document.querySelectorAll('.star-rating').forEach(item => {
        new StarRating(item, {
            clearable: true,
            tooltip: false,
            maxStars: 5,  
        });
    });
    //select
    document.querySelectorAll('.custom-select').forEach(select => {
        let sndSelect = select.querySelector('select');                   
        let selectValue = document.createElement('div');
        let selectResult = document.createElement('span');
        let selectBlock = document.createElement('div');
        let selectOption;
        selectValue.setAttribute('class', 'custom-select-value main-input');
        selectResult.setAttribute('class', 'custom-select-result');
        selectBlock.setAttribute('class', 'custom-select-block overflow-auto');
        selectResult.innerHTML = sndSelect.options[sndSelect.selectedIndex].innerHTML;
        selectValue.appendChild(selectResult);
        selectValue.appendChild(document.createElement('i')).setAttribute('class', 'u_angle-right');        
        select.appendChild(selectValue);
        for(let i = 0; i < sndSelect.length; i++){
            selectOption = document.createElement('div');
            selectOption.innerHTML = sndSelect.options[i].innerHTML; 
            selectOption.setAttribute('data-value', sndSelect.options[i].value);                      
            selectOption.addEventListener('click', function(){
                let parentSelect = this.parentNode.parentNode.querySelector('select');
                let parentSibling = this.parentNode.previousSibling.querySelector('.custom-select-result');                
                for(let j = 0; j < parentSelect.length; j++){
                    if(parentSelect.options[j].innerHTML == this.innerHTML){                        
                        parentSelect.selectedIndex = j;                        
                        parentSibling.innerHTML = this.innerHTML;
                        let sameAsSlt = this.parentNode.querySelectorAll(".same-as-selected");
                        sameAsSlt.forEach(items => {
                            items.classList.remove('same-as-selected');
                        });                        
                        this.classList.add('same-as-selected');                        
                    }
                }                
                parentSibling.click();
                parentSelect.dispatchEvent(new Event('change'));     
            });
            selectBlock.appendChild(selectOption);
        }        
        select.appendChild(selectBlock);
        selectValue.addEventListener('click', function(e){
            e.stopPropagation();
            closeSel(this.closest('.custom-select'));
            this.nextSibling.classList.toggle("active");
            this.classList.toggle("active");
        });
    });
    function closeSel(elm) {            
        document.querySelectorAll('.custom-select').forEach(item => {            
            if(item !== elm){                
                item.querySelector('.custom-select-value').classList.remove('active');
                item.querySelector('.custom-select-block').classList.remove('active');
            }                                                        
        });  
    }
    document.addEventListener('click', function(e){        
        if(!e.target.closest('.custom-select')){
            document.querySelectorAll('.custom-select').forEach(item => {                    
                item.querySelector('.custom-select-value').classList.remove('active');
                item.querySelector('.custom-select-block').classList.remove('active');                                                                   
            });      
        }
    });
    let mobileMenu = new MmenuLight(document.querySelector("#mobile-menu"));
    mobileMenu.navigation({
        title: "Меню",
        theme: "dark"
    });
    let drawerMenu = mobileMenu.offcanvas();
    document.querySelectorAll('a[href="#mobile-menu"]').forEach(item => item.addEventListener('click', function (evnt) {
        evnt.preventDefault();
        drawerMenu.open();
    }));                
    // if (document.querySelector('.spoiler')) {
    //     document.querySelectorAll('.spoiler-btn').forEach(function (item, index) {
    //       item.addEventListener('click', function (event) {
    //           event.preventDefault();
    //           item.classList.toggle('active');
    //           item.closest('.spoiler').classList.toggle('active');
    //           let container = document.querySelectorAll('.spoiler-block')[index];
  
    //           if (!container.classList.contains('active')) {
    //           container.classList.add('active');
    //           container.style.height = 'auto';
    //           let height = container.clientHeight + 'px';
    //           container.style.height = '0px'; 
    //           setTimeout(function () {
    //               container.style.height = height;
    //           }, 0);
    //           } else {
    //           container.style.height = '0px';
    //           container.addEventListener('transitionend', function () {
    //               container.classList.remove('active');
    //           }, {
    //               once: true
    //           });
    //           }
    //       });
    //     }); 
    // }
    // if(document.querySelector('.windows-type')){
    //     const myTabs = new JsTabs({
    //         elm: '.windows-type',
    //         shouldScrollTabIntoView: false,
    //     })
    //     myTabs.init()
    // }
    // function tabs(tabName){        
    //     if(document.querySelector(tabName)){            
    //         document.querySelectorAll(tabName).forEach(item => {
    //             let tab = new JsTabs({
    //                 elm: item,
    //                 shouldScrollTabIntoView: false,
    //             });
    //             tab.init();               
    //             item.querySelector(".js-tabs__tab").classList.add("active");
    //             item.querySelector(".js-tabs__content").classList.add("active");
    //         });            
    //     }    
    // }    

    // tabs('.profile-tab');
                                          
    
        
      
    
    
      
    // // if(document.querySelector('.map')){
    // //     let load = false;
    // //     window.addEventListener('scroll', function(){      
    // //         if(load === false){
    // //             load = true;
    // //             setTimeout(() => {                    
    // //                 let script = document.createElement('script');
    // //                 script.async = true;
    // //                 script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A1ea17c6dc425372fbbd98705e05f9ed8e3e5bd8ef40262983fb1a4069d2f995b&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=false"
    // //                 document.querySelector('.map-block').replaceWith(script);                      
    // //             }, 1000)  
    // //         }
    // //     })
    // // }
        
        
    // const notice = (message, delay = 4000) => {
    //     let container = document.querySelector('.js_toast_container');
    //     if (!container) {
    //         container = parseHTML(`<div aria-live="polite" aria-atomic="true">
    //                                         <div class="toast-container position-fixed top-0 end-0 p-3 js_toast_container" style="z-index: 10000;"> 
    //                                         </div>
    //                                     </div>`);
    
    //         document.querySelector('body').append(container);
    //     }
    
    //     let id = Math.random().toString().substring(2);
    
    //     let element = parseHTML(`<div class="toast" id="toast_${id}" role="alert" aria-live="assertive" data-bs-animation="true" data-bs-delay="${delay}" aria-atomic="true">
    //                                         <div class="toast-header">
    //                                             <button type="button" class="btn-close border-0 bg-transparent p-0" data-bs-dismiss="toast" aria-label="Close">
    //                                                 <i class="icon-u_multiply icon fs-20"></i> 
    //                                             </button>
    //                                         </div>
    //                                         <div class="toast-body">
    //                                             ${message}
    //                                         </div>
    //                                     </div>`);
    
    //     container.append(element);
    //     let to = document.querySelector(`#toast_${id}`);        
    //     let t = new Toast(to);
    //     t.show();
    
    //     to.addEventListener('hidden.bs.toast', () => to.remove());        
    
        
    // };
    
    // window.noty = notice;
        
    // document.querySelectorAll('.js_benefit').forEach(item => {
    //     item.querySelector('.btn-close').addEventListener('click', ()=>{
    //         item.style.display='none';
    //     })                             
    // })
    // document.querySelectorAll('.js_plus').forEach(item => {
    //     item.querySelector('.js_plus-btn').addEventListener('click', function(){
    //         this.classList.toggle('active');
    //         item.querySelector('.js_plus-desc').classList.toggle('active');
    //     })
    // });
    // document.querySelectorAll('.num-grow').forEach(item => { 
    //     let aboutBlock = item.closest('.about-mid-item');
    //     function inter(item){
    //         let finalNum = +item.dataset.num;
    //         let startNum = 0;
    //         item.innerHTML = startNum
    //         let interStep = 1000 / finalNum;        
    //         let step;                                 
    //         if(finalNum > 1000){
    //             step = Math.floor(finalNum / 200);
    //         } else 
    //             step = Math.floor(finalNum / 15);
    //         //console.log(step + " step");
    //         //console.log(interStep >= 50 ? 50 + " speed" : 5 + " speed");                        
    //         let inter = setInterval(() => {
    //             startNum += step;
    //             if(startNum > finalNum){
    //                 startNum = finalNum;
    //             }
    //             let strNum = String(startNum);            
    //             item.innerHTML = strNum.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');                                             
    //             if(startNum >= finalNum){
    //                 clearInterval(inter);
    //             }
    //         }, interStep >= 50 ? 50 : 0.1);
    //     }
        
    //     if(aboutBlock.getBoundingClientRect().top > window.innerHeight){            
    //         window.addEventListener('scroll', function t(){                                            
    //             if (aboutBlock.getBoundingClientRect().top <= window.innerHeight) {                    
    //                 this.removeEventListener('scroll', t);                                        
    //                 inter(item);
    //             }
    //         });    
    //     } else {            
    //         inter(item);
    //     }                
    //     // if(window.scrollY <= aboutBlock.offsetTop - 813){            
    //     //     window.addEventListener('scroll', function t(){                
    //     //         if (this.scrollY > aboutBlock.offsetTop - 813) {
    //     //             this.removeEventListener('scroll', t);                                        
    //     //             inter(item);
    //     //         }
    //     //     });
    //     // } else {            
    //     //     inter(item);
    //     // }                                  
    // })
             
       
})



