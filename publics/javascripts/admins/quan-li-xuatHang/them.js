
$(document).ready(function () {
    //Initialize Button Events
    //ThemxuatHang Confirm
    $('#modelThemxuatHang .confirm').click(async function () {

        let maXuatHang = $(this).parents('form').find('.maXuatHang').val();
    
        let ngayGioXuat = $(this).parents('form').find('.ngayGioXuat').val();
    
        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let maKhachHang = $(this).parents('form').find('.maKhachHang').val();
    
        let maBan = $(this).parents('form').find('.maBan').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let xuatHang = { maXuatHang : maXuatHang, ngayGioXuat : ngayGioXuat, maNhanVien : maNhanVien, maKhachHang : maKhachHang, maBan : maBan, ghiChu : ghiChu };

        let errors = themxuatHangValidator(xuatHang);

        if (errors.length > 0) {
            refreshThemxuatHangAlert(errors);
            return;
        }

        await themxuatHangAJAX(xuatHang);
    });

    //Events
    //Set xuatHang current value When model showup
    $('#modelThemxuatHang').on('show.bs.modal', function (event) {
        refreshThemxuatHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemxuatHang with data in xuatHangsTypes
function refreshDataInModelThemxuatHang() {
}

//Refresh them xuatHang Alert
function refreshThemxuatHangAlert(alerts, type = 'danger') {
    let themxuatHangAlerts = $('#modelThemxuatHang .alerts');
    let themxuatHangAlertsHtml = '';
    for (let alert of alerts) {
        themxuatHangAlertsHtml += createAlerts(type, alert);
    }
    themxuatHangAlerts.html(themxuatHangAlertsHtml);
}

//Add new xuatHang
function themxuatHangAJAX(xuatHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/xuatHang', data: xuatHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemxuatHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemxuatHangAlert(['Thêm thành công ' + result], 'success');

                    xuatHang.maXuatHang = result.insertId;                    
                    addNewRowToTable(xuatHang);

                    $('#modelThemxuatHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemxuatHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemxuatHangAlert([errorString], 'danger');
                } else {
                    refreshThemxuatHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them xuatHang validator
function themxuatHangValidator(xuatHang) {
    let errors = [];

    if (!xuatHang) {
        errors.push('xuthng không tồn tại ');
    }




        if (!xuatHang.ngayGioXuat) {
            errors.push('Không thể xác định ngày giờ xuất ');
        }
        
        if (!xuatHang.maNhanVien) {
            errors.push('Không thể xác định mã nhân viên ');
        }
        
        if (!xuatHang.maKhachHang) {
            errors.push('Không thể xác định mã khách hàng ');
        }
        
        if (!xuatHang.maBan) {
            errors.push('Không thể xác định mã bàn ');
        }
        

    return errors;
}
    
