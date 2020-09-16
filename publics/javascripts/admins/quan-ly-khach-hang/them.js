
$(document).ready(function () {
    //Initialize Button Events
    //ThemKhachHang Confirm
    $('#modelThemKhachHang .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let khachhang = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themKhachHangValidator(khachhang);

        if (errors.length > 0) {
            refreshThemKhachHangAlert(errors);
            return;
        }

        await themKhachHangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelThemKhachHang').on('show.bs.modal', function (event) {
        refreshThemKhachHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemKhachHang with data in khachhangsTypes
function refreshDataInModelThemKhachHang() {
    let loai = $('#modelThemKhachHang .loai');
    let loaiHtml = '';

    khachhangsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them khachhang Alert
function refreshThemKhachHangAlert(alerts, type = 'danger') {
    let themKhachHangAlerts = $('#modelThemKhachHang .alerts');
    let themKhachHangAlertsHtml = '';
    for (let alert of alerts) {
        themKhachHangAlertsHtml += createAlerts(type, alert);
    }
    themKhachHangAlerts.html(themKhachHangAlertsHtml);
}

//Add new khachhang
function themKhachHangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemKhachHangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemKhachHangAlert(['Thêm thành công ' + result], 'success');

                    khachhang.idKhachHang = result;
                    addNewRowToTable(khachhang);

                    $('#modelThemKhachHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemKhachHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemKhachHangAlert([errorString], 'danger');
                } else {
                    refreshThemKhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them KhachHang validator
function themKhachHangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!khachhang.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!khachhang.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!khachhang.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (khachhang.password != khachhang.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!khachhang.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
