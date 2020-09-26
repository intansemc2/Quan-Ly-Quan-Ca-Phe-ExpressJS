
$(document).ready(function () {
    //Initialize Button Events
    //Suachitietnhaphang Confirm
    $('#modelSuachitietnhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietnhaphang = { manhaphang : manhaphang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = suachitietnhaphangValidator(chitietnhaphang);

        if (errors.length > 0) {
            refreshSuachitietnhaphangAlert(errors);
            return;
        }

        await suachitietnhaphangAJAX(chitietnhaphang);
    });

    //Events
    //Set chitietnhaphang current value When model showup
    $('#modelSuachitietnhaphang').on('show.bs.modal', function (event) {
        let suachitietnhaphangTriggered = $(event.relatedTarget);

        let manhaphang = suachitietnhaphangTriggered.attr('manhaphang');
    
        let masanpham = suachitietnhaphangTriggered.attr('masanpham');
    

        let chitietnhaphang = chitietnhaphangs.find(
            (item) => item.manhaphang == manhaphang && item.masanpham == masanpham
        );


        $('#modelSuachitietnhaphang').find('.manhaphang').val(manhaphang);
    
        $('#modelSuachitietnhaphang').find('.masanpham').val(masanpham);
    


        $('#modelSuachitietnhaphang').find('.soluong').val(chitietnhaphang.soluong);
    
        $('#modelSuachitietnhaphang').find('.dongia').val(chitietnhaphang.dongia);
    

        refreshSuachitietnhaphangAlert([], "");
    });
});

//Functions
//Refresh data in model Suachitietnhaphang with data in chitietnhaphangsTypes
function refreshDataInModelSuachitietnhaphang() {
}

//Refresh sua chitietnhaphang Alert
function refreshSuachitietnhaphangAlert(alerts, type = 'danger') {
    let suachitietnhaphangAlerts = $('#modelSuachitietnhaphang .alerts');
    let suachitietnhaphangAlertsHtml = '';
    for (let alert of alerts) {
        suachitietnhaphangAlertsHtml += createAlerts(type, alert);
    }
    suachitietnhaphangAlerts.html(suachitietnhaphangAlertsHtml);
}

//Add new chitietnhaphang
function suachitietnhaphangAJAX(chitietnhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/chitietnhaphang', data: chitietnhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuachitietnhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuachitietnhaphangAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(chitietnhaphang);

                    $("#modelSuachitietnhaphang").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuachitietnhaphangAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuachitietnhaphangAlert([errorString], 'danger');
                } else {
                    refreshSuachitietnhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua chitietnhaphang validator
function suachitietnhaphangValidator(chitietnhaphang) {
    let errors = [];

    if (!chitietnhaphang) {
        errors.push('chititnhphng không tồn tại ');
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
