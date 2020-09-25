
$(document).ready(function () {
    //Initialize Button Events
    //ThemNhanvien Confirm
    $('#modelThemNhanvien .confirm').click(async function () {

        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nhanvien = { manhanvien : manhanvien, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, diachi : diachi };

        let errors = themNhanvienValidator(nhanvien);

        if (errors.length > 0) {
            refreshThemNhanvienAlert(errors);
            return;
        }

        await themNhanvienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelThemNhanvien').on('show.bs.modal', function (event) {
        refreshThemNhanvienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemNhanvien with data in nhanviensTypes
function refreshDataInModelThemNhanvien() {
}

//Refresh them nhanvien Alert
function refreshThemNhanvienAlert(alerts, type = 'danger') {
    let themNhanvienAlerts = $('#modelThemNhanvien .alerts');
    let themNhanvienAlertsHtml = '';
    for (let alert of alerts) {
        themNhanvienAlertsHtml += createAlerts(type, alert);
    }
    themNhanvienAlerts.html(themNhanvienAlertsHtml);
}

//Add new nhanvien
function themNhanvienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhanvien', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemNhanvienAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemNhanvienAlert(['Thêm thành công ' + result], 'success');

                    nhanvien.idNhanvien = result;
                    addNewRowToTable(nhanvien);

                    $('#modelThemNhanvien').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemNhanvienAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemNhanvienAlert([errorString], 'danger');
                } else {
                    refreshThemNhanvienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Nhanvien validator
function themNhanvienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('Nhân viên không tồn tại ');
    }




        if (!nhanvien.mataikhoan) {
            errors.push('Không thể xác định mã tài khoản ');
        }
        
        if (!nhanvien.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!nhanvien.ngaysinh) {
            errors.push('Không thể xác định ngày sinh ');
        }
        
        if (!nhanvien.sodienthoai) {
            errors.push('Không thể xác định số điện thoại ');
        }
        
        if (!nhanvien.diachi) {
            errors.push('Không thể xác định địa chỉ ');
        }
        

    return errors;
}
    
