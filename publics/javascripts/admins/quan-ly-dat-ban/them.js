
$(document).ready(function () {
    //Initialize Button Events
    //ThemDatBan Confirm
    $('#modelThemDatBan .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let datban = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themDatBanValidator(datban);

        if (errors.length > 0) {
            refreshThemDatBanAlert(errors);
            return;
        }

        await themDatBanAJAX(datban);
    });

    //Events
    //Set datban current value When model showup
    $('#modelThemDatBan').on('show.bs.modal', function (event) {
        refreshThemDatBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemDatBan with data in datbansTypes
function refreshDataInModelThemDatBan() {
    let loai = $('#modelThemDatBan .loai');
    let loaiHtml = '';

    datbansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them datban Alert
function refreshThemDatBanAlert(alerts, type = 'danger') {
    let themDatBanAlerts = $('#modelThemDatBan .alerts');
    let themDatBanAlertsHtml = '';
    for (let alert of alerts) {
        themDatBanAlertsHtml += createAlerts(type, alert);
    }
    themDatBanAlerts.html(themDatBanAlertsHtml);
}

//Add new datban
function themDatBanAJAX(datban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: datban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemDatBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemDatBanAlert(['Thêm thành công ' + result], 'success');

                    datban.idDatBan = result;
                    addNewRowToTable(datban);

                    $('#modelThemDatBan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemDatBanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemDatBanAlert([errorString], 'danger');
                } else {
                    refreshThemDatBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them DatBan validator
function themDatBanValidator(datban) {
    let errors = [];

    if (!datban) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!datban.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!datban.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!datban.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (datban.password != datban.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!datban.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
