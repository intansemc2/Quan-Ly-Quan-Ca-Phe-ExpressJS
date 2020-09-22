
//Get a row in table
function getRowInTable(taiKhoan) {
    return $('#tableQuanLyTaiKhoan').find(`.idTaiKhoan[data="${taiKhoan.idTaiKhoan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(taiKhoan) {
    tableQuanLyTaiKhoan.row.add([
        taiKhoan.idTaiKhoan, taiKhoan.username, taiKhoan.password, taiKhoan.loai, taiKhoan
    ]).draw();

    //Change in taiKhoans
    taiKhoans.push({ 
        idTaiKhoan: taiKhoan.idTaiKhoan, username: taiKhoan.username, password: taiKhoan.password, loai: taiKhoan.loai
    });
}

//Edit row in table
function editRowInTable(taiKhoan) {
    let oldTaiKhoanRow = getRowInTable(taiKhoan);
    tableQuanLyTaiKhoan.row(oldTaiKhoanRow).data([
        taiKhoan.idTaiKhoan, taiKhoan.username, taiKhoan.password, taiKhoan.loai, taiKhoan
    ]).draw();

    //Change in taiKhoans
    let taiKhoanReference = taiKhoans.find(
        (item) => item.idTaiKhoan == taiKhoan.idTaiKhoan
    );
    
    taiKhoanReference.idTaiKhoan = taiKhoan.idTaiKhoan;
    taiKhoanReference.username = taiKhoan.username;
    taiKhoanReference.password = taiKhoan.password;
    taiKhoanReference.loai = taiKhoan.loai;
    
}

//Delete row in table
function deleteRowInTable(taiKhoan) {
    let oldTaiKhoanRow = getRowInTable(taiKhoan);
    tableQuanLyTaiKhoan.row(oldTaiKhoanRow).remove().draw();

    //Change in taiKhoans
    taiKhoans = taiKhoans.filter(
        (item) => item.idTaiKhoan != taiKhoan.idTaiKhoan
    );
}
    
