
$(document).ready(function () {
    //Initialize Button Events
    //SuaSanPham Confirm
    $('#modelSuaSanPham .confirm').click(async function () {

        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let idLoaiSanPham = $(this).parents('form').find('.idLoaiSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let sanPham = { idSanPham : idSanPham, idLoaiSanPham : idLoaiSanPham, ten : ten, gia : gia, diemTichLuy : diemTichLuy, ghiChu : ghiChu, linkAnh : linkAnh };

        let errors = suaSanPhamValidator(sanPham);

        if (errors.length > 0) {
            refreshSuaSanPhamAlert(errors);
            return;
        }

        await suaSanPhamAJAX(sanPham);
    });

    //Events
    //Set sanPham current value When model showup
    $('#modelSuaSanPham').on('show.bs.modal', function (event) {
        let suaSanPhamTriggered = $(event.relatedTarget);

        let idSanPham = suaSanPhamTriggered.attr('idSanPham');
    

        let sanPham = sanPhams.find(
            (item) => item.idSanPham == idSanPham
        );


        $('#modelSuaSanPham').find('.idSanPham').val(idSanPham);
    


        $('#modelSuaSanPham').find('.idLoaiSanPham').val(sanPham.idLoaiSanPham);
    
        $('#modelSuaSanPham').find('.ten').val(sanPham.ten);
    
        $('#modelSuaSanPham').find('.gia').val(sanPham.gia);
    
        $('#modelSuaSanPham').find('.diemTichLuy').val(sanPham.diemTichLuy);
    
        $('#modelSuaSanPham').find('.ghiChu').val(sanPham.ghiChu);
    
        $('#modelSuaSanPham').find('.linkAnh').val(sanPham.linkAnh);
    

        refreshSuaSanPhamAlert([], "");
    });
});

//Functions
//Refresh data in model SuaSanPham with data in sanPhamsTypes
function refreshDataInModelSuaSanPham() {
}

//Refresh sua sanPham Alert
function refreshSuaSanPhamAlert(alerts, type = 'danger') {
    let suaSanPhamAlerts = $('#modelSuaSanPham .alerts');
    let suaSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suaSanPhamAlertsHtml += createAlerts(type, alert);
    }
    suaSanPhamAlerts.html(suaSanPhamAlertsHtml);
}

//Add new sanPham
function suaSanPhamAJAX(sanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/san-pham', data: sanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaSanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(sanPham);

                    $("#modelSuaSanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaSanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaSanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuaSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua SanPham validator
function suaSanPhamValidator(sanPham) {
    let errors = [];

    if (!sanPham) {
        errors.push('Sản phẩm không tồn tại ');
    }


    if (!sanPham.idSanPham) {
        errors.push('Không thể xác định id sản phẩm ');
    }
    
    if (!sanPham.idLoaiSanPham) {
        errors.push('Không thể xác định id loại sản phẩm ');
    }
    
    if (!sanPham.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!sanPham.gia) {
        errors.push('Không thể xác định giá ');
    }
    
    if (!sanPham.diemTichLuy) {
        errors.push('Không thể xác định điểm tích lũy ');
    }
    
    if (!sanPham.linkAnh) {
        errors.push('Không thể xác định link ảnh ');
    }
    

    return errors;
}    
