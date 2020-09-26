
$(document).ready(function () {
    //Initialize Button Events
    //Suakhachhang Confirm
    $('#modelSuakhachhang .confirm').click(async function () {

        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let khachhang = { makhachhang : makhachhang, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, ghichu : ghichu };

        let errors = suakhachhangValidator(khachhang);

        if (errors.length > 0) {
            refreshSuakhachhangAlert(errors);
            return;
        }

        await suakhachhangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelSuakhachhang').on('show.bs.modal', function (event) {
        let suakhachhangTriggered = $(event.relatedTarget);

        let makhachhang = suakhachhangTriggered.attr('makhachhang');
    

        let khachhang = khachhangs.find(
            (item) => item.makhachhang == makhachhang
        );


        $('#modelSuakhachhang').find('.makhachhang').val(makhachhang);
    


        $('#modelSuakhachhang').find('.mataikhoan').val(khachhang.mataikhoan);
    
        $('#modelSuakhachhang').find('.ten').val(khachhang.ten);
    
        $('#modelSuakhachhang').find('.ngaysinh').val(khachhang.ngaysinh);
    
        $('#modelSuakhachhang').find('.sodienthoai').val(khachhang.sodienthoai);
    
        $('#modelSuakhachhang').find('.ghichu').val(khachhang.ghichu);
    

        refreshSuakhachhangAlert([], "");
    });
});

//Functions
//Refresh data in model Suakhachhang with data in khachhangsTypes
function refreshDataInModelSuakhachhang() {
}

//Refresh sua khachhang Alert
function refreshSuakhachhangAlert(alerts, type = 'danger') {
    let suakhachhangAlerts = $('#modelSuakhachhang .alerts');
    let suakhachhangAlertsHtml = '';
    for (let alert of alerts) {
        suakhachhangAlertsHtml += createAlerts(type, alert);
    }
    suakhachhangAlerts.html(suakhachhangAlertsHtml);
}

//Add new khachhang
function suakhachhangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/khachhang', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuakhachhangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuakhachhangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khachhang);

                    $("#modelSuakhachhang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuakhachhangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuakhachhangAlert([errorString], 'danger');
                } else {
                    refreshSuakhachhangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua khachhang validator
function suakhachhangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('khchhng không tồn tại ');
    }


    if (!khachhang.makhachhang) {
        errors.push('Không thể xác định mã khách hàng ');
    }
    
    if (!khachhang.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!khachhang.ngaysinh) {
        errors.push('Không thể xác định ngày sinh ');
    }
    
    if (!khachhang.sodienthoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    

    return errors;
}    
