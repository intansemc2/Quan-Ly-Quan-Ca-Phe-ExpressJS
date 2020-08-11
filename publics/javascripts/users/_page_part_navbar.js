$(document).ready(function(){
    $('#userNavbar .dropdown').on('shown.bs.dropdown', function(){
        let dropdownMenu = $(this).find('.dropdown-menu');
        let windowWidth = $(window).width();

        if (dropdownMenu.offset().left + dropdownMenu.width() > windowWidth) {
            dropdownMenu.offset({top: dropdownMenu.offset().top, left: windowWidth - dropdownMenu.width()});
        }
    });
});