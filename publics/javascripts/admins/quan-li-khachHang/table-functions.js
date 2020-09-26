
//Get a row in table
function getRowInTable(khachHang) {
    return $('#tableQuanLykhachHang').find(`.maKhachHang[data="${khachHang.maKhachHang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khachHang) {
    tableQuanLykhachHang.row.add([
        khachHang.maKhachHang, khachHang.maTaiKhoan, khachHang.ten, khachHang.ngaySinh, khachHang.soDienThoai, khachHang.ghiChu, khachHang
    ]).draw();

    //Change in khachHangs
    khachHangs.push({ 
        maKhachHang: khachHang.maKhachHang, maTaiKhoan: khachHang.maTaiKhoan, ten: khachHang.ten, ngaySinh: khachHang.ngaySinh, soDienThoai: khachHang.soDienThoai, ghiChu: khachHang.ghiChu
    });
}

//Edit row in table
function editRowInTable(khachHang) {
    let oldkhachHangRow = getRowInTable(khachHang);
    tableQuanLykhachHang.row(oldkhachHangRow).data([
        khachHang.maKhachHang, khachHang.maTaiKhoan, khachHang.ten, khachHang.ngaySinh, khachHang.soDienThoai, khachHang.ghiChu, khachHang
    ]).draw();

    //Change in khachHangs
    let khachHangReference = khachHangs.find(
        (item) => item.maKhachHang == khachHang.maKhachHang
    );
    
    khachHangReference.maKhachHang = khachHang.maKhachHang;
    khachHangReference.maTaiKhoan = khachHang.maTaiKhoan;
    khachHangReference.ten = khachHang.ten;
    khachHangReference.ngaySinh = khachHang.ngaySinh;
    khachHangReference.soDienThoai = khachHang.soDienThoai;
    khachHangReference.ghiChu = khachHang.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(khachHang) {
    let oldkhachHangRow = getRowInTable(khachHang);
    tableQuanLykhachHang.row(oldkhachHangRow).remove().draw();

    //Change in khachHangs
    khachHangs = khachHangs.filter(
        (item) => item.maKhachHang != khachHang.maKhachHang
    );
}
    
