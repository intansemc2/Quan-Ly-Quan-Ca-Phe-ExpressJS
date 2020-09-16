
$(document).ready(function () {
    //Initialize Button Events
    //ThemBan Confirm
    $('#modelThemBan .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let ban = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themBanValidator(ban);

        if (errors.length > 0) {
            refreshThemBanAlert(errors);
            return;
        }

        await themBanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelThemBan').on('show.bs.modal', function (event) {
        refreshThemBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemBan with data in bansTypes
function refreshDataInModelThemBan() {
    let loai = $('#modelThemBan .loai');
    let loaiHtml = '';

    bansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them ban Alert
function refreshThemBanAlert(alerts, type = 'danger') {
    let themBanAlerts = $('#modelThemBan .alerts');
    let themBanAlertsHtml = '';
    for (let alert of alerts) {
        themBanAlertsHtml += createAlerts(type, alert);
    }
    themBanAlerts.html(themBanAlertsHtml);
}

//Add new ban
function themBanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemBanAlert(['Thêm thành công ' + result], 'success');

                    ban.idBan = result;
                    addNewRowToTable(ban);

                    $('#modelThemBan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemBanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemBanAlert([errorString], 'danger');
                } else {
                    refreshThemBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Ban validator
function themBanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!ban.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!ban.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!ban.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (ban.password != ban.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!ban.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
