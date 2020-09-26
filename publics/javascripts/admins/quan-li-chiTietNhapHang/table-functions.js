
//Get a row in table
function getRowInTable(chiTietNhapHang) {
    return $('#tableQuanLychiTietNhapHang').find(`.maNhapHang[data="${chiTietNhapHang.maNhapHang}"]`).parents('tr').find(`.maSanPham[data="${chiTietNhapHang.maSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(chiTietNhapHang) {
    tableQuanLychiTietNhapHang.row.add([
        chiTietNhapHang.maNhapHang, chiTietNhapHang.maSanPham, chiTietNhapHang.soLuong, chiTietNhapHang.donGia, chiTietNhapHang
    ]).draw();

    //Change in chiTietNhapHangs
    chiTietNhapHangs.push({ 
        maNhapHang: chiTietNhapHang.maNhapHang, maSanPham: chiTietNhapHang.maSanPham, soLuong: chiTietNhapHang.soLuong, donGia: chiTietNhapHang.donGia
    });
}

//Edit row in table
function editRowInTable(chiTietNhapHang) {
    let oldchiTietNhapHangRow = getRowInTable(chiTietNhapHang);
    tableQuanLychiTietNhapHang.row(oldchiTietNhapHangRow).data([
        chiTietNhapHang.maNhapHang, chiTietNhapHang.maSanPham, chiTietNhapHang.soLuong, chiTietNhapHang.donGia, chiTietNhapHang
    ]).draw();

    //Change in chiTietNhapHangs
    let chiTietNhapHangReference = chiTietNhapHangs.find(
        (item) => item.maNhapHang == chiTietNhapHang.maNhapHang && item.maSanPham == chiTietNhapHang.maSanPham
    );
    
    chiTietNhapHangReference.maNhapHang = chiTietNhapHang.maNhapHang;
    chiTietNhapHangReference.maSanPham = chiTietNhapHang.maSanPham;
    chiTietNhapHangReference.soLuong = chiTietNhapHang.soLuong;
    chiTietNhapHangReference.donGia = chiTietNhapHang.donGia;
    
}

//Delete row in table
function deleteRowInTable(chiTietNhapHang) {
    let oldchiTietNhapHangRow = getRowInTable(chiTietNhapHang);
    tableQuanLychiTietNhapHang.row(oldchiTietNhapHangRow).remove().draw();

    //Change in chiTietNhapHangs
    chiTietNhapHangs = chiTietNhapHangs.filter(
        (item) => item.maNhapHang != chiTietNhapHang.maNhapHang && item.maSanPham != chiTietNhapHang.maSanPham
    );
}
    
