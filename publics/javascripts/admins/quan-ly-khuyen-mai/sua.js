
$(document).ready(function () {
    //Initialize Button Events
    //SuaKhuyenMai Confirm
    $('#modelSuaKhuyenMai .confirm').click(async function () {

        let idKhuyenMai = $(this).parents('form').find('.idKhuyenMai').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let thoiGianDienRa = $(this).parents('form').find('.thoiGianDienRa').val();
    
        let thoiGianKetThuc = $(this).parents('form').find('.thoiGianKetThuc').val();
    
        let khuyenMai = { idKhuyenMai : idKhuyenMai, ten : ten, thoiGianDienRa : thoiGianDienRa, thoiGianKetThuc : thoiGianKetThuc };

        let errors = suaKhuyenMaiValidator(khuyenMai);

        if (errors.length > 0) {
            refreshSuaKhuyenMaiAlert(errors);
            return;
        }

        await suaKhuyenMaiAJAX(khuyenMai);
    });

    //Events
    //Set khuyenMai current value When model showup
    $('#modelSuaKhuyenMai').on('show.bs.modal', function (event) {
        let suaKhuyenMaiTriggered = $(event.relatedTarget);

        let idKhuyenMai = suaKhuyenMaiTriggered.attr('idKhuyenMai');
    

        let khuyenMai = khuyenMais.find(
            (item) => item.idKhuyenMai == idKhuyenMai
        );


        $('#modelSuaKhuyenMai').find('.idKhuyenMai').val(idKhuyenMai);
    


        $('#modelSuaKhuyenMai').find('.ten').val(khuyenMai.ten);
    
        $('#modelSuaKhuyenMai').find('.thoiGianDienRa').val(khuyenMai.thoiGianDienRa);
    
        $('#modelSuaKhuyenMai').find('.thoiGianKetThuc').val(khuyenMai.thoiGianKetThuc);
    

        refreshSuaKhuyenMaiAlert([], "");
    });
});

//Functions
//Refresh data in model SuaKhuyenMai with data in khuyenMaisTypes
function refreshDataInModelSuaKhuyenMai() {
}

//Refresh sua khuyenMai Alert
function refreshSuaKhuyenMaiAlert(alerts, type = 'danger') {
    let suaKhuyenMaiAlerts = $('#modelSuaKhuyenMai .alerts');
    let suaKhuyenMaiAlertsHtml = '';
    for (let alert of alerts) {
        suaKhuyenMaiAlertsHtml += createAlerts(type, alert);
    }
    suaKhuyenMaiAlerts.html(suaKhuyenMaiAlertsHtml);
}

//Add new khuyenMai
function suaKhuyenMaiAJAX(khuyenMai) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/khuyen-mai', data: khuyenMai })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaKhuyenMaiAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaKhuyenMaiAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khuyenMai);

                    $("#modelSuaKhuyenMai").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaKhuyenMaiAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaKhuyenMaiAlert([errorString], 'danger');
                } else {
                    refreshSuaKhuyenMaiAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua KhuyenMai validator
function suaKhuyenMaiValidator(khuyenMai) {
    let errors = [];

    if (!khuyenMai) {
        errors.push('Khuyến mãi không tồn tại ');
    }


    if (!khuyenMai.idKhuyenMai) {
        errors.push('Không thể xác định id khuyến mãi ');
    }
    
    if (!khuyenMai.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!khuyenMai.thoiGianDienRa) {
        errors.push('Không thể xác định thời gian diễn ra ');
    }
    
    if (!khuyenMai.thoiGianKetThuc) {
        errors.push('Không thể xác định thời gian kết thúc ');
    }
    

    return errors;
}    
