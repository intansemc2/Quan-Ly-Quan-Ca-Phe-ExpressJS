
$(document).ready(function () {
    //Initialize Button Events
    //ThemTaiKhoan Confirm
    $('#modelThemTaiKhoan .confirm').click(async function () {

        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let username = $(this).parents('form').find('.username').val();
    
        let password = $(this).parents('form').find('.password').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taiKhoan = { idTaiKhoan : idTaiKhoan, username : username, password : password, loai : loai };

        let errors = themTaiKhoanValidator(taiKhoan);

        if (errors.length > 0) {
            refreshThemTaiKhoanAlert(errors);
            return;
        }

        await themTaiKhoanAJAX(taiKhoan);
    });

    //Events
    //Set taiKhoan current value When model showup
    $('#modelThemTaiKhoan').on('show.bs.modal', function (event) {
        refreshThemTaiKhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemTaiKhoan with data in taiKhoansTypes
function refreshDataInModelThemTaiKhoan() {
}

//Refresh them taiKhoan Alert
function refreshThemTaiKhoanAlert(alerts, type = 'danger') {
    let themTaiKhoanAlerts = $('#modelThemTaiKhoan .alerts');
    let themTaiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        themTaiKhoanAlertsHtml += createAlerts(type, alert);
    }
    themTaiKhoanAlerts.html(themTaiKhoanAlertsHtml);
}

//Add new taiKhoan
function themTaiKhoanAJAX(taiKhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: taiKhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemTaiKhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemTaiKhoanAlert(['Thêm thành công ' + result], 'success');

                    taiKhoan.idTaiKhoan = result;
                    addNewRowToTable(taiKhoan);

                    $('#modelThemTaiKhoan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemTaiKhoanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemTaiKhoanAlert([errorString], 'danger');
                } else {
                    refreshThemTaiKhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them TaiKhoan validator
function themTaiKhoanValidator(taiKhoan) {
    let errors = [];

    if (!taiKhoan) {
        errors.push('Tài khoản không tồn tại ');
    }




        if (!taiKhoan.username) {
            errors.push('Không thể xác định tên đăng nhập ');
        }
        
        if (!taiKhoan.password) {
            errors.push('Không thể xác định mật khẩu ');
        }
        
        if (!taiKhoan.loai) {
            errors.push('Không thể xác định loại ');
        }
        

    return errors;
}
    
