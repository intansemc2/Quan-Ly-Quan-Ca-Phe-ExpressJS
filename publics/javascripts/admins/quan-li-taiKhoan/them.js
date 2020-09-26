
$(document).ready(function () {
    //Initialize Button Events
    //ThemtaiKhoan Confirm
    $('#modelThemtaiKhoan .confirm').click(async function () {

        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let tenDangNhap = $(this).parents('form').find('.tenDangNhap').val();
    
        let matKhau = $(this).parents('form').find('.matKhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taiKhoan = { maTaiKhoan : maTaiKhoan, tenDangNhap : tenDangNhap, matKhau : matKhau, loai : loai };

        let errors = themtaiKhoanValidator(taiKhoan);

        if (errors.length > 0) {
            refreshThemtaiKhoanAlert(errors);
            return;
        }

        await themtaiKhoanAJAX(taiKhoan);
    });

    //Events
    //Set taiKhoan current value When model showup
    $('#modelThemtaiKhoan').on('show.bs.modal', function (event) {
        refreshThemtaiKhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemtaiKhoan with data in taiKhoansTypes
function refreshDataInModelThemtaiKhoan() {
}

//Refresh them taiKhoan Alert
function refreshThemtaiKhoanAlert(alerts, type = 'danger') {
    let themtaiKhoanAlerts = $('#modelThemtaiKhoan .alerts');
    let themtaiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        themtaiKhoanAlertsHtml += createAlerts(type, alert);
    }
    themtaiKhoanAlerts.html(themtaiKhoanAlertsHtml);
}

//Add new taiKhoan
function themtaiKhoanAJAX(taiKhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/taiKhoan', data: taiKhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemtaiKhoanAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemtaiKhoanAlert(['Thêm thành công ' + result], 'success');

                    taiKhoan.maTaiKhoan = result.insertId;                    
                    addNewRowToTable(taiKhoan);

                    $('#modelThemtaiKhoan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemtaiKhoanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemtaiKhoanAlert([errorString], 'danger');
                } else {
                    refreshThemtaiKhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them taiKhoan validator
function themtaiKhoanValidator(taiKhoan) {
    let errors = [];

    if (!taiKhoan) {
        errors.push('tikhon không tồn tại ');
    }




        if (!taiKhoan.tenDangNhap) {
            errors.push('Không thể xác định tên đăng nhập ');
        }
        
        if (!taiKhoan.matKhau) {
            errors.push('Không thể xác định mật khẩu ');
        }
        
        if (!taiKhoan.loai) {
            errors.push('Không thể xác định loại tài khoản ');
        }
        

    return errors;
}
    
