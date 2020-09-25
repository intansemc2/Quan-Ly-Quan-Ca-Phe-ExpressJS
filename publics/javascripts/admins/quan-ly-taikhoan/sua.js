
$(document).ready(function () {
    //Initialize Button Events
    //SuaTaikhoan Confirm
    $('#modelSuaTaikhoan .confirm').click(async function () {

        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let tendangnhap = $(this).parents('form').find('.tendangnhap').val();
    
        let matkhau = $(this).parents('form').find('.matkhau').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taikhoan = { mataikhoan : mataikhoan, tendangnhap : tendangnhap, matkhau : matkhau, loai : loai };

        let errors = suaTaikhoanValidator(taikhoan);

        if (errors.length > 0) {
            refreshSuaTaikhoanAlert(errors);
            return;
        }

        await suaTaikhoanAJAX(taikhoan);
    });

    //Events
    //Set taikhoan current value When model showup
    $('#modelSuaTaikhoan').on('show.bs.modal', function (event) {
        let suaTaikhoanTriggered = $(event.relatedTarget);

        let mataikhoan = suaTaikhoanTriggered.attr('mataikhoan');
    

        let taikhoan = taikhoans.find(
            (item) => item.mataikhoan == mataikhoan
        );


        $('#modelSuaTaikhoan').find('.mataikhoan').val(mataikhoan);
    


        $('#modelSuaTaikhoan').find('.tendangnhap').val(taikhoan.tendangnhap);
    
        $('#modelSuaTaikhoan').find('.matkhau').val(taikhoan.matkhau);
    
        $('#modelSuaTaikhoan').find('.loai').val(taikhoan.loai);
    

        refreshSuaTaikhoanAlert([], "");
    });
});

//Functions
//Refresh data in model SuaTaikhoan with data in taikhoansTypes
function refreshDataInModelSuaTaikhoan() {
}

//Refresh sua taikhoan Alert
function refreshSuaTaikhoanAlert(alerts, type = 'danger') {
    let suaTaikhoanAlerts = $('#modelSuaTaikhoan .alerts');
    let suaTaikhoanAlertsHtml = '';
    for (let alert of alerts) {
        suaTaikhoanAlertsHtml += createAlerts(type, alert);
    }
    suaTaikhoanAlerts.html(suaTaikhoanAlertsHtml);
}

//Add new taikhoan
function suaTaikhoanAJAX(taikhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/taikhoan', data: taikhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaTaikhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaTaikhoanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(taikhoan);

                    $("#modelSuaTaikhoan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaTaikhoanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaTaikhoanAlert([errorString], 'danger');
                } else {
                    refreshSuaTaikhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Taikhoan validator
function suaTaikhoanValidator(taikhoan) {
    let errors = [];

    if (!taikhoan) {
        errors.push('Tài khoản không tồn tại ');
    }


    if (!taikhoan.mataikhoan) {
        errors.push('Không thể xác định mã tài khoản ');
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
