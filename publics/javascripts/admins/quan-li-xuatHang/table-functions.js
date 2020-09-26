
//Get a row in table
function getRowInTable(xuatHang) {
    return $('#tableQuanLyxuatHang').find(`.maXuatHang[data="${xuatHang.maXuatHang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(xuatHang) {
    tableQuanLyxuatHang.row.add([
        xuatHang.maXuatHang, xuatHang.ngayGioXuat, xuatHang.maNhanVien, xuatHang.maKhachHang, xuatHang.maBan, xuatHang.ghiChu, xuatHang
    ]).draw();

    //Change in xuatHangs
    xuatHangs.push({ 
        maXuatHang: xuatHang.maXuatHang, ngayGioXuat: xuatHang.ngayGioXuat, maNhanVien: xuatHang.maNhanVien, maKhachHang: xuatHang.maKhachHang, maBan: xuatHang.maBan, ghiChu: xuatHang.ghiChu
    });
}

//Edit row in table
function editRowInTable(xuatHang) {
    let oldxuatHangRow = getRowInTable(xuatHang);
    tableQuanLyxuatHang.row(oldxuatHangRow).data([
        xuatHang.maXuatHang, xuatHang.ngayGioXuat, xuatHang.maNhanVien, xuatHang.maKhachHang, xuatHang.maBan, xuatHang.ghiChu, xuatHang
    ]).draw();

    //Change in xuatHangs
    let xuatHangReference = xuatHangs.find(
        (item) => item.maXuatHang == xuatHang.maXuatHang
    );
    
    xuatHangReference.maXuatHang = xuatHang.maXuatHang;
    xuatHangReference.ngayGioXuat = xuatHang.ngayGioXuat;
    xuatHangReference.maNhanVien = xuatHang.maNhanVien;
    xuatHangReference.maKhachHang = xuatHang.maKhachHang;
    xuatHangReference.maBan = xuatHang.maBan;
    xuatHangReference.ghiChu = xuatHang.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(xuatHang) {
    let oldxuatHangRow = getRowInTable(xuatHang);
    tableQuanLyxuatHang.row(oldxuatHangRow).remove().draw();

    //Change in xuatHangs
    xuatHangs = xuatHangs.filter(
        (item) => item.maXuatHang != xuatHang.maXuatHang
    );
}
    
