
$(document).ready(function () {
    //Initialize Button Events
    //ThemKhachhang Confirm
    $('#modelThemKhachhang .confirm').click(async function () {

        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let khachhang = { makhachhang : makhachhang, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, ghichu : ghichu };

        let errors = themKhachhangValidator(khachhang);

        if (errors.length > 0) {
            refreshThemKhachhangAlert(errors);
            return;
        }

        await themKhachhangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelThemKhachhang').on('show.bs.modal', function (event) {
        refreshThemKhachhangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemKhachhang with data in khachhangsTypes
function refreshDataInModelThemKhachhang() {
}

//Refresh them khachhang Alert
function refreshThemKhachhangAlert(alerts, type = 'danger') {
    let themKhachhangAlerts = $('#modelThemKhachhang .alerts');
    let themKhachhangAlertsHtml = '';
    for (let alert of alerts) {
        themKhachhangAlertsHtml += createAlerts(type, alert);
    }
    themKhachhangAlerts.html(themKhachhangAlertsHtml);
}

//Add new khachhang
function themKhachhangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/khachhang', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemKhachhangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemKhachhangAlert(['Thêm thành công ' + result], 'success');

                    khachhang.idKhachhang = result;
                    addNewRowToTable(khachhang);

                    $('#modelThemKhachhang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemKhachhangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemKhachhangAlert([errorString], 'danger');
                } else {
                    refreshThemKhachhangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Khachhang validator
function themKhachhangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('Khách hàng không tồn tại ');
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
    
