
$(document).ready(function () {
    //Initialize Button Events
    //ThemXuathang Confirm
    $('#modelThemXuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let ngaygioxuat = $(this).parents('form').find('.ngaygioxuat').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let maban = $(this).parents('form').find('.maban').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let xuathang = { maxuathang : maxuathang, ngaygioxuat : ngaygioxuat, manhanvien : manhanvien, makhachhang : makhachhang, maban : maban, ghichu : ghichu };

        let errors = themXuathangValidator(xuathang);

        if (errors.length > 0) {
            refreshThemXuathangAlert(errors);
            return;
        }

        await themXuathangAJAX(xuathang);
    });

    //Events
    //Set xuathang current value When model showup
    $('#modelThemXuathang').on('show.bs.modal', function (event) {
        refreshThemXuathangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemXuathang with data in xuathangsTypes
function refreshDataInModelThemXuathang() {
}

//Refresh them xuathang Alert
function refreshThemXuathangAlert(alerts, type = 'danger') {
    let themXuathangAlerts = $('#modelThemXuathang .alerts');
    let themXuathangAlertsHtml = '';
    for (let alert of alerts) {
        themXuathangAlertsHtml += createAlerts(type, alert);
    }
    themXuathangAlerts.html(themXuathangAlertsHtml);
}

//Add new xuathang
function themXuathangAJAX(xuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/xuathang', data: xuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemXuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemXuathangAlert(['Thêm thành công ' + result], 'success');

                    xuathang.idXuathang = result;
                    addNewRowToTable(xuathang);

                    $('#modelThemXuathang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemXuathangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemXuathangAlert([errorString], 'danger');
                } else {
                    refreshThemXuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Xuathang validator
function themXuathangValidator(xuathang) {
    let errors = [];

    if (!xuathang) {
        errors.push('Xuất hàng không tồn tại ');
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
    
