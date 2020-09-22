
$(document).ready(function () {
    //Initialize Button Events
    //ThemHoaDon Confirm
    $('#modelThemHoaDon .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let idBan = $(this).parents('form').find('.idBan').val();
    
        let idNhanVien = $(this).parents('form').find('.idNhanVien').val();
    
        let thoiGianLap = $(this).parents('form').find('.thoiGianLap').val();
    
        let hoaDon = { idHoaDon : idHoaDon, idKhachHang : idKhachHang, idBan : idBan, idNhanVien : idNhanVien, thoiGianLap : thoiGianLap };

        let errors = themHoaDonValidator(hoaDon);

        if (errors.length > 0) {
            refreshThemHoaDonAlert(errors);
            return;
        }

        await themHoaDonAJAX(hoaDon);
    });

    //Events
    //Set hoaDon current value When model showup
    $('#modelThemHoaDon').on('show.bs.modal', function (event) {
        refreshThemHoaDonAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemHoaDon with data in hoaDonsTypes
function refreshDataInModelThemHoaDon() {
}

//Refresh them hoaDon Alert
function refreshThemHoaDonAlert(alerts, type = 'danger') {
    let themHoaDonAlerts = $('#modelThemHoaDon .alerts');
    let themHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        themHoaDonAlertsHtml += createAlerts(type, alert);
    }
    themHoaDonAlerts.html(themHoaDonAlertsHtml);
}

//Add new hoaDon
function themHoaDonAJAX(hoaDon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/hoa-don', data: hoaDon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemHoaDonAlert(['Thêm thành công ' + result], 'success');

                    hoaDon.idHoaDon = result;
                    addNewRowToTable(hoaDon);

                    $('#modelThemHoaDon').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemHoaDonAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemHoaDonAlert([errorString], 'danger');
                } else {
                    refreshThemHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them HoaDon validator
function themHoaDonValidator(hoaDon) {
    let errors = [];

    if (!hoaDon) {
        errors.push('Hóa đơn không tồn tại ');
    }




        if (!hoaDon.thoiGianLap) {
            errors.push('Không thể xác định thời gian ');
        }
        

    return errors;
}
    
