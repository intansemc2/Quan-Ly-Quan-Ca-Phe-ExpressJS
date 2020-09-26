
$(document).ready(function () {
    //Initialize Button Events
    //Themnhanvien Confirm
    $('#modelThemnhanvien .confirm').click(async function () {

        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nhanvien = { manhanvien : manhanvien, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, diachi : diachi };

        let errors = themnhanvienValidator(nhanvien);

        if (errors.length > 0) {
            refreshThemnhanvienAlert(errors);
            return;
        }

        await themnhanvienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelThemnhanvien').on('show.bs.modal', function (event) {
        refreshThemnhanvienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themnhanvien with data in nhanviensTypes
function refreshDataInModelThemnhanvien() {
}

//Refresh them nhanvien Alert
function refreshThemnhanvienAlert(alerts, type = 'danger') {
    let themnhanvienAlerts = $('#modelThemnhanvien .alerts');
    let themnhanvienAlertsHtml = '';
    for (let alert of alerts) {
        themnhanvienAlertsHtml += createAlerts(type, alert);
    }
    themnhanvienAlerts.html(themnhanvienAlertsHtml);
}

//Add new nhanvien
function themnhanvienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhanvien', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnhanvienAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemnhanvienAlert(['Thêm thành công ' + result], 'success');

                    nhanvien.manhanvien = result.insertId;                    
                    addNewRowToTable(nhanvien);

                    $('#modelThemnhanvien').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnhanvienAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnhanvienAlert([errorString], 'danger');
                } else {
                    refreshThemnhanvienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nhanvien validator
function themnhanvienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('nhnvin không tồn tại ');
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
    
