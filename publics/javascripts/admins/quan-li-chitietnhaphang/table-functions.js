
//Get a row in table
function getRowInTable(chitietnhaphang) {
    return $('#tableQuanLychitietnhaphang').find(`.manhaphang[data="${chitietnhaphang.manhaphang}"]`).parents('tr').find(`.masanpham[data="${chitietnhaphang.masanpham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(chitietnhaphang) {
    tableQuanLychitietnhaphang.row.add([
        chitietnhaphang.manhaphang, chitietnhaphang.masanpham, chitietnhaphang.soluong, chitietnhaphang.dongia, chitietnhaphang
    ]).draw();

    //Change in chitietnhaphangs
    chitietnhaphangs.push({ 
        manhaphang: chitietnhaphang.manhaphang, masanpham: chitietnhaphang.masanpham, soluong: chitietnhaphang.soluong, dongia: chitietnhaphang.dongia
    });
}

//Edit row in table
function editRowInTable(chitietnhaphang) {
    let oldchitietnhaphangRow = getRowInTable(chitietnhaphang);
    tableQuanLychitietnhaphang.row(oldchitietnhaphangRow).data([
        chitietnhaphang.manhaphang, chitietnhaphang.masanpham, chitietnhaphang.soluong, chitietnhaphang.dongia, chitietnhaphang
    ]).draw();

    //Change in chitietnhaphangs
    let chitietnhaphangReference = chitietnhaphangs.find(
        (item) => item.manhaphang == chitietnhaphang.manhaphang && item.masanpham == chitietnhaphang.masanpham
    );
    
    chitietnhaphangReference.manhaphang = chitietnhaphang.manhaphang;
    chitietnhaphangReference.masanpham = chitietnhaphang.masanpham;
    chitietnhaphangReference.soluong = chitietnhaphang.soluong;
    chitietnhaphangReference.dongia = chitietnhaphang.dongia;
    
}

//Delete row in table
function deleteRowInTable(chitietnhaphang) {
    let oldchitietnhaphangRow = getRowInTable(chitietnhaphang);
    tableQuanLychitietnhaphang.row(oldchitietnhaphangRow).remove().draw();

    //Change in chitietnhaphangs
    chitietnhaphangs = chitietnhaphangs.filter(
        (item) => item.manhaphang != chitietnhaphang.manhaphang && item.masanpham != chitietnhaphang.masanpham
    );
}
    
