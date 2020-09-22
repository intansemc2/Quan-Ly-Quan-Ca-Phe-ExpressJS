
//Get a row in table
function getRowInTable(sanPham) {
    return $('#tableQuanLySanPham').find(`.idSanPham[data="${sanPham.idSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(sanPham) {
    tableQuanLySanPham.row.add([
        sanPham.idSanPham, sanPham.idLoaiSanPham, sanPham.ten, sanPham.gia, sanPham.diemTichLuy, sanPham.ghiChu, sanPham.linkAnh, sanPham
    ]).draw();

    //Change in sanPhams
    sanPhams.push({ 
        idSanPham: sanPham.idSanPham, idLoaiSanPham: sanPham.idLoaiSanPham, ten: sanPham.ten, gia: sanPham.gia, diemTichLuy: sanPham.diemTichLuy, ghiChu: sanPham.ghiChu, linkAnh: sanPham.linkAnh
    });
}

//Edit row in table
function editRowInTable(sanPham) {
    let oldSanPhamRow = getRowInTable(sanPham);
    tableQuanLySanPham.row(oldSanPhamRow).data([
        sanPham.idSanPham, sanPham.idLoaiSanPham, sanPham.ten, sanPham.gia, sanPham.diemTichLuy, sanPham.ghiChu, sanPham.linkAnh, sanPham
    ]).draw();

    //Change in sanPhams
    let sanPhamReference = sanPhams.find(
        (item) => item.idSanPham == sanPham.idSanPham
    );
    
    sanPhamReference.idSanPham = sanPham.idSanPham;
    sanPhamReference.idLoaiSanPham = sanPham.idLoaiSanPham;
    sanPhamReference.ten = sanPham.ten;
    sanPhamReference.gia = sanPham.gia;
    sanPhamReference.diemTichLuy = sanPham.diemTichLuy;
    sanPhamReference.ghiChu = sanPham.ghiChu;
    sanPhamReference.linkAnh = sanPham.linkAnh;
    
}

//Delete row in table
function deleteRowInTable(sanPham) {
    let oldSanPhamRow = getRowInTable(sanPham);
    tableQuanLySanPham.row(oldSanPhamRow).remove().draw();

    //Change in sanPhams
    sanPhams = sanPhams.filter(
        (item) => item.idSanPham != sanPham.idSanPham
    );
}
    
