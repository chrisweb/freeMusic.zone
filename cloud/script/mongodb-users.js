// create a mongodb admin
use admin
db.createUser(
    {
        user: "mongoUserAdmin",
        pwd: "strong_password_here",
        roles: [{role: "userAdminAnyDatabase", db: "admin"}]
    }
);
// create the users needed by the app
use freemusiczone
db.createUser(
    {
        user: "mongoUserRead",
        pwd: "strong_password_here",
        roles: [
            {role: "read", db: "freemusiczone"}
        ]
    }
);
db.createUser(
    {
        user: "mongoUserReadWrite",
        pwd: "strong_password_here",
        roles: [
            {role: "readWrite", db: "freemusiczone"}
        ]
    }
);