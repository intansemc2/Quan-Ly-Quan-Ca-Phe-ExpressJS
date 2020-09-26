
$(document).ready(function () {
    //Initialize Button Events
    //SuachiTietNhapHang Confirm
    $('#modelSuachiTietNhapHang .confirm').click(async function () {

        let maNhapHang = $(this).parents('form').find('.maNhapHang').val();
    
        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let chiTietNhapHang = { maNhapHang : maNhapHang, maSanPham : maSanPham, soLuong : soLuong, donGia : donGia };

        let errors = suachiTietNhapHangValidator(chiTietNhapHang);

        if (errors.length > 0) {
            refreshSuachiTietNhapHangAlert(errors);
            return;
        }

        await suachiTietNhapHangAJAX(chiTietNhapHang);
    });

    //Events
    //Set chiTietNhapHang current value When model showup
    $('#modelSuachiTietNhapHang').on('show.bs.modal', function (event) {
        let suachiTietNhapHangTriggered = $(event.relatedTarget);

        let maNhapHang = suachiTietNhapHangTriggered.attr('maNhapHang');
    
        let maSanPham = suachiTietNhapHangTriggered.attr('maSanPham');
    

        let chiTietNhapHang = chiTietNhapHangs.find(
            (item) => item.maNhapHang == maNhapHang && item.maSanPham == maSanPham
        );


        $('#modelSuachiTietNhapHang').find('.maNhapHang').val(maNhapHang);
    
        $('#modelSuachiTietNhapHang').find('.maSanPham').val(maSanPham);
    


        $('#modelSuachiTietNhapHang').find('.soLuong').val(chiTietNhapHang.soLuong);
    
        $('#modelSuachiTietNhapHang').find('.donGia').val(chiTietNhapHang.donGia);
    

        refreshSuachiTietNhapHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuachiTietNhapHang with data in chiTietNhapHangsTypes
function refreshDataInModelSuachiTietNhapHang() {
}

//Refresh sua chiTietNhapHang Alert
function refreshSuachiTietNhapHangAlert(alerts, type = 'danger') {
    let suachiTietNhapHangAlerts = $('#modelSuachiTietNhapHang .alerts');
    let suachiTietNhapHangAlertsHtml = '';
    for (let alert of alerts) {
        suachiTietNhapHangAlertsHtml += createAlerts(type, alert);
    }
    suachiTietNhapHangAlerts.html(suachiTietNhapHangAlertsHtml);
}

//Add new chiTietNhapHang
function suachiTietNhapHangAJAX(chiTietNhapHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chiTietNhapHang', data: chiTietNhapHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuachiTietNhapHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuachiTietNhapHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chiTietNhapHang);

                    $("#modelSuachiTietNhapHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuachiTietNhapHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuachiTietNhapHangAlert([errorString], 'danger');
                } else {
                    refreshSuachiTietNhapHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua chiTietNhapHang validator
function suachiTietNhapHangValidator(chiTietNhapHang) {
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
