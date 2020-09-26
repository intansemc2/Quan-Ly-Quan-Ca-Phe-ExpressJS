
$(document).ready(function () {
    //Initialize Button Events
    //Suachitietxuathang Confirm
    $('#modelSuachitietxuathang .confirm').click(async function () {

        let maxuathang = $(this).parents('form').find('.maxuathang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietxuathang = { maxuathang : maxuathang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = suachitietxuathangValidator(chitietxuathang);

        if (errors.length > 0) {
            refreshSuachitietxuathangAlert(errors);
            return;
        }

        await suachitietxuathangAJAX(chitietxuathang);
    });

    //Events
    //Set chitietxuathang current value When model showup
    $('#modelSuachitietxuathang').on('show.bs.modal', function (event) {
        let suachitietxuathangTriggered = $(event.relatedTarget);

        let maxuathang = suachitietxuathangTriggered.attr('maxuathang');
    
        let masanpham = suachitietxuathangTriggered.attr('masanpham');
    

        let chitietxuathang = chitietxuathangs.find(
            (item) => item.maxuathang == maxuathang && item.masanpham == masanpham
        );


        $('#modelSuachitietxuathang').find('.maxuathang').val(maxuathang);
    
        $('#modelSuachitietxuathang').find('.masanpham').val(masanpham);
    


        $('#modelSuachitietxuathang').find('.soluong').val(chitietxuathang.soluong);
    
        $('#modelSuachitietxuathang').find('.dongia').val(chitietxuathang.dongia);
    

        refreshSuachitietxuathangAlert([], "");
    });
});

//Functions
//Refresh data in model Suachitietxuathang with data in chitietxuathangsTypes
function refreshDataInModelSuachitietxuathang() {
}

//Refresh sua chitietxuathang Alert
function refreshSuachitietxuathangAlert(alerts, type = 'danger') {
    let suachitietxuathangAlerts = $('#modelSuachitietxuathang .alerts');
    let suachitietxuathangAlertsHtml = '';
    for (let alert of alerts) {
        suachitietxuathangAlertsHtml += createAlerts(type, alert);
    }
    suachitietxuathangAlerts.html(suachitietxuathangAlertsHtml);
}

//Add new chitietxuathang
function suachitietxuathangAJAX(chitietxuathang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chitietxuathang', data: chitietxuathang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuachitietxuathangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuachitietxuathangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chitietxuathang);

                    $("#modelSuachitietxuathang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuachitietxuathangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuachitietxuathangAlert([errorString], 'danger');
                } else {
                    refreshSuachitietxuathangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua chitietxuathang validator
function suachitietxuathangValidator(chitietxuathang) {
    let errors = [];

    if (!chitietxuathang) {
        errors.push('chititxuthng không tồn tại ');
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
