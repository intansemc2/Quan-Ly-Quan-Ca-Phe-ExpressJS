
$(document).ready(function () {
    //Initialize Button Events
    //SuaNhanVien Confirm
    $('#modelSuaNhanVien .confirm').click(async function () {

        let idNhanVien = $(this).parents('form').find('.idNhanVien').val();
    
        let ten = $(this).parents('form').find('.ten').val();
    
        let sdt = $(this).parents('form').find('.sdt').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let ngaySinh = $(this).parents('form').find('.ngaySinh').val();
    
        let linkAnh = $(this).parents('form').find('.linkAnh').val();
    
        let email = $(this).parents('form').find('.email').val();
    
        let nhanVien = { idNhanVien : idNhanVien, ten : ten, sdt : sdt, loai : loai, idTaiKhoan : idTaiKhoan, ngaySinh : ngaySinh, linkAnh : linkAnh, email : email };

        let errors = suaNhanVienValidator(nhanVien);

        if (errors.length > 0) {
            refreshSuaNhanVienAlert(errors);
            return;
        }

        await suaNhanVienAJAX(nhanVien);
    });

    //Events
    //Set nhanVien current value When model showup
    $('#modelSuaNhanVien').on('show.bs.modal', function (event) {
        let suaNhanVienTriggered = $(event.relatedTarget);

        let idNhanVien = suaNhanVienTriggered.attr('idNhanVien');
    

        let nhanVien = nhanViens.find(
            (item) => item.idNhanVien == idNhanVien
        );


        $('#modelSuaNhanVien').find('.idNhanVien').val(idNhanVien);
    


        $('#modelSuaNhanVien').find('.ten').val(nhanVien.ten);
    
        $('#modelSuaNhanVien').find('.sdt').val(nhanVien.sdt);
    
        $('#modelSuaNhanVien').find('.loai').val(nhanVien.loai);
    
        $('#modelSuaNhanVien').find('.idTaiKhoan').val(nhanVien.idTaiKhoan);
    
        $('#modelSuaNhanVien').find('.ngaySinh').val(nhanVien.ngaySinh);
    
        $('#modelSuaNhanVien').find('.linkAnh').val(nhanVien.linkAnh);
    
        $('#modelSuaNhanVien').find('.email').val(nhanVien.email);
    

        refreshSuaNhanVienAlert([], "");
    });
});

//Functions
//Refresh data in model SuaNhanVien with data in nhanViensTypes
function refreshDataInModelSuaNhanVien() {
}

//Refresh sua nhanVien Alert
function refreshSuaNhanVienAlert(alerts, type = 'danger') {
    let suaNhanVienAlerts = $('#modelSuaNhanVien .alerts');
    let suaNhanVienAlertsHtml = '';
    for (let alert of alerts) {
        suaNhanVienAlertsHtml += createAlerts(type, alert);
    }
    suaNhanVienAlerts.html(suaNhanVienAlertsHtml);
}

//Add new nhanVien
function suaNhanVienAJAX(nhanVien) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhan-vien', data: nhanVien })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaNhanVienAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaNhanVienAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhanVien);

                    $("#modelSuaNhanVien").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaNhanVienAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaNhanVienAlert([errorString], 'danger');
                } else {
                    refreshSuaNhanVienAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua NhanVien validator
function suaNhanVienValidator(nhanVien) {
    let errors = [];

    if (!nhanVien) {
        errors.push('Nhân viên không tồn tại ');
    }


    if (!nhanVien.idNhanVien) {
        errors.push('Không thể xác định id nhân viên ');
    }
    
    if (!nhanVien.ten) {
        errors.push('Không thể xác định tên ');
    }
    
    if (!nhanVien.sdt) {
        errors.push('Không thể xác định số điện thoại ');
    }
    
    if (!nhanVien.loai) {
        errors.push('Không thể xác định loại ');
    }
    
    if (!nhanVien.idTaiKhoan) {
        errors.push('Không thể xác định id tài khoản ');
    }
    
    if (!nhanVien.ngaySinh) {
        errors.push('Không thể xác định ngày sinh ');
    }
    

    return errors;
}    
