
//Get a row in table
function getRowInTable(sanpham) {
    return $('#tableQuanLySanPham').find(`.idSanPham[data="${sanpham.idSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(sanpham) {
    tableQuanLySanPham.row.add([sanpham.idSanPham, sanpham.username, sanpham.password, sanpham.loai, sanpham]).draw();

    //Change in sanphams
    sanphams.push({ idSanPham: sanpham.idSanPham, username: sanpham.username, password: sanpham.password, loai: sanpham.loai });
}

//Edit row in table
function editRowInTable(sanpham) {
    let oldSanPhamRow = getRowInTable(sanpham);
    tableQuanLySanPham.row(oldSanPhamRow).data([sanpham.idSanPham, sanpham.username, sanpham.password, sanpham.loai, sanpham]).draw();

    //Change in sanphams
    let sanphamReference = sanphams.find((item) => item.idSanPham == sanpham.idSanPham);
    sanphamReference.username = sanpham.username;
    sanphamReference.password = sanpham.password;
    sanphamReference.loai = sanpham.loai;
}

//Delete row in table
function deleteRowInTable(sanpham) {
    let oldSanPhamRow = getRowInTable(sanpham);
    tableQuanLySanPham.row(oldSanPhamRow).remove().draw();

    //Change in sanphams
    sanphams = sanphams.filter((item) => item.idSanPham != sanpham.idSanPham);
}
    
