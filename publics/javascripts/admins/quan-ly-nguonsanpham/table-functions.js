
//Get a row in table
function getRowInTable(nguonsanpham) {
    return $('#tableQuanLyNguonsanpham').find(`.manguonsanpham[data="${nguonsanpham.manguonsanpham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nguonsanpham) {
    tableQuanLyNguonsanpham.row.add([
        nguonsanpham.manguonsanpham, nguonsanpham.ten, nguonsanpham.sodienthoai, nguonsanpham.diachi, nguonsanpham
    ]).draw();

    //Change in nguonsanphams
    nguonsanphams.push({ 
        manguonsanpham: nguonsanpham.manguonsanpham, ten: nguonsanpham.ten, sodienthoai: nguonsanpham.sodienthoai, diachi: nguonsanpham.diachi
    });
}

//Edit row in table
function editRowInTable(nguonsanpham) {
    let oldNguonsanphamRow = getRowInTable(nguonsanpham);
    tableQuanLyNguonsanpham.row(oldNguonsanphamRow).data([
        nguonsanpham.manguonsanpham, nguonsanpham.ten, nguonsanpham.sodienthoai, nguonsanpham.diachi, nguonsanpham
    ]).draw();

    //Change in nguonsanphams
    let nguonsanphamReference = nguonsanphams.find(
        (item) => item.manguonsanpham == nguonsanpham.manguonsanpham
    );
    
    nguonsanphamReference.manguonsanpham = nguonsanpham.manguonsanpham;
    nguonsanphamReference.ten = nguonsanpham.ten;
    nguonsanphamReference.sodienthoai = nguonsanpham.sodienthoai;
    nguonsanphamReference.diachi = nguonsanpham.diachi;
    
}

//Delete row in table
function deleteRowInTable(nguonsanpham) {
    let oldNguonsanphamRow = getRowInTable(nguonsanpham);
    tableQuanLyNguonsanpham.row(oldNguonsanphamRow).remove().draw();

    //Change in nguonsanphams
    nguonsanphams = nguonsanphams.filter(
        (item) => item.manguonsanpham != nguonsanpham.manguonsanpham
    );
}
    
