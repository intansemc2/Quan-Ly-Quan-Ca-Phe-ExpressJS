$(document).ready(function(){
    new Swiper('#userClientComment .swiper-container', {
        effect: 'slide',
        slidesPerView: 4,
        spaceBetween: 15,
        autoplay: false,
        speed: 400,
        loop: true,
        navigation: {
            nextEl: '#userClientComment .swiper-button-next',
            prevEl: '#userClientComment .swiper-button-prev'
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
});