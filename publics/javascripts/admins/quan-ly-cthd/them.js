
$(document).ready(function () {
    //Initialize Button Events
    //ThemCthd Confirm
    $('#modelThemCthd .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let cthd = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themCthdValidator(cthd);

        if (errors.length > 0) {
            refreshThemCthdAlert(errors);
            return;
        }

        await themCthdAJAX(cthd);
    });

    //Events
    //Set cthd current value When model showup
    $('#modelThemCthd').on('show.bs.modal', function (event) {
        refreshThemCthdAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemCthd with data in cthdsTypes
function refreshDataInModelThemCthd() {
    let loai = $('#modelThemCthd .loai');
    let loaiHtml = '';

    cthdsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them cthd Alert
function refreshThemCthdAlert(alerts, type = 'danger') {
    let themCthdAlerts = $('#modelThemCthd .alerts');
    let themCthdAlertsHtml = '';
    for (let alert of alerts) {
        themCthdAlertsHtml += createAlerts(type, alert);
    }
    themCthdAlerts.html(themCthdAlertsHtml);
}

//Add new cthd
function themCthdAJAX(cthd) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: cthd })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemCthdAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemCthdAlert(['Thêm thành công ' + result], 'success');

                    cthd.idCthd = result;
                    addNewRowToTable(cthd);

                    $('#modelThemCthd').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemCthdAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemCthdAlert([errorString], 'danger');
                } else {
                    refreshThemCthdAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Cthd validator
function themCthdValidator(cthd) {
    let errors = [];

    if (!cthd) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!cthd.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!cthd.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!cthd.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (cthd.password != cthd.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!cthd.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
