
$(document).ready(function () {
    //Initialize Button Events
    //SuachiTietXuatHang Confirm
    $('#modelSuachiTietXuatHang .confirm').click(async function () {

        let maXuatHang = $(this).parents('form').find('.maXuatHang').val();
    
        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let chiTietXuatHang = { maXuatHang : maXuatHang, maSanPham : maSanPham, soLuong : soLuong, donGia : donGia };

        let errors = suachiTietXuatHangValidator(chiTietXuatHang);

        if (errors.length > 0) {
            refreshSuachiTietXuatHangAlert(errors);
            return;
        }

        await suachiTietXuatHangAJAX(chiTietXuatHang);
    });

    //Events
    //Set chiTietXuatHang current value When model showup
    $('#modelSuachiTietXuatHang').on('show.bs.modal', function (event) {
        let suachiTietXuatHangTriggered = $(event.relatedTarget);

        let maXuatHang = suachiTietXuatHangTriggered.attr('maXuatHang');
    
        let maSanPham = suachiTietXuatHangTriggered.attr('maSanPham');
    

        let chiTietXuatHang = chiTietXuatHangs.find(
            (item) => item.maXuatHang == maXuatHang && item.maSanPham == maSanPham
        );


        $('#modelSuachiTietXuatHang').find('.maXuatHang').val(maXuatHang);
    
        $('#modelSuachiTietXuatHang').find('.maSanPham').val(maSanPham);
    


        $('#modelSuachiTietXuatHang').find('.soLuong').val(chiTietXuatHang.soLuong);
    
        $('#modelSuachiTietXuatHang').find('.donGia').val(chiTietXuatHang.donGia);
    

        refreshSuachiTietXuatHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuachiTietXuatHang with data in chiTietXuatHangsTypes
function refreshDataInModelSuachiTietXuatHang() {
}

//Refresh sua chiTietXuatHang Alert
function refreshSuachiTietXuatHangAlert(alerts, type = 'danger') {
    let suachiTietXuatHangAlerts = $('#modelSuachiTietXuatHang .alerts');
    let suachiTietXuatHangAlertsHtml = '';
    for (let alert of alerts) {
        suachiTietXuatHangAlertsHtml += createAlerts(type, alert);
    }
    suachiTietXuatHangAlerts.html(suachiTietXuatHangAlertsHtml);
}

//Add new chiTietXuatHang
function suachiTietXuatHangAJAX(chiTietXuatHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chiTietXuatHang', data: chiTietXuatHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuachiTietXuatHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuachiTietXuatHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chiTietXuatHang);

                    $("#modelSuachiTietXuatHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuachiTietXuatHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuachiTietXuatHangAlert([errorString], 'danger');
                } else {
                    refreshSuachiTietXuatHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua chiTietXuatHang validator
function suachiTietXuatHangValidator(chiTietXuatHang) {
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
