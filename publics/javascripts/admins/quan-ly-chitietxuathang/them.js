
$(document).ready(function () {
    //Initialize Button Events
    //ThemChitietxuathang Confirm
    $('#modelThemChitietxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietxuathang = { maxuathang : maxuathang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = themChitietxuathangValidator(chitietxuathang);

        if (errors.length > 0) {
            refreshThemChitietxuathangAlert(errors);
            return;
        }

        await themChitietxuathangAJAX(chitietxuathang);
    });

    //Events
    //Set chitietxuathang current value When model showup
    $('#modelThemChitietxuathang').on('show.bs.modal', function (event) {
        refreshThemChitietxuathangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemChitietxuathang with data in chitietxuathangsTypes
function refreshDataInModelThemChitietxuathang() {
}

//Refresh them chitietxuathang Alert
function refreshThemChitietxuathangAlert(alerts, type = 'danger') {
    let themChitietxuathangAlerts = $('#modelThemChitietxuathang .alerts');
    let themChitietxuathangAlertsHtml = '';
    for (let alert of alerts) {
        themChitietxuathangAlertsHtml += createAlerts(type, alert);
    }
    themChitietxuathangAlerts.html(themChitietxuathangAlertsHtml);
}

//Add new chitietxuathang
function themChitietxuathangAJAX(chitietxuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chitietxuathang', data: chitietxuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemChitietxuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemChitietxuathangAlert(['Thêm thành công ' + result], 'success');

                    chitietxuathang.idChitietxuathang = result;
                    addNewRowToTable(chitietxuathang);

                    $('#modelThemChitietxuathang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemChitietxuathangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemChitietxuathangAlert([errorString], 'danger');
                } else {
                    refreshThemChitietxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Chitietxuathang validator
function themChitietxuathangValidator(chitietxuathang) {
    let errors = [];

    if (!chitietxuathang) {
        errors.push('Chi tiết xuất hàng không tồn tại ');
    }


        if (!chitietxuathang.maxuathang) {
            errors.push('Không thể xác định mã xuất hàng ');
        }
        
        if (!chitietxuathang.masanpham) {
            errors.push('Không thể xác định mã sản phẩm ');
        }
        


        if (!chitietxuathang.soluong) {
            errors.push('Không thể xác định số lượng ');
        }
        
        if (!chitietxuathang.dongia) {
            errors.push('Không thể xác định đơn giá ');
        }
        

    return errors;
}
    
