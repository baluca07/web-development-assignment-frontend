function GetToken(): string {
    const token = localStorage.getItem("token");
    if (token === null) {
        throw new Error("You must be logged in to perform this action");
    }
    return token;
}

export default GetToken;