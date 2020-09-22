
$(document).ready(function () {
    //Initialize Button Events
    //ThemThanhToanHoaDon Confirm
    $('#modelThemThanhToanHoaDon .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idTaiKhoanThanhToan = $(this).parents('form').find('.idTaiKhoanThanhToan').val();
    
        let thoiGianThanhToan = $(this).parents('form').find('.thoiGianThanhToan').val();
    
        let phanTramTichLuy = $(this).parents('form').find('.phanTramTichLuy').val();
    
        let soLuongDiemDoi = $(this).parents('form').find('.soLuongDiemDoi').val();
    
        let tyGiaDiemDoi = $(this).parents('form').find('.tyGiaDiemDoi').val();
    
        let thanhToanHoaDon = { idHoaDon : idHoaDon, idTaiKhoanThanhToan : idTaiKhoanThanhToan, thoiGianThanhToan : thoiGianThanhToan, phanTramTichLuy : phanTramTichLuy, soLuongDiemDoi : soLuongDiemDoi, tyGiaDiemDoi : tyGiaDiemDoi };

        let errors = themThanhToanHoaDonValidator(thanhToanHoaDon);

        if (errors.length > 0) {
            refreshThemThanhToanHoaDonAlert(errors);
            return;
        }

        await themThanhToanHoaDonAJAX(thanhToanHoaDon);
    });

    //Events
    //Set thanhToanHoaDon current value When model showup
    $('#modelThemThanhToanHoaDon').on('show.bs.modal', function (event) {
        refreshThemThanhToanHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemThanhToanHoaDon with data in thanhToanHoaDonsTypes
function refreshDataInModelThemThanhToanHoaDon() {
}

//Refresh them thanhToanHoaDon Alert
function refreshThemThanhToanHoaDonAlert(alerts, type = 'danger') {
    let themThanhToanHoaDonAlerts = $('#modelThemThanhToanHoaDon .alerts');
    let themThanhToanHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        themThanhToanHoaDonAlertsHtml += createAlerts(type, alert);
    }
    themThanhToanHoaDonAlerts.html(themThanhToanHoaDonAlertsHtml);
}

//Add new thanhToanHoaDon
function themThanhToanHoaDonAJAX(thanhToanHoaDon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/thanh-toan-hoa-don', data: thanhToanHoaDon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemThanhToanHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemThanhToanHoaDonAlert(['Thêm thành công ' + result], 'success');

                    thanhToanHoaDon.idThanhToanHoaDon = result;
                    addNewRowToTable(thanhToanHoaDon);

                    $('#modelThemThanhToanHoaDon').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemThanhToanHoaDonAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemThanhToanHoaDonAlert([errorString], 'danger');
                } else {
                    refreshThemThanhToanHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them ThanhToanHoaDon validator
function themThanhToanHoaDonValidator(thanhToanHoaDon) {
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
    
