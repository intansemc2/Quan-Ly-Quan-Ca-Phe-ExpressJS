
$(document).ready(function () {
    //Initialize Button Events
    //ThemTaikhoan Confirm
    $('#modelThemTaikhoan .confirm').click(async function () {

        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let tendangnhap = $(this).parents('form').find('.tendangnhap').val();
    
        let matkhau = $(this).parents('form').find('.matkhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taikhoan = { mataikhoan : mataikhoan, tendangnhap : tendangnhap, matkhau : matkhau, loai : loai };

        let errors = themTaikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshThemTaikhoanAlert(errors);
            return;
        }

        await themTaikhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelThemTaikhoan').on('show.bs.modal', function (event) {
        refreshThemTaikhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemTaikhoan with data in taikhoansTypes
function refreshDataInModelThemTaikhoan() {
}

//Refresh them taikhoan Alert
function refreshThemTaikhoanAlert(alerts, type = 'danger') {
    let themTaikhoanAlerts = $('#modelThemTaikhoan .alerts');
    let themTaikhoanAlertsHtml = '';
    for (let alert of alerts) {
        themTaikhoanAlertsHtml += createAlerts(type, alert);
    }
    themTaikhoanAlerts.html(themTaikhoanAlertsHtml);
}

//Add new taikhoan
function themTaikhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/taikhoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemTaikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemTaikhoanAlert(['Thêm thành công ' + result], 'success');

                    taikhoan.idTaikhoan = result;
                    addNewRowToTable(taikhoan);

                    $('#modelThemTaikhoan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemTaikhoanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemTaikhoanAlert([errorString], 'danger');
                } else {
                    refreshThemTaikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Taikhoan validator
function themTaikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('Tài khoản không tồn tại ');
    }




        if (!taikhoan.tendangnhap) {
            errors.push('Không thể xác định đăng nhập ');
        }
        
        if (!taikhoan.matkhau) {
            errors.push('Không thể xác định mật khẩu ');
        }
        
        if (!taikhoan.loai) {
            errors.push('Không thể xác định loại tài khoản ');
        }
        

    return errors;
}
    
