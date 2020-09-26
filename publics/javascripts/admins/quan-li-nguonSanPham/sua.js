
$(document).ready(function () {
    //Initialize Button Events
    //SuanguonSanPham Confirm
    $('#modelSuanguonSanPham .confirm').click(async function () {

        let maNguonSanPham = $(this).parents('form').find('.maNguonSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let diaChi = $(this).parents('form').find('.diaChi').val();
    
        let nguonSanPham = { maNguonSanPham : maNguonSanPham, ten : ten, soDienThoai : soDienThoai, diaChi : diaChi };

        let errors = suanguonSanPhamValidator(nguonSanPham);

        if (errors.length > 0) {
            refreshSuanguonSanPhamAlert(errors);
            return;
        }

        await suanguonSanPhamAJAX(nguonSanPham);
    });

    //Events
    //Set nguonSanPham current value When model showup
    $('#modelSuanguonSanPham').on('show.bs.modal', function (event) {
        let suanguonSanPhamTriggered = $(event.relatedTarget);

        let maNguonSanPham = suanguonSanPhamTriggered.attr('maNguonSanPham');
    

        let nguonSanPham = nguonSanPhams.find(
            (item) => item.maNguonSanPham == maNguonSanPham
        );


        $('#modelSuanguonSanPham').find('.maNguonSanPham').val(maNguonSanPham);
    


        $('#modelSuanguonSanPham').find('.ten').val(nguonSanPham.ten);
    
        $('#modelSuanguonSanPham').find('.soDienThoai').val(nguonSanPham.soDienThoai);
    
        $('#modelSuanguonSanPham').find('.diaChi').val(nguonSanPham.diaChi);
    

        refreshSuanguonSanPhamAlert([], "");
    });
});

//Functions
//Refresh data in model SuanguonSanPham with data in nguonSanPhamsTypes
function refreshDataInModelSuanguonSanPham() {
}

//Refresh sua nguonSanPham Alert
function refreshSuanguonSanPhamAlert(alerts, type = 'danger') {
    let suanguonSanPhamAlerts = $('#modelSuanguonSanPham .alerts');
    let suanguonSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suanguonSanPhamAlertsHtml += createAlerts(type, alert);
    }
    suanguonSanPhamAlerts.html(suanguonSanPhamAlertsHtml);
}

//Add new nguonSanPham
function suanguonSanPhamAJAX(nguonSanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nguonSanPham', data: nguonSanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanguonSanPhamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuanguonSanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nguonSanPham);

                    $("#modelSuanguonSanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanguonSanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanguonSanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuanguonSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nguonSanPham validator
function suanguonSanPhamValidator(nguonSanPham) {
    let errors = [];

    if (!nguonSanPham) {
        errors.push('ngunsnphm không tồn tại ');
    }


    if (!nguonSanPham.maNguonSanPham) {
        errors.push('Không thể xác định mã nguồn sản phẩm ');
    }
    
    if (!nguonSanPham.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!nguonSanPham.soDienThoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!nguonSanPham.diaChi) {
        errors.push('Không thể xác định địa chỉ ');
    }
    

    return errors;
}    
