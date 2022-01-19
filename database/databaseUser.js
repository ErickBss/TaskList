function databaseUser(connection) {
    this.userConnection = connection
}

databaseUser.prototype.register = function (data, callback) {
    this.userConnection.query('INSERT INTO users SET ?', data, callback)
}

databaseUser.prototype.selectTasks = function(callback){
    this.userConnection.query('SELECT * FROM users', callback);
}

databaseUser.prototype.search = function(id,callback){
    this.userConnection.query('SELECT * FROM users WHERE id = ?',id,callback);
}

databaseUser.prototype.change = function(data,callback){
    this.userConnection.query('UPDATE users SET ? WHERE id = ? ', [data, data.id], callback);
}
databaseUser.prototype.done = function(data,callback){
    this.userConnection.query('UPDATE users SET ? WHERE id = ?',[data, data.id], callback);
}

module.exports = function() {
    return databaseUser
}