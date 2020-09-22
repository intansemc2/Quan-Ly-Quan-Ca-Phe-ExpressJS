
$(document).ready(function () {
    //Initialize Button Events
    //SuaHoaDon Confirm
    $('#modelSuaHoaDon .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let idBan = $(this).parents('form').find('.idBan').val();
    
        let idNhanVien = $(this).parents('form').find('.idNhanVien').val();
    
        let thoiGianLap = $(this).parents('form').find('.thoiGianLap').val();
    
        let hoaDon = { idHoaDon : idHoaDon, idKhachHang : idKhachHang, idBan : idBan, idNhanVien : idNhanVien, thoiGianLap : thoiGianLap };

        let errors = suaHoaDonValidator(hoaDon);

        if (errors.length > 0) {
            refreshSuaHoaDonAlert(errors);
            return;
        }

        await suaHoaDonAJAX(hoaDon);
    });

    //Events
    //Set hoaDon current value When model showup
    $('#modelSuaHoaDon').on('show.bs.modal', function (event) {
        let suaHoaDonTriggered = $(event.relatedTarget);

        let idHoaDon = suaHoaDonTriggered.attr('idHoaDon');
    

        let hoaDon = hoaDons.find(
            (item) => item.idHoaDon == idHoaDon
        );


        $('#modelSuaHoaDon').find('.idHoaDon').val(idHoaDon);
    


        $('#modelSuaHoaDon').find('.idKhachHang').val(hoaDon.idKhachHang);
    
        $('#modelSuaHoaDon').find('.idBan').val(hoaDon.idBan);
    
        $('#modelSuaHoaDon').find('.idNhanVien').val(hoaDon.idNhanVien);
    
        $('#modelSuaHoaDon').find('.thoiGianLap').val(hoaDon.thoiGianLap);
    

        refreshSuaHoaDonAlert([], "");
    });
});

//Functions
//Refresh data in model SuaHoaDon with data in hoaDonsTypes
function refreshDataInModelSuaHoaDon() {
}

//Refresh sua hoaDon Alert
function refreshSuaHoaDonAlert(alerts, type = 'danger') {
    let suaHoaDonAlerts = $('#modelSuaHoaDon .alerts');
    let suaHoaDonAlertsHtml = '';
    for (let alert of alerts) {
        suaHoaDonAlertsHtml += createAlerts(type, alert);
    }
    suaHoaDonAlerts.html(suaHoaDonAlertsHtml);
}

//Add new hoaDon
function suaHoaDonAJAX(hoaDon) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/hoa-don', data: hoaDon })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaHoaDonAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaHoaDonAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(hoaDon);

                    $("#modelSuaHoaDon").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaHoaDonAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaHoaDonAlert([errorString], 'danger');
                } else {
                    refreshSuaHoaDonAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua HoaDon validator
function suaHoaDonValidator(hoaDon) {
    let errors = [];

    if (!hoaDon) {
        errors.push('Hóa đơn không tồn tại ');
    }


    if (!hoaDon.idHoaDon) {
        errors.push('Không thể xác định id hóa đơn ');
    }
    
    if (!hoaDon.thoiGianLap) {
        errors.push('Không thể xác định thời gian ');
    }
    

    return errors;
}    
