
$(document).ready(function () {
    //Initialize Button Events
    //Suaxuathang Confirm
    $('#modelSuaxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let ngaygioxuat = $(this).parents('form').find('.ngaygioxuat').val();
    
        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let maban = $(this).parents('form').find('.maban').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let xuathang = { maxuathang : maxuathang, ngaygioxuat : ngaygioxuat, manhanvien : manhanvien, makhachhang : makhachhang, maban : maban, ghichu : ghichu };

        let errors = suaxuathangValidator(xuathang);

        if (errors.length > 0) {
            refreshSuaxuathangAlert(errors);
            return;
        }

        await suaxuathangAJAX(xuathang);
    });

    //Events
    //Set xuathang current value When model showup
    $('#modelSuaxuathang').on('show.bs.modal', function (event) {
        let suaxuathangTriggered = $(event.relatedTarget);

        let maxuathang = suaxuathangTriggered.attr('maxuathang');
    

        let xuathang = xuathangs.find(
            (item) => item.maxuathang == maxuathang
        );


        $('#modelSuaxuathang').find('.maxuathang').val(maxuathang);
    


        $('#modelSuaxuathang').find('.ngaygioxuat').val(xuathang.ngaygioxuat);
    
        $('#modelSuaxuathang').find('.manhanvien').val(xuathang.manhanvien);
    
        $('#modelSuaxuathang').find('.makhachhang').val(xuathang.makhachhang);
    
        $('#modelSuaxuathang').find('.maban').val(xuathang.maban);
    
        $('#modelSuaxuathang').find('.ghichu').val(xuathang.ghichu);
    

        refreshSuaxuathangAlert([], "");
    });
});

//Functions
//Refresh data in model Suaxuathang with data in xuathangsTypes
function refreshDataInModelSuaxuathang() {
}

//Refresh sua xuathang Alert
function refreshSuaxuathangAlert(alerts, type = 'danger') {
    let suaxuathangAlerts = $('#modelSuaxuathang .alerts');
    let suaxuathangAlertsHtml = '';
    for (let alert of alerts) {
        suaxuathangAlertsHtml += createAlerts(type, alert);
    }
    suaxuathangAlerts.html(suaxuathangAlertsHtml);
}

//Add new xuathang
function suaxuathangAJAX(xuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/xuathang', data: xuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaxuathangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuaxuathangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(xuathang);

                    $("#modelSuaxuathang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaxuathangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaxuathangAlert([errorString], 'danger');
                } else {
                    refreshSuaxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua xuathang validator
function suaxuathangValidator(xuathang) {
    let errors = [];

    if (!xuathang) {
        errors.push('xuthng không tồn tại ');
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
