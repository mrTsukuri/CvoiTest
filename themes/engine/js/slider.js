import Swiper, { Navigation, Grid } from 'swiper';


document.addEventListener('DOMContentLoaded', function () {
    if(document.querySelector(".baner-slider")){
        document.querySelectorAll(".baner-slider").forEach(item => {            
            let navigation = {};            
            let currentNavigation = document.querySelector('.baner-slider-wrapper');          
            let next = currentNavigation.querySelector('.baner-slider-next');
            let prev = currentNavigation.querySelector('.baner-slider-prev');            
            navigation = {
                nextEl: next,
                prevEl: prev,
            }            
            new Swiper(item, {
                modules: [ Navigation ],
                spaceBetween: 10,
                slidesPerView: 1,
                navigation: navigation,                
                watchSlidesVisibility: true,
                slideActiveClass: "active",
                allowTouchMove: true,                
            })
        })
    }
    if(document.querySelector(".slider-4")){
        document.querySelectorAll(".slider-4").forEach(item => {
            let currentCategory = item.dataset.category;
            let navigation = {};            
            let currentNavigation = document.querySelector(`.slider-navigation-4[data-category="${currentCategory}"]`);          
            let next = currentNavigation.querySelector('.slider-next');
            let prev = currentNavigation.querySelector('.slider-prev');            
            navigation = {
                nextEl: next,
                prevEl: prev,
            }            
            new Swiper(item, {
                modules: [ Navigation ],
                spaceBetween: 10,
                slidesPerView: 'auto',
                navigation: navigation,                
                watchSlidesVisibility: true,
                slideActiveClass: "active",
                allowTouchMove: true,
                breakpoints: {
                    768: {                        
                        spaceBetween: 20,
                        slidesPerView: 2,                          
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3,    
                    },
                    1200: {                        
                        spaceBetween: 20,
                        slidesPerView: 4,    
                    },
                    1424: {
                        spaceBetween: 30,
                        slidesPerView: 4   
                    }
                }               
            })
        })
    }
    if(document.querySelector(".slider-2")){
        document.querySelectorAll(".slider-2").forEach(item => {
            let currentCategory = item.dataset.category;
            let navigation = {};            
            let currentNavigation = document.querySelector(`.slider-navigation-2[data-category="${currentCategory}"]`);          
            let next = currentNavigation.querySelector('.slider-next');
            let prev = currentNavigation.querySelector('.slider-prev');            
            navigation = {
                nextEl: next,
                prevEl: prev,
            }            
            new Swiper(item, {
                modules: [ Navigation ],
                spaceBetween: 10,
                slidesPerView: 'auto',
                navigation: navigation,                
                watchSlidesVisibility: true,
                slideActiveClass: "active",
                allowTouchMove: true,
                breakpoints: { 
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },                 
                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 20,    
                    },
                    1424: {
                        slidesPerView: 2,
                        spaceBetween: 30,    
                    }
                }                    
            })
        })
    }
    if(document.querySelector('.slider-team')){
        document.querySelectorAll('.slider-team').forEach(item => {                        
            new Swiper(item, {
                modules: [Grid],                                
                spaceBetween: 10,
                slidesPerView: 'auto',
                grid: {
                    fill: 'row',
                    rows: 2,
                },
                speed: 500,                                                         
                watchSlidesVisibility: true,
                slideActiveClass: "active",
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                breakpoints: {
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 2,
                        slidesPerGroup: 2,                        
                    },                    
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                        slidesPerGroup: 3,                        
                    },                    
                    1200: {
                        spaceBetween: 20,
                        slidesPerView: 4,
                        slidesPerGroup: 4,                        
                    },                    
                    1424: {
                        spaceBetween: 30,
                        slidesPerView: 4,
                        slidesPerGroup: 4,                                                                                                 
                    }                                      
                }            
            });            
        });        
    }
//     if(document.querySelector('.letters-slider')){
//         document.querySelectorAll('.letters-slider').forEach(item => {                  
//             let currentNavigation = document.querySelector(`.letters-navigation`);         
//             let navigation = {}; 
//             let pagination = {};          
//             if (currentNavigation) {
//                 let next = currentNavigation.querySelector('.slider-next');
//                 let prev = currentNavigation.querySelector('.slider-prev');
//                 let pag = currentNavigation.querySelector('.slider-pagination');
//                 navigation = {
//                     nextEl: next,
//                     prevEl: prev,
//                 }
//                 pagination = {
//                     el: pag,
//                     type: 'bullets',
//                 }
//             } 
//             new Swiper(item, {
//                 spaceBetween: 20,
//                 slidesPerView: 'auto',
//                 navigation: navigation,
//                 pagination: pagination,
//                 watchSlidesVisibility: true,
//                 slideActiveClass: "active",
//                 allowTouchMove: true,
//                 loop: true,
//                 centeredSlides: true,                               
//             })
//         })
//     }
//     document.querySelectorAll('.video-youtube').forEach(function(item) {        
//         lightGallery(item, {
//             plugins: [lgVideo],
//             selector: '.video-block'
//         });
//     });
//     function lgGallery(name){
//         document.querySelectorAll(name).forEach(item => {                       
//             lightGallery(item, { 
//                 plugins: [lgZoom],
//                 speed: 500,
//                 selector: '.ratio',                               
//             })
//         })   
//     }//          
    
})

