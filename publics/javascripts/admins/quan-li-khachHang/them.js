
$(document).ready(function () {
    //Initialize Button Events
    //ThemkhachHang Confirm
    $('#modelThemkhachHang .confirm').click(async function () {

        let maKhachHang = $(this).parents('form').find('.maKhachHang').val();
    
        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let khachHang = { maKhachHang : maKhachHang, maTaiKhoan : maTaiKhoan, ten : ten, ngaySinh : ngaySinh, soDienThoai : soDienThoai, ghiChu : ghiChu };

        let errors = themkhachHangValidator(khachHang);

        if (errors.length > 0) {
            refreshThemkhachHangAlert(errors);
            return;
        }

        await themkhachHangAJAX(khachHang);
    });

    //Events
    //Set khachHang current value When model showup
    $('#modelThemkhachHang').on('show.bs.modal', function (event) {
        refreshThemkhachHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemkhachHang with data in khachHangsTypes
function refreshDataInModelThemkhachHang() {
}

//Refresh them khachHang Alert
function refreshThemkhachHangAlert(alerts, type = 'danger') {
    let themkhachHangAlerts = $('#modelThemkhachHang .alerts');
    let themkhachHangAlertsHtml = '';
    for (let alert of alerts) {
        themkhachHangAlertsHtml += createAlerts(type, alert);
    }
    themkhachHangAlerts.html(themkhachHangAlertsHtml);
}

//Add new khachHang
function themkhachHangAJAX(khachHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/khachHang', data: khachHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemkhachHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemkhachHangAlert(['Thêm thành công ' + result], 'success');

                    khachHang.maKhachHang = result.insertId;                    
                    addNewRowToTable(khachHang);

                    $('#modelThemkhachHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemkhachHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemkhachHangAlert([errorString], 'danger');
                } else {
                    refreshThemkhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them khachHang validator
function themkhachHangValidator(khachHang) {
    let errors = [];

    if (!khachHang) {
        errors.push('khchhng không tồn tại ');
    }




        if (!khachHang.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!khachHang.ngaySinh) {
            errors.push('Không thể xác định ngày sinh ');
        }
        
        if (!khachHang.soDienThoai) {
            errors.push('Không thể xác định số điện thoại ');
        }
        

    return errors;
}
    
