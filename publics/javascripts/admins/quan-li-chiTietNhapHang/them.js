
$(document).ready(function () {
    //Initialize Button Events
    //ThemchiTietNhapHang Confirm
    $('#modelThemchiTietNhapHang .confirm').click(async function () {

        let maNhapHang = $(this).parents('form').find('.maNhapHang').val();
    
        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let chiTietNhapHang = { maNhapHang : maNhapHang, maSanPham : maSanPham, soLuong : soLuong, donGia : donGia };

        let errors = themchiTietNhapHangValidator(chiTietNhapHang);

        if (errors.length > 0) {
            refreshThemchiTietNhapHangAlert(errors);
            return;
        }

        await themchiTietNhapHangAJAX(chiTietNhapHang);
    });

    //Events
    //Set chiTietNhapHang current value When model showup
    $('#modelThemchiTietNhapHang').on('show.bs.modal', function (event) {
        refreshThemchiTietNhapHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemchiTietNhapHang with data in chiTietNhapHangsTypes
function refreshDataInModelThemchiTietNhapHang() {
}

//Refresh them chiTietNhapHang Alert
function refreshThemchiTietNhapHangAlert(alerts, type = 'danger') {
    let themchiTietNhapHangAlerts = $('#modelThemchiTietNhapHang .alerts');
    let themchiTietNhapHangAlertsHtml = '';
    for (let alert of alerts) {
        themchiTietNhapHangAlertsHtml += createAlerts(type, alert);
    }
    themchiTietNhapHangAlerts.html(themchiTietNhapHangAlertsHtml);
}

//Add new chiTietNhapHang
function themchiTietNhapHangAJAX(chiTietNhapHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chiTietNhapHang', data: chiTietNhapHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemchiTietNhapHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemchiTietNhapHangAlert(['Thêm thành công ' + result], 'success');

                                        
                    addNewRowToTable(chiTietNhapHang);

                    $('#modelThemchiTietNhapHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemchiTietNhapHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemchiTietNhapHangAlert([errorString], 'danger');
                } else {
                    refreshThemchiTietNhapHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them chiTietNhapHang validator
function themchiTietNhapHangValidator(chiTietNhapHang) {
    let errors = [];

    if (!chiTietNhapHang) {
        errors.push('chititnhphng không tồn tại ');
    }


        if (!chiTietNhapHang.maNhapHang) {
            errors.push('Không thể xác định mã nhập hàng ');
        }
        
        if (!chiTietNhapHang.maSanPham) {
            errors.push('Không thể xác định mã sản phẩm ');
        }
        


        if (!chiTietNhapHang.soLuong) {
            errors.push('Không thể xác định số lượng ');
        }
        
        if (!chiTietNhapHang.donGia) {
            errors.push('Không thể xác định đơn giá ');
        }
        

    return errors;
}
    
