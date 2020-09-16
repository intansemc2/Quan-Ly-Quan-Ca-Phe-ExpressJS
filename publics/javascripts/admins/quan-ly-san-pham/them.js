
$(document).ready(function () {
    //Initialize Button Events
    //ThemSanPham Confirm
    $('#modelThemSanPham .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let sanpham = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themSanPhamValidator(sanpham);

        if (errors.length > 0) {
            refreshThemSanPhamAlert(errors);
            return;
        }

        await themSanPhamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelThemSanPham').on('show.bs.modal', function (event) {
        refreshThemSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemSanPham with data in sanphamsTypes
function refreshDataInModelThemSanPham() {
    let loai = $('#modelThemSanPham .loai');
    let loaiHtml = '';

    sanphamsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them sanpham Alert
function refreshThemSanPhamAlert(alerts, type = 'danger') {
    let themSanPhamAlerts = $('#modelThemSanPham .alerts');
    let themSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themSanPhamAlertsHtml += createAlerts(type, alert);
    }
    themSanPhamAlerts.html(themSanPhamAlertsHtml);
}

//Add new sanpham
function themSanPhamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemSanPhamAlert(['Thêm thành công ' + result], 'success');

                    sanpham.idSanPham = result;
                    addNewRowToTable(sanpham);

                    $('#modelThemSanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemSanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemSanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them SanPham validator
function themSanPhamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!sanpham.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!sanpham.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!sanpham.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (sanpham.password != sanpham.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!sanpham.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
