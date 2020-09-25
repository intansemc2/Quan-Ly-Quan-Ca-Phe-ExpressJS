
$(document).ready(function () {
    //Initialize Button Events
    //SuaXuathang Confirm
    $('#modelSuaXuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let ngaygioxuat = $(this).parents('form').find('.ngaygioxuat').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let maban = $(this).parents('form').find('.maban').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let xuathang = { maxuathang : maxuathang, ngaygioxuat : ngaygioxuat, manhanvien : manhanvien, makhachhang : makhachhang, maban : maban, ghichu : ghichu };

        let errors = suaXuathangValidator(xuathang);

        if (errors.length > 0) {
            refreshSuaXuathangAlert(errors);
            return;
        }

        await suaXuathangAJAX(xuathang);
    });

    //Events
    //Set xuathang current value When model showup
    $('#modelSuaXuathang').on('show.bs.modal', function (event) {
        let suaXuathangTriggered = $(event.relatedTarget);

        let maxuathang = suaXuathangTriggered.attr('maxuathang');
    

        let xuathang = xuathangs.find(
            (item) => item.maxuathang == maxuathang
        );


        $('#modelSuaXuathang').find('.maxuathang').val(maxuathang);
    


        $('#modelSuaXuathang').find('.ngaygioxuat').val(xuathang.ngaygioxuat);
    
        $('#modelSuaXuathang').find('.manhanvien').val(xuathang.manhanvien);
    
        $('#modelSuaXuathang').find('.makhachhang').val(xuathang.makhachhang);
    
        $('#modelSuaXuathang').find('.maban').val(xuathang.maban);
    
        $('#modelSuaXuathang').find('.ghichu').val(xuathang.ghichu);
    

        refreshSuaXuathangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaXuathang with data in xuathangsTypes
function refreshDataInModelSuaXuathang() {
}

//Refresh sua xuathang Alert
function refreshSuaXuathangAlert(alerts, type = 'danger') {
    let suaXuathangAlerts = $('#modelSuaXuathang .alerts');
    let suaXuathangAlertsHtml = '';
    for (let alert of alerts) {
        suaXuathangAlertsHtml += createAlerts(type, alert);
    }
    suaXuathangAlerts.html(suaXuathangAlertsHtml);
}

//Add new xuathang
function suaXuathangAJAX(xuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/xuathang', data: xuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaXuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaXuathangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(xuathang);

                    $("#modelSuaXuathang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaXuathangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaXuathangAlert([errorString], 'danger');
                } else {
                    refreshSuaXuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Xuathang validator
function suaXuathangValidator(xuathang) {
    let errors = [];

    if (!xuathang) {
        errors.push('Xuất hàng không tồn tại ');
    }


    if (!xuathang.maxuathang) {
        errors.push('Không thể xác định mã xuất hàng ');
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
