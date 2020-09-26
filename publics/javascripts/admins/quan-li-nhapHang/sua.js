
$(document).ready(function () {
    //Initialize Button Events
    //SuanhapHang Confirm
    $('#modelSuanhapHang .confirm').click(async function () {

        let maNhapHang = $(this).parents('form').find('.maNhapHang').val();
    
        let maNguonSanPham = $(this).parents('form').find('.maNguonSanPham').val();
    
        let ngayGioNhap = $(this).parents('form').find('.ngayGioNhap').val();
    
        let maNhanVien = $(this).parents('form').find('.maNhanVien').val();
    
        let ghiChu = $(this).parents('form').find('.ghiChu').val();
    
        let nhapHang = { maNhapHang : maNhapHang, maNguonSanPham : maNguonSanPham, ngayGioNhap : ngayGioNhap, maNhanVien : maNhanVien, ghiChu : ghiChu };

        let errors = suanhapHangValidator(nhapHang);

        if (errors.length > 0) {
            refreshSuanhapHangAlert(errors);
            return;
        }

        await suanhapHangAJAX(nhapHang);
    });

    //Events
    //Set nhapHang current value When model showup
    $('#modelSuanhapHang').on('show.bs.modal', function (event) {
        let suanhapHangTriggered = $(event.relatedTarget);

        let maNhapHang = suanhapHangTriggered.attr('maNhapHang');
    

        let nhapHang = nhapHangs.find(
            (item) => item.maNhapHang == maNhapHang
        );


        $('#modelSuanhapHang').find('.maNhapHang').val(maNhapHang);
    


        $('#modelSuanhapHang').find('.maNguonSanPham').val(nhapHang.maNguonSanPham);
    
        $('#modelSuanhapHang').find('.ngayGioNhap').val(nhapHang.ngayGioNhap);
    
        $('#modelSuanhapHang').find('.maNhanVien').val(nhapHang.maNhanVien);
    
        $('#modelSuanhapHang').find('.ghiChu').val(nhapHang.ghiChu);
    

        refreshSuanhapHangAlert([], "");
    });
});

//Functions
//Refresh data in model SuanhapHang with data in nhapHangsTypes
function refreshDataInModelSuanhapHang() {
}

//Refresh sua nhapHang Alert
function refreshSuanhapHangAlert(alerts, type = 'danger') {
    let suanhapHangAlerts = $('#modelSuanhapHang .alerts');
    let suanhapHangAlertsHtml = '';
    for (let alert of alerts) {
        suanhapHangAlertsHtml += createAlerts(type, alert);
    }
    suanhapHangAlerts.html(suanhapHangAlertsHtml);
}

//Add new nhapHang
function suanhapHangAJAX(nhapHang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/nhapHang', data: nhapHang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuanhapHangAlert(errors);
                    return;
                }

                if (result && result.affectedRows > 0) {
                    refreshSuanhapHangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(nhapHang);

                    $("#modelSuanhapHang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuanhapHangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuanhapHangAlert([errorString], 'danger');
                } else {
                    refreshSuanhapHangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua nhapHang validator
function suanhapHangValidator(nhapHang) {
    let errors = [];

    if (!nhapHang) {
        errors.push('nhphng không tồn tại ');
    }


    if (!nhapHang.maNhapHang) {
        errors.push('Không thể xác định mã nhập hàng ');
    }
    
    if (!nhapHang.maNguonSanPham) {
        errors.push('Không thể xác định mã nguồn sản phẩm ');
    }
    
    if (!nhapHang.ngayGioNhap) {
        errors.push('Không thể xác định ngày giờ nhập ');
    }
    
    if (!nhapHang.maNhanVien) {
        errors.push('Không thể xác định mã nhân viên ');
    }
    

    return errors;
}    
