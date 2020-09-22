
$(document).ready(function () {
    //Initialize Button Events
    //ThemDatBan Confirm
    $('#modelThemDatBan .confirm').click(async function () {

        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let idBan = $(this).parents('form').find('.idBan').val();
    
        let thoiGianLap = $(this).parents('form').find('.thoiGianLap').val();
    
        let thoiGianNhan = $(this).parents('form').find('.thoiGianNhan').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let datBan = { idKhachHang : idKhachHang, idBan : idBan, thoiGianLap : thoiGianLap, thoiGianNhan : thoiGianNhan, ghiChu : ghiChu };

        let errors = themDatBanValidator(datBan);

        if (errors.length > 0) {
            refreshThemDatBanAlert(errors);
            return;
        }

        await themDatBanAJAX(datBan);
    });

    //Events
    //Set datBan current value When model showup
    $('#modelThemDatBan').on('show.bs.modal', function (event) {
        refreshThemDatBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemDatBan with data in datBansTypes
function refreshDataInModelThemDatBan() {
}

//Refresh them datBan Alert
function refreshThemDatBanAlert(alerts, type = 'danger') {
    let themDatBanAlerts = $('#modelThemDatBan .alerts');
    let themDatBanAlertsHtml = '';
    for (let alert of alerts) {
        themDatBanAlertsHtml += createAlerts(type, alert);
    }
    themDatBanAlerts.html(themDatBanAlertsHtml);
}

//Add new datBan
function themDatBanAJAX(datBan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/dat-ban', data: datBan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemDatBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemDatBanAlert(['Thêm thành công ' + result], 'success');

                    datBan.idDatBan = result;
                    addNewRowToTable(datBan);

                    $('#modelThemDatBan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemDatBanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemDatBanAlert([errorString], 'danger');
                } else {
                    refreshThemDatBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them DatBan validator
function themDatBanValidator(datBan) {
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
    
