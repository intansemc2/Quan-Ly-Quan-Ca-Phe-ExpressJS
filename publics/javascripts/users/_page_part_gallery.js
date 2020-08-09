$(document).ready(function(){
    lightGallery(document.querySelector('#userGallery .gallery-container'));
    new Swiper('#userGallery .swiper-container', {
        effect: 'slide',
        slidesPerView: 4,
        spaceBetween: 15,
        autoplay: false,
        speed: 400,
        loop: true,
        navigation: {
            nextEl: '#userGallery .swiper-button-next',
            prevEl: '#userGallery .swiper-button-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 5
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
});