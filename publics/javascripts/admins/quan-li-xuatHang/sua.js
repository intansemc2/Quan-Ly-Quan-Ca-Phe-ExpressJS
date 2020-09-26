
$(document).ready(function () {
    //Initialize Button Events
    //SuaxuatHang Confirm
    $('#modelSuaxuatHang .confirm').click(async function () {

        let maXuatHang = $(this).parents('form').find('.maXuatHang').val();
    
        let ngayGioXuat = $(this).parents('form').find('.ngayGioXuat').val();
    
        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let maKhachHang = $(this).parents('form').find('.maKhachHang').val();
    
        let maBan = $(this).parents('form').find('.maBan').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let xuatHang = { maXuatHang : maXuatHang, ngayGioXuat : ngayGioXuat, maNhanVien : maNhanVien, maKhachHang : maKhachHang, maBan : maBan, ghiChu : ghiChu };

        let errors = suaxuatHangValidator(xuatHang);

        if (errors.length > 0) {
            refreshSuaxuatHangAlert(errors);
            return;
        }

        await suaxuatHangAJAX(xuatHang);
    });

    //Events
    //Set xuatHang current value When model showup
    $('#modelSuaxuatHang').on('show.bs.modal', function (event) {
        let suaxuatHangTriggered = $(event.relatedTarget);

        let maXuatHang = suaxuatHangTriggered.attr('maXuatHang');
    

        let xuatHang = xuatHangs.find(
            (item) => item.maXuatHang == maXuatHang
        );


        $('#modelSuaxuatHang').find('.maXuatHang').val(maXuatHang);
    


        $('#modelSuaxuatHang').find('.ngayGioXuat').val(xuatHang.ngayGioXuat);
    
        $('#modelSuaxuatHang').find('.maNhanVien').val(xuatHang.maNhanVien);
    
        $('#modelSuaxuatHang').find('.maKhachHang').val(xuatHang.maKhachHang);
    
        $('#modelSuaxuatHang').find('.maBan').val(xuatHang.maBan);
    
        $('#modelSuaxuatHang').find('.ghiChu').val(xuatHang.ghiChu);
    

        refreshSuaxuatHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaxuatHang with data in xuatHangsTypes
function refreshDataInModelSuaxuatHang() {
}

//Refresh sua xuatHang Alert
function refreshSuaxuatHangAlert(alerts, type = 'danger') {
    let suaxuatHangAlerts = $('#modelSuaxuatHang .alerts');
    let suaxuatHangAlertsHtml = '';
    for (let alert of alerts) {
        suaxuatHangAlertsHtml += createAlerts(type, alert);
    }
    suaxuatHangAlerts.html(suaxuatHangAlertsHtml);
}

//Add new xuatHang
function suaxuatHangAJAX(xuatHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/xuatHang', data: xuatHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaxuatHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuaxuatHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(xuatHang);

                    $("#modelSuaxuatHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaxuatHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaxuatHangAlert([errorString], 'danger');
                } else {
                    refreshSuaxuatHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua xuatHang validator
function suaxuatHangValidator(xuatHang) {
    let errors = [];

    if (!xuatHang) {
        errors.push('xuthng không tồn tại ');
    }


    if (!xuatHang.maXuatHang) {
        errors.push('Không thể xác định mã xuất hàng ');
    }
    
    if (!xuatHang.ngayGioXuat) {
        errors.push('Không thể xác định ngày giờ xuất ');
    }
    
    if (!xuatHang.maNhanVien) {
        errors.push('Không thể xác định mã nhân viên ');
    }
    
    if (!xuatHang.maKhachHang) {
        errors.push('Không thể xác định mã khách hàng ');
    }
    
    if (!xuatHang.maBan) {
        errors.push('Không thể xác định mã bàn ');
    }
    

    return errors;
}    
