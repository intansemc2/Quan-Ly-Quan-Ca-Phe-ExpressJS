
//Get a row in table
function getRowInTable(nhanvien) {
    return $('#tableQuanLyNhanVien').find(`.idNhanVien[data="${nhanvien.idNhanVien}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhanvien) {
    tableQuanLyNhanVien.row.add([nhanvien.idNhanVien, nhanvien.username, nhanvien.password, nhanvien.loai, nhanvien]).draw();

    //Change in nhanviens
    nhanviens.push({ idNhanVien: nhanvien.idNhanVien, username: nhanvien.username, password: nhanvien.password, loai: nhanvien.loai });
}

//Edit row in table
function editRowInTable(nhanvien) {
    let oldNhanVienRow = getRowInTable(nhanvien);
    tableQuanLyNhanVien.row(oldNhanVienRow).data([nhanvien.idNhanVien, nhanvien.username, nhanvien.password, nhanvien.loai, nhanvien]).draw();

    //Change in nhanviens
    let nhanvienReference = nhanviens.find((item) => item.idNhanVien == nhanvien.idNhanVien);
    nhanvienReference.username = nhanvien.username;
    nhanvienReference.password = nhanvien.password;
    nhanvienReference.loai = nhanvien.loai;
}

//Delete row in table
function deleteRowInTable(nhanvien) {
    let oldNhanVienRow = getRowInTable(nhanvien);
    tableQuanLyNhanVien.row(oldNhanVienRow).remove().draw();

    //Change in nhanviens
    nhanviens = nhanviens.filter((item) => item.idNhanVien != nhanvien.idNhanVien);
}
    
