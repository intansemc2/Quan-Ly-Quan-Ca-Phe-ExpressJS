$(document).ready(function () {
    //Initialize Button Events
    //SuaTaikhoan Confirm
    $('#modelSuaTaiKhoan .confirm').click(async function () {
        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let taikhoan = { idTaiKhoan: idTaiKhoan, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaTaikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshSuaTaikhoanAlert(errors);
            return;
        }

        await suaTaiKhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelSuaTaiKhoan').on('show.bs.modal', function (event) {
        let suaTaiKhoanTriggered = $(event.relatedTarget);

        let idTaiKhoan = suaTaiKhoanTriggered.attr('idTaiKhoan');
        let taikhoan = taikhoans.find((item) => item.idTaiKhoan == idTaiKhoan);

        $('#modelSuaTaiKhoan').find('.idTaiKhoan').val(taikhoan.idTaiKhoan);
        $('#modelSuaTaiKhoan').find('.username').val(taikhoan.username);
        $('#modelSuaTaiKhoan').find('.password').val(taikhoan.password);
        $('#modelSuaTaiKhoan').find('.re_password').val(taikhoan.password);
        $('#modelSuaTaiKhoan').find('.loai').val(taikhoan.loai);

        refreshSuaTaikhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaTaiKhoan with data in taikhoansTypes
function refreshDataInModelSuaTaiKhoan() {
    let loai = $('#modelSuaTaiKhoan .loai');
    let loaiHtml = '';

    taikhoansTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua taikhoan Alert
function refreshSuaTaikhoanAlert(alerts, type = 'danger') {
    let suaTaiKhoanAlerts = $('#modelSuaTaiKhoan .alerts');
    let suaTaiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        suaTaiKhoanAlertsHtml += createAlerts(type, alert);
    }
    suaTaiKhoanAlerts.html(suaTaiKhoanAlertsHtml);
}

//Add new taikhoan
function suaTaiKhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaTaikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaTaikhoanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(taikhoan);

                    $("#modelSuaTaiKhoan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaTaikhoanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaTaikhoanAlert([errorString], 'danger');
                } else {
                    refreshSuaTaikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Taikhoan validator
function suaTaikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!taikhoan.idTaiKhoan) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!taikhoan.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!taikhoan.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!taikhoan.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (taikhoan.password != taikhoan.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!taikhoan.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
