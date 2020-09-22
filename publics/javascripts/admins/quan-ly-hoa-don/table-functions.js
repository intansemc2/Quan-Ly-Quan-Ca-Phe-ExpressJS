
//Get a row in table
function getRowInTable(hoaDon) {
    return $('#tableQuanLyHoaDon').find(`.idHoaDon[data="${hoaDon.idHoaDon}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(hoaDon) {
    tableQuanLyHoaDon.row.add([
        hoaDon.idHoaDon, hoaDon.idKhachHang, hoaDon.idBan, hoaDon.idNhanVien, hoaDon.thoiGianLap, hoaDon
    ]).draw();

    //Change in hoaDons
    hoaDons.push({ 
        idHoaDon: hoaDon.idHoaDon, idKhachHang: hoaDon.idKhachHang, idBan: hoaDon.idBan, idNhanVien: hoaDon.idNhanVien, thoiGianLap: hoaDon.thoiGianLap
    });
}

//Edit row in table
function editRowInTable(hoaDon) {
    let oldHoaDonRow = getRowInTable(hoaDon);
    tableQuanLyHoaDon.row(oldHoaDonRow).data([
        hoaDon.idHoaDon, hoaDon.idKhachHang, hoaDon.idBan, hoaDon.idNhanVien, hoaDon.thoiGianLap, hoaDon
    ]).draw();

    //Change in hoaDons
    let hoaDonReference = hoaDons.find(
        (item) => item.idHoaDon == hoaDon.idHoaDon
    );
    
    hoaDonReference.idHoaDon = hoaDon.idHoaDon;
    hoaDonReference.idKhachHang = hoaDon.idKhachHang;
    hoaDonReference.idBan = hoaDon.idBan;
    hoaDonReference.idNhanVien = hoaDon.idNhanVien;
    hoaDonReference.thoiGianLap = hoaDon.thoiGianLap;
    
}

//Delete row in table
function deleteRowInTable(hoaDon) {
    let oldHoaDonRow = getRowInTable(hoaDon);
    tableQuanLyHoaDon.row(oldHoaDonRow).remove().draw();

    //Change in hoaDons
    hoaDons = hoaDons.filter(
        (item) => item.idHoaDon != hoaDon.idHoaDon
    );
}
    
