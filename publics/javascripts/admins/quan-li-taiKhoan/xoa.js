
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả tài khoản không?`,
            text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
            icon: 'warning',
            buttons: {
                confirm: { text: 'Đồng ý', value: true, visible: true, closeModal: true },
                cancel: { text: 'Không', value: false, visible: true, closeModal: true },
            }
        }).then(function (theChoosenOne) {
            if (theChoosenOne) {
                deleteAllAJAX(theChoosenOne);
            } else {
                swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
            }
        });
    });
});

//Functions
function deletetaiKhoanRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let maTaiKhoan = $(tableRow).find('.maTaiKhoan').attr('data');

    let taiKhoan = taiKhoans.find(
        (item) => item.maTaiKhoan == maTaiKhoan
    );

    swal({
        title: `Bạn có chắc chắn muón xóa tài khoản có mã tài khoản là "${taiKhoan.maTaiKhoan}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: taiKhoan, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deletetaiKhoanAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete taiKhoan
function deletetaiKhoanAJAX(taiKhoan) {
    $.ajax({ method: 'DELETE', url: '/api/taiKhoan', data: { maTaiKhoan : taiKhoan.maTaiKhoan } })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(taiKhoan);
                tableQuanLytaiKhoan.row(tableRow).remove().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' , timer: 1000});
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += `mã lỗi ${data.error.code}, tên lỗi ${data.error.message}, nội dung ${data.error.detail} `;
            } else {
                errorString += `${data}`;
            }

            swal(errorString, { icon: 'error' , timer: 1000});
        });
}

//Delete taiKhoan
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/taiKhoan', data: {} })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal(`Đã xóa thành công ${data.affectedRows} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLytaiKhoan.clear().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' , timer: 1000});
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += `mã lỗi ${data.error.code}, tên lỗi ${data.error.message}, nội dung ${data.error.detail} `;
            } else {
                errorString += `${data}`;
            }

            swal(errorString, { icon: 'error' , timer: 1000});
        });
}
