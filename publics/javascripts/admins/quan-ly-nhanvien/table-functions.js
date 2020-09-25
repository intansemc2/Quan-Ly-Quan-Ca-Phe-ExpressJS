
//Get a row in table
function getRowInTable(nhanvien) {
    return $('#tableQuanLyNhanvien').find(`.manhanvien[data="${nhanvien.manhanvien}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhanvien) {
    tableQuanLyNhanvien.row.add([
        nhanvien.manhanvien, nhanvien.mataikhoan, nhanvien.ten, nhanvien.ngaysinh, nhanvien.sodienthoai, nhanvien.diachi, nhanvien
    ]).draw();

    //Change in nhanviens
    nhanviens.push({ 
        manhanvien: nhanvien.manhanvien, mataikhoan: nhanvien.mataikhoan, ten: nhanvien.ten, ngaysinh: nhanvien.ngaysinh, sodienthoai: nhanvien.sodienthoai, diachi: nhanvien.diachi
    });
}

//Edit row in table
function editRowInTable(nhanvien) {
    let oldNhanvienRow = getRowInTable(nhanvien);
    tableQuanLyNhanvien.row(oldNhanvienRow).data([
        nhanvien.manhanvien, nhanvien.mataikhoan, nhanvien.ten, nhanvien.ngaysinh, nhanvien.sodienthoai, nhanvien.diachi, nhanvien
    ]).draw();

    //Change in nhanviens
    let nhanvienReference = nhanviens.find(
        (item) => item.manhanvien == nhanvien.manhanvien
    );
    
    nhanvienReference.manhanvien = nhanvien.manhanvien;
    nhanvienReference.mataikhoan = nhanvien.mataikhoan;
    nhanvienReference.ten = nhanvien.ten;
    nhanvienReference.ngaysinh = nhanvien.ngaysinh;
    nhanvienReference.sodienthoai = nhanvien.sodienthoai;
    nhanvienReference.diachi = nhanvien.diachi;
    
}

//Delete row in table
function deleteRowInTable(nhanvien) {
    let oldNhanvienRow = getRowInTable(nhanvien);
    tableQuanLyNhanvien.row(oldNhanvienRow).remove().draw();

    //Change in nhanviens
    nhanviens = nhanviens.filter(
        (item) => item.manhanvien != nhanvien.manhanvien
    );
}
    
