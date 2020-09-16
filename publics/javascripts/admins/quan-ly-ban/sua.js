
$(document).ready(function () {
    //Initialize Button Events
    //SuaBan Confirm
    $('#modelSuaBan .confirm').click(async function () {
        let idBan = $(this).parents('form').find('.idBan').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let ban = { idBan: idBan, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaBanValidator(ban);

        if (errors.length > 0) {
            refreshSuaBanAlert(errors);
            return;
        }

        await suaBanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelSuaBan').on('show.bs.modal', function (event) {
        let suaBanTriggered = $(event.relatedTarget);

        let idBan = suaBanTriggered.attr('idBan');
        let ban = bans.find((item) => item.idBan == idBan);

        $('#modelSuaBan').find('.idBan').val(ban.idBan);
        $('#modelSuaBan').find('.username').val(ban.username);
        $('#modelSuaBan').find('.password').val(ban.password);
        $('#modelSuaBan').find('.re_password').val(ban.password);
        $('#modelSuaBan').find('.loai').val(ban.loai);

        refreshSuaBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaBan with data in bansTypes
function refreshDataInModelSuaBan() {
    let loai = $('#modelSuaBan .loai');
    let loaiHtml = '';

    bansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua ban Alert
function refreshSuaBanAlert(alerts, type = 'danger') {
    let suaBanAlerts = $('#modelSuaBan .alerts');
    let suaBanAlertsHtml = '';
    for (let alert of alerts) {
        suaBanAlertsHtml += createAlerts(type, alert);
    }
    suaBanAlerts.html(suaBanAlertsHtml);
}

//Add new ban
function suaBanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaBanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(ban);

                    $("#modelSuaBan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaBanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaBanAlert([errorString], 'danger');
                } else {
                    refreshSuaBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Ban validator
function suaBanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!ban.idBan) {
        errors.push('Không thể xác định Id tài khoản ');
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
