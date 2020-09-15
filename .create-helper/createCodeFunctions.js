const fs = require('fs');

module.exports.capitalize = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};
module.exports.capitalizeFirst = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};
module.exports.lowercaseFirst = (input) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
};
module.exports.convertTableNameToSqlProperty = (name) => {
    return name.toLowerCase();
};
module.exports.convertNameToSqlProperty = (name) => {
    return name.toUpperCase();
};
module.exports.convertNameToJSClass = (name) => {
    return name
        .toLowerCase()
        .split('_')
        .map((item) => (module.exports.capitalizeFirst(item)))
        .join('');
};
module.exports.convertNameToJSProperty = (name) => {
    return module.exports.lowercaseFirst(
        name
            .toLowerCase()
            .split('_')
            .map((item) => module.exports.capitalizeFirst(item))
            .join('')
    );
};
module.exports.convertTableNameToFolderName = (tableName) => {
    return tableName.replace(/_/g, '-').toLowerCase();
};

module.exports.writeStringSync = (path, filename, content) => {
    //Check dir exists
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    //Write code to file
    fs.writeFileSync(`${path}/${filename}`, content, { encoding: 'utf8' });
};
