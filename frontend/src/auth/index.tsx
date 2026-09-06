export function auth(token: any, cargo: any, id: any) {
    if (!token || !id) return
    localStorage.setItem("token", token)
    localStorage.setItem("userId", id)
    localStorage.setItem("cargo", cargo)
}

export function getToken() {
    const token = localStorage.getItem("token")
    return token
}
export function getUserId() {
    const userId = localStorage.getItem("userId")
    return userId
}
export function getCargo() {
    const cargo = localStorage.getItem("cargo")
    return cargo
}
