
$(document).ready(function () {
    //Initialize Button Events
    //ThemSanpham Confirm
    $('#modelThemSanpham .confirm').click(async function () {

        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkanh = $(this).parents('form').find('.linkanh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanpham = { masanpham : masanpham, ten : ten, linkanh : linkanh, loai : loai, gia : gia };

        let errors = themSanphamValidator(sanpham);

        if (errors.length > 0) {
            refreshThemSanphamAlert(errors);
            return;
        }

        await themSanphamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelThemSanpham').on('show.bs.modal', function (event) {
        refreshThemSanphamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemSanpham with data in sanphamsTypes
function refreshDataInModelThemSanpham() {
}

//Refresh them sanpham Alert
function refreshThemSanphamAlert(alerts, type = 'danger') {
    let themSanphamAlerts = $('#modelThemSanpham .alerts');
    let themSanphamAlertsHtml = '';
    for (let alert of alerts) {
        themSanphamAlertsHtml += createAlerts(type, alert);
    }
    themSanphamAlerts.html(themSanphamAlertsHtml);
}

//Add new sanpham
function themSanphamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/sanpham', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemSanphamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemSanphamAlert(['Thêm thành công ' + result], 'success');

                    sanpham.idSanpham = result;
                    addNewRowToTable(sanpham);

                    $('#modelThemSanpham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemSanphamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemSanphamAlert([errorString], 'danger');
                } else {
                    refreshThemSanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Sanpham validator
function themSanphamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('Sản phẩm không tồn tại ');
    }




        if (!sanpham.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!sanpham.gia) {
            errors.push('Không thể xác định giá ');
        }
        

    return errors;
}
    
