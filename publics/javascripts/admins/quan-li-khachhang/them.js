
$(document).ready(function () {
    //Initialize Button Events
    //Themkhachhang Confirm
    $('#modelThemkhachhang .confirm').click(async function () {

        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let khachhang = { makhachhang : makhachhang, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, ghichu : ghichu };

        let errors = themkhachhangValidator(khachhang);

        if (errors.length > 0) {
            refreshThemkhachhangAlert(errors);
            return;
        }

        await themkhachhangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelThemkhachhang').on('show.bs.modal', function (event) {
        refreshThemkhachhangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themkhachhang with data in khachhangsTypes
function refreshDataInModelThemkhachhang() {
}

//Refresh them khachhang Alert
function refreshThemkhachhangAlert(alerts, type = 'danger') {
    let themkhachhangAlerts = $('#modelThemkhachhang .alerts');
    let themkhachhangAlertsHtml = '';
    for (let alert of alerts) {
        themkhachhangAlertsHtml += createAlerts(type, alert);
    }
    themkhachhangAlerts.html(themkhachhangAlertsHtml);
}

//Add new khachhang
function themkhachhangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/khachhang', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemkhachhangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemkhachhangAlert(['Thêm thành công ' + result], 'success');

                    khachhang.makhachhang = result.insertId;                    
                    addNewRowToTable(khachhang);

                    $('#modelThemkhachhang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemkhachhangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemkhachhangAlert([errorString], 'danger');
                } else {
                    refreshThemkhachhangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them khachhang validator
function themkhachhangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('khchhng không tồn tại ');
    }




        if (!khachhang.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!khachhang.ngaysinh) {
            errors.push('Không thể xác định ngày sinh ');
        }
        
        if (!khachhang.sodienthoai) {
            errors.push('Không thể xác định số điện thoại ');
        }
        

    return errors;
}
    
