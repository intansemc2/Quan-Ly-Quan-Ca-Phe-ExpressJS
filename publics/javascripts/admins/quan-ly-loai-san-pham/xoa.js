
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
function deleteLoaiSanPhamRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');
    let idLoaiSanPham = $(tableRow).find('.idLoaiSanPham').attr('data');
    let loaisanpham = loaisanphams.find((item) => item.idLoaiSanPham == idLoaiSanPham);

    swal({
        title: `Bạn có chắc chắn muón xóa tài khoản có tên đăng nhập là "${loaisanpham.username}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: loaisanpham, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        },
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deleteLoaiSanPhamAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
        }
    });
}

//Delete loaisanpham
function deleteLoaiSanPhamAJAX(loaisanpham) {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: { idLoaiSanPham: loaisanpham.idLoaiSanPham } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' });

                let tableRow = $('#tableQuanLyLoaiSanPham').find(`.idLoaiSanPham[data="${loaisanpham.idLoaiSanPham}"]`).parents('tr');
                tableQuanLyLoaiSanPham.row(tableRow).remove().draw();
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

//Delete loaisanpham
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(`Đã xóa thành công ${data} tài khoản !`, { icon: 'success' });

                tableQuanLyLoaiSanPham.clear().draw();
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
