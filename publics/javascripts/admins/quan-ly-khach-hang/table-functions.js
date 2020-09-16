
//Get a row in table
function getRowInTable(khachhang) {
    return $('#tableQuanLyKhachHang').find(`.idKhachHang[data="${khachhang.idKhachHang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khachhang) {
    tableQuanLyKhachHang.row.add([khachhang.idKhachHang, khachhang.username, khachhang.password, khachhang.loai, khachhang]).draw();

    //Change in khachhangs
    khachhangs.push({ idKhachHang: khachhang.idKhachHang, username: khachhang.username, password: khachhang.password, loai: khachhang.loai });
}

//Edit row in table
function editRowInTable(khachhang) {
    let oldKhachHangRow = getRowInTable(khachhang);
    tableQuanLyKhachHang.row(oldKhachHangRow).data([khachhang.idKhachHang, khachhang.username, khachhang.password, khachhang.loai, khachhang]).draw();

    //Change in khachhangs
    let khachhangReference = khachhangs.find((item) => item.idKhachHang == khachhang.idKhachHang);
    khachhangReference.username = khachhang.username;
    khachhangReference.password = khachhang.password;
    khachhangReference.loai = khachhang.loai;
}

//Delete row in table
function deleteRowInTable(khachhang) {
    let oldKhachHangRow = getRowInTable(khachhang);
    tableQuanLyKhachHang.row(oldKhachHangRow).remove().draw();

    //Change in khachhangs
    khachhangs = khachhangs.filter((item) => item.idKhachHang != khachhang.idKhachHang);
}
    
