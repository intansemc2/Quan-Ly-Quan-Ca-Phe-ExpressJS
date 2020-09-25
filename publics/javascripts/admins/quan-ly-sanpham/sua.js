
$(document).ready(function () {
    //Initialize Button Events
    //SuaSanpham Confirm
    $('#modelSuaSanpham .confirm').click(async function () {

        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkanh = $(this).parents('form').find('.linkanh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanpham = { masanpham : masanpham, ten : ten, linkanh : linkanh, loai : loai, gia : gia };

        let errors = suaSanphamValidator(sanpham);

        if (errors.length > 0) {
            refreshSuaSanphamAlert(errors);
            return;
        }

        await suaSanphamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelSuaSanpham').on('show.bs.modal', function (event) {
        let suaSanphamTriggered = $(event.relatedTarget);

        let masanpham = suaSanphamTriggered.attr('masanpham');
    

        let sanpham = sanphams.find(
            (item) => item.masanpham == masanpham
        );


        $('#modelSuaSanpham').find('.masanpham').val(masanpham);
    


        $('#modelSuaSanpham').find('.ten').val(sanpham.ten);
    
        $('#modelSuaSanpham').find('.linkanh').val(sanpham.linkanh);
    
        $('#modelSuaSanpham').find('.loai').val(sanpham.loai);
    
        $('#modelSuaSanpham').find('.gia').val(sanpham.gia);
    

        refreshSuaSanphamAlert([], "");
    });
});

//Functions
//Refresh data in model SuaSanpham with data in sanphamsTypes
function refreshDataInModelSuaSanpham() {
}

//Refresh sua sanpham Alert
function refreshSuaSanphamAlert(alerts, type = 'danger') {
    let suaSanphamAlerts = $('#modelSuaSanpham .alerts');
    let suaSanphamAlertsHtml = '';
    for (let alert of alerts) {
        suaSanphamAlertsHtml += createAlerts(type, alert);
    }
    suaSanphamAlerts.html(suaSanphamAlertsHtml);
}

//Add new sanpham
function suaSanphamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/sanpham', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaSanphamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaSanphamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(sanpham);

                    $("#modelSuaSanpham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaSanphamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaSanphamAlert([errorString], 'danger');
                } else {
                    refreshSuaSanphamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Sanpham validator
function suaSanphamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('Sản phẩm không tồn tại ');
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
