
$(document).ready(function () {
    //Initialize Button Events
    //Themxuathang Confirm
    $('#modelThemxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let ngaygioxuat = $(this).parents('form').find('.ngaygioxuat').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let maban = $(this).parents('form').find('.maban').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let xuathang = { maxuathang : maxuathang, ngaygioxuat : ngaygioxuat, manhanvien : manhanvien, makhachhang : makhachhang, maban : maban, ghichu : ghichu };

        let errors = themxuathangValidator(xuathang);

        if (errors.length > 0) {
            refreshThemxuathangAlert(errors);
            return;
        }

        await themxuathangAJAX(xuathang);
    });

    //Events
    //Set xuathang current value When model showup
    $('#modelThemxuathang').on('show.bs.modal', function (event) {
        refreshThemxuathangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themxuathang with data in xuathangsTypes
function refreshDataInModelThemxuathang() {
}

//Refresh them xuathang Alert
function refreshThemxuathangAlert(alerts, type = 'danger') {
    let themxuathangAlerts = $('#modelThemxuathang .alerts');
    let themxuathangAlertsHtml = '';
    for (let alert of alerts) {
        themxuathangAlertsHtml += createAlerts(type, alert);
    }
    themxuathangAlerts.html(themxuathangAlertsHtml);
}

//Add new xuathang
function themxuathangAJAX(xuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/xuathang', data: xuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemxuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemxuathangAlert(['Thêm thành công ' + result], 'success');

                    xuathang.maxuathang = result;                    
                    addNewRowToTable(xuathang);

                    $('#modelThemxuathang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemxuathangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemxuathangAlert([errorString], 'danger');
                } else {
                    refreshThemxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them xuathang validator
function themxuathangValidator(xuathang) {
    let errors = [];

    if (!xuathang) {
        errors.push('xuthng không tồn tại ');
    }




        if (!xuathang.ngaygioxuat) {
            errors.push('Không thể xác định ngày giờ xuất ');
        }
        
        if (!xuathang.manhanvien) {
            errors.push('Không thể xác định mã nhân viên ');
        }
        
        if (!xuathang.makhachhang) {
            errors.push('Không thể xác định mã khách hàng ');
        }
        
        if (!xuathang.maban) {
            errors.push('Không thể xác định mã bàn ');
        }
        

    return errors;
}
    
