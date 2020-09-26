
$(document).ready(function () {
    //Initialize Button Events
    //SuanhanVien Confirm
    $('#modelSuanhanVien .confirm').click(async function () {

        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let maTaiKhoan = $(this).parents('form').find('.maTaiKhoan').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let soDienThoai = $(this).parents('form').find('.soDienThoai').val();
    
        let diaChi = $(this).parents('form').find('.diaChi').val();
    
        let nhanVien = { maNhanVien : maNhanVien, maTaiKhoan : maTaiKhoan, ten : ten, ngaySinh : ngaySinh, soDienThoai : soDienThoai, diaChi : diaChi };

        let errors = suanhanVienValidator(nhanVien);

        if (errors.length > 0) {
            refreshSuanhanVienAlert(errors);
            return;
        }

        await suanhanVienAJAX(nhanVien);
    });

    //Events
    //Set nhanVien current value When model showup
    $('#modelSuanhanVien').on('show.bs.modal', function (event) {
        let suanhanVienTriggered = $(event.relatedTarget);

        let maNhanVien = suanhanVienTriggered.attr('maNhanVien');
    

        let nhanVien = nhanViens.find(
            (item) => item.maNhanVien == maNhanVien
        );


        $('#modelSuanhanVien').find('.maNhanVien').val(maNhanVien);
    


        $('#modelSuanhanVien').find('.maTaiKhoan').val(nhanVien.maTaiKhoan);
    
        $('#modelSuanhanVien').find('.ten').val(nhanVien.ten);
    
        $('#modelSuanhanVien').find('.ngaySinh').val(nhanVien.ngaySinh);
    
        $('#modelSuanhanVien').find('.soDienThoai').val(nhanVien.soDienThoai);
    
        $('#modelSuanhanVien').find('.diaChi').val(nhanVien.diaChi);
    

        refreshSuanhanVienAlert([], "");
    });
});

//Functions
//Refresh data in model SuanhanVien with data in nhanViensTypes
function refreshDataInModelSuanhanVien() {
}

//Refresh sua nhanVien Alert
function refreshSuanhanVienAlert(alerts, type = 'danger') {
    let suanhanVienAlerts = $('#modelSuanhanVien .alerts');
    let suanhanVienAlertsHtml = '';
    for (let alert of alerts) {
        suanhanVienAlertsHtml += createAlerts(type, alert);
    }
    suanhanVienAlerts.html(suanhanVienAlertsHtml);
}

//Add new nhanVien
function suanhanVienAJAX(nhanVien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhanVien', data: nhanVien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanhanVienAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuanhanVienAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhanVien);

                    $("#modelSuanhanVien").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanhanVienAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanhanVienAlert([errorString], 'danger');
                } else {
                    refreshSuanhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nhanVien validator
function suanhanVienValidator(nhanVien) {
    let errors = [];

    if (!nhanVien) {
        errors.push('nhnvin không tồn tại ');
    }


    if (!nhanVien.maNhanVien) {
        errors.push('Không thể xác định mã nhân viên ');
    }
    
    if (!nhanVien.maTaiKhoan) {
        errors.push('Không thể xác định mã tài khoản ');
    }
    
    if (!nhanVien.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!nhanVien.ngaySinh) {
        errors.push('Không thể xác định ngày sinh ');
    }
    
    if (!nhanVien.soDienThoai) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!nhanVien.diaChi) {
        errors.push('Không thể xác định địa chỉ ');
    }
    

    return errors;
}    
