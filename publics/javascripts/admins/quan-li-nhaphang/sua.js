
$(document).ready(function () {
    //Initialize Button Events
    //Suanhaphang Confirm
    $('#modelSuanhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ngaygionhap = $(this).parents('form').find('.ngaygionhap').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let nhaphang = { manhaphang : manhaphang, manguonsanpham : manguonsanpham, ngaygionhap : ngaygionhap, manhanvien : manhanvien, ghichu : ghichu };

        let errors = suanhaphangValidator(nhaphang);

        if (errors.length > 0) {
            refreshSuanhaphangAlert(errors);
            return;
        }

        await suanhaphangAJAX(nhaphang);
    });

    //Events
    //Set nhaphang current value When model showup
    $('#modelSuanhaphang').on('show.bs.modal', function (event) {
        let suanhaphangTriggered = $(event.relatedTarget);

        let manhaphang = suanhaphangTriggered.attr('manhaphang');
    

        let nhaphang = nhaphangs.find(
            (item) => item.manhaphang == manhaphang
        );


        $('#modelSuanhaphang').find('.manhaphang').val(manhaphang);
    


        $('#modelSuanhaphang').find('.manguonsanpham').val(nhaphang.manguonsanpham);
    
        $('#modelSuanhaphang').find('.ngaygionhap').val(nhaphang.ngaygionhap);
    
        $('#modelSuanhaphang').find('.manhanvien').val(nhaphang.manhanvien);
    
        $('#modelSuanhaphang').find('.ghichu').val(nhaphang.ghichu);
    

        refreshSuanhaphangAlert([], "");
    });
});

//Functions
//Refresh data in model Suanhaphang with data in nhaphangsTypes
function refreshDataInModelSuanhaphang() {
}

//Refresh sua nhaphang Alert
function refreshSuanhaphangAlert(alerts, type = 'danger') {
    let suanhaphangAlerts = $('#modelSuanhaphang .alerts');
    let suanhaphangAlertsHtml = '';
    for (let alert of alerts) {
        suanhaphangAlertsHtml += createAlerts(type, alert);
    }
    suanhaphangAlerts.html(suanhaphangAlertsHtml);
}

//Add new nhaphang
function suanhaphangAJAX(nhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhaphang', data: nhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuanhaphangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhaphang);

                    $("#modelSuanhaphang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanhaphangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanhaphangAlert([errorString], 'danger');
                } else {
                    refreshSuanhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nhaphang validator
function suanhaphangValidator(nhaphang) {
    let errors = [];

    if (!nhaphang) {
        errors.push('nhphng không tồn tại ');
    }


    if (!nhaphang.manhaphang) {
        errors.push('Không thể xác định mã nhập hàng ');
    }
    
    if (!nhaphang.manguonsanpham) {
        errors.push('Không thể xác định mã nguồn sản phẩm ');
    }
    
    if (!nhaphang.ngaygionhap) {
        errors.push('Không thể xác định ngày giờ nhập ');
    }
    
    if (!nhaphang.manhanvien) {
        errors.push('Không thể xác định mã nhân viên ');
    }
    

    return errors;
}    
