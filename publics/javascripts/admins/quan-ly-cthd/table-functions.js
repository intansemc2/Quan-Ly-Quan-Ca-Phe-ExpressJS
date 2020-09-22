
//Get a row in table
function getRowInTable(cthd) {
    return $('#tableQuanLyCthd').find(`.idHoaDon[data="${cthd.idHoaDon}"]`).parents('tr').find(`.idSanPham[data="${cthd.idSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(cthd) {
    tableQuanLyCthd.row.add([
        cthd.idHoaDon, cthd.idSanPham, cthd.soLuong, cthd.donGia, cthd.diemTichLuy, cthd
    ]).draw();

    //Change in cthds
    cthds.push({ 
        idHoaDon: cthd.idHoaDon, idSanPham: cthd.idSanPham, soLuong: cthd.soLuong, donGia: cthd.donGia, diemTichLuy: cthd.diemTichLuy
    });
}

//Edit row in table
function editRowInTable(cthd) {
    let oldCthdRow = getRowInTable(cthd);
    tableQuanLyCthd.row(oldCthdRow).data([
        cthd.idHoaDon, cthd.idSanPham, cthd.soLuong, cthd.donGia, cthd.diemTichLuy, cthd
    ]).draw();

    //Change in cthds
    let cthdReference = cthds.find(
        (item) => item.idHoaDon == cthd.idHoaDon && item.idSanPham == cthd.idSanPham
    );
    
    cthdReference.idHoaDon = cthd.idHoaDon;
    cthdReference.idSanPham = cthd.idSanPham;
    cthdReference.soLuong = cthd.soLuong;
    cthdReference.donGia = cthd.donGia;
    cthdReference.diemTichLuy = cthd.diemTichLuy;
    
}

//Delete row in table
function deleteRowInTable(cthd) {
    let oldCthdRow = getRowInTable(cthd);
    tableQuanLyCthd.row(oldCthdRow).remove().draw();

    //Change in cthds
    cthds = cthds.filter(
        (item) => item.idHoaDon != cthd.idHoaDon && item.idSanPham != cthd.idSanPham
    );
}
    
