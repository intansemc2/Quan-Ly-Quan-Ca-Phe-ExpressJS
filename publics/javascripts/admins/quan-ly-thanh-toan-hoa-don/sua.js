
$(document).ready(function () {
    //Initialize Button Events
    //SuaThanhToanHoaDon Confirm
    $('#modelSuaThanhToanHoaDon .confirm').click(async function () {
        let idThanhToanHoaDon = $(this).parents('form').find('.idThanhToanHoaDon').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let thanhtoanhoadon = { idThanhToanHoaDon: idThanhToanHoaDon, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaThanhToanHoaDonValidator(thanhtoanhoadon);

        if (errors.length > 0) {
            refreshSuaThanhToanHoaDonAlert(errors);
            return;
        }

        await suaThanhToanHoaDonAJAX(thanhtoanhoadon);
    });

    //Events
    //Set thanhtoanhoadon current value When model showup
    $('#modelSuaThanhToanHoaDon').on('show.bs.modal', function (event) {
        let suaThanhToanHoaDonTriggered = $(event.relatedTarget);

        let idThanhToanHoaDon = suaThanhToanHoaDonTriggered.attr('idThanhToanHoaDon');
        let thanhtoanhoadon = thanhtoanhoadons.find((item) => item.idThanhToanHoaDon == idThanhToanHoaDon);

        $('#modelSuaThanhToanHoaDon').find('.idThanhToanHoaDon').val(thanhtoanhoadon.idThanhToanHoaDon);
        $('#modelSuaThanhToanHoaDon').find('.username').val(thanhtoanhoadon.username);
        $('#modelSuaThanhToanHoaDon').find('.password').val(thanhtoanhoadon.password);
        $('#modelSuaThanhToanHoaDon').find('.re_password').val(thanhtoanhoadon.password);
        $('#modelSuaThanhToanHoaDon').find('.loai').val(thanhtoanhoadon.loai);

        refreshSuaThanhToanHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaThanhToanHoaDon with data in thanhtoanhoadonsTypes
function refreshDataInModelSuaThanhToanHoaDon() {
    let loai = $('#modelSuaThanhToanHoaDon .loai');
    let loaiHtml = '';

    thanhtoanhoadonsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua thanhtoanhoadon Alert
function refreshSuaThanhToanHoaDonAlert(alerts, type = 'danger') {
    let suaThanhToanHoaDonAlerts = $('#modelSuaThanhToanHoaDon .alerts');
    let suaThanhToanHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        suaThanhToanHoaDonAlertsHtml += createAlerts(type, alert);
    }
    suaThanhToanHoaDonAlerts.html(suaThanhToanHoaDonAlertsHtml);
}

//Add new thanhtoanhoadon
function suaThanhToanHoaDonAJAX(thanhtoanhoadon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: thanhtoanhoadon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaThanhToanHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaThanhToanHoaDonAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(thanhtoanhoadon);

                    $("#modelSuaThanhToanHoaDon").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaThanhToanHoaDonAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaThanhToanHoaDonAlert([errorString], 'danger');
                } else {
                    refreshSuaThanhToanHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua ThanhToanHoaDon validator
function suaThanhToanHoaDonValidator(thanhtoanhoadon) {
    let errors = [];

    if (!thanhtoanhoadon) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!thanhtoanhoadon.idThanhToanHoaDon) {
        errors.push('Không thể xác định Id tài khoản ');
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
