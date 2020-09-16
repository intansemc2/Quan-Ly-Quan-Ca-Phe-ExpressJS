
//Get a row in table
function getRowInTable(loaisanpham) {
    return $('#tableQuanLyLoaiSanPham').find(`.idLoaiSanPham[data="${loaisanpham.idLoaiSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(loaisanpham) {
    tableQuanLyLoaiSanPham.row.add([loaisanpham.idLoaiSanPham, loaisanpham.username, loaisanpham.password, loaisanpham.loai, loaisanpham]).draw();

    //Change in loaisanphams
    loaisanphams.push({ idLoaiSanPham: loaisanpham.idLoaiSanPham, username: loaisanpham.username, password: loaisanpham.password, loai: loaisanpham.loai });
}

//Edit row in table
function editRowInTable(loaisanpham) {
    let oldLoaiSanPhamRow = getRowInTable(loaisanpham);
    tableQuanLyLoaiSanPham.row(oldLoaiSanPhamRow).data([loaisanpham.idLoaiSanPham, loaisanpham.username, loaisanpham.password, loaisanpham.loai, loaisanpham]).draw();

    //Change in loaisanphams
    let loaisanphamReference = loaisanphams.find((item) => item.idLoaiSanPham == loaisanpham.idLoaiSanPham);
    loaisanphamReference.username = loaisanpham.username;
    loaisanphamReference.password = loaisanpham.password;
    loaisanphamReference.loai = loaisanpham.loai;
}

//Delete row in table
function deleteRowInTable(loaisanpham) {
    let oldLoaiSanPhamRow = getRowInTable(loaisanpham);
    tableQuanLyLoaiSanPham.row(oldLoaiSanPhamRow).remove().draw();

    //Change in loaisanphams
    loaisanphams = loaisanphams.filter((item) => item.idLoaiSanPham != loaisanpham.idLoaiSanPham);
}
    
