
//Get a row in table
function getRowInTable(nhapHang) {
    return $('#tableQuanLynhapHang').find(`.maNhapHang[data="${nhapHang.maNhapHang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhapHang) {
    tableQuanLynhapHang.row.add([
        nhapHang.maNhapHang, nhapHang.maNguonSanPham, nhapHang.ngayGioNhap, nhapHang.maNhanVien, nhapHang.ghiChu, nhapHang
    ]).draw();

    //Change in nhapHangs
    nhapHangs.push({ 
        maNhapHang: nhapHang.maNhapHang, maNguonSanPham: nhapHang.maNguonSanPham, ngayGioNhap: nhapHang.ngayGioNhap, maNhanVien: nhapHang.maNhanVien, ghiChu: nhapHang.ghiChu
    });
}

//Edit row in table
function editRowInTable(nhapHang) {
    let oldnhapHangRow = getRowInTable(nhapHang);
    tableQuanLynhapHang.row(oldnhapHangRow).data([
        nhapHang.maNhapHang, nhapHang.maNguonSanPham, nhapHang.ngayGioNhap, nhapHang.maNhanVien, nhapHang.ghiChu, nhapHang
    ]).draw();

    //Change in nhapHangs
    let nhapHangReference = nhapHangs.find(
        (item) => item.maNhapHang == nhapHang.maNhapHang
    );
    
    nhapHangReference.maNhapHang = nhapHang.maNhapHang;
    nhapHangReference.maNguonSanPham = nhapHang.maNguonSanPham;
    nhapHangReference.ngayGioNhap = nhapHang.ngayGioNhap;
    nhapHangReference.maNhanVien = nhapHang.maNhanVien;
    nhapHangReference.ghiChu = nhapHang.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(nhapHang) {
    let oldnhapHangRow = getRowInTable(nhapHang);
    tableQuanLynhapHang.row(oldnhapHangRow).remove().draw();

    //Change in nhapHangs
    nhapHangs = nhapHangs.filter(
        (item) => item.maNhapHang != nhapHang.maNhapHang
    );
}
    
