
$(document).ready(function () {
    //Initialize Button Events
    //ThemChitietnhaphang Confirm
    $('#modelThemChitietnhaphang .confirm').click(async function () {

        let manhaphang = $(this).parents('form').find('.manhaphang').val();
    
        let masanpham = $(this).parents('form').find('.masanpham').val();
    
        let soluong = $(this).parents('form').find('.soluong').val();
    
        let dongia = $(this).parents('form').find('.dongia').val();
    
        let chitietnhaphang = { manhaphang : manhaphang, masanpham : masanpham, soluong : soluong, dongia : dongia };

        let errors = themChitietnhaphangValidator(chitietnhaphang);

        if (errors.length > 0) {
            refreshThemChitietnhaphangAlert(errors);
            return;
        }

        await themChitietnhaphangAJAX(chitietnhaphang);
    });

    //Events
    //Set chitietnhaphang current value When model showup
    $('#modelThemChitietnhaphang').on('show.bs.modal', function (event) {
        refreshThemChitietnhaphangAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemChitietnhaphang with data in chitietnhaphangsTypes
function refreshDataInModelThemChitietnhaphang() {
}

//Refresh them chitietnhaphang Alert
function refreshThemChitietnhaphangAlert(alerts, type = 'danger') {
    let themChitietnhaphangAlerts = $('#modelThemChitietnhaphang .alerts');
    let themChitietnhaphangAlertsHtml = '';
    for (let alert of alerts) {
        themChitietnhaphangAlertsHtml += createAlerts(type, alert);
    }
    themChitietnhaphangAlerts.html(themChitietnhaphangAlertsHtml);
}

//Add new chitietnhaphang
function themChitietnhaphangAJAX(chitietnhaphang) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/chitietnhaphang', data: chitietnhaphang })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemChitietnhaphangAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemChitietnhaphangAlert(['Thêm thành công ' + result], 'success');

                    chitietnhaphang.idChitietnhaphang = result;
                    addNewRowToTable(chitietnhaphang);

                    $('#modelThemChitietnhaphang').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' , timer: 1000});
                } else {
                    refreshThemChitietnhaphangAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemChitietnhaphangAlert([errorString], 'danger');
                } else {
                    refreshThemChitietnhaphangAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Chitietnhaphang validator
function themChitietnhaphangValidator(chitietnhaphang) {
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
    
