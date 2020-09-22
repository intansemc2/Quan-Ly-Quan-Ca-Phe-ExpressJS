
$(document).ready(function () {
    //Initialize Button Events
    //SuaCthd Confirm
    $('#modelSuaCthd .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let cthd = { idHoaDon : idHoaDon, idSanPham : idSanPham, soLuong : soLuong, donGia : donGia, diemTichLuy : diemTichLuy };

        let errors = suaCthdValidator(cthd);

        if (errors.length > 0) {
            refreshSuaCthdAlert(errors);
            return;
        }

        await suaCthdAJAX(cthd);
    });

    //Events
    //Set cthd current value When model showup
    $('#modelSuaCthd').on('show.bs.modal', function (event) {
        let suaCthdTriggered = $(event.relatedTarget);

        let idHoaDon = suaCthdTriggered.attr('idHoaDon');
    
        let idSanPham = suaCthdTriggered.attr('idSanPham');
    

        let cthd = cthds.find(
            (item) => item.idHoaDon == idHoaDon && item.idSanPham == idSanPham
        );


        $('#modelSuaCthd').find('.idHoaDon').val(idHoaDon);
    
        $('#modelSuaCthd').find('.idSanPham').val(idSanPham);
    


        $('#modelSuaCthd').find('.soLuong').val(cthd.soLuong);
    
        $('#modelSuaCthd').find('.donGia').val(cthd.donGia);
    
        $('#modelSuaCthd').find('.diemTichLuy').val(cthd.diemTichLuy);
    

        refreshSuaCthdAlert([], "");
    });
});

//Functions
//Refresh data in model SuaCthd with data in cthdsTypes
function refreshDataInModelSuaCthd() {
}

//Refresh sua cthd Alert
function refreshSuaCthdAlert(alerts, type = 'danger') {
    let suaCthdAlerts = $('#modelSuaCthd .alerts');
    let suaCthdAlertsHtml = '';
    for (let alert of alerts) {
        suaCthdAlertsHtml += createAlerts(type, alert);
    }
    suaCthdAlerts.html(suaCthdAlertsHtml);
}

//Add new cthd
function suaCthdAJAX(cthd) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/cthd', data: cthd })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaCthdAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaCthdAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(cthd);

                    $("#modelSuaCthd").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaCthdAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaCthdAlert([errorString], 'danger');
                } else {
                    refreshSuaCthdAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Cthd validator
function suaCthdValidator(cthd) {
    let errors = [];

    if (!cthd) {
        errors.push('Chi tiết hóa đơn không tồn tại ');
    }


    if (!cthd.idHoaDon) {
        errors.push('Không thể xác định id hóa đơn ');
    }
    
    if (!cthd.idSanPham) {
        errors.push('Không thể xác định id sản phẩm ');
    }
    
    if (!cthd.soLuong) {
        errors.push('Không thể xác định số lượng ');
    }
    
    if (!cthd.donGia) {
        errors.push('Không thể xác định đơn giá ');
    }
    
    if (!cthd.diemTichLuy) {
        errors.push('Không thể xác định điểm tích lũy ');
    }
    

    return errors;
}    
