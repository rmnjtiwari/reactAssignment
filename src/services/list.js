export default function getUsers() {
    return fetch("https://reqres.in/api/users").then(data => data.json())
}