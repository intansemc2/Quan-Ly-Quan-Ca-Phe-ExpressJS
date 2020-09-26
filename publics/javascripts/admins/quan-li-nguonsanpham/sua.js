
$(document).ready(function () {
    //Initialize Button Events
    //Suanguonsanpham Confirm
    $('#modelSuanguonsanpham .confirm').click(async function () {

        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nguonsanpham = { manguonsanpham : manguonsanpham, ten : ten, sodienthoai : sodienthoai, diachi : diachi };

        let errors = suanguonsanphamValidator(nguonsanpham);

        if (errors.length > 0) {
            refreshSuanguonsanphamAlert(errors);
            return;
        }

        await suanguonsanphamAJAX(nguonsanpham);
    });

    //Events
    //Set nguonsanpham current value When model showup
    $('#modelSuanguonsanpham').on('show.bs.modal', function (event) {
        let suanguonsanphamTriggered = $(event.relatedTarget);

        let manguonsanpham = suanguonsanphamTriggered.attr('manguonsanpham');
    

        let nguonsanpham = nguonsanphams.find(
            (item) => item.manguonsanpham == manguonsanpham
        );


        $('#modelSuanguonsanpham').find('.manguonsanpham').val(manguonsanpham);
    


        $('#modelSuanguonsanpham').find('.ten').val(nguonsanpham.ten);
    
        $('#modelSuanguonsanpham').find('.sodienthoai').val(nguonsanpham.sodienthoai);
    
        $('#modelSuanguonsanpham').find('.diachi').val(nguonsanpham.diachi);
    

        refreshSuanguonsanphamAlert([], "");
    });
});

//Functions
//Refresh data in model Suanguonsanpham with data in nguonsanphamsTypes
function refreshDataInModelSuanguonsanpham() {
}

//Refresh sua nguonsanpham Alert
function refreshSuanguonsanphamAlert(alerts, type = 'danger') {
    let suanguonsanphamAlerts = $('#modelSuanguonsanpham .alerts');
    let suanguonsanphamAlertsHtml = '';
    for (let alert of alerts) {
        suanguonsanphamAlertsHtml += createAlerts(type, alert);
    }
    suanguonsanphamAlerts.html(suanguonsanphamAlertsHtml);
}

//Add new nguonsanpham
function suanguonsanphamAJAX(nguonsanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nguonsanpham', data: nguonsanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanguonsanphamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuanguonsanphamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nguonsanpham);

                    $("#modelSuanguonsanpham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanguonsanphamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanguonsanphamAlert([errorString], 'danger');
                } else {
                    refreshSuanguonsanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nguonsanpham validator
function suanguonsanphamValidator(nguonsanpham) {
    let errors = [];

    if (!nguonsanpham) {
        errors.push('ngunsnphm không tồn tại ');
    }


    if (!nguonsanpham.manguonsanpham) {
        errors.push('Không thể xác định mã nguồn sản phẩm ');
    }
    
    if (!nguonsanpham.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!nguonsanpham.sodienthoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!nguonsanpham.diachi) {
        errors.push('Không thể xác định địa chỉ ');
    }
    

    return errors;
}    
