// verificacion de admin

export function onlyAdmin(req, res, next){
    if(req.user.rol === "admin"){
        next();
    }else{
        res.status(403).send("Acceso denegado");
    }
}


//verificacion de user
export function onlyUser(req, res, next){
    if(req.user.rol === "user"){
        next();
    }else{
        res.status(403).send("Acceso denegado");
    }
}