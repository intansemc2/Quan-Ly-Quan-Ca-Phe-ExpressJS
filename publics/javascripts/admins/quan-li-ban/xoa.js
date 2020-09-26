
$(document).ready(function () {
    //Initialize Event click
    $("#deleteAll").click(function(){
        swal({
            title: `Bạn có chắc chắn muón muốn xóa tất cả bàn không?`,
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
function deletebanRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');

    let maban = $(tableRow).find('.maban').attr('data');

    let ban = bans.find(
        (item) => item.maban == maban
    );

    swal({
        title: `Bạn có chắc chắn muón xóa bàn có mã bàn là "${ban.maban}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: ban, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        }
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deletebanAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!', {timer: 1000});
        }
    });
}

//Delete ban
function deletebanAJAX(ban) {
    $.ajax({ method: 'DELETE', url: '/api/ban', data: { maban : ban.maban } })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal('Đã xóa thành công !', { icon: 'success' , timer: 1000});

                let tableRow = getRowInTable(ban);
                tableQuanLyban.row(tableRow).remove().draw();
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

//Delete ban
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/ban', data: {} })
        .done(function (data, status, xhr) {
            if (data && data.affectedRows > 0) {
                swal(`Đã xóa thành công ${data.affectedRows} tài khoản !`, { icon: 'success' , timer: 1000});

                tableQuanLyban.clear().draw();
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
