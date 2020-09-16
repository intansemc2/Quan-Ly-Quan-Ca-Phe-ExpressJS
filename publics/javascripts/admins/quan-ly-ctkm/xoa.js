
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
function deleteCtkmRowInTable(buttonDelete) {
    let tableRow = $(buttonDelete).parents('tr');
    let idCtkm = $(tableRow).find('.idCtkm').attr('data');
    let ctkm = ctkms.find((item) => item.idCtkm == idCtkm);

    swal({
        title: `Bạn có chắc chắn muón xóa tài khoản có tên đăng nhập là "${ctkm.username}" không?`,
        text: `Không thể khôi phục dữ liệu sau khi xóa. Qúa trình sẽ xóa luôn các thông tin liên quan trong Cơ sở dữ liệu.`,
        icon: 'warning',
        buttons: {
            confirm: { text: 'Đồng ý', value: ctkm, visible: true, closeModal: true },
            cancel: { text: 'Không', value: false, visible: true, closeModal: true },
        },
    }).then(function (theChoosenOne) {
        if (theChoosenOne) {
            deleteCtkmAJAX(theChoosenOne);
        } else {
            swal('Đã hủy thao tác! Dữ liệu vẫn an toàn!');
        }
    });
}

//Delete ctkm
function deleteCtkmAJAX(ctkm) {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: { idCtkm: ctkm.idCtkm } })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal('Đã xóa thành công !', { icon: 'success' });

                let tableRow = $('#tableQuanLyCtkm').find(`.idCtkm[data="${ctkm.idCtkm}"]`).parents('tr');
                tableQuanLyCtkm.row(tableRow).remove().draw();
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

//Delete ctkm
function deleteAllAJAX() {
    $.ajax({ method: 'DELETE', url: '/api/tai-khoan', data: {} })
        .done(function (data, status, xhr) {
            if (data && data > 0) {
                swal(`Đã xóa thành công ${data} tài khoản !`, { icon: 'success' });

                tableQuanLyCtkm.clear().draw();
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
