
$(document).ready(function () {
    //Initialize Button Events
    //ThemKhachHang Confirm
    $('#modelThemKhachHang .confirm').click(async function () {

        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sdt = $(this).parents('form').find('.sdt').val();
    
        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let email = $(this).parents('form').find('.email').val();
    
        let google = $(this).parents('form').find('.google').val();
    
        let facebook = $(this).parents('form').find('.facebook').val();
    
        let khachHang = { idKhachHang : idKhachHang, ten : ten, sdt : sdt, idTaiKhoan : idTaiKhoan, diemTichLuy : diemTichLuy, email : email, google : google, facebook : facebook };

        let errors = themKhachHangValidator(khachHang);

        if (errors.length > 0) {
            refreshThemKhachHangAlert(errors);
            return;
        }

        await themKhachHangAJAX(khachHang);
    });

    //Events
    //Set khachHang current value When model showup
    $('#modelThemKhachHang').on('show.bs.modal', function (event) {
        refreshThemKhachHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemKhachHang with data in khachHangsTypes
function refreshDataInModelThemKhachHang() {
}

//Refresh them khachHang Alert
function refreshThemKhachHangAlert(alerts, type = 'danger') {
    let themKhachHangAlerts = $('#modelThemKhachHang .alerts');
    let themKhachHangAlertsHtml = '';
    for (let alert of alerts) {
        themKhachHangAlertsHtml += createAlerts(type, alert);
    }
    themKhachHangAlerts.html(themKhachHangAlertsHtml);
}

//Add new khachHang
function themKhachHangAJAX(khachHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/khach-hang', data: khachHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemKhachHangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemKhachHangAlert(['Thêm thành công ' + result], 'success');

                    khachHang.idKhachHang = result;
                    addNewRowToTable(khachHang);

                    $('#modelThemKhachHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemKhachHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemKhachHangAlert([errorString], 'danger');
                } else {
                    refreshThemKhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them KhachHang validator
function themKhachHangValidator(khachHang) {
    let errors = [];

    if (!khachHang) {
        errors.push('Khách hàng không tồn tại ');
    }




        if (!khachHang.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!khachHang.sdt) {
            errors.push('Không thể xác định số điện thoại ');
        }
        
        if (!khachHang.diemTichLuy) {
            errors.push('Không thể xác định điểm tích lũy ');
        }
        

    return errors;
}
    
