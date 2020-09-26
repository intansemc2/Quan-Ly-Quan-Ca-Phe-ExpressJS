
//Get a row in table
function getRowInTable(xuathang) {
    return $('#tableQuanLyxuathang').find(`.maxuathang[data="${xuathang.maxuathang}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(xuathang) {
    tableQuanLyxuathang.row.add([
        xuathang.maxuathang, xuathang.ngaygioxuat, xuathang.manhanvien, xuathang.makhachhang, xuathang.maban, xuathang.ghichu, xuathang
    ]).draw();

    //Change in xuathangs
    xuathangs.push({ 
        maxuathang: xuathang.maxuathang, ngaygioxuat: xuathang.ngaygioxuat, manhanvien: xuathang.manhanvien, makhachhang: xuathang.makhachhang, maban: xuathang.maban, ghichu: xuathang.ghichu
    });
}

//Edit row in table
function editRowInTable(xuathang) {
    let oldxuathangRow = getRowInTable(xuathang);
    tableQuanLyxuathang.row(oldxuathangRow).data([
        xuathang.maxuathang, xuathang.ngaygioxuat, xuathang.manhanvien, xuathang.makhachhang, xuathang.maban, xuathang.ghichu, xuathang
    ]).draw();

    //Change in xuathangs
    let xuathangReference = xuathangs.find(
        (item) => item.maxuathang == xuathang.maxuathang
    );
    
    xuathangReference.maxuathang = xuathang.maxuathang;
    xuathangReference.ngaygioxuat = xuathang.ngaygioxuat;
    xuathangReference.manhanvien = xuathang.manhanvien;
    xuathangReference.makhachhang = xuathang.makhachhang;
    xuathangReference.maban = xuathang.maban;
    xuathangReference.ghichu = xuathang.ghichu;
    
}

//Delete row in table
function deleteRowInTable(xuathang) {
    let oldxuathangRow = getRowInTable(xuathang);
    tableQuanLyxuathang.row(oldxuathangRow).remove().draw();

    //Change in xuathangs
    xuathangs = xuathangs.filter(
        (item) => item.maxuathang != xuathang.maxuathang
    );
}
    
