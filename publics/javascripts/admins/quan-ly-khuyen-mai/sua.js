
$(document).ready(function () {
    //Initialize Button Events
    //SuaKhuyenMai Confirm
    $('#modelSuaKhuyenMai .confirm').click(async function () {
        let idKhuyenMai = $(this).parents('form').find('.idKhuyenMai').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let khuyenmai = { idKhuyenMai: idKhuyenMai, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaKhuyenMaiValidator(khuyenmai);

        if (errors.length > 0) {
            refreshSuaKhuyenMaiAlert(errors);
            return;
        }

        await suaKhuyenMaiAJAX(khuyenmai);
    });

    //Events
    //Set khuyenmai current value When model showup
    $('#modelSuaKhuyenMai').on('show.bs.modal', function (event) {
        let suaKhuyenMaiTriggered = $(event.relatedTarget);

        let idKhuyenMai = suaKhuyenMaiTriggered.attr('idKhuyenMai');
        let khuyenmai = khuyenmais.find((item) => item.idKhuyenMai == idKhuyenMai);

        $('#modelSuaKhuyenMai').find('.idKhuyenMai').val(khuyenmai.idKhuyenMai);
        $('#modelSuaKhuyenMai').find('.username').val(khuyenmai.username);
        $('#modelSuaKhuyenMai').find('.password').val(khuyenmai.password);
        $('#modelSuaKhuyenMai').find('.re_password').val(khuyenmai.password);
        $('#modelSuaKhuyenMai').find('.loai').val(khuyenmai.loai);

        refreshSuaKhuyenMaiAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaKhuyenMai with data in khuyenmaisTypes
function refreshDataInModelSuaKhuyenMai() {
    let loai = $('#modelSuaKhuyenMai .loai');
    let loaiHtml = '';

    khuyenmaisTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua khuyenmai Alert
function refreshSuaKhuyenMaiAlert(alerts, type = 'danger') {
    let suaKhuyenMaiAlerts = $('#modelSuaKhuyenMai .alerts');
    let suaKhuyenMaiAlertsHtml = '';
    for (let alert of alerts) {
        suaKhuyenMaiAlertsHtml += createAlerts(type, alert);
    }
    suaKhuyenMaiAlerts.html(suaKhuyenMaiAlertsHtml);
}

//Add new khuyenmai
function suaKhuyenMaiAJAX(khuyenmai) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: khuyenmai })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaKhuyenMaiAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaKhuyenMaiAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khuyenmai);

                    $("#modelSuaKhuyenMai").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaKhuyenMaiAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaKhuyenMaiAlert([errorString], 'danger');
                } else {
                    refreshSuaKhuyenMaiAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua KhuyenMai validator
function suaKhuyenMaiValidator(khuyenmai) {
    let errors = [];

    if (!khuyenmai) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!khuyenmai.idKhuyenMai) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!khuyenmai.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!khuyenmai.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!khuyenmai.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (khuyenmai.password != khuyenmai.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!khuyenmai.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
