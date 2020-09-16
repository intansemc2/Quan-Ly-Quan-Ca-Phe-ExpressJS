
$(document).ready(function () {
    //Initialize Button Events
    //SuaLoaiSanPham Confirm
    $('#modelSuaLoaiSanPham .confirm').click(async function () {
        let idLoaiSanPham = $(this).parents('form').find('.idLoaiSanPham').val();
        let username = $(this).parents('form').find('.username').val();
        let password = $(this).parents('form').find('.password').val();
        let re_password = $(this).parents('form').find('.re_password').val();
        let loai = $(this).parents('form').find('.loai').val();
        let loaisanpham = { idLoaiSanPham: idLoaiSanPham, username: username, password: password, re_password: re_password, loai: loai };

        let errors = suaLoaiSanPhamValidator(loaisanpham);

        if (errors.length > 0) {
            refreshSuaLoaiSanPhamAlert(errors);
            return;
        }

        await suaLoaiSanPhamAJAX(loaisanpham);
    });

    //Events
    //Set loaisanpham current value When model showup
    $('#modelSuaLoaiSanPham').on('show.bs.modal', function (event) {
        let suaLoaiSanPhamTriggered = $(event.relatedTarget);

        let idLoaiSanPham = suaLoaiSanPhamTriggered.attr('idLoaiSanPham');
        let loaisanpham = loaisanphams.find((item) => item.idLoaiSanPham == idLoaiSanPham);

        $('#modelSuaLoaiSanPham').find('.idLoaiSanPham').val(loaisanpham.idLoaiSanPham);
        $('#modelSuaLoaiSanPham').find('.username').val(loaisanpham.username);
        $('#modelSuaLoaiSanPham').find('.password').val(loaisanpham.password);
        $('#modelSuaLoaiSanPham').find('.re_password').val(loaisanpham.password);
        $('#modelSuaLoaiSanPham').find('.loai').val(loaisanpham.loai);

        refreshSuaLoaiSanPhamAlert([], "");
    });

    //Initialize final
});

//Variables

//Functions
//Refresh data in model SuaLoaiSanPham with data in loaisanphamsTypes
function refreshDataInModelSuaLoaiSanPham() {
    let loai = $('#modelSuaLoaiSanPham .loai');
    let loaiHtml = '';

    loaisanphamsTypes.forEach((element, index) => (loaiHtml += `<option value="${index}">${element}</option>`));

    loai.html(loaiHtml);
}

//Refresh sua loaisanpham Alert
function refreshSuaLoaiSanPhamAlert(alerts, type = 'danger') {
    let suaLoaiSanPhamAlerts = $('#modelSuaLoaiSanPham .alerts');
    let suaLoaiSanPhamAlertsHtml = '';
    for (let alert of alerts) {
        suaLoaiSanPhamAlertsHtml += createAlerts(type, alert);
    }
    suaLoaiSanPhamAlerts.html(suaLoaiSanPhamAlertsHtml);
}

//Add new loaisanpham
function suaLoaiSanPhamAJAX(loaisanpham) {
    return new Promise(function (resolve, reject) {
        $.ajax({ method: 'PATCH', url: '/api/tai-khoan', data: loaisanpham })
            .done(function (data, status, xhr) {
                let errors = data.errors;
                let result = data;

                if (errors && errors.length && errors.length > 0) {
                    refreshSuaLoaiSanPhamAlert(errors);
                    return;
                }

                if (result) {
                    refreshSuaLoaiSanPhamAlert(['Sửa thành công ' + result], 'success');

                    editRowInTable(loaisanpham);

                    $("#modelSuaLoaiSanPham").modal('hide');
                    swal({ text: 'Sửa thành công ', icon: 'success'});
                } else {
                    refreshSuaLoaiSanPhamAlert(['Sửa thất bại ' + result], 'danger');
                }
            })
            .fail(function (data, status, xhr) {
                let error = data.responseJSON.error;
                if (error && error.code && error.message && error.detail) {
                    let errorString = `Mã lỗi ${error.code}, Tên lỗi ${error.message}, Nội dung lỗi ${error.detail}`;
                    refreshSuaLoaiSanPhamAlert([errorString], 'danger');
                } else {
                    refreshSuaLoaiSanPhamAlert([data.responseText], 'danger');
                }
            });
    });
}

//Sua LoaiSanPham validator
function suaLoaiSanPhamValidator(loaisanpham) {
    let errors = [];

    if (!loaisanpham) {
        errors.push('Tài khoản không tồn tại ');
    }

    if (!loaisanpham.idLoaiSanPham) {
        errors.push('Không thể xác định Id tài khoản ');
    }

    if (!loaisanpham.username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!loaisanpham.password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!loaisanpham.re_password) {
        errors.push('Nhập lại Mật khẩu không được để trống ');
    }

    if (loaisanpham.password != loaisanpham.re_password) {
        errors.push('Mật khẩu khác Nhập lại Mật khẩu');
    }

    if (!loaisanpham.loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    return errors;
}    
