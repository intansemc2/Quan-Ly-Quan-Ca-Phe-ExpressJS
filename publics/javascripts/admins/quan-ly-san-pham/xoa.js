
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón xóa tài khoản tất cả không?`,
            text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
            icon: 'warning',
            buttons: {
                confirm: { text: 'Đồng ý', value: true, visible: true, closeModal: true },
                cancel: { text: 'Không', value: false, visible: true, closeModal: true },
            },
        }).then(function (theChoosenOne) {
            if (theChoosenOne) {
                deleteAllAJAX(theChoosenOne);
            } else {
                swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
            }
        });
    });
});

//Functions
function deleteSanPhamRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');
    let idSanPham = $(tableRow).find('.idSanPham').attr('data');
    let sanpham = sanphams.find((item) => item.idSanPham == idSanPham);

    swal({
        title: `Bạn có chắc chắn muón xóa tài khoản có tên đăng nhập là "${sanpham.username}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: sanpham, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        },
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deleteSanPhamAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
        }
    });
}

//Delete sanpham
function deleteSanPhamAJAX(sanpham) {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: { idSanPham: sanpham.idSanPham } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' });

                let tableRow = $('#tableQuanLySanPham').find(`.idSanPham[data="${sanpham.idSanPham}"]`).parents('tr');
                tableQuanLySanPham.row(tableRow).remove().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' });
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += `mã lỗi ${data.error.code}, tên lỗi ${data.error.message}, nội dung ${data.error.detail} `;
            } else {
                errorString += `${data}`;
            }

            swal(errorString, { icon: 'error' });
        });
}

//Delete sanpham
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(`Đã xóa thành công ${data} tài khoản !`, { icon: 'success' });

                tableQuanLySanPham.clear().draw();
            } else {
                swal('Đã xóa không thành công !', { icon: 'error' });
            }
        })
        .fail(function (data, status, xhr) {
            let errorString = 'Lỗi, ';
            if (data.error && data.error.code && data.error.message && data.error.detail) {
                errorString += `mã lỗi ${data.error.code}, tên lỗi ${data.error.message}, nội dung ${data.error.detail} `;
            } else {
                errorString += `${data}`;
            }

            swal(errorString, { icon: 'error' });
        });
}
