
$(document).ready(function () {
    //Initialize Button Events
    //ThemKhuyenMai Confirm
    $('#modelThemKhuyenMai .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let khuyenmai = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themKhuyenMaiValidator(khuyenmai);

        if (errors.length > 0) {
            refreshThemKhuyenMaiAlert(errors);
            return;
        }

        await themKhuyenMaiAJAX(khuyenmai);
    });

    //Events
    //Set khuyenmai current value When model showup
    $('#modelThemKhuyenMai').on('show.bs.modal', function (event) {
        refreshThemKhuyenMaiAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemKhuyenMai with data in khuyenmaisTypes
function refreshDataInModelThemKhuyenMai() {
    let loai = $('#modelThemKhuyenMai .loai');
    let loaiHtml = '';

    khuyenmaisTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them khuyenmai Alert
function refreshThemKhuyenMaiAlert(alerts, type = 'danger') {
    let themKhuyenMaiAlerts = $('#modelThemKhuyenMai .alerts');
    let themKhuyenMaiAlertsHtml = '';
    for (let alert of alerts) {
        themKhuyenMaiAlertsHtml += createAlerts(type, alert);
    }
    themKhuyenMaiAlerts.html(themKhuyenMaiAlertsHtml);
}

//Add new khuyenmai
function themKhuyenMaiAJAX(khuyenmai) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: khuyenmai })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemKhuyenMaiAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemKhuyenMaiAlert(['Thêm thành công ' + result], 'success');

                    khuyenmai.idKhuyenMai = result;
                    addNewRowToTable(khuyenmai);

                    $('#modelThemKhuyenMai').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemKhuyenMaiAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemKhuyenMaiAlert([errorString], 'danger');
                } else {
                    refreshThemKhuyenMaiAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them KhuyenMai validator
function themKhuyenMaiValidator(khuyenmai) {
    let errors = [];

    if (!khuyenmai) {
        errors.push('Tài khoản không tồn tại ');
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
    
