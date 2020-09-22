
$(document).ready(function () {
    //Initialize Button Events
    //ThemCtkm Confirm
    $('#modelThemCtkm .confirm').click(async function () {

        let idKhuyenMai = $(this).parents('form').find('.idKhuyenMai').val();
    
        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let ctkm = { idKhuyenMai : idKhuyenMai, idSanPham : idSanPham, soLuong : soLuong, donGia : donGia, diemTichLuy : diemTichLuy };

        let errors = themCtkmValidator(ctkm);

        if (errors.length > 0) {
            refreshThemCtkmAlert(errors);
            return;
        }

        await themCtkmAJAX(ctkm);
    });

    //Events
    //Set ctkm current value When model showup
    $('#modelThemCtkm').on('show.bs.modal', function (event) {
        refreshThemCtkmAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemCtkm with data in ctkmsTypes
function refreshDataInModelThemCtkm() {
}

//Refresh them ctkm Alert
function refreshThemCtkmAlert(alerts, type = 'danger') {
    let themCtkmAlerts = $('#modelThemCtkm .alerts');
    let themCtkmAlertsHtml = '';
    for (let alert of alerts) {
        themCtkmAlertsHtml += createAlerts(type, alert);
    }
    themCtkmAlerts.html(themCtkmAlertsHtml);
}

//Add new ctkm
function themCtkmAJAX(ctkm) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/ctkm', data: ctkm })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemCtkmAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemCtkmAlert(['Thêm thành công ' + result], 'success');

                    ctkm.idCtkm = result;
                    addNewRowToTable(ctkm);

                    $('#modelThemCtkm').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemCtkmAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemCtkmAlert([errorString], 'danger');
                } else {
                    refreshThemCtkmAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Ctkm validator
function themCtkmValidator(ctkm) {
    let errors = [];

    if (!ctkm) {
        errors.push('Chi tiết khuyến mãi không tồn tại ');
    }


        if (!ctkm.idKhuyenMai) {
            errors.push('Không thể xác định id khuyến mãi ');
        }
        
        if (!ctkm.idSanPham) {
            errors.push('Không thể xác định id sản phẩm ');
        }
        


        if (!ctkm.soLuong) {
            errors.push('Không thể xác định số lượng ');
        }
        

    return errors;
}
    
