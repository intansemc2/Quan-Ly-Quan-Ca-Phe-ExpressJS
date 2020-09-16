
$(document).ready(function () {
    //Initialize Button Events
    //ThemNhanVien Confirm
    $('#modelThemNhanVien .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let nhanvien = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themNhanVienValidator(nhanvien);

        if (errors.length > 0) {
            refreshThemNhanVienAlert(errors);
            return;
        }

        await themNhanVienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelThemNhanVien').on('show.bs.modal', function (event) {
        refreshThemNhanVienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemNhanVien with data in nhanviensTypes
function refreshDataInModelThemNhanVien() {
    let loai = $('#modelThemNhanVien .loai');
    let loaiHtml = '';

    nhanviensTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them nhanvien Alert
function refreshThemNhanVienAlert(alerts, type = 'danger') {
    let themNhanVienAlerts = $('#modelThemNhanVien .alerts');
    let themNhanVienAlertsHtml = '';
    for (let alert of alerts) {
        themNhanVienAlertsHtml += createAlerts(type, alert);
    }
    themNhanVienAlerts.html(themNhanVienAlertsHtml);
}

//Add new nhanvien
function themNhanVienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemNhanVienAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemNhanVienAlert(['Thêm thành công ' + result], 'success');

                    nhanvien.idNhanVien = result;
                    addNewRowToTable(nhanvien);

                    $('#modelThemNhanVien').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemNhanVienAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemNhanVienAlert([errorString], 'danger');
                } else {
                    refreshThemNhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them NhanVien validator
function themNhanVienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('Tài khoản không tồn tại ');
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
    
