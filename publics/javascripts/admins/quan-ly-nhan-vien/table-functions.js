
//Get a row in table
function getRowInTable(nhanVien) {
    return $('#tableQuanLyNhanVien').find(`.idNhanVien[data="${nhanVien.idNhanVien}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhanVien) {
    tableQuanLyNhanVien.row.add([
        nhanVien.idNhanVien, nhanVien.ten, nhanVien.sdt, nhanVien.loai, nhanVien.idTaiKhoan, nhanVien.ngaySinh, nhanVien.linkAnh, nhanVien.email, nhanVien
    ]).draw();

    //Change in nhanViens
    nhanViens.push({ 
        idNhanVien: nhanVien.idNhanVien, ten: nhanVien.ten, sdt: nhanVien.sdt, loai: nhanVien.loai, idTaiKhoan: nhanVien.idTaiKhoan, ngaySinh: nhanVien.ngaySinh, linkAnh: nhanVien.linkAnh, email: nhanVien.email
    });
}

//Edit row in table
function editRowInTable(nhanVien) {
    let oldNhanVienRow = getRowInTable(nhanVien);
    tableQuanLyNhanVien.row(oldNhanVienRow).data([
        nhanVien.idNhanVien, nhanVien.ten, nhanVien.sdt, nhanVien.loai, nhanVien.idTaiKhoan, nhanVien.ngaySinh, nhanVien.linkAnh, nhanVien.email, nhanVien
    ]).draw();

    //Change in nhanViens
    let nhanVienReference = nhanViens.find(
        (item) => item.idNhanVien == nhanVien.idNhanVien
    );
    
    nhanVienReference.idNhanVien = nhanVien.idNhanVien;
    nhanVienReference.ten = nhanVien.ten;
    nhanVienReference.sdt = nhanVien.sdt;
    nhanVienReference.loai = nhanVien.loai;
    nhanVienReference.idTaiKhoan = nhanVien.idTaiKhoan;
    nhanVienReference.ngaySinh = nhanVien.ngaySinh;
    nhanVienReference.linkAnh = nhanVien.linkAnh;
    nhanVienReference.email = nhanVien.email;
    
}

//Delete row in table
function deleteRowInTable(nhanVien) {
    let oldNhanVienRow = getRowInTable(nhanVien);
    tableQuanLyNhanVien.row(oldNhanVienRow).remove().draw();

    //Change in nhanViens
    nhanViens = nhanViens.filter(
        (item) => item.idNhanVien != nhanVien.idNhanVien
    );
}
    
