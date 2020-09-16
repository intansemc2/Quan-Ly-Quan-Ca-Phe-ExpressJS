
$(document).ready(function () {
    //Initialize Button Events
    //SuaHoaDon Confirm
    $('#modelSuaHoaDon .confirm').click(async function () {
        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let hoadon = { idHoaDon: idHoaDon, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaHoaDonValidator(hoadon);

        if (errors.length > 0) {
            refreshSuaHoaDonAlert(errors);
            return;
        }

        await suaHoaDonAJAX(hoadon);
    });

    //Events
    //Set hoadon current value When model showup
    $('#modelSuaHoaDon').on('show.bs.modal', function (event) {
        let suaHoaDonTriggered = $(event.relatedTarget);

        let idHoaDon = suaHoaDonTriggered.attr('idHoaDon');
        let hoadon = hoadons.find((item) => item.idHoaDon == idHoaDon);

        $('#modelSuaHoaDon').find('.idHoaDon').val(hoadon.idHoaDon);
        $('#modelSuaHoaDon').find('.username').val(hoadon.username);
        $('#modelSuaHoaDon').find('.password').val(hoadon.password);
        $('#modelSuaHoaDon').find('.re_password').val(hoadon.password);
        $('#modelSuaHoaDon').find('.loai').val(hoadon.loai);

        refreshSuaHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaHoaDon with data in hoadonsTypes
function refreshDataInModelSuaHoaDon() {
    let loai = $('#modelSuaHoaDon .loai');
    let loaiHtml = '';

    hoadonsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua hoadon Alert
function refreshSuaHoaDonAlert(alerts, type = 'danger') {
    let suaHoaDonAlerts = $('#modelSuaHoaDon .alerts');
    let suaHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        suaHoaDonAlertsHtml += createAlerts(type, alert);
    }
    suaHoaDonAlerts.html(suaHoaDonAlertsHtml);
}

//Add new hoadon
function suaHoaDonAJAX(hoadon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: hoadon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaHoaDonAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(hoadon);

                    $("#modelSuaHoaDon").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaHoaDonAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaHoaDonAlert([errorString], 'danger');
                } else {
                    refreshSuaHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua HoaDon validator
function suaHoaDonValidator(hoadon) {
    let errors = [];

    if (!hoadon) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!hoadon.idHoaDon) {
        errors.push('Không thể xác định Id tài khoản ');
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
