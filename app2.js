var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// @ts-ignore
var connection = new Sequelize('demo_schema', 'root', 'password',{
    dialect: 'mysql'
});

var User = connection.define('User', {
    username: Sequelize.TEXT,
    password: Sequelize.TEXT
},{
    hooks: {
        afterValidate: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
        }
    }
})

connection
    .sync({
        force: true,
        logging: console.log
    })
.then(()=>{
    return User.create({
        username: 'kostas gkoutis',
        password: 'This is my password!'
    });
})
.catch((err) => {
    console.log('err: ',err);
})
