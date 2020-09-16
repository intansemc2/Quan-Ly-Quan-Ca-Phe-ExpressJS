
$(document).ready(function () {
    //Initialize Button Events
    //SuaSanPham Confirm
    $('#modelSuaSanPham .confirm').click(async function () {
        let idSanPham = $(this).parents('form').find('.idSanPham').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let sanpham = { idSanPham: idSanPham, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaSanPhamValidator(sanpham);

        if (errors.length > 0) {
            refreshSuaSanPhamAlert(errors);
            return;
        }

        await suaSanPhamAJAX(sanpham);
    });

    //Events
    //Set sanpham current value When model showup
    $('#modelSuaSanPham').on('show.bs.modal', function (event) {
        let suaSanPhamTriggered = $(event.relatedTarget);

        let idSanPham = suaSanPhamTriggered.attr('idSanPham');
        let sanpham = sanphams.find((item) => item.idSanPham == idSanPham);

        $('#modelSuaSanPham').find('.idSanPham').val(sanpham.idSanPham);
        $('#modelSuaSanPham').find('.username').val(sanpham.username);
        $('#modelSuaSanPham').find('.password').val(sanpham.password);
        $('#modelSuaSanPham').find('.re_password').val(sanpham.password);
        $('#modelSuaSanPham').find('.loai').val(sanpham.loai);

        refreshSuaSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaSanPham with data in sanphamsTypes
function refreshDataInModelSuaSanPham() {
    let loai = $('#modelSuaSanPham .loai');
    let loaiHtml = '';

    sanphamsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua sanpham Alert
function refreshSuaSanPhamAlert(alerts, type = 'danger') {
    let suaSanPhamAlerts = $('#modelSuaSanPham .alerts');
    let suaSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suaSanPhamAlertsHtml += createAlerts(type, alert);
    }
    suaSanPhamAlerts.html(suaSanPhamAlertsHtml);
}

//Add new sanpham
function suaSanPhamAJAX(sanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: sanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaSanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(sanpham);

                    $("#modelSuaSanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaSanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaSanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuaSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua SanPham validator
function suaSanPhamValidator(sanpham) {
    let errors = [];

    if (!sanpham) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!sanpham.idSanPham) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!sanpham.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!sanpham.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!sanpham.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (sanpham.password != sanpham.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!sanpham.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
