
$(document).ready(function () {
    //Initialize Button Events
    //ThemBan Confirm
    $('#modelThemBan .confirm').click(async function () {

        let idBan = $(this).parents('form').find('.idBan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let ban = { idBan : idBan, ten : ten, ghiChu : ghiChu };

        let errors = themBanValidator(ban);

        if (errors.length > 0) {
            refreshThemBanAlert(errors);
            return;
        }

        await themBanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelThemBan').on('show.bs.modal', function (event) {
        refreshThemBanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemBan with data in bansTypes
function refreshDataInModelThemBan() {
}

//Refresh them ban Alert
function refreshThemBanAlert(alerts, type = 'danger') {
    let themBanAlerts = $('#modelThemBan .alerts');
    let themBanAlertsHtml = '';
    for (let alert of alerts) {
        themBanAlertsHtml += createAlerts(type, alert);
    }
    themBanAlerts.html(themBanAlertsHtml);
}

//Add new ban
function themBanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/ban', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemBanAlert(['Thêm thành công ' + result], 'success');

                    ban.idBan = result;
                    addNewRowToTable(ban);

                    $('#modelThemBan').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemBanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemBanAlert([errorString], 'danger');
                } else {
                    refreshThemBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Ban validator
function themBanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('Bàn không tồn tại ');
    }





    return errors;
}
    
