
$(document).ready(function () {
    //Initialize Button Events
    //ThemSanPham Confirm
    $('#modelThemSanPham .confirm').click(async function () {

        let idSanPham = $(this).parents('form').find('.idSanPham').val();
    
        let idLoaiSanPham = $(this).parents('form').find('.idLoaiSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let gia = $(this).parents('form').find('.gia').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let sanPham = { idSanPham : idSanPham, idLoaiSanPham : idLoaiSanPham, ten : ten, gia : gia, diemTichLuy : diemTichLuy, ghiChu : ghiChu, linkAnh : linkAnh };

        let errors = themSanPhamValidator(sanPham);

        if (errors.length > 0) {
            refreshThemSanPhamAlert(errors);
            return;
        }

        await themSanPhamAJAX(sanPham);
    });

    //Events
    //Set sanPham current value When model showup
    $('#modelThemSanPham').on('show.bs.modal', function (event) {
        refreshThemSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemSanPham with data in sanPhamsTypes
function refreshDataInModelThemSanPham() {
}

//Refresh them sanPham Alert
function refreshThemSanPhamAlert(alerts, type = 'danger') {
    let themSanPhamAlerts = $('#modelThemSanPham .alerts');
    let themSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themSanPhamAlertsHtml += createAlerts(type, alert);
    }
    themSanPhamAlerts.html(themSanPhamAlertsHtml);
}

//Add new sanPham
function themSanPhamAJAX(sanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/san-pham', data: sanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemSanPhamAlert(['Thêm thành công ' + result], 'success');

                    sanPham.idSanPham = result;
                    addNewRowToTable(sanPham);

                    $('#modelThemSanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemSanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemSanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them SanPham validator
function themSanPhamValidator(sanPham) {
    let errors = [];

    if (!sanPham) {
        errors.push('Sản phẩm không tồn tại ');
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
    
