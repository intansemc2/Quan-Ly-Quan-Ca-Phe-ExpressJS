
$(document).ready(function () {
    //Initialize Button Events
    //SuaKhachhang Confirm
    $('#modelSuaKhachhang .confirm').click(async function () {

        let makhachhang = $(this).parents('form').find('.makhachhang').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let ghichu = $(this).parents('form').find('.ghichu').val();
    
        let khachhang = { makhachhang : makhachhang, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, ghichu : ghichu };

        let errors = suaKhachhangValidator(khachhang);

        if (errors.length > 0) {
            refreshSuaKhachhangAlert(errors);
            return;
        }

        await suaKhachhangAJAX(khachhang);
    });

    //Events
    //Set khachhang current value When model showup
    $('#modelSuaKhachhang').on('show.bs.modal', function (event) {
        let suaKhachhangTriggered = $(event.relatedTarget);

        let makhachhang = suaKhachhangTriggered.attr('makhachhang');
    

        let khachhang = khachhangs.find(
            (item) => item.makhachhang == makhachhang
        );


        $('#modelSuaKhachhang').find('.makhachhang').val(makhachhang);
    


        $('#modelSuaKhachhang').find('.mataikhoan').val(khachhang.mataikhoan);
    
        $('#modelSuaKhachhang').find('.ten').val(khachhang.ten);
    
        $('#modelSuaKhachhang').find('.ngaysinh').val(khachhang.ngaysinh);
    
        $('#modelSuaKhachhang').find('.sodienthoai').val(khachhang.sodienthoai);
    
        $('#modelSuaKhachhang').find('.ghichu').val(khachhang.ghichu);
    

        refreshSuaKhachhangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaKhachhang with data in khachhangsTypes
function refreshDataInModelSuaKhachhang() {
}

//Refresh sua khachhang Alert
function refreshSuaKhachhangAlert(alerts, type = 'danger') {
    let suaKhachhangAlerts = $('#modelSuaKhachhang .alerts');
    let suaKhachhangAlertsHtml = '';
    for (let alert of alerts) {
        suaKhachhangAlertsHtml += createAlerts(type, alert);
    }
    suaKhachhangAlerts.html(suaKhachhangAlertsHtml);
}

//Add new khachhang
function suaKhachhangAJAX(khachhang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/khachhang', data: khachhang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaKhachhangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaKhachhangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khachhang);

                    $("#modelSuaKhachhang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaKhachhangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaKhachhangAlert([errorString], 'danger');
                } else {
                    refreshSuaKhachhangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Khachhang validator
function suaKhachhangValidator(khachhang) {
    let errors = [];

    if (!khachhang) {
        errors.push('Khách hàng không tồn tại ');
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
