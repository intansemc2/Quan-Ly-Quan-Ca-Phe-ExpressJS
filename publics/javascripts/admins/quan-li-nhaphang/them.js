
$(document).ready(function () {
    //Initialize Button Events
    //Themnhaphang Confirm
    $('#modelThemnhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ngaygionhap = $(this).parents('form').find('.ngaygionhap').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let nhaphang = { manhaphang : manhaphang, manguonsanpham : manguonsanpham, ngaygionhap : ngaygionhap, manhanvien : manhanvien, ghichu : ghichu };

        let errors = themnhaphangValidator(nhaphang);

        if (errors.length > 0) {
            refreshThemnhaphangAlert(errors);
            return;
        }

        await themnhaphangAJAX(nhaphang);
    });

    //Events
    //Set nhaphang current value When model showup
    $('#modelThemnhaphang').on('show.bs.modal', function (event) {
        refreshThemnhaphangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themnhaphang with data in nhaphangsTypes
function refreshDataInModelThemnhaphang() {
}

//Refresh them nhaphang Alert
function refreshThemnhaphangAlert(alerts, type = 'danger') {
    let themnhaphangAlerts = $('#modelThemnhaphang .alerts');
    let themnhaphangAlertsHtml = '';
    for (let alert of alerts) {
        themnhaphangAlertsHtml += createAlerts(type, alert);
    }
    themnhaphangAlerts.html(themnhaphangAlertsHtml);
}

//Add new nhaphang
function themnhaphangAJAX(nhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhaphang', data: nhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemnhaphangAlert(['Thêm thành công ' + result], 'success');

                    nhaphang.manhaphang = result;                    
                    addNewRowToTable(nhaphang);

                    $('#modelThemnhaphang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnhaphangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnhaphangAlert([errorString], 'danger');
                } else {
                    refreshThemnhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nhaphang validator
function themnhaphangValidator(nhaphang) {
    let errors = [];

    if (!nhaphang) {
        errors.push('nhphng không tồn tại ');
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
    
