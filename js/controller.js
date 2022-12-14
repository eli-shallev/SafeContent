'use strict'

function onLogin(ev) {
    ev.preventDefault()

    const username = document.querySelector('[name="user-name"]').value
    const password = document.querySelector('[name="password"]').value
    const user = doLogin(username, password)
    if (!user) {
        alert('Wrong username or password')
        return
    }
    window.location.assign('loggedin.html')

}

function onLogout() {
    doLogout()
    window.location.assign('index.html')
}

function onInitLoggedin() {
    const user = getLoggenUser()
    document.querySelector('.logged-user-name').innerText = user.username
    if (!user.isAdmin) document.querySelector('.admin-btn').hidden = true

}

function onInitAdmin() {
    const user = getLoggenUser()
    if (!user.isAdmin) window.location.assign('loggedin.html')
    rednerUsersTable()
}

function onReturntoLoggedin() {
    window.location.assign('loggedin.html')
}

function onGoToAdmin() {
    window.location.assign('admin.html')
}

function onSetsort(value) {
    setSortMethod(value)
    rednerUsersTable()
}

function rednerUsersTable() {
    const users = sortUsers(getUsersFromStorage(), getSortMethod())

    const strHTML = users.map(user => {
        var date = new Date(user.lastLoginTime)
        return `<tr><td>${user.username}</td><td>${user.password}</td><td>${date.toString()}</td><td>${user.isAdmin}</td></tr>`
    }).join('')

    const elTable = document.querySelector('.table-container')
    elTable.innerHTML = strHTML
}

function sortUsers(users, sortBy) {
    if(sortBy === 'username'){
        users.sort((user1,user2)=> {
            if(user1.username>user2.username) return 1
            if(user1.username<user2.username) return -1
            return 0
        })
    }

    if(sortBy==='lastloggedin'){
        users.sort((user1,user2) => user1.lastLoginTime-user2.lastLoginTime)
    }
    return users
}

