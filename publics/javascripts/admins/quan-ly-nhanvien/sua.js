
$(document).ready(function () {
    //Initialize Button Events
    //SuaNhanvien Confirm
    $('#modelSuaNhanvien .confirm').click(async function () {

        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nhanvien = { manhanvien : manhanvien, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, diachi : diachi };

        let errors = suaNhanvienValidator(nhanvien);

        if (errors.length > 0) {
            refreshSuaNhanvienAlert(errors);
            return;
        }

        await suaNhanvienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelSuaNhanvien').on('show.bs.modal', function (event) {
        let suaNhanvienTriggered = $(event.relatedTarget);

        let manhanvien = suaNhanvienTriggered.attr('manhanvien');
    

        let nhanvien = nhanviens.find(
            (item) => item.manhanvien == manhanvien
        );


        $('#modelSuaNhanvien').find('.manhanvien').val(manhanvien);
    


        $('#modelSuaNhanvien').find('.mataikhoan').val(nhanvien.mataikhoan);
    
        $('#modelSuaNhanvien').find('.ten').val(nhanvien.ten);
    
        $('#modelSuaNhanvien').find('.ngaysinh').val(nhanvien.ngaysinh);
    
        $('#modelSuaNhanvien').find('.sodienthoai').val(nhanvien.sodienthoai);
    
        $('#modelSuaNhanvien').find('.diachi').val(nhanvien.diachi);
    

        refreshSuaNhanvienAlert([], "");
    });
});

//Functions
//Refresh data in model SuaNhanvien with data in nhanviensTypes
function refreshDataInModelSuaNhanvien() {
}

//Refresh sua nhanvien Alert
function refreshSuaNhanvienAlert(alerts, type = 'danger') {
    let suaNhanvienAlerts = $('#modelSuaNhanvien .alerts');
    let suaNhanvienAlertsHtml = '';
    for (let alert of alerts) {
        suaNhanvienAlertsHtml += createAlerts(type, alert);
    }
    suaNhanvienAlerts.html(suaNhanvienAlertsHtml);
}

//Add new nhanvien
function suaNhanvienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhanvien', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaNhanvienAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaNhanvienAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhanvien);

                    $("#modelSuaNhanvien").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaNhanvienAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaNhanvienAlert([errorString], 'danger');
                } else {
                    refreshSuaNhanvienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Nhanvien validator
function suaNhanvienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('Nhân viên không tồn tại ');
    }


    if (!nhanvien.manhanvien) {
        errors.push('Không thể xác định mã nhân viên ');
    }
    
    if (!nhanvien.mataikhoan) {
        errors.push('Không thể xác định mã tài khoản ');
    }
    
    if (!nhanvien.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!nhanvien.ngaysinh) {
        errors.push('Không thể xác định ngày sinh ');
    }
    
    if (!nhanvien.sodienthoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!nhanvien.diachi) {
        errors.push('Không thể xác định địa chỉ ');
    }
    

    return errors;
}    
