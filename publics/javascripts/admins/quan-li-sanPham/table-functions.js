
//Get a row in table
function getRowInTable(sanPham) {
    return $('#tableQuanLysanPham').find(`.maSanPham[data="${sanPham.maSanPham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(sanPham) {
    tableQuanLysanPham.row.add([
        sanPham.maSanPham, sanPham.ten, sanPham.linkAnh, sanPham.loai, sanPham.gia, sanPham
    ]).draw();

    //Change in sanPhams
    sanPhams.push({ 
        maSanPham: sanPham.maSanPham, ten: sanPham.ten, linkAnh: sanPham.linkAnh, loai: sanPham.loai, gia: sanPham.gia
    });
}

//Edit row in table
function editRowInTable(sanPham) {
    let oldsanPhamRow = getRowInTable(sanPham);
    tableQuanLysanPham.row(oldsanPhamRow).data([
        sanPham.maSanPham, sanPham.ten, sanPham.linkAnh, sanPham.loai, sanPham.gia, sanPham
    ]).draw();

    //Change in sanPhams
    let sanPhamReference = sanPhams.find(
        (item) => item.maSanPham == sanPham.maSanPham
    );
    
    sanPhamReference.maSanPham = sanPham.maSanPham;
    sanPhamReference.ten = sanPham.ten;
    sanPhamReference.linkAnh = sanPham.linkAnh;
    sanPhamReference.loai = sanPham.loai;
    sanPhamReference.gia = sanPham.gia;
    
}

//Delete row in table
function deleteRowInTable(sanPham) {
    let oldsanPhamRow = getRowInTable(sanPham);
    tableQuanLysanPham.row(oldsanPhamRow).remove().draw();

    //Change in sanPhams
    sanPhams = sanPhams.filter(
        (item) => item.maSanPham != sanPham.maSanPham
    );
}
    
