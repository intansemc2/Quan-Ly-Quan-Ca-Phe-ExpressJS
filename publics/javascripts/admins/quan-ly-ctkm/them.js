
$(document).ready(function () {
    //Initialize Button Events
    //ThemCtkm Confirm
    $('#modelThemCtkm .confirm').click(async function () {
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let ctkm = { username: username, password: password, re_password: re_password, loai: loai };

        let errors = themCtkmValidator(ctkm);

        if (errors.length > 0) {
            refreshThemCtkmAlert(errors);
            return;
        }

        await themCtkmAJAX(ctkm);
    });

    //Events
    //Set ctkm current value When model showup
    $('#modelThemCtkm').on('show.bs.modal', function (event) {
        refreshThemCtkmAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model ThemCtkm with data in ctkmsTypes
function refreshDataInModelThemCtkm() {
    let loai = $('#modelThemCtkm .loai');
    let loaiHtml = '';

    ctkmsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh them ctkm Alert
function refreshThemCtkmAlert(alerts, type = 'danger') {
    let themCtkmAlerts = $('#modelThemCtkm .alerts');
    let themCtkmAlertsHtml = '';
    for (let alert of alerts) {
        themCtkmAlertsHtml += createAlerts(type, alert);
    }
    themCtkmAlerts.html(themCtkmAlertsHtml);
}

//Add new ctkm
function themCtkmAJAX(ctkm) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'POST', url: '/api/tai-khoan', data: ctkm })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshThemCtkmAlert(errors);
                    return;
                }

                if (result) {
                    refreshThemCtkmAlert(['Thêm thành công ' + result], 'success');

                    ctkm.idCtkm = result;
                    addNewRowToTable(ctkm);

                    $('#modelThemCtkm').modal('hide');
                    swal({ text: 'Thêm thành công ', icon: 'success' });
                } else {
                    refreshThemCtkmAlert(['Thêm thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshThemCtkmAlert([errorString], 'danger');
                } else {
                    refreshThemCtkmAlert([data.responseText], 'danger');
                }
            });
    });
}

//Them Ctkm validator
function themCtkmValidator(ctkm) {
    let errors = [];

    if (!ctkm) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!ctkm.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!ctkm.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!ctkm.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (ctkm.password != ctkm.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!ctkm.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}
    
