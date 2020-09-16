
$(document).ready(function () {
    //Initialize Button Events
    //ThemLoaiSanPham Confirm
    $('#modelThemLoaiSanPham .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let loaisanpham = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themLoaiSanPhamValidator(loaisanpham);

        if (errors.length > 0) {
            refreshThemLoaiSanPhamAlert(errors);
            return;
        }

        await themLoaiSanPhamAJAX(loaisanpham);
    });

    //Events
    //Set loaisanpham current value When model showup
    $('#modelThemLoaiSanPham').on('show.bs.modal', function (event) {
        refreshThemLoaiSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemLoaiSanPham with data in loaisanphamsTypes
function refreshDataInModelThemLoaiSanPham() {
    let loai = $('#modelThemLoaiSanPham .loai');
    let loaiHtml = '';

    loaisanphamsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them loaisanpham Alert
function refreshThemLoaiSanPhamAlert(alerts, type = 'danger') {
    let themLoaiSanPhamAlerts = $('#modelThemLoaiSanPham .alerts');
    let themLoaiSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themLoaiSanPhamAlertsHtml += createAlerts(type, alert);
    }
    themLoaiSanPhamAlerts.html(themLoaiSanPhamAlertsHtml);
}

//Add new loaisanpham
function themLoaiSanPhamAJAX(loaisanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: loaisanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemLoaiSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemLoaiSanPhamAlert(['Thêm thành công ' + result], 'success');

                    loaisanpham.idLoaiSanPham = result;
                    addNewRowToTable(loaisanpham);

                    $('#modelThemLoaiSanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemLoaiSanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemLoaiSanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemLoaiSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them LoaiSanPham validator
function themLoaiSanPhamValidator(loaisanpham) {
    let errors = [];

    if (!loaisanpham) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!loaisanpham.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!loaisanpham.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!loaisanpham.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (loaisanpham.password != loaisanpham.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!loaisanpham.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
