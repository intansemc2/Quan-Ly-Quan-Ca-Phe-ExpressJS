
$(document).ready(function () {
    //Initialize Button Events
    //Themnguonsanpham Confirm
    $('#modelThemnguonsanpham .confirm').click(async function () {

        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nguonsanpham = { manguonsanpham : manguonsanpham, ten : ten, sodienthoai : sodienthoai, diachi : diachi };

        let errors = themnguonsanphamValidator(nguonsanpham);

        if (errors.length > 0) {
            refreshThemnguonsanphamAlert(errors);
            return;
        }

        await themnguonsanphamAJAX(nguonsanpham);
    });

    //Events
    //Set nguonsanpham current value When model showup
    $('#modelThemnguonsanpham').on('show.bs.modal', function (event) {
        refreshThemnguonsanphamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themnguonsanpham with data in nguonsanphamsTypes
function refreshDataInModelThemnguonsanpham() {
}

//Refresh them nguonsanpham Alert
function refreshThemnguonsanphamAlert(alerts, type = 'danger') {
    let themnguonsanphamAlerts = $('#modelThemnguonsanpham .alerts');
    let themnguonsanphamAlertsHtml = '';
    for (let alert of alerts) {
        themnguonsanphamAlertsHtml += createAlerts(type, alert);
    }
    themnguonsanphamAlerts.html(themnguonsanphamAlertsHtml);
}

//Add new nguonsanpham
function themnguonsanphamAJAX(nguonsanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nguonsanpham', data: nguonsanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnguonsanphamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemnguonsanphamAlert(['Thêm thành công ' + result], 'success');

                    nguonsanpham.manguonsanpham = result;                    
                    addNewRowToTable(nguonsanpham);

                    $('#modelThemnguonsanpham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnguonsanphamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnguonsanphamAlert([errorString], 'danger');
                } else {
                    refreshThemnguonsanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nguonsanpham validator
function themnguonsanphamValidator(nguonsanpham) {
    let errors = [];

    if (!nguonsanpham) {
        errors.push('ngunsnphm không tồn tại ');
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
    
