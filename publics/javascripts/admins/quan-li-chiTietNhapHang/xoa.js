
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả chi tiết nhập hàng không?`,
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
function deletechiTietNhapHangRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let maNhapHang = $(tableRow).find('.maNhapHang').attr('data');
    let maSanPham = $(tableRow).find('.maSanPham').attr('data');

    let chiTietNhapHang = chiTietNhapHangs.find(
        (item) => item.maNhapHang == maNhapHang && item.maSanPham == maSanPham
    );

    swal({
        title: `Bạn có chắc chắn muón xóa chi tiết nhập hàng có mã nhập hàng là "${chiTietNhapHang.maNhapHang}", mã sản phẩm là "${chiTietNhapHang.maSanPham}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: chiTietNhapHang, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deletechiTietNhapHangAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete chiTietNhapHang
function deletechiTietNhapHangAJAX(chiTietNhapHang) {
    $.ajax({ method: 'DELETE', url: '/api/chiTietNhapHang', data: { maNhapHang : chiTietNhapHang.maNhapHang, maSanPham : chiTietNhapHang.maSanPham } })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(chiTietNhapHang);
                tableQuanLychiTietNhapHang.row(tableRow).remove().draw();
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

//Delete chiTietNhapHang
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/chiTietNhapHang', data: {} })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal(`Đã xóa thành công ${data.affectedRows} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLychiTietNhapHang.clear().draw();
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
