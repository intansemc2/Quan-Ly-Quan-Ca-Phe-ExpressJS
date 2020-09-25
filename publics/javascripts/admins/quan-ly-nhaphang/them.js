
$(document).ready(function () {
    //Initialize Button Events
    //ThemNhaphang Confirm
    $('#modelThemNhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ngaygionhap = $(this).parents('form').find('.ngaygionhap').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let nhaphang = { manhaphang : manhaphang, manguonsanpham : manguonsanpham, ngaygionhap : ngaygionhap, manhanvien : manhanvien, ghichu : ghichu };

        let errors = themNhaphangValidator(nhaphang);

        if (errors.length > 0) {
            refreshThemNhaphangAlert(errors);
            return;
        }

        await themNhaphangAJAX(nhaphang);
    });

    //Events
    //Set nhaphang current value When model showup
    $('#modelThemNhaphang').on('show.bs.modal', function (event) {
        refreshThemNhaphangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemNhaphang with data in nhaphangsTypes
function refreshDataInModelThemNhaphang() {
}

//Refresh them nhaphang Alert
function refreshThemNhaphangAlert(alerts, type = 'danger') {
    let themNhaphangAlerts = $('#modelThemNhaphang .alerts');
    let themNhaphangAlertsHtml = '';
    for (let alert of alerts) {
        themNhaphangAlertsHtml += createAlerts(type, alert);
    }
    themNhaphangAlerts.html(themNhaphangAlertsHtml);
}

//Add new nhaphang
function themNhaphangAJAX(nhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhaphang', data: nhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemNhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemNhaphangAlert(['Thêm thành công ' + result], 'success');

                    nhaphang.idNhaphang = result;
                    addNewRowToTable(nhaphang);

                    $('#modelThemNhaphang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemNhaphangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemNhaphangAlert([errorString], 'danger');
                } else {
                    refreshThemNhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Nhaphang validator
function themNhaphangValidator(nhaphang) {
    let errors = [];

    if (!nhaphang) {
        errors.push('Nhập hàng không tồn tại ');
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
    
