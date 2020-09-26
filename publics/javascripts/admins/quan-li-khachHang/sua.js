
$(document).ready(function () {
    //Initialize Button Events
    //SuakhachHang Confirm
    $('#modelSuakhachHang .confirm').click(async function () {

        let maKhachHang = $(this).parents('form').find('.maKhachHang').val();
    
        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let khachHang = { maKhachHang : maKhachHang, maTaiKhoan : maTaiKhoan, ten : ten, ngaySinh : ngaySinh, soDienThoai : soDienThoai, ghiChu : ghiChu };

        let errors = suakhachHangValidator(khachHang);

        if (errors.length > 0) {
            refreshSuakhachHangAlert(errors);
            return;
        }

        await suakhachHangAJAX(khachHang);
    });

    //Events
    //Set khachHang current value When model showup
    $('#modelSuakhachHang').on('show.bs.modal', function (event) {
        let suakhachHangTriggered = $(event.relatedTarget);

        let maKhachHang = suakhachHangTriggered.attr('maKhachHang');
    

        let khachHang = khachHangs.find(
            (item) => item.maKhachHang == maKhachHang
        );


        $('#modelSuakhachHang').find('.maKhachHang').val(maKhachHang);
    


        $('#modelSuakhachHang').find('.maTaiKhoan').val(khachHang.maTaiKhoan);
    
        $('#modelSuakhachHang').find('.ten').val(khachHang.ten);
    
        $('#modelSuakhachHang').find('.ngaySinh').val(khachHang.ngaySinh);
    
        $('#modelSuakhachHang').find('.soDienThoai').val(khachHang.soDienThoai);
    
        $('#modelSuakhachHang').find('.ghiChu').val(khachHang.ghiChu);
    

        refreshSuakhachHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuakhachHang with data in khachHangsTypes
function refreshDataInModelSuakhachHang() {
}

//Refresh sua khachHang Alert
function refreshSuakhachHangAlert(alerts, type = 'danger') {
    let suakhachHangAlerts = $('#modelSuakhachHang .alerts');
    let suakhachHangAlertsHtml = '';
    for (let alert of alerts) {
        suakhachHangAlertsHtml += createAlerts(type, alert);
    }
    suakhachHangAlerts.html(suakhachHangAlertsHtml);
}

//Add new khachHang
function suakhachHangAJAX(khachHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/khachHang', data: khachHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuakhachHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuakhachHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(khachHang);

                    $("#modelSuakhachHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuakhachHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuakhachHangAlert([errorString], 'danger');
                } else {
                    refreshSuakhachHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua khachHang validator
function suakhachHangValidator(khachHang) {
    let errors = [];

    if (!khachHang) {
        errors.push('khchhng không tồn tại ');
    }


    if (!khachHang.maKhachHang) {
        errors.push('Không thể xác định mã khách hàng ');
    }
    
    if (!khachHang.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!khachHang.ngaySinh) {
        errors.push('Không thể xác định ngày sinh ');
    }
    
    if (!khachHang.soDienThoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    

    return errors;
}    
