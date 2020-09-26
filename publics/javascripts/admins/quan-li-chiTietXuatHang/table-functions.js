
//Get a row in table
function getRowInTable(chiTietXuatHang) {
    return $('#tableQuanLychiTietXuatHang').find(`.maXuatHang[data="${chiTietXuatHang.maXuatHang}"]`).parents('tr').find(`.maSanPham[data="${chiTietXuatHang.maSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(chiTietXuatHang) {
    tableQuanLychiTietXuatHang.row.add([
        chiTietXuatHang.maXuatHang, chiTietXuatHang.maSanPham, chiTietXuatHang.soLuong, chiTietXuatHang.donGia, chiTietXuatHang
    ]).draw();

    //Change in chiTietXuatHangs
    chiTietXuatHangs.push({ 
        maXuatHang: chiTietXuatHang.maXuatHang, maSanPham: chiTietXuatHang.maSanPham, soLuong: chiTietXuatHang.soLuong, donGia: chiTietXuatHang.donGia
    });
}

//Edit row in table
function editRowInTable(chiTietXuatHang) {
    let oldchiTietXuatHangRow = getRowInTable(chiTietXuatHang);
    tableQuanLychiTietXuatHang.row(oldchiTietXuatHangRow).data([
        chiTietXuatHang.maXuatHang, chiTietXuatHang.maSanPham, chiTietXuatHang.soLuong, chiTietXuatHang.donGia, chiTietXuatHang
    ]).draw();

    //Change in chiTietXuatHangs
    let chiTietXuatHangReference = chiTietXuatHangs.find(
        (item) => item.maXuatHang == chiTietXuatHang.maXuatHang && item.maSanPham == chiTietXuatHang.maSanPham
    );
    
    chiTietXuatHangReference.maXuatHang = chiTietXuatHang.maXuatHang;
    chiTietXuatHangReference.maSanPham = chiTietXuatHang.maSanPham;
    chiTietXuatHangReference.soLuong = chiTietXuatHang.soLuong;
    chiTietXuatHangReference.donGia = chiTietXuatHang.donGia;
    
}

//Delete row in table
function deleteRowInTable(chiTietXuatHang) {
    let oldchiTietXuatHangRow = getRowInTable(chiTietXuatHang);
    tableQuanLychiTietXuatHang.row(oldchiTietXuatHangRow).remove().draw();

    //Change in chiTietXuatHangs
    chiTietXuatHangs = chiTietXuatHangs.filter(
        (item) => item.maXuatHang != chiTietXuatHang.maXuatHang && item.maSanPham != chiTietXuatHang.maSanPham
    );
}
    
