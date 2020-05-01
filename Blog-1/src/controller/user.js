const loginCheck = (username, password) => {
    if(username === "Uni" && password === "123") {
        return true
    } 
    return false;
}

module.exports = {
    loginCheck
}