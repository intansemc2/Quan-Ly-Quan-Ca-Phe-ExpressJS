
$(document).ready(function () {
    //Initialize Button Events
    //SuaDatBan Confirm
    $('#modelSuaDatBan .confirm').click(async function () {
        let idDatBan = $(this).parents('form').find('.idDatBan').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let datban = { idDatBan: idDatBan, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaDatBanValidator(datban);

        if (errors.length > 0) {
            refreshSuaDatBanAlert(errors);
            return;
        }

        await suaDatBanAJAX(datban);
    });

    //Events
    //Set datban current value When model showup
    $('#modelSuaDatBan').on('show.bs.modal', function (event) {
        let suaDatBanTriggered = $(event.relatedTarget);

        let idDatBan = suaDatBanTriggered.attr('idDatBan');
        let datban = datbans.find((item) => item.idDatBan == idDatBan);

        $('#modelSuaDatBan').find('.idDatBan').val(datban.idDatBan);
        $('#modelSuaDatBan').find('.username').val(datban.username);
        $('#modelSuaDatBan').find('.password').val(datban.password);
        $('#modelSuaDatBan').find('.re_password').val(datban.password);
        $('#modelSuaDatBan').find('.loai').val(datban.loai);

        refreshSuaDatBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaDatBan with data in datbansTypes
function refreshDataInModelSuaDatBan() {
    let loai = $('#modelSuaDatBan .loai');
    let loaiHtml = '';

    datbansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua datban Alert
function refreshSuaDatBanAlert(alerts, type = 'danger') {
    let suaDatBanAlerts = $('#modelSuaDatBan .alerts');
    let suaDatBanAlertsHtml = '';
    for (let alert of alerts) {
        suaDatBanAlertsHtml += createAlerts(type, alert);
    }
    suaDatBanAlerts.html(suaDatBanAlertsHtml);
}

//Add new datban
function suaDatBanAJAX(datban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: datban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaDatBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaDatBanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(datban);

                    $("#modelSuaDatBan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaDatBanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaDatBanAlert([errorString], 'danger');
                } else {
                    refreshSuaDatBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua DatBan validator
function suaDatBanValidator(datban) {
    let errors = [];

    if (!datban) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!datban.idDatBan) {
        errors.push('Không thể xác định Id tài khoản ');
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
