
//Get a row in table
function getRowInTable(khachhang) {
    return $('#tableQuanLykhachhang').find(`.makhachhang[data="${khachhang.makhachhang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(khachhang) {
    tableQuanLykhachhang.row.add([
        khachhang.makhachhang, khachhang.mataikhoan, khachhang.ten, khachhang.ngaysinh, khachhang.sodienthoai, khachhang.ghichu, khachhang
    ]).draw();

    //Change in khachhangs
    khachhangs.push({ 
        makhachhang: khachhang.makhachhang, mataikhoan: khachhang.mataikhoan, ten: khachhang.ten, ngaysinh: khachhang.ngaysinh, sodienthoai: khachhang.sodienthoai, ghichu: khachhang.ghichu
    });
}

//Edit row in table
function editRowInTable(khachhang) {
    let oldkhachhangRow = getRowInTable(khachhang);
    tableQuanLykhachhang.row(oldkhachhangRow).data([
        khachhang.makhachhang, khachhang.mataikhoan, khachhang.ten, khachhang.ngaysinh, khachhang.sodienthoai, khachhang.ghichu, khachhang
    ]).draw();

    //Change in khachhangs
    let khachhangReference = khachhangs.find(
        (item) => item.makhachhang == khachhang.makhachhang
    );
    
    khachhangReference.makhachhang = khachhang.makhachhang;
    khachhangReference.mataikhoan = khachhang.mataikhoan;
    khachhangReference.ten = khachhang.ten;
    khachhangReference.ngaysinh = khachhang.ngaysinh;
    khachhangReference.sodienthoai = khachhang.sodienthoai;
    khachhangReference.ghichu = khachhang.ghichu;
    
}

//Delete row in table
function deleteRowInTable(khachhang) {
    let oldkhachhangRow = getRowInTable(khachhang);
    tableQuanLykhachhang.row(oldkhachhangRow).remove().draw();

    //Change in khachhangs
    khachhangs = khachhangs.filter(
        (item) => item.makhachhang != khachhang.makhachhang
    );
}
    