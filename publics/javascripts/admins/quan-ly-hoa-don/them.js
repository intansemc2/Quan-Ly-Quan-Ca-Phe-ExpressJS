
$(document).ready(function () {
    //Initialize Button Events
    //ThemHoaDon Confirm
    $('#modelThemHoaDon .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let hoadon = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themHoaDonValidator(hoadon);

        if (errors.length > 0) {
            refreshThemHoaDonAlert(errors);
            return;
        }

        await themHoaDonAJAX(hoadon);
    });

    //Events
    //Set hoadon current value When model showup
    $('#modelThemHoaDon').on('show.bs.modal', function (event) {
        refreshThemHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemHoaDon with data in hoadonsTypes
function refreshDataInModelThemHoaDon() {
    let loai = $('#modelThemHoaDon .loai');
    let loaiHtml = '';

    hoadonsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them hoadon Alert
function refreshThemHoaDonAlert(alerts, type = 'danger') {
    let themHoaDonAlerts = $('#modelThemHoaDon .alerts');
    let themHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        themHoaDonAlertsHtml += createAlerts(type, alert);
    }
    themHoaDonAlerts.html(themHoaDonAlertsHtml);
}

//Add new hoadon
function themHoaDonAJAX(hoadon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: hoadon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemHoaDonAlert(['Thêm thành công ' + result], 'success');

                    hoadon.idHoaDon = result;
                    addNewRowToTable(hoadon);

                    $('#modelThemHoaDon').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemHoaDonAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemHoaDonAlert([errorString], 'danger');
                } else {
                    refreshThemHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them HoaDon validator
function themHoaDonValidator(hoadon) {
    let errors = [];

    if (!hoadon) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!hoadon.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!hoadon.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!hoadon.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (hoadon.password != hoadon.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!hoadon.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
