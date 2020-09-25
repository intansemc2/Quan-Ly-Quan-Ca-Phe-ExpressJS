
$(document).ready(function () {
    //Initialize Button Events
    //ThemNguonsanpham Confirm
    $('#modelThemNguonsanpham .confirm').click(async function () {

        let manguonsanpham = $(this).parents('form').find('.manguonsanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nguonsanpham = { manguonsanpham : manguonsanpham, ten : ten, sodienthoai : sodienthoai, diachi : diachi };

        let errors = themNguonsanphamValidator(nguonsanpham);

        if (errors.length > 0) {
            refreshThemNguonsanphamAlert(errors);
            return;
        }

        await themNguonsanphamAJAX(nguonsanpham);
    });

    //Events
    //Set nguonsanpham current value When model showup
    $('#modelThemNguonsanpham').on('show.bs.modal', function (event) {
        refreshThemNguonsanphamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemNguonsanpham with data in nguonsanphamsTypes
function refreshDataInModelThemNguonsanpham() {
}

//Refresh them nguonsanpham Alert
function refreshThemNguonsanphamAlert(alerts, type = 'danger') {
    let themNguonsanphamAlerts = $('#modelThemNguonsanpham .alerts');
    let themNguonsanphamAlertsHtml = '';
    for (let alert of alerts) {
        themNguonsanphamAlertsHtml += createAlerts(type, alert);
    }
    themNguonsanphamAlerts.html(themNguonsanphamAlertsHtml);
}

//Add new nguonsanpham
function themNguonsanphamAJAX(nguonsanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nguonsanpham', data: nguonsanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemNguonsanphamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemNguonsanphamAlert(['Thêm thành công ' + result], 'success');

                    nguonsanpham.idNguonsanpham = result;
                    addNewRowToTable(nguonsanpham);

                    $('#modelThemNguonsanpham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemNguonsanphamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemNguonsanphamAlert([errorString], 'danger');
                } else {
                    refreshThemNguonsanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Nguonsanpham validator
function themNguonsanphamValidator(nguonsanpham) {
    let errors = [];

    if (!nguonsanpham) {
        errors.push('Nguồn sản phẩm không tồn tại ');
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
    
