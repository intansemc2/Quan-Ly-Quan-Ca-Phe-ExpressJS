
//Get a row in table
function getRowInTable(khachHang) {
    return $('#tableQuanLyKhachHang').find(`.idKhachHang[data="${khachHang.idKhachHang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khachHang) {
    tableQuanLyKhachHang.row.add([
        khachHang.idKhachHang, khachHang.ten, khachHang.sdt, khachHang.idTaiKhoan, khachHang.diemTichLuy, khachHang.email, khachHang.google, khachHang.facebook, khachHang
    ]).draw();

    //Change in khachHangs
    khachHangs.push({ 
        idKhachHang: khachHang.idKhachHang, ten: khachHang.ten, sdt: khachHang.sdt, idTaiKhoan: khachHang.idTaiKhoan, diemTichLuy: khachHang.diemTichLuy, email: khachHang.email, google: khachHang.google, facebook: khachHang.facebook
    });
}

//Edit row in table
function editRowInTable(khachHang) {
    let oldKhachHangRow = getRowInTable(khachHang);
    tableQuanLyKhachHang.row(oldKhachHangRow).data([
        khachHang.idKhachHang, khachHang.ten, khachHang.sdt, khachHang.idTaiKhoan, khachHang.diemTichLuy, khachHang.email, khachHang.google, khachHang.facebook, khachHang
    ]).draw();

    //Change in khachHangs
    let khachHangReference = khachHangs.find(
        (item) => item.idKhachHang == khachHang.idKhachHang
    );
    
    khachHangReference.idKhachHang = khachHang.idKhachHang;
    khachHangReference.ten = khachHang.ten;
    khachHangReference.sdt = khachHang.sdt;
    khachHangReference.idTaiKhoan = khachHang.idTaiKhoan;
    khachHangReference.diemTichLuy = khachHang.diemTichLuy;
    khachHangReference.email = khachHang.email;
    khachHangReference.google = khachHang.google;
    khachHangReference.facebook = khachHang.facebook;
    
}

//Delete row in table
function deleteRowInTable(khachHang) {
    let oldKhachHangRow = getRowInTable(khachHang);
    tableQuanLyKhachHang.row(oldKhachHangRow).remove().draw();

    //Change in khachHangs
    khachHangs = khachHangs.filter(
        (item) => item.idKhachHang != khachHang.idKhachHang
    );
}
    
