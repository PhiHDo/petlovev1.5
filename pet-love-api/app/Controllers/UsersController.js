const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allUsers = async (ctx) => {
    console.log('users all users called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            users
                        ORDER BY username
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::allUsers", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allUsers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const allUsersEmails = async (ctx) => {
    console.log('users all users called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT email
                        FROM 
                            users
                        ORDER BY email
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::allUsersEmails", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allUsersEmails.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const userWithEmail = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            users
                        WHERE 
                            email = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.email]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UsersController::userWithEmail", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in userWithEmail.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const usersWithUsername = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users
                    WHERE 
                        username LIKE ?
                    `;
        dbConnection.query({
            sql: query,
            values: [`${ctx.params.username}%`]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersWithUsername", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersWithUsername.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const usersByPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users u, pet_parents p
                    WHERE 
                        u.email = p.user
                    AND
                        p.pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersByPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersByPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const usersByPetSitting = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users u, pet_sitters p
                    WHERE 
                        u.email = p.user
                    AND
                        p.pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersByPetSitting", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersByPetSitting.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const rolesWithEmail = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        roles
                    WHERE 
                        user = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::rolesWithEmail", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in rolesWithEmail.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const friendsByUser = (ctx) => { //FIXME: idk how to do this query
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        friendships
                    WHERE 
                        user1 = ?
                    OR
                        user2 = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user, ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::friendsByUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in friendsByUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allUsers,
    allUsersEmails,
    userWithEmail,
    usersWithUsername,
    usersByPet,
    usersByPetSitting,
    rolesWithEmail,
    friendsByUser
};
