
$(document).ready(function () {
    //Initialize Button Events
    //SuaNguonsanpham Confirm
    $('#modelSuaNguonsanpham .confirm').click(async function () {

        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nguonsanpham = { manguonsanpham : manguonsanpham, ten : ten, sodienthoai : sodienthoai, diachi : diachi };

        let errors = suaNguonsanphamValidator(nguonsanpham);

        if (errors.length > 0) {
            refreshSuaNguonsanphamAlert(errors);
            return;
        }

        await suaNguonsanphamAJAX(nguonsanpham);
    });

    //Events
    //Set nguonsanpham current value When model showup
    $('#modelSuaNguonsanpham').on('show.bs.modal', function (event) {
        let suaNguonsanphamTriggered = $(event.relatedTarget);

        let manguonsanpham = suaNguonsanphamTriggered.attr('manguonsanpham');
    

        let nguonsanpham = nguonsanphams.find(
            (item) => item.manguonsanpham == manguonsanpham
        );


        $('#modelSuaNguonsanpham').find('.manguonsanpham').val(manguonsanpham);
    


        $('#modelSuaNguonsanpham').find('.ten').val(nguonsanpham.ten);
    
        $('#modelSuaNguonsanpham').find('.sodienthoai').val(nguonsanpham.sodienthoai);
    
        $('#modelSuaNguonsanpham').find('.diachi').val(nguonsanpham.diachi);
    

        refreshSuaNguonsanphamAlert([], "");
    });
});

//Functions
//Refresh data in model SuaNguonsanpham with data in nguonsanphamsTypes
function refreshDataInModelSuaNguonsanpham() {
}

//Refresh sua nguonsanpham Alert
function refreshSuaNguonsanphamAlert(alerts, type = 'danger') {
    let suaNguonsanphamAlerts = $('#modelSuaNguonsanpham .alerts');
    let suaNguonsanphamAlertsHtml = '';
    for (let alert of alerts) {
        suaNguonsanphamAlertsHtml += createAlerts(type, alert);
    }
    suaNguonsanphamAlerts.html(suaNguonsanphamAlertsHtml);
}

//Add new nguonsanpham
function suaNguonsanphamAJAX(nguonsanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nguonsanpham', data: nguonsanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaNguonsanphamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaNguonsanphamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nguonsanpham);

                    $("#modelSuaNguonsanpham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaNguonsanphamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaNguonsanphamAlert([errorString], 'danger');
                } else {
                    refreshSuaNguonsanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Nguonsanpham validator
function suaNguonsanphamValidator(nguonsanpham) {
    let errors = [];

    if (!nguonsanpham) {
        errors.push('Nguồn sản phẩm không tồn tại ');
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
