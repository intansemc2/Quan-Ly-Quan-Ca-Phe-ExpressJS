
$(document).ready(function () {
    //Initialize Button Events
    //Themchitietnhaphang Confirm
    $('#modelThemchitietnhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietnhaphang = { manhaphang : manhaphang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = themchitietnhaphangValidator(chitietnhaphang);

        if (errors.length > 0) {
            refreshThemchitietnhaphangAlert(errors);
            return;
        }

        await themchitietnhaphangAJAX(chitietnhaphang);
    });

    //Events
    //Set chitietnhaphang current value When model showup
    $('#modelThemchitietnhaphang').on('show.bs.modal', function (event) {
        refreshThemchitietnhaphangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model Themchitietnhaphang with data in chitietnhaphangsTypes
function refreshDataInModelThemchitietnhaphang() {
}

//Refresh them chitietnhaphang Alert
function refreshThemchitietnhaphangAlert(alerts, type = 'danger') {
    let themchitietnhaphangAlerts = $('#modelThemchitietnhaphang .alerts');
    let themchitietnhaphangAlertsHtml = '';
    for (let alert of alerts) {
        themchitietnhaphangAlertsHtml += createAlerts(type, alert);
    }
    themchitietnhaphangAlerts.html(themchitietnhaphangAlertsHtml);
}

//Add new chitietnhaphang
function themchitietnhaphangAJAX(chitietnhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chitietnhaphang', data: chitietnhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemchitietnhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemchitietnhaphangAlert(['Thêm thành công ' + result], 'success');

                                        
                    addNewRowToTable(chitietnhaphang);

                    $('#modelThemchitietnhaphang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemchitietnhaphangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemchitietnhaphangAlert([errorString], 'danger');
                } else {
                    refreshThemchitietnhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them chitietnhaphang validator
function themchitietnhaphangValidator(chitietnhaphang) {
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
    
