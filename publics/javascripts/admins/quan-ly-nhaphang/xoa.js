
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả nhập hàng không?`,
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
function deleteNhaphangRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let manhaphang = $(tableRow).find('.manhaphang').attr('data');

    let nhaphang = nhaphangs.find(
        (item) => item.manhaphang == manhaphang
    );

    swal({
        title: `Bạn có chắc chắn muón xóa nhập hàng có mã nhập hàng là "${nhaphang.manhaphang}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: nhaphang, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deleteNhaphangAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete nhaphang
function deleteNhaphangAJAX(nhaphang) {
    $.ajax({ method: 'DELETE', url: '/api/nhaphang', data: { idNhaphang: nhaphang.idNhaphang } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(nhaphang);
                tableQuanLyNhaphang.row(tableRow).remove().draw();
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

//Delete nhaphang
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/nhaphang', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(`Đã xóa thành công ${data} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLyNhaphang.clear().draw();
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
