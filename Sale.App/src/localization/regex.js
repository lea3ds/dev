
export const regexs = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //Minimum eight characters, at least one letter and one number
    password: /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/,
}
