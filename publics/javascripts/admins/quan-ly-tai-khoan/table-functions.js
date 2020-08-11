//Get a row in table
function getRowInTable(taikhoan) {
    return $('#tableQuanLyTaiKhoan').find(`.idTaiKhoan[data="${taikhoan.idTaiKhoan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(taikhoan) {
    tableQuanLyTaiKhoan.row.add([taikhoan.idTaiKhoan, taikhoan.username, taikhoan.password, taikhoan.loai, taikhoan]).draw();

    //Change in taikhoans
    taikhoans.push({ idTaiKhoan: taikhoan.idTaiKhoan, username: taikhoan.username, password: taikhoan.password, loai: taikhoan.loai });
}

//Edit row in table
function editRowInTable(taikhoan) {
    let oldTaiKhoanRow = getRowInTable(taikhoan);
    tableQuanLyTaiKhoan.row(oldTaiKhoanRow).data([taikhoan.idTaiKhoan, taikhoan.username, taikhoan.password, taikhoan.loai, taikhoan]).draw();

    //Change in taikhoans
    let taikhoanReference = taikhoans.find((item) => item.idTaiKhoan == taikhoan.idTaiKhoan);
    taikhoanReference.username = taikhoan.username;
    taikhoanReference.password = taikhoan.password;
    taikhoanReference.loai = taikhoan.loai;
}

//Delete row in table
function deleteRowInTable(taikhoan) {
    let oldTaiKhoanRow = getRowInTable(taikhoan);
    tableQuanLyTaiKhoan.row(oldTaiKhoanRow).remove().draw();

    //Change in taikhoans
    taikhoans = taikhoans.filter((item) => item.idTaiKhoan != taikhoan.idTaiKhoan);
}
