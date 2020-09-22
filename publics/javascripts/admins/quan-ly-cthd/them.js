
$(document).ready(function () {
    //Initialize Button Events
    //ThemCthd Confirm
    $('#modelThemCthd .confirm').click(async function () {

        let idHoaDon = $(this).parents('form').find('.idHoaDon').val();
    
        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let cthd = { idHoaDon : idHoaDon, idSanPham : idSanPham, soLuong : soLuong, donGia : donGia, diemTichLuy : diemTichLuy };

        let errors = themCthdValidator(cthd);

        if (errors.length > 0) {
            refreshThemCthdAlert(errors);
            return;
        }

        await themCthdAJAX(cthd);
    });

    //Events
    //Set cthd current value When model showup
    $('#modelThemCthd').on('show.bs.modal', function (event) {
        refreshThemCthdAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemCthd with data in cthdsTypes
function refreshDataInModelThemCthd() {
}

//Refresh them cthd Alert
function refreshThemCthdAlert(alerts, type = 'danger') {
    let themCthdAlerts = $('#modelThemCthd .alerts');
    let themCthdAlertsHtml = '';
    for (let alert of alerts) {
        themCthdAlertsHtml += createAlerts(type, alert);
    }
    themCthdAlerts.html(themCthdAlertsHtml);
}

//Add new cthd
function themCthdAJAX(cthd) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/cthd', data: cthd })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemCthdAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemCthdAlert(['Thêm thành công ' + result], 'success');

                    cthd.idCthd = result;
                    addNewRowToTable(cthd);

                    $('#modelThemCthd').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemCthdAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemCthdAlert([errorString], 'danger');
                } else {
                    refreshThemCthdAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Cthd validator
function themCthdValidator(cthd) {
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
    
