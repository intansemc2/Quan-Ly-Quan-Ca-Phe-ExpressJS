
//Get a row in table
function getRowInTable(ban) {
    return $('#tableQuanLyBan').find(`.idBan[data="${ban.idBan}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ban) {
    tableQuanLyBan.row.add([ban.idBan, ban.username, ban.password, ban.loai, ban]).draw();

    //Change in bans
    bans.push({ idBan: ban.idBan, username: ban.username, password: ban.password, loai: ban.loai });
}

//Edit row in table
function editRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).data([ban.idBan, ban.username, ban.password, ban.loai, ban]).draw();

    //Change in bans
    let banReference = bans.find((item) => item.idBan == ban.idBan);
    banReference.username = ban.username;
    banReference.password = ban.password;
    banReference.loai = ban.loai;
}

//Delete row in table
function deleteRowInTable(ban) {
    let oldBanRow = getRowInTable(ban);
    tableQuanLyBan.row(oldBanRow).remove().draw();

    //Change in bans
    bans = bans.filter((item) => item.idBan != ban.idBan);
}
    
