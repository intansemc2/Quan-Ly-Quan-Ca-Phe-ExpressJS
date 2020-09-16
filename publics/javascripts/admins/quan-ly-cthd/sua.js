
$(document).ready(function () {
    //Initialize Button Events
    //SuaCthd Confirm
    $('#modelSuaCthd .confirm').click(async function () {
        let idCthd = $(this).parents('form').find('.idCthd').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let cthd = { idCthd: idCthd, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaCthdValidator(cthd);

        if (errors.length > 0) {
            refreshSuaCthdAlert(errors);
            return;
        }

        await suaCthdAJAX(cthd);
    });

    //Events
    //Set cthd current value When model showup
    $('#modelSuaCthd').on('show.bs.modal', function (event) {
        let suaCthdTriggered = $(event.relatedTarget);

        let idCthd = suaCthdTriggered.attr('idCthd');
        let cthd = cthds.find((item) => item.idCthd == idCthd);

        $('#modelSuaCthd').find('.idCthd').val(cthd.idCthd);
        $('#modelSuaCthd').find('.username').val(cthd.username);
        $('#modelSuaCthd').find('.password').val(cthd.password);
        $('#modelSuaCthd').find('.re_password').val(cthd.password);
        $('#modelSuaCthd').find('.loai').val(cthd.loai);

        refreshSuaCthdAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaCthd with data in cthdsTypes
function refreshDataInModelSuaCthd() {
    let loai = $('#modelSuaCthd .loai');
    let loaiHtml = '';

    cthdsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua cthd Alert
function refreshSuaCthdAlert(alerts, type = 'danger') {
    let suaCthdAlerts = $('#modelSuaCthd .alerts');
    let suaCthdAlertsHtml = '';
    for (let alert of alerts) {
        suaCthdAlertsHtml += createAlerts(type, alert);
    }
    suaCthdAlerts.html(suaCthdAlertsHtml);
}

//Add new cthd
function suaCthdAJAX(cthd) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: cthd })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaCthdAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaCthdAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(cthd);

                    $("#modelSuaCthd").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaCthdAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaCthdAlert([errorString], 'danger');
                } else {
                    refreshSuaCthdAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Cthd validator
function suaCthdValidator(cthd) {
    let errors = [];

    if (!cthd) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!cthd.idCthd) {
        errors.push('Không thể xác định Id tài khoản ');
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
