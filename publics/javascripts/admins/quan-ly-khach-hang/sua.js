
$(document).ready(function () {
    //Initialize Button Events
    //SuaKhachHang Confirm
    $('#modelSuaKhachHang .confirm').click(async function () {
        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let khachhang = { idKhachHang: idKhachHang, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaKhachHangValidator(khachhang);

        if (errors.length > 0) {
            refreshSuaKhachHangAlert(errors);
            return;
        }

        await suaKhachHangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelSuaKhachHang').on('show.bs.modal', function (event) {
        let suaKhachHangTriggered = $(event.relatedTarget);

        let idKhachHang = suaKhachHangTriggered.attr('idKhachHang');
        let khachhang = khachhangs.find((item) => item.idKhachHang == idKhachHang);

        $('#modelSuaKhachHang').find('.idKhachHang').val(khachhang.idKhachHang);
        $('#modelSuaKhachHang').find('.username').val(khachhang.username);
        $('#modelSuaKhachHang').find('.password').val(khachhang.password);
        $('#modelSuaKhachHang').find('.re_password').val(khachhang.password);
        $('#modelSuaKhachHang').find('.loai').val(khachhang.loai);

        refreshSuaKhachHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaKhachHang with data in khachhangsTypes
function refreshDataInModelSuaKhachHang() {
    let loai = $('#modelSuaKhachHang .loai');
    let loaiHtml = '';

    khachhangsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua khachhang Alert
function refreshSuaKhachHangAlert(alerts, type = 'danger') {
    let suaKhachHangAlerts = $('#modelSuaKhachHang .alerts');
    let suaKhachHangAlertsHtml = '';
    for (let alert of alerts) {
        suaKhachHangAlertsHtml += createAlerts(type, alert);
    }
    suaKhachHangAlerts.html(suaKhachHangAlertsHtml);
}

//Add new khachhang
function suaKhachHangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaKhachHangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaKhachHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khachhang);

                    $("#modelSuaKhachHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaKhachHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaKhachHangAlert([errorString], 'danger');
                } else {
                    refreshSuaKhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua KhachHang validator
function suaKhachHangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!khachhang.idKhachHang) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!khachhang.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!khachhang.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!khachhang.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (khachhang.password != khachhang.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!khachhang.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
