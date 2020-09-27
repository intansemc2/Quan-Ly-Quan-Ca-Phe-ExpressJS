$(document).ready(function () {
    $('.logoutForm')
        .find("input[name='dangXuat']")
        .click(function () {
            $.ajax({ method: 'DELETE', url: '/api/accountManager', data: {} })
                .then(function (data, status, xhr) {
                    if (data && (data.cookie || data.session)) {
                        swal({ text: 'Đăng xuất thành công ' + JSON.stringify(data), icon: 'success', timer: 1000 });
                    }
                    else {
                        swal({ text: 'Đăng xuất không thành công ' + JSON.stringify(data), icon: 'error', timer: 1000 });
                    }                    
                })
                .fail(function (data, status, xhr) {
                    swal({ text: 'Đăng xuất thất bại ' + JSON.stringify(data), icon: 'error', timer: 1000 });
                });
        });
});
