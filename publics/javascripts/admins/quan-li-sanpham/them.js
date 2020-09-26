
$(document).ready(function () {
    //Initialize Button Events
    //Themsanpham Confirm
    $('#modelThemsanpham .confirm').click(async function () {

        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkanh = $(this).parents('form').find('.linkanh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanpham = { masanpham : masanpham, ten : ten, linkanh : linkanh, loai : loai, gia : gia };

        let errors = themsanphamValidator(sanpham);

        if (errors.length > 0) {
            refreshThemsanphamAlert(errors);
            return;
        }

        await themsanphamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelThemsanpham').on('show.bs.modal', function (event) {
        refreshThemsanphamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themsanpham with data in sanphamsTypes
function refreshDataInModelThemsanpham() {
}

//Refresh them sanpham Alert
function refreshThemsanphamAlert(alerts, type = 'danger') {
    let themsanphamAlerts = $('#modelThemsanpham .alerts');
    let themsanphamAlertsHtml = '';
    for (let alert of alerts) {
        themsanphamAlertsHtml += createAlerts(type, alert);
    }
    themsanphamAlerts.html(themsanphamAlertsHtml);
}

//Add new sanpham
function themsanphamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/sanpham', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemsanphamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemsanphamAlert(['Thêm thành công ' + result], 'success');

                    sanpham.masanpham = result.insertId;                    
                    addNewRowToTable(sanpham);

                    $('#modelThemsanpham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemsanphamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemsanphamAlert([errorString], 'danger');
                } else {
                    refreshThemsanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them sanpham validator
function themsanphamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('snphm không tồn tại ');
    }




        if (!sanpham.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!sanpham.gia) {
            errors.push('Không thể xác định giá ');
        }
        

    return errors;
}
    
