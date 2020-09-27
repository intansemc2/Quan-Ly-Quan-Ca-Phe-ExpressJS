$(document).ready(function () {
    $('.loginForm')
        .find("input[name='dangNhap']")
        .click(function () {
            let loginForm = $(this).parents('.loginForm');
            let tenDangNhap = $(loginForm).find("input[name='tenDangNhap']").val();
            let matKhau = $(loginForm).find("input[name='matKhau']").val();
            let ghiNho = $(loginForm).find("input[name='ghiNho']").val();
            $.ajax({ method: 'POST', url: '/api/accountManager', data: { tenDangNhap: tenDangNhap, matKhau: matKhau, ghiNho: ghiNho } })
                .then(function (data, status, xhr) {
                    if (data && (data.cookie || data.session)) {
                        swal({ text: 'Đăng nhập thành công ' + JSON.stringify(data), icon: 'success', timer: 1000 });
                    } else {
                        swal({ text: 'Đăng nhập không thành công ' + JSON.stringify(data), icon: 'error', timer: 1000 });
                    }
                })
                .fail(function (data, status, xhr) {
                    swal({ text: 'Đăng nhập thất bại ' + JSON.stringify(data), icon: 'error', timer: 1000 });
                });
        });
});
