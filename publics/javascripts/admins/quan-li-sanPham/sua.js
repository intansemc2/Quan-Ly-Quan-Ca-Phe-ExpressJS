
$(document).ready(function () {
    //Initialize Button Events
    //SuasanPham Confirm
    $('#modelSuasanPham .confirm').click(async function () {

        let maSanPham = $(this).parents('form').find('.maSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let sanPham = { maSanPham : maSanPham, ten : ten, linkAnh : linkAnh, loai : loai, gia : gia };

        let errors = suasanPhamValidator(sanPham);

        if (errors.length > 0) {
            refreshSuasanPhamAlert(errors);
            return;
        }

        await suasanPhamAJAX(sanPham);
    });

    //Events
    //Set sanPham current value When model showup
    $('#modelSuasanPham').on('show.bs.modal', function (event) {
        let suasanPhamTriggered = $(event.relatedTarget);

        let maSanPham = suasanPhamTriggered.attr('maSanPham');
    

        let sanPham = sanPhams.find(
            (item) => item.maSanPham == maSanPham
        );


        $('#modelSuasanPham').find('.maSanPham').val(maSanPham);
    


        $('#modelSuasanPham').find('.ten').val(sanPham.ten);
    
        $('#modelSuasanPham').find('.linkAnh').val(sanPham.linkAnh);
    
        $('#modelSuasanPham').find('.loai').val(sanPham.loai);
    
        $('#modelSuasanPham').find('.gia').val(sanPham.gia);
    

        refreshSuasanPhamAlert([], "");
    });
});

//Functions
//Refresh data in model SuasanPham with data in sanPhamsTypes
function refreshDataInModelSuasanPham() {
}

//Refresh sua sanPham Alert
function refreshSuasanPhamAlert(alerts, type = 'danger') {
    let suasanPhamAlerts = $('#modelSuasanPham .alerts');
    let suasanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suasanPhamAlertsHtml += createAlerts(type, alert);
    }
    suasanPhamAlerts.html(suasanPhamAlertsHtml);
}

//Add new sanPham
function suasanPhamAJAX(sanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/sanPham', data: sanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuasanPhamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuasanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(sanPham);

                    $("#modelSuasanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuasanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuasanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuasanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua sanPham validator
function suasanPhamValidator(sanPham) {
    let errors = [];

    if (!sanPham) {
        errors.push('snphm không tồn tại ');
    }


    if (!sanPham.maSanPham) {
        errors.push('Không thể xác định mã sản phẩm ');
    }
    
    if (!sanPham.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!sanPham.gia) {
        errors.push('Không thể xác định giá ');
    }
    

    return errors;
}    
