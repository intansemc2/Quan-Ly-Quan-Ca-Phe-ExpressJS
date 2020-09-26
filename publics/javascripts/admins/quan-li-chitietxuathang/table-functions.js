
//Get a row in table
function getRowInTable(chitietxuathang) {
    return $('#tableQuanLychitietxuathang').find(`.maxuathang[data="${chitietxuathang.maxuathang}"]`).parents('tr').find(`.masanpham[data="${chitietxuathang.masanpham}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(chitietxuathang) {
    tableQuanLychitietxuathang.row.add([
        chitietxuathang.maxuathang, chitietxuathang.masanpham, chitietxuathang.soluong, chitietxuathang.dongia, chitietxuathang
    ]).draw();

    //Change in chitietxuathangs
    chitietxuathangs.push({ 
        maxuathang: chitietxuathang.maxuathang, masanpham: chitietxuathang.masanpham, soluong: chitietxuathang.soluong, dongia: chitietxuathang.dongia
    });
}

//Edit row in table
function editRowInTable(chitietxuathang) {
    let oldchitietxuathangRow = getRowInTable(chitietxuathang);
    tableQuanLychitietxuathang.row(oldchitietxuathangRow).data([
        chitietxuathang.maxuathang, chitietxuathang.masanpham, chitietxuathang.soluong, chitietxuathang.dongia, chitietxuathang
    ]).draw();

    //Change in chitietxuathangs
    let chitietxuathangReference = chitietxuathangs.find(
        (item) => item.maxuathang == chitietxuathang.maxuathang && item.masanpham == chitietxuathang.masanpham
    );
    
    chitietxuathangReference.maxuathang = chitietxuathang.maxuathang;
    chitietxuathangReference.masanpham = chitietxuathang.masanpham;
    chitietxuathangReference.soluong = chitietxuathang.soluong;
    chitietxuathangReference.dongia = chitietxuathang.dongia;
    
}

//Delete row in table
function deleteRowInTable(chitietxuathang) {
    let oldchitietxuathangRow = getRowInTable(chitietxuathang);
    tableQuanLychitietxuathang.row(oldchitietxuathangRow).remove().draw();

    //Change in chitietxuathangs
    chitietxuathangs = chitietxuathangs.filter(
        (item) => item.maxuathang != chitietxuathang.maxuathang && item.masanpham != chitietxuathang.masanpham
    );
}
    
