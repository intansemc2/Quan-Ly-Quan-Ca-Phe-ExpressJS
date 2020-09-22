
$(document).ready(function () {
    //Initialize Button Events
    //ThemNhanVien Confirm
    $('#modelThemNhanVien .confirm').click(async function () {

        let idNhanVien = $(this).parents('form').find('.idNhanVien').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sdt = $(this).parents('form').find('.sdt').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let email = $(this).parents('form').find('.email').val();
    
        let nhanVien = { idNhanVien : idNhanVien, ten : ten, sdt : sdt, loai : loai, idTaiKhoan : idTaiKhoan, ngaySinh : ngaySinh, linkAnh : linkAnh, email : email };

        let errors = themNhanVienValidator(nhanVien);

        if (errors.length > 0) {
            refreshThemNhanVienAlert(errors);
            return;
        }

        await themNhanVienAJAX(nhanVien);
    });

    //Events
    //Set nhanVien current value When model showup
    $('#modelThemNhanVien').on('show.bs.modal', function (event) {
        refreshThemNhanVienAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemNhanVien with data in nhanViensTypes
function refreshDataInModelThemNhanVien() {
}

//Refresh them nhanVien Alert
function refreshThemNhanVienAlert(alerts, type = 'danger') {
    let themNhanVienAlerts = $('#modelThemNhanVien .alerts');
    let themNhanVienAlertsHtml = '';
    for (let alert of alerts) {
        themNhanVienAlertsHtml += createAlerts(type, alert);
    }
    themNhanVienAlerts.html(themNhanVienAlertsHtml);
}

//Add new nhanVien
function themNhanVienAJAX(nhanVien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhan-vien', data: nhanVien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemNhanVienAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemNhanVienAlert(['Thêm thành công ' + result], 'success');

                    nhanVien.idNhanVien = result;
                    addNewRowToTable(nhanVien);

                    $('#modelThemNhanVien').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemNhanVienAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemNhanVienAlert([errorString], 'danger');
                } else {
                    refreshThemNhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them NhanVien validator
function themNhanVienValidator(nhanVien) {
    let errors = [];

    if (!nhanVien) {
        errors.push('Nhân viên không tồn tại ');
    }




        if (!nhanVien.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!nhanVien.sdt) {
            errors.push('Không thể xác định số điện thoại ');
        }
        
        if (!nhanVien.loai) {
            errors.push('Không thể xác định loại ');
        }
        
        if (!nhanVien.idTaiKhoan) {
            errors.push('Không thể xác định id tài khoản ');
        }
        
        if (!nhanVien.ngaySinh) {
            errors.push('Không thể xác định ngày sinh ');
        }
        

    return errors;
}
    
