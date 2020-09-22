
//Get a row in table
function getRowInTable(ban) {
    return $('#tableQuanLyBan').find(`.idBan[data="${ban.idBan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ban) {
    tableQuanLyBan.row.add([
        ban.idBan, ban.ten, ban.ghiChu, ban
    ]).draw();

    //Change in bans
    bans.push({ 
        idBan: ban.idBan, ten: ban.ten, ghiChu: ban.ghiChu
    });
}

//Edit row in table
function editRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).data([
        ban.idBan, ban.ten, ban.ghiChu, ban
    ]).draw();

    //Change in bans
    let banReference = bans.find(
        (item) => item.idBan == ban.idBan
    );
    
    banReference.idBan = ban.idBan;
    banReference.ten = ban.ten;
    banReference.ghiChu = ban.ghiChu;
    
}

//Delete row in table
function deleteRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).remove().draw();

    //Change in bans
    bans = bans.filter(
        (item) => item.idBan != ban.idBan
    );
}
    
