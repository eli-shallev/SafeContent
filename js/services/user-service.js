'use strict'

const ALL_USERS_STORAGE_KEY = 'usersDB'
const LOGGEDIN_USER_STORAGE_KEY = 'loggedinUser'
var gUsers
var gSortBy = 'username'
_createUsers()

function _createUser(username, password, isAdmin) {
    return {
        id: _makeId(),
        username,
        password,
        lastLoginTime: 0,
        isAdmin
    }
}

function _createUsers() {
    gUsers = loadFromStorage(ALL_USERS_STORAGE_KEY)
    if (!gUsers || !gUsers.length) {
        gUsers = [
            _createUser('Momo', '1234', false),
            _createUser('Zuko', '1234', false),
            _createUser('Aang', '1234', true)
        ]
        saveToStorage(ALL_USERS_STORAGE_KEY, gUsers)
    }
}

function doLogin(username, password) {
    const currUser = gUsers.find(user => (user.username === username
        && user.password === password))
    if(!currUser) return null
    currUser.lastLoginTime = Date.now()
    saveToStorage(LOGGEDIN_USER_STORAGE_KEY,currUser)
    saveToStorage(ALL_USERS_STORAGE_KEY, gUsers)
    return currUser
}

function doLogout(){
    removeFromStorage(LOGGEDIN_USER_STORAGE_KEY)
}

function getLoggenUser(){
    return loadFromStorage(LOGGEDIN_USER_STORAGE_KEY)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getUsersFromStorage(){
    return loadFromStorage(ALL_USERS_STORAGE_KEY)
}

function setSortMethod(sortBy){
    gSortBy=sortBy
}
function getSortMethod(){
    return gSortBy
}