
$(document).ready(function () {
    //Initialize Button Events
    //SuaCtkm Confirm
    $('#modelSuaCtkm .confirm').click(async function () {

        let idKhuyenMai = $(this).parents('form').find('.idKhuyenMai').val();
    
        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let soLuong = $(this).parents('form').find('.soLuong').val();
    
        let donGia = $(this).parents('form').find('.donGia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let ctkm = { idKhuyenMai : idKhuyenMai, idSanPham : idSanPham, soLuong : soLuong, donGia : donGia, diemTichLuy : diemTichLuy };

        let errors = suaCtkmValidator(ctkm);

        if (errors.length > 0) {
            refreshSuaCtkmAlert(errors);
            return;
        }

        await suaCtkmAJAX(ctkm);
    });

    //Events
    //Set ctkm current value When model showup
    $('#modelSuaCtkm').on('show.bs.modal', function (event) {
        let suaCtkmTriggered = $(event.relatedTarget);

        let idKhuyenMai = suaCtkmTriggered.attr('idKhuyenMai');
    
        let idSanPham = suaCtkmTriggered.attr('idSanPham');
    

        let ctkm = ctkms.find(
            (item) => item.idKhuyenMai == idKhuyenMai && item.idSanPham == idSanPham
        );


        $('#modelSuaCtkm').find('.idKhuyenMai').val(idKhuyenMai);
    
        $('#modelSuaCtkm').find('.idSanPham').val(idSanPham);
    


        $('#modelSuaCtkm').find('.soLuong').val(ctkm.soLuong);
    
        $('#modelSuaCtkm').find('.donGia').val(ctkm.donGia);
    
        $('#modelSuaCtkm').find('.diemTichLuy').val(ctkm.diemTichLuy);
    

        refreshSuaCtkmAlert([], "");
    });
});

//Functions
//Refresh data in model SuaCtkm with data in ctkmsTypes
function refreshDataInModelSuaCtkm() {
}

//Refresh sua ctkm Alert
function refreshSuaCtkmAlert(alerts, type = 'danger') {
    let suaCtkmAlerts = $('#modelSuaCtkm .alerts');
    let suaCtkmAlertsHtml = '';
    for (let alert of alerts) {
        suaCtkmAlertsHtml += createAlerts(type, alert);
    }
    suaCtkmAlerts.html(suaCtkmAlertsHtml);
}

//Add new ctkm
function suaCtkmAJAX(ctkm) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/ctkm', data: ctkm })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaCtkmAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaCtkmAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(ctkm);

                    $("#modelSuaCtkm").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaCtkmAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaCtkmAlert([errorString], 'danger');
                } else {
                    refreshSuaCtkmAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Ctkm validator
function suaCtkmValidator(ctkm) {
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
