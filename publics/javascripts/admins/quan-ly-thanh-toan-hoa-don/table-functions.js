
//Get a row in table
function getRowInTable(thanhToanHoaDon) {
    return $('#tableQuanLyThanhToanHoaDon').find(`.idHoaDon[data="${thanhToanHoaDon.idHoaDon}"]`).parents('tr').find(`.idTaiKhoanThanhToan[data="${thanhToanHoaDon.idTaiKhoanThanhToan}"]`).parents('tr').find(`.thoiGianThanhToan[data="${thanhToanHoaDon.thoiGianThanhToan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(thanhToanHoaDon) {
    tableQuanLyThanhToanHoaDon.row.add([
        thanhToanHoaDon.idHoaDon, thanhToanHoaDon.idTaiKhoanThanhToan, thanhToanHoaDon.thoiGianThanhToan, thanhToanHoaDon.phanTramTichLuy, thanhToanHoaDon.soLuongDiemDoi, thanhToanHoaDon.tyGiaDiemDoi, thanhToanHoaDon
    ]).draw();

    //Change in thanhToanHoaDons
    thanhToanHoaDons.push({ 
        idHoaDon: thanhToanHoaDon.idHoaDon, idTaiKhoanThanhToan: thanhToanHoaDon.idTaiKhoanThanhToan, thoiGianThanhToan: thanhToanHoaDon.thoiGianThanhToan, phanTramTichLuy: thanhToanHoaDon.phanTramTichLuy, soLuongDiemDoi: thanhToanHoaDon.soLuongDiemDoi, tyGiaDiemDoi: thanhToanHoaDon.tyGiaDiemDoi
    });
}

//Edit row in table
function editRowInTable(thanhToanHoaDon) {
    let oldThanhToanHoaDonRow = getRowInTable(thanhToanHoaDon);
    tableQuanLyThanhToanHoaDon.row(oldThanhToanHoaDonRow).data([
        thanhToanHoaDon.idHoaDon, thanhToanHoaDon.idTaiKhoanThanhToan, thanhToanHoaDon.thoiGianThanhToan, thanhToanHoaDon.phanTramTichLuy, thanhToanHoaDon.soLuongDiemDoi, thanhToanHoaDon.tyGiaDiemDoi, thanhToanHoaDon
    ]).draw();

    //Change in thanhToanHoaDons
    let thanhToanHoaDonReference = thanhToanHoaDons.find(
        (item) => item.idHoaDon == thanhToanHoaDon.idHoaDon && item.idTaiKhoanThanhToan == thanhToanHoaDon.idTaiKhoanThanhToan && item.thoiGianThanhToan == thanhToanHoaDon.thoiGianThanhToan
    );
    
    thanhToanHoaDonReference.idHoaDon = thanhToanHoaDon.idHoaDon;
    thanhToanHoaDonReference.idTaiKhoanThanhToan = thanhToanHoaDon.idTaiKhoanThanhToan;
    thanhToanHoaDonReference.thoiGianThanhToan = thanhToanHoaDon.thoiGianThanhToan;
    thanhToanHoaDonReference.phanTramTichLuy = thanhToanHoaDon.phanTramTichLuy;
    thanhToanHoaDonReference.soLuongDiemDoi = thanhToanHoaDon.soLuongDiemDoi;
    thanhToanHoaDonReference.tyGiaDiemDoi = thanhToanHoaDon.tyGiaDiemDoi;
    
}

//Delete row in table
function deleteRowInTable(thanhToanHoaDon) {
    let oldThanhToanHoaDonRow = getRowInTable(thanhToanHoaDon);
    tableQuanLyThanhToanHoaDon.row(oldThanhToanHoaDonRow).remove().draw();

    //Change in thanhToanHoaDons
    thanhToanHoaDons = thanhToanHoaDons.filter(
        (item) => item.idHoaDon != thanhToanHoaDon.idHoaDon && item.idTaiKhoanThanhToan != thanhToanHoaDon.idTaiKhoanThanhToan && item.thoiGianThanhToan != thanhToanHoaDon.thoiGianThanhToan
    );
}
    
