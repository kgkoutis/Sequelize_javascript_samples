var Sequelize = require('sequelize');
// @ts-ignore
var connnect = new Sequelize('demo_schema', 'root', 'password', {
    dialect: 'mysql'
});

var Article = connnect.define('articles', {
    slug: {
        type: Sequelize.STRING, 
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [2,15],
                msg: 'Please enter a title with at least 2 charachters and not more than 15 characters'
            }
        }
    },
    body: {
        type: Sequelize.TEXT,
        defaultValue: 'Coming soon',
    }
},
    {
        timestamps: false, // don't insert timestamps
        freezeTableName: true, // do or don't pluralize names
        hooks: {
            afterCreate: (article) => {console.log('it was indeed created with body: ' + article.body)}
        }
    }
);

connnect.sync({
    force: true,
    logging: console.log
}).then(() => {
    Article.create({
        slug: 'Some-slug',
        title: 'demo title1',
    });
    Article.create({
        slug: 'Some-slug2',
        title: 'demo title2',
        body: 'Lorem ipsum dolor sit amet'
    });
    Article.create({
        slug: 'Some-slug3',
        title: 'demo title3',
        body: 'Lorem ipsum dolor sit amet'
    });
    Article.create({
        slug: 'Some-slug4',
        title: 'demo title4'
    });
    Article.create({
        slug: 'Some-slug5',
       // title: 'Some very very very very long title'
        title: 'demo title5',
    });
}).then(() => {
    connnect.sync().then(() => {
        Article.findByPk('Some-slug3').then((article) => {
            console.log(article.dataValues);
        });
    })

    connnect.sync().then(() => {
        Article.findAll().then((article) => {
            console.log(article.length);
        });
    })
}).catch((error) => {console.log(error);});


// var myGuest = connnect.define('MyGuests', {
//     id: {
//         type: Sequelize.INTEGER.UNSIGNED,
//         auto_increment: true,
//         primaryKey: true
//     },
//     email: {
//         type: Sequelize.STRING(50),
//         //defaultValue: 'MyDefaultValue'
//     },
//     reg_date: {
//         type: Sequelize.TIME,
//     }
// },
//     {
//         timestamps: false, // don't insert timestamps
//         freezeTableName: true // do or don't pluralize names
//     }
// );

// connnect.sync().then(() => {
//     myGuest.create({
//         id: 5,
//     })
// }).catch((error) => {console.log(error);})