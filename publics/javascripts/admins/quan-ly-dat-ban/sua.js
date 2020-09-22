
$(document).ready(function () {
    //Initialize Button Events
    //SuaDatBan Confirm
    $('#modelSuaDatBan .confirm').click(async function () {

        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let idBan = $(this).parents('form').find('.idBan').val();
    
        let thoiGianLap = $(this).parents('form').find('.thoiGianLap').val();
    
        let thoiGianNhan = $(this).parents('form').find('.thoiGianNhan').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let datBan = { idKhachHang : idKhachHang, idBan : idBan, thoiGianLap : thoiGianLap, thoiGianNhan : thoiGianNhan, ghiChu : ghiChu };

        let errors = suaDatBanValidator(datBan);

        if (errors.length > 0) {
            refreshSuaDatBanAlert(errors);
            return;
        }

        await suaDatBanAJAX(datBan);
    });

    //Events
    //Set datBan current value When model showup
    $('#modelSuaDatBan').on('show.bs.modal', function (event) {
        let suaDatBanTriggered = $(event.relatedTarget);

        let idKhachHang = suaDatBanTriggered.attr('idKhachHang');
    
        let idBan = suaDatBanTriggered.attr('idBan');
    
        let thoiGianLap = suaDatBanTriggered.attr('thoiGianLap');
    

        let datBan = datBans.find(
            (item) => item.idKhachHang == idKhachHang && item.idBan == idBan && item.thoiGianLap == thoiGianLap
        );


        $('#modelSuaDatBan').find('.idKhachHang').val(idKhachHang);
    
        $('#modelSuaDatBan').find('.idBan').val(idBan);
    
        $('#modelSuaDatBan').find('.thoiGianLap').val(thoiGianLap);
    


        $('#modelSuaDatBan').find('.thoiGianNhan').val(datBan.thoiGianNhan);
    
        $('#modelSuaDatBan').find('.ghiChu').val(datBan.ghiChu);
    

        refreshSuaDatBanAlert([], "");
    });
});

//Functions
//Refresh data in model SuaDatBan with data in datBansTypes
function refreshDataInModelSuaDatBan() {
}

//Refresh sua datBan Alert
function refreshSuaDatBanAlert(alerts, type = 'danger') {
    let suaDatBanAlerts = $('#modelSuaDatBan .alerts');
    let suaDatBanAlertsHtml = '';
    for (let alert of alerts) {
        suaDatBanAlertsHtml += createAlerts(type, alert);
    }
    suaDatBanAlerts.html(suaDatBanAlertsHtml);
}

//Add new datBan
function suaDatBanAJAX(datBan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/dat-ban', data: datBan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaDatBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaDatBanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(datBan);

                    $("#modelSuaDatBan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaDatBanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaDatBanAlert([errorString], 'danger');
                } else {
                    refreshSuaDatBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua DatBan validator
function suaDatBanValidator(datBan) {
    let errors = [];

    if (!datBan) {
        errors.push('Đặt bàn không tồn tại ');
    }


    if (!datBan.idKhachHang) {
        errors.push('Không thể xác định id khách hàng  ');
    }
    
    if (!datBan.idBan) {
        errors.push('Không thể xác định id bàn ');
    }
    
    if (!datBan.thoiGianLap) {
        errors.push('Không thể xác định thời gian lập ');
    }
    

    return errors;
}    
