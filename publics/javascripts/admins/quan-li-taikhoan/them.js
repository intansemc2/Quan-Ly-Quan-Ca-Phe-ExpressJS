
$(document).ready(function () {
    //Initialize Button Events
    //Themtaikhoan Confirm
    $('#modelThemtaikhoan .confirm').click(async function () {

        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let tendangnhap = $(this).parents('form').find('.tendangnhap').val();
    
        let matkhau = $(this).parents('form').find('.matkhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taikhoan = { mataikhoan : mataikhoan, tendangnhap : tendangnhap, matkhau : matkhau, loai : loai };

        let errors = themtaikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshThemtaikhoanAlert(errors);
            return;
        }

        await themtaikhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelThemtaikhoan').on('show.bs.modal', function (event) {
        refreshThemtaikhoanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themtaikhoan with data in taikhoansTypes
function refreshDataInModelThemtaikhoan() {
}

//Refresh them taikhoan Alert
function refreshThemtaikhoanAlert(alerts, type = 'danger') {
    let themtaikhoanAlerts = $('#modelThemtaikhoan .alerts');
    let themtaikhoanAlertsHtml = '';
    for (let alert of alerts) {
        themtaikhoanAlertsHtml += createAlerts(type, alert);
    }
    themtaikhoanAlerts.html(themtaikhoanAlertsHtml);
}

//Add new taikhoan
function themtaikhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/taikhoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemtaikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemtaikhoanAlert(['Thêm thành công ' + result], 'success');

                    taikhoan.mataikhoan = result;                    
                    addNewRowToTable(taikhoan);

                    $('#modelThemtaikhoan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemtaikhoanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemtaikhoanAlert([errorString], 'danger');
                } else {
                    refreshThemtaikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them taikhoan validator
function themtaikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('tikhon không tồn tại ');
    }




        if (!taikhoan.tendangnhap) {
            errors.push('Không thể xác định tên đăng nhập ');
        }
        
        if (!taikhoan.matkhau) {
            errors.push('Không thể xác định mật khẩu ');
        }
        
        if (!taikhoan.loai) {
            errors.push('Không thể xác định loại tài khoản ');
        }
        

    return errors;
}
    
