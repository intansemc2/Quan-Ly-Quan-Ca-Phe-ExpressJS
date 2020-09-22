
$(document).ready(function () {
    //Initialize Button Events
    //SuaThanhToanHoaDon Confirm
    $('#modelSuaThanhToanHoaDon .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idTaiKhoanThanhToan = $(this).parents('form').find('.idTaiKhoanThanhToan').val();
    
        let thoiGianThanhToan = $(this).parents('form').find('.thoiGianThanhToan').val();
    
        let phanTramTichLuy = $(this).parents('form').find('.phanTramTichLuy').val();
    
        let soLuongDiemDoi = $(this).parents('form').find('.soLuongDiemDoi').val();
    
        let tyGiaDiemDoi = $(this).parents('form').find('.tyGiaDiemDoi').val();
    
        let thanhToanHoaDon = { idHoaDon : idHoaDon, idTaiKhoanThanhToan : idTaiKhoanThanhToan, thoiGianThanhToan : thoiGianThanhToan, phanTramTichLuy : phanTramTichLuy, soLuongDiemDoi : soLuongDiemDoi, tyGiaDiemDoi : tyGiaDiemDoi };

        let errors = suaThanhToanHoaDonValidator(thanhToanHoaDon);

        if (errors.length > 0) {
            refreshSuaThanhToanHoaDonAlert(errors);
            return;
        }

        await suaThanhToanHoaDonAJAX(thanhToanHoaDon);
    });

    //Events
    //Set thanhToanHoaDon current value When model showup
    $('#modelSuaThanhToanHoaDon').on('show.bs.modal', function (event) {
        let suaThanhToanHoaDonTriggered = $(event.relatedTarget);

        let idHoaDon = suaThanhToanHoaDonTriggered.attr('idHoaDon');
    
        let idTaiKhoanThanhToan = suaThanhToanHoaDonTriggered.attr('idTaiKhoanThanhToan');
    
        let thoiGianThanhToan = suaThanhToanHoaDonTriggered.attr('thoiGianThanhToan');
    

        let thanhToanHoaDon = thanhToanHoaDons.find(
            (item) => item.idHoaDon == idHoaDon && item.idTaiKhoanThanhToan == idTaiKhoanThanhToan && item.thoiGianThanhToan == thoiGianThanhToan
        );


        $('#modelSuaThanhToanHoaDon').find('.idHoaDon').val(idHoaDon);
    
        $('#modelSuaThanhToanHoaDon').find('.idTaiKhoanThanhToan').val(idTaiKhoanThanhToan);
    
        $('#modelSuaThanhToanHoaDon').find('.thoiGianThanhToan').val(thoiGianThanhToan);
    


        $('#modelSuaThanhToanHoaDon').find('.phanTramTichLuy').val(thanhToanHoaDon.phanTramTichLuy);
    
        $('#modelSuaThanhToanHoaDon').find('.soLuongDiemDoi').val(thanhToanHoaDon.soLuongDiemDoi);
    
        $('#modelSuaThanhToanHoaDon').find('.tyGiaDiemDoi').val(thanhToanHoaDon.tyGiaDiemDoi);
    

        refreshSuaThanhToanHoaDonAlert([], "");
    });
});

//Functions
//Refresh data in model SuaThanhToanHoaDon with data in thanhToanHoaDonsTypes
function refreshDataInModelSuaThanhToanHoaDon() {
}

//Refresh sua thanhToanHoaDon Alert
function refreshSuaThanhToanHoaDonAlert(alerts, type = 'danger') {
    let suaThanhToanHoaDonAlerts = $('#modelSuaThanhToanHoaDon .alerts');
    let suaThanhToanHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        suaThanhToanHoaDonAlertsHtml += createAlerts(type, alert);
    }
    suaThanhToanHoaDonAlerts.html(suaThanhToanHoaDonAlertsHtml);
}

//Add new thanhToanHoaDon
function suaThanhToanHoaDonAJAX(thanhToanHoaDon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/thanh-toan-hoa-don', data: thanhToanHoaDon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaThanhToanHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaThanhToanHoaDonAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(thanhToanHoaDon);

                    $("#modelSuaThanhToanHoaDon").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaThanhToanHoaDonAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaThanhToanHoaDonAlert([errorString], 'danger');
                } else {
                    refreshSuaThanhToanHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua ThanhToanHoaDon validator
function suaThanhToanHoaDonValidator(thanhToanHoaDon) {
    let errors = [];

    if (!thanhToanHoaDon) {
        errors.push('Thanh toán hóa đơn không tồn tại ');
    }


    if (!thanhToanHoaDon.idHoaDon) {
        errors.push('Không thể xác định id hóa đơn ');
    }
    
    if (!thanhToanHoaDon.idTaiKhoanThanhToan) {
        errors.push('Không thể xác định id tài khoản thanh toán ');
    }
    
    if (!thanhToanHoaDon.thoiGianThanhToan) {
        errors.push('Không thể xác định thời gian thanh toán ');
    }
    
    if (!thanhToanHoaDon.phanTramTichLuy) {
        errors.push('Không thể xác định phần trăm tích lũy ');
    }
    
    if (!thanhToanHoaDon.soLuongDiemDoi) {
        errors.push('Không thể xác định số lượng điểm đổi ');
    }
    
    if (!thanhToanHoaDon.tyGiaDiemDoi) {
        errors.push('Không thể xác định tỷ giá quy đổi ');
    }
    

    return errors;
}    
