
$(document).ready(function () {
    //Initialize Button Events
    //SuaKhachHang Confirm
    $('#modelSuaKhachHang .confirm').click(async function () {

        let idKhachHang = $(this).parents('form').find('.idKhachHang').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sdt = $(this).parents('form').find('.sdt').val();
    
        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let diemTichLuy = $(this).parents('form').find('.diemTichLuy').val();
    
        let email = $(this).parents('form').find('.email').val();
    
        let google = $(this).parents('form').find('.google').val();
    
        let facebook = $(this).parents('form').find('.facebook').val();
    
        let khachHang = { idKhachHang : idKhachHang, ten : ten, sdt : sdt, idTaiKhoan : idTaiKhoan, diemTichLuy : diemTichLuy, email : email, google : google, facebook : facebook };

        let errors = suaKhachHangValidator(khachHang);

        if (errors.length > 0) {
            refreshSuaKhachHangAlert(errors);
            return;
        }

        await suaKhachHangAJAX(khachHang);
    });

    //Events
    //Set khachHang current value When model showup
    $('#modelSuaKhachHang').on('show.bs.modal', function (event) {
        let suaKhachHangTriggered = $(event.relatedTarget);

        let idKhachHang = suaKhachHangTriggered.attr('idKhachHang');
    

        let khachHang = khachHangs.find(
            (item) => item.idKhachHang == idKhachHang
        );


        $('#modelSuaKhachHang').find('.idKhachHang').val(idKhachHang);
    


        $('#modelSuaKhachHang').find('.ten').val(khachHang.ten);
    
        $('#modelSuaKhachHang').find('.sdt').val(khachHang.sdt);
    
        $('#modelSuaKhachHang').find('.idTaiKhoan').val(khachHang.idTaiKhoan);
    
        $('#modelSuaKhachHang').find('.diemTichLuy').val(khachHang.diemTichLuy);
    
        $('#modelSuaKhachHang').find('.email').val(khachHang.email);
    
        $('#modelSuaKhachHang').find('.google').val(khachHang.google);
    
        $('#modelSuaKhachHang').find('.facebook').val(khachHang.facebook);
    

        refreshSuaKhachHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaKhachHang with data in khachHangsTypes
function refreshDataInModelSuaKhachHang() {
}

//Refresh sua khachHang Alert
function refreshSuaKhachHangAlert(alerts, type = 'danger') {
    let suaKhachHangAlerts = $('#modelSuaKhachHang .alerts');
    let suaKhachHangAlertsHtml = '';
    for (let alert of alerts) {
        suaKhachHangAlertsHtml += createAlerts(type, alert);
    }
    suaKhachHangAlerts.html(suaKhachHangAlertsHtml);
}

//Add new khachHang
function suaKhachHangAJAX(khachHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/khach-hang', data: khachHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaKhachHangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaKhachHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khachHang);

                    $("#modelSuaKhachHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaKhachHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaKhachHangAlert([errorString], 'danger');
                } else {
                    refreshSuaKhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua KhachHang validator
function suaKhachHangValidator(khachHang) {
    let errors = [];

    if (!khachHang) {
        errors.push('Khách hàng không tồn tại ');
    }


    if (!khachHang.idKhachHang) {
        errors.push('Không thể xác định id khách hàng ');
    }
    
    if (!khachHang.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!khachHang.sdt) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!khachHang.diemTichLuy) {
        errors.push('Không thể xác định điểm tích lũy ');
    }
    

    return errors;
}    
