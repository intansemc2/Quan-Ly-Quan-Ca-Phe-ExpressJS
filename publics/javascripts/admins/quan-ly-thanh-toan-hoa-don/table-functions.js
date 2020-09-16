
//Get a row in table
function getRowInTable(thanhtoanhoadon) {
    return $('#tableQuanLyThanhToanHoaDon').find(`.idThanhToanHoaDon[data="${thanhtoanhoadon.idThanhToanHoaDon}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(thanhtoanhoadon) {
    tableQuanLyThanhToanHoaDon.row.add([thanhtoanhoadon.idThanhToanHoaDon, thanhtoanhoadon.username, thanhtoanhoadon.password, thanhtoanhoadon.loai, thanhtoanhoadon]).draw();

    //Change in thanhtoanhoadons
    thanhtoanhoadons.push({ idThanhToanHoaDon: thanhtoanhoadon.idThanhToanHoaDon, username: thanhtoanhoadon.username, password: thanhtoanhoadon.password, loai: thanhtoanhoadon.loai });
}

//Edit row in table
function editRowInTable(thanhtoanhoadon) {
    let oldThanhToanHoaDonRow = getRowInTable(thanhtoanhoadon);
    tableQuanLyThanhToanHoaDon.row(oldThanhToanHoaDonRow).data([thanhtoanhoadon.idThanhToanHoaDon, thanhtoanhoadon.username, thanhtoanhoadon.password, thanhtoanhoadon.loai, thanhtoanhoadon]).draw();

    //Change in thanhtoanhoadons
    let thanhtoanhoadonReference = thanhtoanhoadons.find((item) => item.idThanhToanHoaDon == thanhtoanhoadon.idThanhToanHoaDon);
    thanhtoanhoadonReference.username = thanhtoanhoadon.username;
    thanhtoanhoadonReference.password = thanhtoanhoadon.password;
    thanhtoanhoadonReference.loai = thanhtoanhoadon.loai;
}

//Delete row in table
function deleteRowInTable(thanhtoanhoadon) {
    let oldThanhToanHoaDonRow = getRowInTable(thanhtoanhoadon);
    tableQuanLyThanhToanHoaDon.row(oldThanhToanHoaDonRow).remove().draw();

    //Change in thanhtoanhoadons
    thanhtoanhoadons = thanhtoanhoadons.filter((item) => item.idThanhToanHoaDon != thanhtoanhoadon.idThanhToanHoaDon);
}
    
