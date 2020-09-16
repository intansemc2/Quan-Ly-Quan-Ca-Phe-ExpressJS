
$(document).ready(function () {
    //Initialize Button Events
    //SuaNhanVien Confirm
    $('#modelSuaNhanVien .confirm').click(async function () {
        let idNhanVien = $(this).parents('form').find('.idNhanVien').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let nhanvien = { idNhanVien: idNhanVien, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaNhanVienValidator(nhanvien);

        if (errors.length > 0) {
            refreshSuaNhanVienAlert(errors);
            return;
        }

        await suaNhanVienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelSuaNhanVien').on('show.bs.modal', function (event) {
        let suaNhanVienTriggered = $(event.relatedTarget);

        let idNhanVien = suaNhanVienTriggered.attr('idNhanVien');
        let nhanvien = nhanviens.find((item) => item.idNhanVien == idNhanVien);

        $('#modelSuaNhanVien').find('.idNhanVien').val(nhanvien.idNhanVien);
        $('#modelSuaNhanVien').find('.username').val(nhanvien.username);
        $('#modelSuaNhanVien').find('.password').val(nhanvien.password);
        $('#modelSuaNhanVien').find('.re_password').val(nhanvien.password);
        $('#modelSuaNhanVien').find('.loai').val(nhanvien.loai);

        refreshSuaNhanVienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaNhanVien with data in nhanviensTypes
function refreshDataInModelSuaNhanVien() {
    let loai = $('#modelSuaNhanVien .loai');
    let loaiHtml = '';

    nhanviensTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua nhanvien Alert
function refreshSuaNhanVienAlert(alerts, type = 'danger') {
    let suaNhanVienAlerts = $('#modelSuaNhanVien .alerts');
    let suaNhanVienAlertsHtml = '';
    for (let alert of alerts) {
        suaNhanVienAlertsHtml += createAlerts(type, alert);
    }
    suaNhanVienAlerts.html(suaNhanVienAlertsHtml);
}

//Add new nhanvien
function suaNhanVienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaNhanVienAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaNhanVienAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhanvien);

                    $("#modelSuaNhanVien").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaNhanVienAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaNhanVienAlert([errorString], 'danger');
                } else {
                    refreshSuaNhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua NhanVien validator
function suaNhanVienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!nhanvien.idNhanVien) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!nhanvien.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!nhanvien.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!nhanvien.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (nhanvien.password != nhanvien.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!nhanvien.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
