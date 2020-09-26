
$(document).ready(function () {
    //Initialize Button Events
    //Suataikhoan Confirm
    $('#modelSuataikhoan .confirm').click(async function () {

        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let tendangnhap = $(this).parents('form').find('.tendangnhap').val();
    
        let matkhau = $(this).parents('form').find('.matkhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taikhoan = { mataikhoan : mataikhoan, tendangnhap : tendangnhap, matkhau : matkhau, loai : loai };

        let errors = suataikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshSuataikhoanAlert(errors);
            return;
        }

        await suataikhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelSuataikhoan').on('show.bs.modal', function (event) {
        let suataikhoanTriggered = $(event.relatedTarget);

        let mataikhoan = suataikhoanTriggered.attr('mataikhoan');
    

        let taikhoan = taikhoans.find(
            (item) => item.mataikhoan == mataikhoan
        );


        $('#modelSuataikhoan').find('.mataikhoan').val(mataikhoan);
    


        $('#modelSuataikhoan').find('.tendangnhap').val(taikhoan.tendangnhap);
    
        $('#modelSuataikhoan').find('.matkhau').val(taikhoan.matkhau);
    
        $('#modelSuataikhoan').find('.loai').val(taikhoan.loai);
    

        refreshSuataikhoanAlert([], "");
    });
});

//Functions
//Refresh data in model Suataikhoan with data in taikhoansTypes
function refreshDataInModelSuataikhoan() {
}

//Refresh sua taikhoan Alert
function refreshSuataikhoanAlert(alerts, type = 'danger') {
    let suataikhoanAlerts = $('#modelSuataikhoan .alerts');
    let suataikhoanAlertsHtml = '';
    for (let alert of alerts) {
        suataikhoanAlertsHtml += createAlerts(type, alert);
    }
    suataikhoanAlerts.html(suataikhoanAlertsHtml);
}

//Add new taikhoan
function suataikhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/taikhoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuataikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuataikhoanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(taikhoan);

                    $("#modelSuataikhoan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuataikhoanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuataikhoanAlert([errorString], 'danger');
                } else {
                    refreshSuataikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua taikhoan validator
function suataikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('tikhon không tồn tại ');
    }


    if (!taikhoan.mataikhoan) {
        errors.push('Không thể xác định mã tài khoản ');
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
