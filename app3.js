var Sequelize = require('sequelize');
// @ts-ignore
var connection = new Sequelize('demo_schema', 'root', 'password', {
    dialect: 'mysql'
});

var Article = connection.define('articles2', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},{
  timestamps: false,
  freezeTableName: true,
  hooks: {
    afterCreate: () => {console.log('This is the afterCreate hook log')}
  }
})


connection.
  sync({
    force: true
  })
  .then(() => {
    var req = {
      body: {
        title: 'Some title',
        body: 'Some body of document',
        approved: true
      }
    }
    var articleInstance = Article.build(req.body)
    articleInstance.save({fields: ['title', 'body']}); // whitelisting user's hacking 

    return articleInstance;
  }).then((insertedArticle) => {
    console.log(insertedArticle.dataValues);
  })

  connection.
    sync({
      force: true
    })
    .then(() => {
      return Article.bulkCreate([
        {
          title: 'Article 1 title',
          body: 'Article 1 body'
        },{
          title: 'Article 2 title',
          body: 'Article 2 body'
        },{
          title: 'Article 3 title',
          body: 'Article 3 body'
        }
      ],
      {
        fields: ['title', 'body'],
        ignoreDuplicate: true,
        validate: true // enable validation, otherwise bulkCreate will skip it in order to be fast!
      })
    }).then()
