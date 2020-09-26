
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả chi tiết xuất hàng không?`,
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
function deletechitietxuathangRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let maxuathang = $(tableRow).find('.maxuathang').attr('data');
    let masanpham = $(tableRow).find('.masanpham').attr('data');

    let chitietxuathang = chitietxuathangs.find(
        (item) => item.maxuathang == maxuathang && item.masanpham == masanpham
    );

    swal({
        title: `Bạn có chắc chắn muón xóa chi tiết xuất hàng có mã xuất hàng là "${chitietxuathang.maxuathang}", mã sản phẩm là "${chitietxuathang.masanpham}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: chitietxuathang, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deletechitietxuathangAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete chitietxuathang
function deletechitietxuathangAJAX(chitietxuathang) {
    $.ajax({ method: 'DELETE', url: '/api/chitietxuathang', data: { maxuathang : chitietxuathang.maxuathang, masanpham : chitietxuathang.masanpham } })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(chitietxuathang);
                tableQuanLychitietxuathang.row(tableRow).remove().draw();
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

//Delete chitietxuathang
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/chitietxuathang', data: {} })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal(`Đã xóa thành công ${data.affectedRows} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLychitietxuathang.clear().draw();
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
