
$(document).ready(function () {
    //Initialize Button Events
    //ThemnguonSanPham Confirm
    $('#modelThemnguonSanPham .confirm').click(async function () {

        let maNguonSanPham = $(this).parents('form').find('.maNguonSanPham').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let diaChi = $(this).parents('form').find('.diaChi').val();
    
        let nguonSanPham = { maNguonSanPham : maNguonSanPham, ten : ten, soDienThoai : soDienThoai, diaChi : diaChi };

        let errors = themnguonSanPhamValidator(nguonSanPham);

        if (errors.length > 0) {
            refreshThemnguonSanPhamAlert(errors);
            return;
        }

        await themnguonSanPhamAJAX(nguonSanPham);
    });

    //Events
    //Set nguonSanPham current value When model showup
    $('#modelThemnguonSanPham').on('show.bs.modal', function (event) {
        refreshThemnguonSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemnguonSanPham with data in nguonSanPhamsTypes
function refreshDataInModelThemnguonSanPham() {
}

//Refresh them nguonSanPham Alert
function refreshThemnguonSanPhamAlert(alerts, type = 'danger') {
    let themnguonSanPhamAlerts = $('#modelThemnguonSanPham .alerts');
    let themnguonSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        themnguonSanPhamAlertsHtml += createAlerts(type, alert);
    }
    themnguonSanPhamAlerts.html(themnguonSanPhamAlertsHtml);
}

//Add new nguonSanPham
function themnguonSanPhamAJAX(nguonSanPham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/nguonSanPham', data: nguonSanPham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemnguonSanPhamAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshThemnguonSanPhamAlert(['Thêm thành công ' + result], 'success');

                    nguonSanPham.maNguonSanPham = result.insertId;                    
                    addNewRowToTable(nguonSanPham);

                    $('#modelThemnguonSanPham').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemnguonSanPhamAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemnguonSanPhamAlert([errorString], 'danger');
                } else {
                    refreshThemnguonSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them nguonSanPham validator
function themnguonSanPhamValidator(nguonSanPham) {
    let errors = [];

    if (!nguonSanPham) {
        errors.push('ngunsnphm không tồn tại ');
    }




        if (!nguonSanPham.ten) {
            errors.push('Không thể xác định tên ');
        }
        
        if (!nguonSanPham.soDienThoai) {
            errors.push('Không thể xác định số điện thoại ');
        }
        
        if (!nguonSanPham.diaChi) {
            errors.push('Không thể xác định địa chỉ ');
        }
        

    return errors;
}
    
