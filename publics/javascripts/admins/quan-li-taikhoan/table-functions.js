
//Get a row in table
function getRowInTable(taikhoan) {
    return $('#tableQuanLytaikhoan').find(`.mataikhoan[data="${taikhoan.mataikhoan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(taikhoan) {
    tableQuanLytaikhoan.row.add([
        taikhoan.mataikhoan, taikhoan.tendangnhap, taikhoan.matkhau, taikhoan.loai, taikhoan
    ]).draw();

    //Change in taikhoans
    taikhoans.push({ 
        mataikhoan: taikhoan.mataikhoan, tendangnhap: taikhoan.tendangnhap, matkhau: taikhoan.matkhau, loai: taikhoan.loai
    });
}

//Edit row in table
function editRowInTable(taikhoan) {
    let oldtaikhoanRow = getRowInTable(taikhoan);
    tableQuanLytaikhoan.row(oldtaikhoanRow).data([
        taikhoan.mataikhoan, taikhoan.tendangnhap, taikhoan.matkhau, taikhoan.loai, taikhoan
    ]).draw();

    //Change in taikhoans
    let taikhoanReference = taikhoans.find(
        (item) => item.mataikhoan == taikhoan.mataikhoan
    );
    
    taikhoanReference.mataikhoan = taikhoan.mataikhoan;
    taikhoanReference.tendangnhap = taikhoan.tendangnhap;
    taikhoanReference.matkhau = taikhoan.matkhau;
    taikhoanReference.loai = taikhoan.loai;
    
}

//Delete row in table
function deleteRowInTable(taikhoan) {
    let oldtaikhoanRow = getRowInTable(taikhoan);
    tableQuanLytaikhoan.row(oldtaikhoanRow).remove().draw();

    //Change in taikhoans
    taikhoans = taikhoans.filter(
        (item) => item.mataikhoan != taikhoan.mataikhoan
    );
}
    
