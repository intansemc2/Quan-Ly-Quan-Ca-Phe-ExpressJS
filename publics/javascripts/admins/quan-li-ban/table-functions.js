
//Get a row in table
function getRowInTable(ban) {
    return $('#tableQuanLyban').find(`.maban[data="${ban.maban}"]`).parents('tr');
}

//Add new row to table
function addNewRowToTable(ban) {
    tableQuanLyban.row.add([
        ban.maban, ban.ten, ban
    ]).draw();

    //Change in bans
    bans.push({ 
        maban: ban.maban, ten: ban.ten
    });
}

//Edit row in table
function editRowInTable(ban) {
    let oldbanRow = getRowInTable(ban);
    tableQuanLyban.row(oldbanRow).data([
        ban.maban, ban.ten, ban
    ]).draw();

    //Change in bans
    let banReference = bans.find(
        (item) => item.maban == ban.maban
    );
    
    banReference.maban = ban.maban;
    banReference.ten = ban.ten;
    
}

//Delete row in table
function deleteRowInTable(ban) {
    let oldbanRow = getRowInTable(ban);
    tableQuanLyban.row(oldbanRow).remove().draw();

    //Change in bans
    bans = bans.filter(
        (item) => item.maban != ban.maban
    );
}
    
