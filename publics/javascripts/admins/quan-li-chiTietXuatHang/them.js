
$(document).ready(function () {
    //Initialize Button Events
    //ThemchiTietXuatHang Confirm
    $('#modelThemchiTietXuatHang .confirm').click(async function () {

        let maXuatHang = $(this).parents('form').find('.maXuatHang').val();
    
        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let chiTietXuatHang = { maXuatHang : maXuatHang, maSanPham : maSanPham, soLuong : soLuong, donGia : donGia };

        let errors = themchiTietXuatHangValidator(chiTietXuatHang);

        if (errors.length > 0) {
            refreshThemchiTietXuatHangAlert(errors);
            return;
        }

        await themchiTietXuatHangAJAX(chiTietXuatHang);
    });

    //Events
    //Set chiTietXuatHang current value When model showup
    $('#modelThemchiTietXuatHang').on('show.bs.modal', function (event) {
        refreshThemchiTietXuatHangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemchiTietXuatHang with data in chiTietXuatHangsTypes
function refreshDataInModelThemchiTietXuatHang() {
}

//Refresh them chiTietXuatHang Alert
function refreshThemchiTietXuatHangAlert(alerts, type = 'danger') {
    let themchiTietXuatHangAlerts = $('#modelThemchiTietXuatHang .alerts');
    let themchiTietXuatHangAlertsHtml = '';
    for (let alert of alerts) {
        themchiTietXuatHangAlertsHtml += createAlerts(type, alert);
    }
    themchiTietXuatHangAlerts.html(themchiTietXuatHangAlertsHtml);
}

//Add new chiTietXuatHang
function themchiTietXuatHangAJAX(chiTietXuatHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chiTietXuatHang', data: chiTietXuatHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemchiTietXuatHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemchiTietXuatHangAlert(['Thêm thành công ' + result], 'success');

                                        
                    addNewRowToTable(chiTietXuatHang);

                    $('#modelThemchiTietXuatHang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemchiTietXuatHangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemchiTietXuatHangAlert([errorString], 'danger');
                } else {
                    refreshThemchiTietXuatHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them chiTietXuatHang validator
function themchiTietXuatHangValidator(chiTietXuatHang) {
    let errors = [];

    if (!chiTietXuatHang) {
        errors.push('chititxuthng không tồn tại ');
    }


        if (!chiTietXuatHang.maXuatHang) {
            errors.push('Không thể xác định mã xuất hàng ');
        }
        
        if (!chiTietXuatHang.maSanPham) {
            errors.push('Không thể xác định mã sản phẩm ');
        }
        


        if (!chiTietXuatHang.soLuong) {
            errors.push('Không thể xác định số lượng ');
        }
        
        if (!chiTietXuatHang.donGia) {
            errors.push('Không thể xác định đơn giá ');
        }
        

    return errors;
}
    
