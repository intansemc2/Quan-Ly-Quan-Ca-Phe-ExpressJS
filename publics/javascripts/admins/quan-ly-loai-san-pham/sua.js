
$(document).ready(function () {
    //Initialize Button Events
    //SuaLoaiSanPham Confirm
    $('#modelSuaLoaiSanPham .confirm').click(async function () {

        let idLoaiSanPham = $(this).parents('form').find('.idLoaiSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let loaiSanPham = { idLoaiSanPham : idLoaiSanPham, ten : ten, linkAnh : linkAnh, ghiChu : ghiChu };

        let errors = suaLoaiSanPhamValidator(loaiSanPham);

        if (errors.length > 0) {
            refreshSuaLoaiSanPhamAlert(errors);
            return;
        }

        await suaLoaiSanPhamAJAX(loaiSanPham);
    });

    //Events
    //Set loaiSanPham current value When model showup
    $('#modelSuaLoaiSanPham').on('show.bs.modal', function (event) {
        let suaLoaiSanPhamTriggered = $(event.relatedTarget);

        let idLoaiSanPham = suaLoaiSanPhamTriggered.attr('idLoaiSanPham');
    

        let loaiSanPham = loaiSanPhams.find(
            (item) => item.idLoaiSanPham == idLoaiSanPham
        );


        $('#modelSuaLoaiSanPham').find('.idLoaiSanPham').val(idLoaiSanPham);
    


        $('#modelSuaLoaiSanPham').find('.ten').val(loaiSanPham.ten);
    
        $('#modelSuaLoaiSanPham').find('.linkAnh').val(loaiSanPham.linkAnh);
    
        $('#modelSuaLoaiSanPham').find('.ghiChu').val(loaiSanPham.ghiChu);
    

        refreshSuaLoaiSanPhamAlert([], "");
    });
});

//Functions
//Refresh data in model SuaLoaiSanPham with data in loaiSanPhamsTypes
function refreshDataInModelSuaLoaiSanPham() {
}

//Refresh sua loaiSanPham Alert
function refreshSuaLoaiSanPhamAlert(alerts, type = 'danger') {
    let suaLoaiSanPhamAlerts = $('#modelSuaLoaiSanPham .alerts');
    let suaLoaiSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suaLoaiSanPhamAlertsHtml += createAlerts(type, alert);
    }
    suaLoaiSanPhamAlerts.html(suaLoaiSanPhamAlertsHtml);
}

//Add new loaiSanPham
function suaLoaiSanPhamAJAX(loaiSanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/loai-san-pham', data: loaiSanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaLoaiSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaLoaiSanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(loaiSanPham);

                    $("#modelSuaLoaiSanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaLoaiSanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaLoaiSanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuaLoaiSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua LoaiSanPham validator
function suaLoaiSanPhamValidator(loaiSanPham) {
    let errors = [];

    if (!loaiSanPham) {
        errors.push('Loại sản phẩm không tồn tại ');
    }


    if (!loaiSanPham.idLoaiSanPham) {
        errors.push('Không thể xác định id loại sản phẩm ');
    }
    
    if (!loaiSanPham.ten) {
        errors.push('Không thể xác định tên ');
    }
    

    return errors;
}    
