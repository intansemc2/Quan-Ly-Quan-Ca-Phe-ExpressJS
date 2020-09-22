
$(document).ready(function () {
    //Initialize Button Events
    //SuaTaiKhoan Confirm
    $('#modelSuaTaiKhoan .confirm').click(async function () {

        let idTaiKhoan = $(this).parents('form').find('.idTaiKhoan').val();
    
        let username = $(this).parents('form').find('.username').val();
    
        let password = $(this).parents('form').find('.password').val();
    
        let loai = $(this).parents('form').find('.loai').val();
    
        let taiKhoan = { idTaiKhoan : idTaiKhoan, username : username, password : password, loai : loai };

        let errors = suaTaiKhoanValidator(taiKhoan);

        if (errors.length > 0) {
            refreshSuaTaiKhoanAlert(errors);
            return;
        }

        await suaTaiKhoanAJAX(taiKhoan);
    });

    //Events
    //Set taiKhoan current value When model showup
    $('#modelSuaTaiKhoan').on('show.bs.modal', function (event) {
        let suaTaiKhoanTriggered = $(event.relatedTarget);

        let idTaiKhoan = suaTaiKhoanTriggered.attr('idTaiKhoan');
    

        let taiKhoan = taiKhoans.find(
            (item) => item.idTaiKhoan == idTaiKhoan
        );


        $('#modelSuaTaiKhoan').find('.idTaiKhoan').val(idTaiKhoan);
    


        $('#modelSuaTaiKhoan').find('.username').val(taiKhoan.username);
    
        $('#modelSuaTaiKhoan').find('.password').val(taiKhoan.password);
    
        $('#modelSuaTaiKhoan').find('.loai').val(taiKhoan.loai);
    

        refreshSuaTaiKhoanAlert([], "");
    });
});

//Functions
//Refresh data in model SuaTaiKhoan with data in taiKhoansTypes
function refreshDataInModelSuaTaiKhoan() {
}

//Refresh sua taiKhoan Alert
function refreshSuaTaiKhoanAlert(alerts, type = 'danger') {
    let suaTaiKhoanAlerts = $('#modelSuaTaiKhoan .alerts');
    let suaTaiKhoanAlertsHtml = '';
    for (let alert of alerts) {
        suaTaiKhoanAlertsHtml += createAlerts(type, alert);
    }
    suaTaiKhoanAlerts.html(suaTaiKhoanAlertsHtml);
}

//Add new taiKhoan
function suaTaiKhoanAJAX(taiKhoan) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: taiKhoan })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaTaiKhoanAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaTaiKhoanAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(taiKhoan);

                    $("#modelSuaTaiKhoan").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success', timer: 1000});
                } else {
                    refreshSuaTaiKhoanAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaTaiKhoanAlert([errorString], 'danger');
                } else {
                    refreshSuaTaiKhoanAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua TaiKhoan validator
function suaTaiKhoanValidator(taiKhoan) {
    let errors = [];

    if (!taiKhoan) {
        errors.push('Tài khoản không tồn tại ');
    }


    if (!taiKhoan.idTaiKhoan) {
        errors.push('Không thể xác định id tài khoản ');
    }
    
    if (!taiKhoan.username) {
        errors.push('Không thể xác định tên đăng nhập ');
    }
    
    if (!taiKhoan.password) {
        errors.push('Không thể xác định mật khẩu ');
    }
    
    if (!taiKhoan.loai) {
        errors.push('Không thể xác định loại ');
    }
    

    return errors;
}    
