
$(document).ready(function () {
    //Initialize Button Events
    //SuaChitietnhaphang Confirm
    $('#modelSuaChitietnhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietnhaphang = { manhaphang : manhaphang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = suaChitietnhaphangValidator(chitietnhaphang);

        if (errors.length > 0) {
            refreshSuaChitietnhaphangAlert(errors);
            return;
        }

        await suaChitietnhaphangAJAX(chitietnhaphang);
    });

    //Events
    //Set chitietnhaphang current value When model showup
    $('#modelSuaChitietnhaphang').on('show.bs.modal', function (event) {
        let suaChitietnhaphangTriggered = $(event.relatedTarget);

        let manhaphang = suaChitietnhaphangTriggered.attr('manhaphang');
    
        let masanpham = suaChitietnhaphangTriggered.attr('masanpham');
    

        let chitietnhaphang = chitietnhaphangs.find(
            (item) => item.manhaphang == manhaphang && item.masanpham == masanpham
        );


        $('#modelSuaChitietnhaphang').find('.manhaphang').val(manhaphang);
    
        $('#modelSuaChitietnhaphang').find('.masanpham').val(masanpham);
    


        $('#modelSuaChitietnhaphang').find('.soluong').val(chitietnhaphang.soluong);
    
        $('#modelSuaChitietnhaphang').find('.dongia').val(chitietnhaphang.dongia);
    

        refreshSuaChitietnhaphangAlert([], "");
    });
});

//Functions
//Refresh data in model SuaChitietnhaphang with data in chitietnhaphangsTypes
function refreshDataInModelSuaChitietnhaphang() {
}

//Refresh sua chitietnhaphang Alert
function refreshSuaChitietnhaphangAlert(alerts, type = 'danger') {
    let suaChitietnhaphangAlerts = $('#modelSuaChitietnhaphang .alerts');
    let suaChitietnhaphangAlertsHtml = '';
    for (let alert of alerts) {
        suaChitietnhaphangAlertsHtml += createAlerts(type, alert);
    }
    suaChitietnhaphangAlerts.html(suaChitietnhaphangAlertsHtml);
}

//Add new chitietnhaphang
function suaChitietnhaphangAJAX(chitietnhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chitietnhaphang', data: chitietnhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaChitietnhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaChitietnhaphangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chitietnhaphang);

                    $("#modelSuaChitietnhaphang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaChitietnhaphangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaChitietnhaphangAlert([errorString], 'danger');
                } else {
                    refreshSuaChitietnhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua Chitietnhaphang validator
function suaChitietnhaphangValidator(chitietnhaphang) {
    let errors = [];

    if (!chitietnhaphang) {
        errors.push('Chi tiết nhập hàng không tồn tại ');
    }


    if (!chitietnhaphang.manhaphang) {
        errors.push('Không thể xác định mã nhập hàng ');
    }
    
    if (!chitietnhaphang.masanpham) {
        errors.push('Không thể xác định mã sản phẩm ');
    }
    
    if (!chitietnhaphang.soluong) {
        errors.push('Không thể xác định số lượng ');
    }
    
    if (!chitietnhaphang.dongia) {
        errors.push('Không thể xác định đơn giá ');
    }
    

    return errors;
}    
