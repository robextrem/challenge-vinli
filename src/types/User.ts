import Store from "./Organization"

interface User{
    uuid: string,
    firstName: string,
    lastName: string,
    email: string,
    orgs: Store[],
    username: string
}

export default User