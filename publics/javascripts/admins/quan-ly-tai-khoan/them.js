$(document).ready(function () {
    //Initialize Button Events
    //ThemTaikhoan Confirm
    $('#modelThemTaiKhoan .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let taikhoan = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themTaikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshThemTaikhoanAlert(errors);
            return;
        }

        await themTaiKhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelThemTaiKhoan').on('show.bs.modal', function (event) {
        refreshThemTaikhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemTaiKhoan with data in taikhoansTypes
function refreshDataInModelThemTaiKhoan() {
    let loai = $('#modelThemTaiKhoan .loai');
    let loaiHtml = '';

    taikhoansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them taikhoan Alert
function refreshThemTaikhoanAlert(alerts, type = 'danger') {
    let themTaiKhoanAlerts = $('#modelThemTaiKhoan .alerts');
    let themTaiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        themTaiKhoanAlertsHtml += createAlerts(type, alert);
    }
    themTaiKhoanAlerts.html(themTaiKhoanAlertsHtml);
}

//Add new taikhoan
function themTaiKhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemTaikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemTaikhoanAlert(['Thêm thành công ' + result], 'success');

                    taikhoan.idTaiKhoan = result;
                    addNewRowToTable(taikhoan);

                    $('#modelThemTaiKhoan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemTaikhoanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemTaikhoanAlert([errorString], 'danger');
                } else {
                    refreshThemTaikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Taikhoan validator
function themTaikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!taikhoan.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!taikhoan.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!taikhoan.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (taikhoan.password != taikhoan.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!taikhoan.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
