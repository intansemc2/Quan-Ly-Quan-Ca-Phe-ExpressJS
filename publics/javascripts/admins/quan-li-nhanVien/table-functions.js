
//Get a row in table
function getRowInTable(nhanVien) {
    return $('#tableQuanLynhanVien').find(`.maNhanVien[data="${nhanVien.maNhanVien}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhanVien) {
    tableQuanLynhanVien.row.add([
        nhanVien.maNhanVien, nhanVien.maTaiKhoan, nhanVien.ten, nhanVien.ngaySinh, nhanVien.soDienThoai, nhanVien.diaChi, nhanVien
    ]).draw();

    //Change in nhanViens
    nhanViens.push({ 
        maNhanVien: nhanVien.maNhanVien, maTaiKhoan: nhanVien.maTaiKhoan, ten: nhanVien.ten, ngaySinh: nhanVien.ngaySinh, soDienThoai: nhanVien.soDienThoai, diaChi: nhanVien.diaChi
    });
}

//Edit row in table
function editRowInTable(nhanVien) {
    let oldnhanVienRow = getRowInTable(nhanVien);
    tableQuanLynhanVien.row(oldnhanVienRow).data([
        nhanVien.maNhanVien, nhanVien.maTaiKhoan, nhanVien.ten, nhanVien.ngaySinh, nhanVien.soDienThoai, nhanVien.diaChi, nhanVien
    ]).draw();

    //Change in nhanViens
    let nhanVienReference = nhanViens.find(
        (item) => item.maNhanVien == nhanVien.maNhanVien
    );
    
    nhanVienReference.maNhanVien = nhanVien.maNhanVien;
    nhanVienReference.maTaiKhoan = nhanVien.maTaiKhoan;
    nhanVienReference.ten = nhanVien.ten;
    nhanVienReference.ngaySinh = nhanVien.ngaySinh;
    nhanVienReference.soDienThoai = nhanVien.soDienThoai;
    nhanVienReference.diaChi = nhanVien.diaChi;
    
}

//Delete row in table
function deleteRowInTable(nhanVien) {
    let oldnhanVienRow = getRowInTable(nhanVien);
    tableQuanLynhanVien.row(oldnhanVienRow).remove().draw();

    //Change in nhanViens
    nhanViens = nhanViens.filter(
        (item) => item.maNhanVien != nhanVien.maNhanVien
    );
}
    
