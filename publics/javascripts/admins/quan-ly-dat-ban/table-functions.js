
//Get a row in table
function getRowInTable(datBan) {
    return $('#tableQuanLyDatBan').find(`.idKhachHang[data="${datBan.idKhachHang}"]`).parents('tr').find(`.idBan[data="${datBan.idBan}"]`).parents('tr').find(`.thoiGianLap[data="${datBan.thoiGianLap}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(datBan) {
    tableQuanLyDatBan.row.add([
        datBan.idKhachHang, datBan.idBan, datBan.thoiGianLap, datBan.thoiGianNhan, datBan.ghiChu, datBan
    ]).draw();

    //Change in datBans
    datBans.push({ 
        idKhachHang: datBan.idKhachHang, idBan: datBan.idBan, thoiGianLap: datBan.thoiGianLap, thoiGianNhan: datBan.thoiGianNhan, ghiChu: datBan.ghiChu
    });
}

//Edit row in table
function editRowInTable(datBan) {
    let oldDatBanRow = getRowInTable(datBan);
    tableQuanLyDatBan.row(oldDatBanRow).data([
        datBan.idKhachHang, datBan.idBan, datBan.thoiGianLap, datBan.thoiGianNhan, datBan.ghiChu, datBan
    ]).draw();

    //Change in datBans
    let datBanReference = datBans.find(
        (item) => item.idKhachHang == datBan.idKhachHang && item.idBan == datBan.idBan && item.thoiGianLap == datBan.thoiGianLap
    );
    
    datBanReference.idKhachHang = datBan.idKhachHang;
    datBanReference.idBan = datBan.idBan;
    datBanReference.thoiGianLap = datBan.thoiGianLap;
    datBanReference.thoiGianNhan = datBan.thoiGianNhan;
    datBanReference.ghiChu = datBan.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(datBan) {
    let oldDatBanRow = getRowInTable(datBan);
    tableQuanLyDatBan.row(oldDatBanRow).remove().draw();

    //Change in datBans
    datBans = datBans.filter(
        (item) => item.idKhachHang != datBan.idKhachHang && item.idBan != datBan.idBan && item.thoiGianLap != datBan.thoiGianLap
    );
}
    
