
$(document).ready(function () {
    //Initialize Button Events
    //ThemKhuyenMai Confirm
    $('#modelThemKhuyenMai .confirm').click(async function () {

        let idKhuyenMai = $(this).parents('form').find('.idKhuyenMai').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let thoiGianDienRa = $(this).parents('form').find('.thoiGianDienRa').val();
    
        let thoiGianKetThuc = $(this).parents('form').find('.thoiGianKetThuc').val();
    
        let khuyenMai = { idKhuyenMai : idKhuyenMai, ten : ten, thoiGianDienRa : thoiGianDienRa, thoiGianKetThuc : thoiGianKetThuc };

        let errors = themKhuyenMaiValidator(khuyenMai);

        if (errors.length > 0) {
            refreshThemKhuyenMaiAlert(errors);
            return;
        }

        await themKhuyenMaiAJAX(khuyenMai);
    });

    //Events
    //Set khuyenMai current value When model showup
    $('#modelThemKhuyenMai').on('show.bs.modal', function (event) {
        refreshThemKhuyenMaiAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemKhuyenMai with data in khuyenMaisTypes
function refreshDataInModelThemKhuyenMai() {
}

//Refresh them khuyenMai Alert
function refreshThemKhuyenMaiAlert(alerts, type = 'danger') {
    let themKhuyenMaiAlerts = $('#modelThemKhuyenMai .alerts');
    let themKhuyenMaiAlertsHtml = '';
    for (let alert of alerts) {
        themKhuyenMaiAlertsHtml += createAlerts(type, alert);
    }
    themKhuyenMaiAlerts.html(themKhuyenMaiAlertsHtml);
}

//Add new khuyenMai
function themKhuyenMaiAJAX(khuyenMai) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/khuyen-mai', data: khuyenMai })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemKhuyenMaiAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemKhuyenMaiAlert(['Thêm thành công ' + result], 'success');

                    khuyenMai.idKhuyenMai = result;
                    addNewRowToTable(khuyenMai);

                    $('#modelThemKhuyenMai').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemKhuyenMaiAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemKhuyenMaiAlert([errorString], 'danger');
                } else {
                    refreshThemKhuyenMaiAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them KhuyenMai validator
function themKhuyenMaiValidator(khuyenMai) {
    let errors = [];

    if (!khuyenMai) {
        errors.push('Khuyến mãi không tồn tại ');
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
    
