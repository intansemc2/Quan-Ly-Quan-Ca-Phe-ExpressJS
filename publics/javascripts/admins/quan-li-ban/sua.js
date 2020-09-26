
$(document).ready(function () {
    //Initialize Button Events
    //Suaban Confirm
    $('#modelSuaban .confirm').click(async function () {

        let maBan = $(this).parents('form').find('.maBan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ban = { maBan : maBan, ten : ten };

        let errors = suabanValidator(ban);

        if (errors.length > 0) {
            refreshSuabanAlert(errors);
            return;
        }

        await suabanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelSuaban').on('show.bs.modal', function (event) {
        let suabanTriggered = $(event.relatedTarget);

        let maBan = suabanTriggered.attr('maBan');
    

        let ban = bans.find(
            (item) => item.maBan == maBan
        );


        $('#modelSuaban').find('.maBan').val(maBan);
    


        $('#modelSuaban').find('.ten').val(ban.ten);
    

        refreshSuabanAlert([], "");
    });
});

//Functions
//Refresh data in model Suaban with data in bansTypes
function refreshDataInModelSuaban() {
}

//Refresh sua ban Alert
function refreshSuabanAlert(alerts, type = 'danger') {
    let suabanAlerts = $('#modelSuaban .alerts');
    let suabanAlertsHtml = '';
    for (let alert of alerts) {
        suabanAlertsHtml += createAlerts(type, alert);
    }
    suabanAlerts.html(suabanAlertsHtml);
}

//Add new ban
function suabanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/ban', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuabanAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuabanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(ban);

                    $("#modelSuaban").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuabanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuabanAlert([errorString], 'danger');
                } else {
                    refreshSuabanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua ban validator
function suabanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('bn không tồn tại ');
    }


    if (!ban.maBan) {
        errors.push('Không thể xác định mã bàn ');
    }
    
    if (!ban.ten) {
        errors.push('Không thể xác định tên ');
    }
    

    return errors;
}    
