
$(document).ready(function () {
    //Initialize Button Events
    //Suanhanvien Confirm
    $('#modelSuanhanvien .confirm').click(async function () {

        let manhanvien = $(this).parents('form').find('.manhanvien').val();
    
        let mataikhoan = $(this).parents('form').find('.mataikhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaysinh = $(this).parents('form').find('.ngaysinh').val();
    
        let sodienthoai = $(this).parents('form').find('.sodienthoai').val();
    
        let diachi = $(this).parents('form').find('.diachi').val();
    
        let nhanvien = { manhanvien : manhanvien, mataikhoan : mataikhoan, ten : ten, ngaysinh : ngaysinh, sodienthoai : sodienthoai, diachi : diachi };

        let errors = suanhanvienValidator(nhanvien);

        if (errors.length > 0) {
            refreshSuanhanvienAlert(errors);
            return;
        }

        await suanhanvienAJAX(nhanvien);
    });

    //Events
    //Set nhanvien current value When model showup
    $('#modelSuanhanvien').on('show.bs.modal', function (event) {
        let suanhanvienTriggered = $(event.relatedTarget);

        let manhanvien = suanhanvienTriggered.attr('manhanvien');
    

        let nhanvien = nhanviens.find(
            (item) => item.manhanvien == manhanvien
        );


        $('#modelSuanhanvien').find('.manhanvien').val(manhanvien);
    


        $('#modelSuanhanvien').find('.mataikhoan').val(nhanvien.mataikhoan);
    
        $('#modelSuanhanvien').find('.ten').val(nhanvien.ten);
    
        $('#modelSuanhanvien').find('.ngaysinh').val(nhanvien.ngaysinh);
    
        $('#modelSuanhanvien').find('.sodienthoai').val(nhanvien.sodienthoai);
    
        $('#modelSuanhanvien').find('.diachi').val(nhanvien.diachi);
    

        refreshSuanhanvienAlert([], "");
    });
});

//Functions
//Refresh data in model Suanhanvien with data in nhanviensTypes
function refreshDataInModelSuanhanvien() {
}

//Refresh sua nhanvien Alert
function refreshSuanhanvienAlert(alerts, type = 'danger') {
    let suanhanvienAlerts = $('#modelSuanhanvien .alerts');
    let suanhanvienAlertsHtml = '';
    for (let alert of alerts) {
        suanhanvienAlertsHtml += createAlerts(type, alert);
    }
    suanhanvienAlerts.html(suanhanvienAlertsHtml);
}

//Add new nhanvien
function suanhanvienAJAX(nhanvien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhanvien', data: nhanvien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanhanvienAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuanhanvienAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhanvien);

                    $("#modelSuanhanvien").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanhanvienAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanhanvienAlert([errorString], 'danger');
                } else {
                    refreshSuanhanvienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nhanvien validator
function suanhanvienValidator(nhanvien) {
    let errors = [];

    if (!nhanvien) {
        errors.push('nhnvin không tồn tại ');
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
