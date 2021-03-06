const User = require('./user');
const Post = require('./blogPosts');


User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = {User, Post};