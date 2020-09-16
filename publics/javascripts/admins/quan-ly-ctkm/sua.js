
$(document).ready(function () {
    //Initialize Button Events
    //SuaCtkm Confirm
    $('#modelSuaCtkm .confirm').click(async function () {
        let idCtkm = $(this).parents('form').find('.idCtkm').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let ctkm = { idCtkm: idCtkm, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaCtkmValidator(ctkm);

        if (errors.length > 0) {
            refreshSuaCtkmAlert(errors);
            return;
        }

        await suaCtkmAJAX(ctkm);
    });

    //Events
    //Set ctkm current value When model showup
    $('#modelSuaCtkm').on('show.bs.modal', function (event) {
        let suaCtkmTriggered = $(event.relatedTarget);

        let idCtkm = suaCtkmTriggered.attr('idCtkm');
        let ctkm = ctkms.find((item) => item.idCtkm == idCtkm);

        $('#modelSuaCtkm').find('.idCtkm').val(ctkm.idCtkm);
        $('#modelSuaCtkm').find('.username').val(ctkm.username);
        $('#modelSuaCtkm').find('.password').val(ctkm.password);
        $('#modelSuaCtkm').find('.re_password').val(ctkm.password);
        $('#modelSuaCtkm').find('.loai').val(ctkm.loai);

        refreshSuaCtkmAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaCtkm with data in ctkmsTypes
function refreshDataInModelSuaCtkm() {
    let loai = $('#modelSuaCtkm .loai');
    let loaiHtml = '';

    ctkmsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua ctkm Alert
function refreshSuaCtkmAlert(alerts, type = 'danger') {
    let suaCtkmAlerts = $('#modelSuaCtkm .alerts');
    let suaCtkmAlertsHtml = '';
    for (let alert of alerts) {
        suaCtkmAlertsHtml += createAlerts(type, alert);
    }
    suaCtkmAlerts.html(suaCtkmAlertsHtml);
}

//Add new ctkm
function suaCtkmAJAX(ctkm) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: ctkm })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaCtkmAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaCtkmAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(ctkm);

                    $("#modelSuaCtkm").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaCtkmAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaCtkmAlert([errorString], 'danger');
                } else {
                    refreshSuaCtkmAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Ctkm validator
function suaCtkmValidator(ctkm) {
    let errors = [];

    if (!ctkm) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!ctkm.idCtkm) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!ctkm.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!ctkm.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!ctkm.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (ctkm.password != ctkm.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!ctkm.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
