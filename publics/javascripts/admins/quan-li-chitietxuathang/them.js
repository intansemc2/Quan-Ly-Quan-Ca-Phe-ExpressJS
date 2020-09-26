
$(document).ready(function () {
    //Initialize Button Events
    //Themchitietxuathang Confirm
    $('#modelThemchitietxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietxuathang = { maxuathang : maxuathang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = themchitietxuathangValidator(chitietxuathang);

        if (errors.length > 0) {
            refreshThemchitietxuathangAlert(errors);
            return;
        }

        await themchitietxuathangAJAX(chitietxuathang);
    });

    //Events
    //Set chitietxuathang current value When model showup
    $('#modelThemchitietxuathang').on('show.bs.modal', function (event) {
        refreshThemchitietxuathangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themchitietxuathang with data in chitietxuathangsTypes
function refreshDataInModelThemchitietxuathang() {
}

//Refresh them chitietxuathang Alert
function refreshThemchitietxuathangAlert(alerts, type = 'danger') {
    let themchitietxuathangAlerts = $('#modelThemchitietxuathang .alerts');
    let themchitietxuathangAlertsHtml = '';
    for (let alert of alerts) {
        themchitietxuathangAlertsHtml += createAlerts(type, alert);
    }
    themchitietxuathangAlerts.html(themchitietxuathangAlertsHtml);
}

//Add new chitietxuathang
function themchitietxuathangAJAX(chitietxuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chitietxuathang', data: chitietxuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemchitietxuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemchitietxuathangAlert(['Thêm thành công ' + result], 'success');

                                        
                    addNewRowToTable(chitietxuathang);

                    $('#modelThemchitietxuathang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemchitietxuathangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemchitietxuathangAlert([errorString], 'danger');
                } else {
                    refreshThemchitietxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them chitietxuathang validator
function themchitietxuathangValidator(chitietxuathang) {
    let errors = [];

    if (!chitietxuathang) {
        errors.push('chititxuthng không tồn tại ');
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
    
