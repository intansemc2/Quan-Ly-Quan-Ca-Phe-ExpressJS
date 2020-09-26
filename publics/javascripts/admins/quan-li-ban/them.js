
$(document).ready(function () {
    //Initialize Button Events
    //Themban Confirm
    $('#modelThemban .confirm').click(async function () {

        let maban = $(this).parents('form').find('.maban').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ban = { maban : maban, ten : ten };

        let errors = thembanValidator(ban);

        if (errors.length > 0) {
            refreshThembanAlert(errors);
            return;
        }

        await thembanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelThemban').on('show.bs.modal', function (event) {
        refreshThembanAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themban with data in bansTypes
function refreshDataInModelThemban() {
}

//Refresh them ban Alert
function refreshThembanAlert(alerts, type = 'danger') {
    let thembanAlerts = $('#modelThemban .alerts');
    let thembanAlertsHtml = '';
    for (let alert of alerts) {
        thembanAlertsHtml += createAlerts(type, alert);
    }
    thembanAlerts.html(thembanAlertsHtml);
}

//Add new ban
function thembanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/ban', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThembanAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThembanAlert(['Thêm thành công ' + result], 'success');

                    ban.maban = result.insertId;                    
                    addNewRowToTable(ban);

                    $('#modelThemban').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThembanAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThembanAlert([errorString], 'danger');
                } else {
                    refreshThembanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them ban validator
function thembanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('bn không tồn tại ');
    }




        if (!ban.ten) {
            errors.push('Không thể xác định tên ');
        }
        

    return errors;
}
    
