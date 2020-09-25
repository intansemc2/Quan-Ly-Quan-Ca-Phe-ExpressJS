
$(document).ready(function () {
    //Initialize Button Events
    //SuaNhaphang Confirm
    $('#modelSuaNhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ngaygionhap = $(this).parents('form').find('.ngaygionhap').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let nhaphang = { manhaphang : manhaphang, manguonsanpham : manguonsanpham, ngaygionhap : ngaygionhap, manhanvien : manhanvien, ghichu : ghichu };

        let errors = suaNhaphangValidator(nhaphang);

        if (errors.length > 0) {
            refreshSuaNhaphangAlert(errors);
            return;
        }

        await suaNhaphangAJAX(nhaphang);
    });

    //Events
    //Set nhaphang current value When model showup
    $('#modelSuaNhaphang').on('show.bs.modal', function (event) {
        let suaNhaphangTriggered = $(event.relatedTarget);

        let manhaphang = suaNhaphangTriggered.attr('manhaphang');
    

        let nhaphang = nhaphangs.find(
            (item) => item.manhaphang == manhaphang
        );


        $('#modelSuaNhaphang').find('.manhaphang').val(manhaphang);
    


        $('#modelSuaNhaphang').find('.manguonsanpham').val(nhaphang.manguonsanpham);
    
        $('#modelSuaNhaphang').find('.ngaygionhap').val(nhaphang.ngaygionhap);
    
        $('#modelSuaNhaphang').find('.manhanvien').val(nhaphang.manhanvien);
    
        $('#modelSuaNhaphang').find('.ghichu').val(nhaphang.ghichu);
    

        refreshSuaNhaphangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaNhaphang with data in nhaphangsTypes
function refreshDataInModelSuaNhaphang() {
}

//Refresh sua nhaphang Alert
function refreshSuaNhaphangAlert(alerts, type = 'danger') {
    let suaNhaphangAlerts = $('#modelSuaNhaphang .alerts');
    let suaNhaphangAlertsHtml = '';
    for (let alert of alerts) {
        suaNhaphangAlertsHtml += createAlerts(type, alert);
    }
    suaNhaphangAlerts.html(suaNhaphangAlertsHtml);
}

//Add new nhaphang
function suaNhaphangAJAX(nhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhaphang', data: nhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaNhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaNhaphangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhaphang);

                    $("#modelSuaNhaphang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaNhaphangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaNhaphangAlert([errorString], 'danger');
                } else {
                    refreshSuaNhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Nhaphang validator
function suaNhaphangValidator(nhaphang) {
    let errors = [];

    if (!nhaphang) {
        errors.push('Nhập hàng không tồn tại ');
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
