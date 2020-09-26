
//Get a row in table
function getRowInTable(taiKhoan) {
    return $('#tableQuanLytaiKhoan').find(`.maTaiKhoan[data="${taiKhoan.maTaiKhoan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(taiKhoan) {
    tableQuanLytaiKhoan.row.add([
        taiKhoan.maTaiKhoan, taiKhoan.tenDangNhap, taiKhoan.matKhau, taiKhoan.loai, taiKhoan
    ]).draw();

    //Change in taiKhoans
    taiKhoans.push({ 
        maTaiKhoan: taiKhoan.maTaiKhoan, tenDangNhap: taiKhoan.tenDangNhap, matKhau: taiKhoan.matKhau, loai: taiKhoan.loai
    });
}

//Edit row in table
function editRowInTable(taiKhoan) {
    let oldtaiKhoanRow = getRowInTable(taiKhoan);
    tableQuanLytaiKhoan.row(oldtaiKhoanRow).data([
        taiKhoan.maTaiKhoan, taiKhoan.tenDangNhap, taiKhoan.matKhau, taiKhoan.loai, taiKhoan
    ]).draw();

    //Change in taiKhoans
    let taiKhoanReference = taiKhoans.find(
        (item) => item.maTaiKhoan == taiKhoan.maTaiKhoan
    );
    
    taiKhoanReference.maTaiKhoan = taiKhoan.maTaiKhoan;
    taiKhoanReference.tenDangNhap = taiKhoan.tenDangNhap;
    taiKhoanReference.matKhau = taiKhoan.matKhau;
    taiKhoanReference.loai = taiKhoan.loai;
    
}

//Delete row in table
function deleteRowInTable(taiKhoan) {
    let oldtaiKhoanRow = getRowInTable(taiKhoan);
    tableQuanLytaiKhoan.row(oldtaiKhoanRow).remove().draw();

    //Change in taiKhoans
    taiKhoans = taiKhoans.filter(
        (item) => item.maTaiKhoan != taiKhoan.maTaiKhoan
    );
}
    
