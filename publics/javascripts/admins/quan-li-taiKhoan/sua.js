
$(document).ready(function () {
    //Initialize Button Events
    //SuataiKhoan Confirm
    $('#modelSuataiKhoan .confirm').click(async function () {

        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let tenDangNhap = $(this).parents('form').find('.tenDangNhap').val();
    
        let matKhau = $(this).parents('form').find('.matKhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taiKhoan = { maTaiKhoan : maTaiKhoan, tenDangNhap : tenDangNhap, matKhau : matKhau, loai : loai };

        let errors = suataiKhoanValidator(taiKhoan);

        if (errors.length > 0) {
            refreshSuataiKhoanAlert(errors);
            return;
        }

        await suataiKhoanAJAX(taiKhoan);
    });

    //Events
    //Set taiKhoan current value When model showup
    $('#modelSuataiKhoan').on('show.bs.modal', function (event) {
        let suataiKhoanTriggered = $(event.relatedTarget);

        let maTaiKhoan = suataiKhoanTriggered.attr('maTaiKhoan');
    

        let taiKhoan = taiKhoans.find(
            (item) => item.maTaiKhoan == maTaiKhoan
        );


        $('#modelSuataiKhoan').find('.maTaiKhoan').val(maTaiKhoan);
    


        $('#modelSuataiKhoan').find('.tenDangNhap').val(taiKhoan.tenDangNhap);
    
        $('#modelSuataiKhoan').find('.matKhau').val(taiKhoan.matKhau);
    
        $('#modelSuataiKhoan').find('.loai').val(taiKhoan.loai);
    

        refreshSuataiKhoanAlert([], "");
    });
});

//Functions
//Refresh data in model SuataiKhoan with data in taiKhoansTypes
function refreshDataInModelSuataiKhoan() {
}

//Refresh sua taiKhoan Alert
function refreshSuataiKhoanAlert(alerts, type = 'danger') {
    let suataiKhoanAlerts = $('#modelSuataiKhoan .alerts');
    let suataiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        suataiKhoanAlertsHtml += createAlerts(type, alert);
    }
    suataiKhoanAlerts.html(suataiKhoanAlertsHtml);
}

//Add new taiKhoan
function suataiKhoanAJAX(taiKhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/taiKhoan', data: taiKhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuataiKhoanAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuataiKhoanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(taiKhoan);

                    $("#modelSuataiKhoan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuataiKhoanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuataiKhoanAlert([errorString], 'danger');
                } else {
                    refreshSuataiKhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua taiKhoan validator
function suataiKhoanValidator(taiKhoan) {
    let errors = [];

    if (!taiKhoan) {
        errors.push('tikhon không tồn tại ');
    }


    if (!taiKhoan.maTaiKhoan) {
        errors.push('Không thể xác định mã tài khoản ');
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
