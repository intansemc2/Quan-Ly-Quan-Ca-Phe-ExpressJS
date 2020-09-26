
$(document).ready(function () {
    //Initialize Button Events
    //ThemsanPham Confirm
    $('#modelThemsanPham .confirm').click(async function () {

        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanPham = { maSanPham : maSanPham, ten : ten, linkAnh : linkAnh, loai : loai, gia : gia };

        let errors = themsanPhamValidator(sanPham);

        if (errors.length > 0) {
            refreshThemsanPhamAlert(errors);
            return;
        }

        await themsanPhamAJAX(sanPham);
    });

    //Events
    //Set sanPham current value When model showup
    $('#modelThemsanPham').on('show.bs.modal', function (event) {
        refreshThemsanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemsanPham with data in sanPhamsTypes
function refreshDataInModelThemsanPham() {
}

//Refresh them sanPham Alert
function refreshThemsanPhamAlert(alerts, type = 'danger') {
    let themsanPhamAlerts = $('#modelThemsanPham .alerts');
    let themsanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themsanPhamAlertsHtml += createAlerts(type, alert);
    }
    themsanPhamAlerts.html(themsanPhamAlertsHtml);
}

//Add new sanPham
function themsanPhamAJAX(sanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/sanPham', data: sanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemsanPhamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemsanPhamAlert(['Thêm thành công ' + result], 'success');

                    sanPham.maSanPham = result.insertId;                    
                    addNewRowToTable(sanPham);

                    $('#modelThemsanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemsanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemsanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemsanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them sanPham validator
function themsanPhamValidator(sanPham) {
    let errors = [];

    if (!sanPham) {
        errors.push('snphm không tồn tại ');
    }




        if (!sanPham.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!sanPham.gia) {
            errors.push('Không thể xác định giá ');
        }
        

    return errors;
}
    
