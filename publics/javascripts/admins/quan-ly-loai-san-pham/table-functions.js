
//Get a row in table
function getRowInTable(loaiSanPham) {
    return $('#tableQuanLyLoaiSanPham').find(`.idLoaiSanPham[data="${loaiSanPham.idLoaiSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(loaiSanPham) {
    tableQuanLyLoaiSanPham.row.add([
        loaiSanPham.idLoaiSanPham, loaiSanPham.ten, loaiSanPham.linkAnh, loaiSanPham.ghiChu, loaiSanPham
    ]).draw();

    //Change in loaiSanPhams
    loaiSanPhams.push({ 
        idLoaiSanPham: loaiSanPham.idLoaiSanPham, ten: loaiSanPham.ten, linkAnh: loaiSanPham.linkAnh, ghiChu: loaiSanPham.ghiChu
    });
}

//Edit row in table
function editRowInTable(loaiSanPham) {
    let oldLoaiSanPhamRow = getRowInTable(loaiSanPham);
    tableQuanLyLoaiSanPham.row(oldLoaiSanPhamRow).data([
        loaiSanPham.idLoaiSanPham, loaiSanPham.ten, loaiSanPham.linkAnh, loaiSanPham.ghiChu, loaiSanPham
    ]).draw();

    //Change in loaiSanPhams
    let loaiSanPhamReference = loaiSanPhams.find(
        (item) => item.idLoaiSanPham == loaiSanPham.idLoaiSanPham
    );
    
    loaiSanPhamReference.idLoaiSanPham = loaiSanPham.idLoaiSanPham;
    loaiSanPhamReference.ten = loaiSanPham.ten;
    loaiSanPhamReference.linkAnh = loaiSanPham.linkAnh;
    loaiSanPhamReference.ghiChu = loaiSanPham.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(loaiSanPham) {
    let oldLoaiSanPhamRow = getRowInTable(loaiSanPham);
    tableQuanLyLoaiSanPham.row(oldLoaiSanPhamRow).remove().draw();

    //Change in loaiSanPhams
    loaiSanPhams = loaiSanPhams.filter(
        (item) => item.idLoaiSanPham != loaiSanPham.idLoaiSanPham
    );
}
    
