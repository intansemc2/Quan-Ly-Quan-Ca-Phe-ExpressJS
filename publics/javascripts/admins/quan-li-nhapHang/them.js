
$(document).ready(function () {
    //Initialize Button Events
    //ThemnhapHang Confirm
    $('#modelThemnhapHang .confirm').click(async function () {

        let maNhapHang = $(this).parents('form').find('.maNhapHang').val();
    
        let maNguonSanPham = $(this).parents('form').find('.maNguonSanPham').val();
    
        let ngayGioNhap = $(this).parents('form').find('.ngayGioNhap').val();
    
        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let nhapHang = { maNhapHang : maNhapHang, maNguonSanPham : maNguonSanPham, ngayGioNhap : ngayGioNhap, maNhanVien : maNhanVien, ghiChu : ghiChu };

        let errors = themnhapHangValidator(nhapHang);

        if (errors.length > 0) {
            refreshThemnhapHangAlert(errors);
            return;
        }

        await themnhapHangAJAX(nhapHang);
    });

    //Events
    //Set nhapHang current value When model showup
    $('#modelThemnhapHang').on('show.bs.modal', function (event) {
        refreshThemnhapHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemnhapHang with data in nhapHangsTypes
function refreshDataInModelThemnhapHang() {
}

//Refresh them nhapHang Alert
function refreshThemnhapHangAlert(alerts, type = 'danger') {
    let themnhapHangAlerts = $('#modelThemnhapHang .alerts');
    let themnhapHangAlertsHtml = '';
    for (let alert of alerts) {
        themnhapHangAlertsHtml += createAlerts(type, alert);
    }
    themnhapHangAlerts.html(themnhapHangAlertsHtml);
}

//Add new nhapHang
function themnhapHangAJAX(nhapHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nhapHang', data: nhapHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnhapHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemnhapHangAlert(['Thêm thành công ' + result], 'success');

                    nhapHang.maNhapHang = result.insertId;                    
                    addNewRowToTable(nhapHang);

                    $('#modelThemnhapHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnhapHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnhapHangAlert([errorString], 'danger');
                } else {
                    refreshThemnhapHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nhapHang validator
function themnhapHangValidator(nhapHang) {
    let errors = [];

    if (!nhapHang) {
        errors.push('nhphng không tồn tại ');
    }




        if (!nhapHang.maNguonSanPham) {
            errors.push('Không thể xác định mã nguồn sản phẩm ');
        }
        
        if (!nhapHang.ngayGioNhap) {
            errors.push('Không thể xác định ngày giờ nhập ');
        }
        
        if (!nhapHang.maNhanVien) {
            errors.push('Không thể xác định mã nhân viên ');
        }
        

    return errors;
}
    
