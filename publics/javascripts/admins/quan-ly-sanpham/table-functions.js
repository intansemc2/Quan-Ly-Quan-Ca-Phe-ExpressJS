
//Get a row in table
function getRowInTable(sanpham) {
    return $('#tableQuanLySanpham').find(`.masanpham[data="${sanpham.masanpham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(sanpham) {
    tableQuanLySanpham.row.add([
        sanpham.masanpham, sanpham.ten, sanpham.linkanh, sanpham.loai, sanpham.gia, sanpham
    ]).draw();

    //Change in sanphams
    sanphams.push({ 
        masanpham: sanpham.masanpham, ten: sanpham.ten, linkanh: sanpham.linkanh, loai: sanpham.loai, gia: sanpham.gia
    });
}

//Edit row in table
function editRowInTable(sanpham) {
    let oldSanphamRow = getRowInTable(sanpham);
    tableQuanLySanpham.row(oldSanphamRow).data([
        sanpham.masanpham, sanpham.ten, sanpham.linkanh, sanpham.loai, sanpham.gia, sanpham
    ]).draw();

    //Change in sanphams
    let sanphamReference = sanphams.find(
        (item) => item.masanpham == sanpham.masanpham
    );
    
    sanphamReference.masanpham = sanpham.masanpham;
    sanphamReference.ten = sanpham.ten;
    sanphamReference.linkanh = sanpham.linkanh;
    sanphamReference.loai = sanpham.loai;
    sanphamReference.gia = sanpham.gia;
    
}

//Delete row in table
function deleteRowInTable(sanpham) {
    let oldSanphamRow = getRowInTable(sanpham);
    tableQuanLySanpham.row(oldSanphamRow).remove().draw();

    //Change in sanphams
    sanphams = sanphams.filter(
        (item) => item.masanpham != sanpham.masanpham
    );
}
    
