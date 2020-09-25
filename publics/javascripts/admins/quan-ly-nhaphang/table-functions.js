
//Get a row in table
function getRowInTable(nhaphang) {
    return $('#tableQuanLyNhaphang').find(`.manhaphang[data="${nhaphang.manhaphang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(nhaphang) {
    tableQuanLyNhaphang.row.add([
        nhaphang.manhaphang, nhaphang.manguonsanpham, nhaphang.ngaygionhap, nhaphang.manhanvien, nhaphang.ghichu, nhaphang
    ]).draw();

    //Change in nhaphangs
    nhaphangs.push({ 
        manhaphang: nhaphang.manhaphang, manguonsanpham: nhaphang.manguonsanpham, ngaygionhap: nhaphang.ngaygionhap, manhanvien: nhaphang.manhanvien, ghichu: nhaphang.ghichu
    });
}

//Edit row in table
function editRowInTable(nhaphang) {
    let oldNhaphangRow = getRowInTable(nhaphang);
    tableQuanLyNhaphang.row(oldNhaphangRow).data([
        nhaphang.manhaphang, nhaphang.manguonsanpham, nhaphang.ngaygionhap, nhaphang.manhanvien, nhaphang.ghichu, nhaphang
    ]).draw();

    //Change in nhaphangs
    let nhaphangReference = nhaphangs.find(
        (item) => item.manhaphang == nhaphang.manhaphang
    );
    
    nhaphangReference.manhaphang = nhaphang.manhaphang;
    nhaphangReference.manguonsanpham = nhaphang.manguonsanpham;
    nhaphangReference.ngaygionhap = nhaphang.ngaygionhap;
    nhaphangReference.manhanvien = nhaphang.manhanvien;
    nhaphangReference.ghichu = nhaphang.ghichu;
    
}

//Delete row in table
function deleteRowInTable(nhaphang) {
    let oldNhaphangRow = getRowInTable(nhaphang);
    tableQuanLyNhaphang.row(oldNhaphangRow).remove().draw();

    //Change in nhaphangs
    nhaphangs = nhaphangs.filter(
        (item) => item.manhaphang != nhaphang.manhaphang
    );
}
    
