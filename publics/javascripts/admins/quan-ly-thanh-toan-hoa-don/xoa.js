
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả thanh toán hóa đơn không?`,
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
function deleteThanhToanHoaDonRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let idHoaDon = $(tableRow).find('.idHoaDon').attr('data');
    let idTaiKhoanThanhToan = $(tableRow).find('.idTaiKhoanThanhToan').attr('data');
    let thoiGianThanhToan = $(tableRow).find('.thoiGianThanhToan').attr('data');

    let thanhToanHoaDon = thanhToanHoaDons.find(
        (item) => item.idHoaDon == idHoaDon && item.idTaiKhoanThanhToan == idTaiKhoanThanhToan && item.thoiGianThanhToan == thoiGianThanhToan
    );

    swal({
        title: `Bạn có chắc chắn muón xóa thanh toán hóa đơn có id hóa đơn là "${thanhToanHoaDon.idHoaDon}", id tài khoản thanh toán là "${thanhToanHoaDon.idTaiKhoanThanhToan}", thời gian thanh toán là "${thanhToanHoaDon.thoiGianThanhToan}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: thanhToanHoaDon, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deleteThanhToanHoaDonAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete thanhToanHoaDon
function deleteThanhToanHoaDonAJAX(thanhToanHoaDon) {
    $.ajax({ method: 'DELETE', url: '/api/thanh-toan-hoa-don', data: { idThanhToanHoaDon: thanhToanHoaDon.idThanhToanHoaDon } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(thanhToanHoaDon);
                tableQuanLyThanhToanHoaDon.row(tableRow).remove().draw();
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

//Delete thanhToanHoaDon
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/thanh-toan-hoa-don', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(`Đã xóa thành công ${data} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLyThanhToanHoaDon.clear().draw();
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
