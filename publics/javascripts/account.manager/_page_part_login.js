function loginAJAX(tendangnhap, matkhau, ghinho) {
    $.ajax({ method: 'POST', url: '', data: { tendangnhap: tendangnhap, matkhau: matkhau, ghinho: ghinho } })
        .done(function (data, status, xhr) {
            //
        })
        .fail(function (data, status, xhr) {
            //
        });
}

$(document).ready(function () {
    $('.loginForm');
});
