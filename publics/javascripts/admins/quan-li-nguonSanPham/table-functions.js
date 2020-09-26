
//Get a row in table
function getRowInTable(nguonSanPham) {
    return $('#tableQuanLynguonSanPham').find(`.maNguonSanPham[data="${nguonSanPham.maNguonSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nguonSanPham) {
    tableQuanLynguonSanPham.row.add([
        nguonSanPham.maNguonSanPham, nguonSanPham.ten, nguonSanPham.soDienThoai, nguonSanPham.diaChi, nguonSanPham
    ]).draw();

    //Change in nguonSanPhams
    nguonSanPhams.push({ 
        maNguonSanPham: nguonSanPham.maNguonSanPham, ten: nguonSanPham.ten, soDienThoai: nguonSanPham.soDienThoai, diaChi: nguonSanPham.diaChi
    });
}

//Edit row in table
function editRowInTable(nguonSanPham) {
    let oldnguonSanPhamRow = getRowInTable(nguonSanPham);
    tableQuanLynguonSanPham.row(oldnguonSanPhamRow).data([
        nguonSanPham.maNguonSanPham, nguonSanPham.ten, nguonSanPham.soDienThoai, nguonSanPham.diaChi, nguonSanPham
    ]).draw();

    //Change in nguonSanPhams
    let nguonSanPhamReference = nguonSanPhams.find(
        (item) => item.maNguonSanPham == nguonSanPham.maNguonSanPham
    );
    
    nguonSanPhamReference.maNguonSanPham = nguonSanPham.maNguonSanPham;
    nguonSanPhamReference.ten = nguonSanPham.ten;
    nguonSanPhamReference.soDienThoai = nguonSanPham.soDienThoai;
    nguonSanPhamReference.diaChi = nguonSanPham.diaChi;
    
}

//Delete row in table
function deleteRowInTable(nguonSanPham) {
    let oldnguonSanPhamRow = getRowInTable(nguonSanPham);
    tableQuanLynguonSanPham.row(oldnguonSanPhamRow).remove().draw();

    //Change in nguonSanPhams
    nguonSanPhams = nguonSanPhams.filter(
        (item) => item.maNguonSanPham != nguonSanPham.maNguonSanPham
    );
}
    
