
$(document).ready(function () {
    //Initialize Button Events
    //ThemThanhToanHoaDon Confirm
    $('#modelThemThanhToanHoaDon .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let thanhtoanhoadon = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themThanhToanHoaDonValidator(thanhtoanhoadon);

        if (errors.length > 0) {
            refreshThemThanhToanHoaDonAlert(errors);
            return;
        }

        await themThanhToanHoaDonAJAX(thanhtoanhoadon);
    });

    //Events
    //Set thanhtoanhoadon current value When model showup
    $('#modelThemThanhToanHoaDon').on('show.bs.modal', function (event) {
        refreshThemThanhToanHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemThanhToanHoaDon with data in thanhtoanhoadonsTypes
function refreshDataInModelThemThanhToanHoaDon() {
    let loai = $('#modelThemThanhToanHoaDon .loai');
    let loaiHtml = '';

    thanhtoanhoadonsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them thanhtoanhoadon Alert
function refreshThemThanhToanHoaDonAlert(alerts, type = 'danger') {
    let themThanhToanHoaDonAlerts = $('#modelThemThanhToanHoaDon .alerts');
    let themThanhToanHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        themThanhToanHoaDonAlertsHtml += createAlerts(type, alert);
    }
    themThanhToanHoaDonAlerts.html(themThanhToanHoaDonAlertsHtml);
}

//Add new thanhtoanhoadon
function themThanhToanHoaDonAJAX(thanhtoanhoadon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: thanhtoanhoadon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemThanhToanHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemThanhToanHoaDonAlert(['Thêm thành công ' + result], 'success');

                    thanhtoanhoadon.idThanhToanHoaDon = result;
                    addNewRowToTable(thanhtoanhoadon);

                    $('#modelThemThanhToanHoaDon').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemThanhToanHoaDonAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemThanhToanHoaDonAlert([errorString], 'danger');
                } else {
                    refreshThemThanhToanHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them ThanhToanHoaDon validator
function themThanhToanHoaDonValidator(thanhtoanhoadon) {
    let errors = [];

    if (!thanhtoanhoadon) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!thanhtoanhoadon.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!thanhtoanhoadon.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!thanhtoanhoadon.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (thanhtoanhoadon.password != thanhtoanhoadon.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!thanhtoanhoadon.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
