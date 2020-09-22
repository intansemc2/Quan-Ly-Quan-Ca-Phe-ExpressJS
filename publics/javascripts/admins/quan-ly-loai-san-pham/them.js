
$(document).ready(function () {
    //Initialize Button Events
    //ThemLoaiSanPham Confirm
    $('#modelThemLoaiSanPham .confirm').click(async function () {

        let idLoaiSanPham = $(this).parents('form').find('.idLoaiSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let loaiSanPham = { idLoaiSanPham : idLoaiSanPham, ten : ten, linkAnh : linkAnh, ghiChu : ghiChu };

        let errors = themLoaiSanPhamValidator(loaiSanPham);

        if (errors.length > 0) {
            refreshThemLoaiSanPhamAlert(errors);
            return;
        }

        await themLoaiSanPhamAJAX(loaiSanPham);
    });

    //Events
    //Set loaiSanPham current value When model showup
    $('#modelThemLoaiSanPham').on('show.bs.modal', function (event) {
        refreshThemLoaiSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemLoaiSanPham with data in loaiSanPhamsTypes
function refreshDataInModelThemLoaiSanPham() {
}

//Refresh them loaiSanPham Alert
function refreshThemLoaiSanPhamAlert(alerts, type = 'danger') {
    let themLoaiSanPhamAlerts = $('#modelThemLoaiSanPham .alerts');
    let themLoaiSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themLoaiSanPhamAlertsHtml += createAlerts(type, alert);
    }
    themLoaiSanPhamAlerts.html(themLoaiSanPhamAlertsHtml);
}

//Add new loaiSanPham
function themLoaiSanPhamAJAX(loaiSanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/loai-san-pham', data: loaiSanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemLoaiSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemLoaiSanPhamAlert(['Thêm thành công ' + result], 'success');

                    loaiSanPham.idLoaiSanPham = result;
                    addNewRowToTable(loaiSanPham);

                    $('#modelThemLoaiSanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemLoaiSanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemLoaiSanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemLoaiSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them LoaiSanPham validator
function themLoaiSanPhamValidator(loaiSanPham) {
    let errors = [];

    if (!loaiSanPham) {
        errors.push('Loại sản phẩm không tồn tại ');
    }




        if (!loaiSanPham.ten) {
            errors.push('Không thể xác định tên ');
        }
        

    return errors;
}
    
