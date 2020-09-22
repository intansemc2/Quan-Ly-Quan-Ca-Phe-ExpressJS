
$(document).ready(function () {
    //Initialize Button Events
    //SuaBan Confirm
    $('#modelSuaBan .confirm').click(async function () {

        let idBan = $(this).parents('form').find('.idBan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let ban = { idBan : idBan, ten : ten, ghiChu : ghiChu };

        let errors = suaBanValidator(ban);

        if (errors.length > 0) {
            refreshSuaBanAlert(errors);
            return;
        }

        await suaBanAJAX(ban);
    });

    //Events
    //Set ban current value When model showup
    $('#modelSuaBan').on('show.bs.modal', function (event) {
        let suaBanTriggered = $(event.relatedTarget);

        let idBan = suaBanTriggered.attr('idBan');
    

        let ban = bans.find(
            (item) => item.idBan == idBan
        );


        $('#modelSuaBan').find('.idBan').val(idBan);
    


        $('#modelSuaBan').find('.ten').val(ban.ten);
    
        $('#modelSuaBan').find('.ghiChu').val(ban.ghiChu);
    

        refreshSuaBanAlert([], "");
    });
});

//Functions
//Refresh data in model SuaBan with data in bansTypes
function refreshDataInModelSuaBan() {
}

//Refresh sua ban Alert
function refreshSuaBanAlert(alerts, type = 'danger') {
    let suaBanAlerts = $('#modelSuaBan .alerts');
    let suaBanAlertsHtml = '';
    for (let alert of alerts) {
        suaBanAlertsHtml += createAlerts(type, alert);
    }
    suaBanAlerts.html(suaBanAlertsHtml);
}

//Add new ban
function suaBanAJAX(ban) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/ban', data: ban })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaBanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaBanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(ban);

                    $("#modelSuaBan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaBanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaBanAlert([errorString], 'danger');
                } else {
                    refreshSuaBanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Ban validator
function suaBanValidator(ban) {
    let errors = [];

    if (!ban) {
        errors.push('Bàn không tồn tại ');
    }


    if (!ban.idBan) {
        errors.push('Không thể xác định id bàn ');
    }
    

    return errors;
}    
