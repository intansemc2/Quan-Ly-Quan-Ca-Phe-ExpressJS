
$(document).ready(function () {
    //Initialize Button Events
    //ThemnhanVien Confirm
    $('#modelThemnhanVien .confirm').click(async function () {

        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let diaChi = $(this).parents('form').find('.diaChi').val();
    
        let nhanVien = { maNhanVien : maNhanVien, maTaiKhoan : maTaiKhoan, ten : ten, ngaySinh : ngaySinh, soDienThoai : soDienThoai, diaChi : diaChi };

        let errors = themnhanVienValidator(nhanVien);

        if (errors.length > 0) {
            refreshThemnhanVienAlert(errors);
            return;
        }

        await themnhanVienAJAX(nhanVien);
    });

    //Events
    //Set nhanVien current value When model showup
    $('#modelThemnhanVien').on('show.bs.modal', function (event) {
        refreshThemnhanVienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemnhanVien with data in nhanViensTypes
function refreshDataInModelThemnhanVien() {
}

//Refresh them nhanVien Alert
function refreshThemnhanVienAlert(alerts, type = 'danger') {
    let themnhanVienAlerts = $('#modelThemnhanVien .alerts');
    let themnhanVienAlertsHtml = '';
    for (let alert of alerts) {
        themnhanVienAlertsHtml += createAlerts(type, alert);
    }
    themnhanVienAlerts.html(themnhanVienAlertsHtml);
}

//Add new nhanVien
function themnhanVienAJAX(nhanVien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhanVien', data: nhanVien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnhanVienAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemnhanVienAlert(['Thêm thành công ' + result], 'success');

                    nhanVien.maNhanVien = result.insertId;                    
                    addNewRowToTable(nhanVien);

                    $('#modelThemnhanVien').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnhanVienAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnhanVienAlert([errorString], 'danger');
                } else {
                    refreshThemnhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nhanVien validator
function themnhanVienValidator(nhanVien) {
    let errors = [];

    if (!nhanVien) {
        errors.push('nhnvin không tồn tại ');
    }




        if (!nhanVien.maTaiKhoan) {
            errors.push('Không thể xác định mã tài khoản ');
        }
        
        if (!nhanVien.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!nhanVien.ngaySinh) {
            errors.push('Không thể xác định ngày sinh ');
        }
        
        if (!nhanVien.soDienThoai) {
            errors.push('Không thể xác định số điện thoại ');
        }
        
        if (!nhanVien.diaChi) {
            errors.push('Không thể xác định địa chỉ ');
        }
        

    return errors;
}
    
