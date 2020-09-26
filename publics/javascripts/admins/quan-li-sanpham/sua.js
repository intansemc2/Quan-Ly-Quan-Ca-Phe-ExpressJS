
$(document).ready(function () {
    //Initialize Button Events
    //Suasanpham Confirm
    $('#modelSuasanpham .confirm').click(async function () {

        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkanh = $(this).parents('form').find('.linkanh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanpham = { masanpham : masanpham, ten : ten, linkanh : linkanh, loai : loai, gia : gia };

        let errors = suasanphamValidator(sanpham);

        if (errors.length > 0) {
            refreshSuasanphamAlert(errors);
            return;
        }

        await suasanphamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelSuasanpham').on('show.bs.modal', function (event) {
        let suasanphamTriggered = $(event.relatedTarget);

        let masanpham = suasanphamTriggered.attr('masanpham');
    

        let sanpham = sanphams.find(
            (item) => item.masanpham == masanpham
        );


        $('#modelSuasanpham').find('.masanpham').val(masanpham);
    


        $('#modelSuasanpham').find('.ten').val(sanpham.ten);
    
        $('#modelSuasanpham').find('.linkanh').val(sanpham.linkanh);
    
        $('#modelSuasanpham').find('.loai').val(sanpham.loai);
    
        $('#modelSuasanpham').find('.gia').val(sanpham.gia);
    

        refreshSuasanphamAlert([], "");
    });
});

//Functions
//Refresh data in model Suasanpham with data in sanphamsTypes
function refreshDataInModelSuasanpham() {
}

//Refresh sua sanpham Alert
function refreshSuasanphamAlert(alerts, type = 'danger') {
    let suasanphamAlerts = $('#modelSuasanpham .alerts');
    let suasanphamAlertsHtml = '';
    for (let alert of alerts) {
        suasanphamAlertsHtml += createAlerts(type, alert);
    }
    suasanphamAlerts.html(suasanphamAlertsHtml);
}

//Add new sanpham
function suasanphamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/sanpham', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuasanphamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuasanphamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(sanpham);

                    $("#modelSuasanpham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuasanphamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuasanphamAlert([errorString], 'danger');
                } else {
                    refreshSuasanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua sanpham validator
function suasanphamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('snphm không tồn tại ');
    }


    if (!sanpham.masanpham) {
        errors.push('Không thể xác định mã sản phẩm ');
    }
    
    if (!sanpham.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!sanpham.gia) {
        errors.push('Không thể xác định giá ');
    }
    

    return errors;
}    
