
$(document).ready(function () {
    //Initialize Button Events
    //SuaChitietxuathang Confirm
    $('#modelSuaChitietxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietxuathang = { maxuathang : maxuathang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = suaChitietxuathangValidator(chitietxuathang);

        if (errors.length > 0) {
            refreshSuaChitietxuathangAlert(errors);
            return;
        }

        await suaChitietxuathangAJAX(chitietxuathang);
    });

    //Events
    //Set chitietxuathang current value When model showup
    $('#modelSuaChitietxuathang').on('show.bs.modal', function (event) {
        let suaChitietxuathangTriggered = $(event.relatedTarget);

        let maxuathang = suaChitietxuathangTriggered.attr('maxuathang');
    
        let masanpham = suaChitietxuathangTriggered.attr('masanpham');
    

        let chitietxuathang = chitietxuathangs.find(
            (item) => item.maxuathang == maxuathang && item.masanpham == masanpham
        );


        $('#modelSuaChitietxuathang').find('.maxuathang').val(maxuathang);
    
        $('#modelSuaChitietxuathang').find('.masanpham').val(masanpham);
    


        $('#modelSuaChitietxuathang').find('.soluong').val(chitietxuathang.soluong);
    
        $('#modelSuaChitietxuathang').find('.dongia').val(chitietxuathang.dongia);
    

        refreshSuaChitietxuathangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaChitietxuathang with data in chitietxuathangsTypes
function refreshDataInModelSuaChitietxuathang() {
}

//Refresh sua chitietxuathang Alert
function refreshSuaChitietxuathangAlert(alerts, type = 'danger') {
    let suaChitietxuathangAlerts = $('#modelSuaChitietxuathang .alerts');
    let suaChitietxuathangAlertsHtml = '';
    for (let alert of alerts) {
        suaChitietxuathangAlertsHtml += createAlerts(type, alert);
    }
    suaChitietxuathangAlerts.html(suaChitietxuathangAlertsHtml);
}

//Add new chitietxuathang
function suaChitietxuathangAJAX(chitietxuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chitietxuathang', data: chitietxuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaChitietxuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaChitietxuathangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chitietxuathang);

                    $("#modelSuaChitietxuathang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaChitietxuathangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaChitietxuathangAlert([errorString], 'danger');
                } else {
                    refreshSuaChitietxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Chitietxuathang validator
function suaChitietxuathangValidator(chitietxuathang) {
    let errors = [];

    if (!chitietxuathang) {
        errors.push('Chi tiết xuất hàng không tồn tại ');
    }


    if (!chitietxuathang.maxuathang) {
        errors.push('Không thể xác định mã xuất hàng ');
    }
    
    if (!chitietxuathang.masanpham) {
        errors.push('Không thể xác định mã sản phẩm ');
    }
    
    if (!chitietxuathang.soluong) {
        errors.push('Không thể xác định số lượng ');
    }
    
    if (!chitietxuathang.dongia) {
        errors.push('Không thể xác định đơn giá ');
    }
    

    return errors;
}    
