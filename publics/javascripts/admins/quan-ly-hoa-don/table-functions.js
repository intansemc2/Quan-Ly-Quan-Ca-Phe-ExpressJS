
//Get a row in table
function getRowInTable(hoadon) {
    return $('#tableQuanLyHoaDon').find(`.idHoaDon[data="${hoadon.idHoaDon}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(hoadon) {
    tableQuanLyHoaDon.row.add([hoadon.idHoaDon, hoadon.username, hoadon.password, hoadon.loai, hoadon]).draw();

    //Change in hoadons
    hoadons.push({ idHoaDon: hoadon.idHoaDon, username: hoadon.username, password: hoadon.password, loai: hoadon.loai });
}

//Edit row in table
function editRowInTable(hoadon) {
    let oldHoaDonRow = getRowInTable(hoadon);
    tableQuanLyHoaDon.row(oldHoaDonRow).data([hoadon.idHoaDon, hoadon.username, hoadon.password, hoadon.loai, hoadon]).draw();

    //Change in hoadons
    let hoadonReference = hoadons.find((item) => item.idHoaDon == hoadon.idHoaDon);
    hoadonReference.username = hoadon.username;
    hoadonReference.password = hoadon.password;
    hoadonReference.loai = hoadon.loai;
}

//Delete row in table
function deleteRowInTable(hoadon) {
    let oldHoaDonRow = getRowInTable(hoadon);
    tableQuanLyHoaDon.row(oldHoaDonRow).remove().draw();

    //Change in hoadons
    hoadons = hoadons.filter((item) => item.idHoaDon != hoadon.idHoaDon);
}
    
