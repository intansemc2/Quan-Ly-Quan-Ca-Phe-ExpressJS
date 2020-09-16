
//Get a row in table
function getRowInTable(datban) {
    return $('#tableQuanLyDatBan').find(`.idDatBan[data="${datban.idDatBan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(datban) {
    tableQuanLyDatBan.row.add([datban.idDatBan, datban.username, datban.password, datban.loai, datban]).draw();

    //Change in datbans
    datbans.push({ idDatBan: datban.idDatBan, username: datban.username, password: datban.password, loai: datban.loai });
}

//Edit row in table
function editRowInTable(datban) {
    let oldDatBanRow = getRowInTable(datban);
    tableQuanLyDatBan.row(oldDatBanRow).data([datban.idDatBan, datban.username, datban.password, datban.loai, datban]).draw();

    //Change in datbans
    let datbanReference = datbans.find((item) => item.idDatBan == datban.idDatBan);
    datbanReference.username = datban.username;
    datbanReference.password = datban.password;
    datbanReference.loai = datban.loai;
}

//Delete row in table
function deleteRowInTable(datban) {
    let oldDatBanRow = getRowInTable(datban);
    tableQuanLyDatBan.row(oldDatBanRow).remove().draw();

    //Change in datbans
    datbans = datbans.filter((item) => item.idDatBan != datban.idDatBan);
}
    
