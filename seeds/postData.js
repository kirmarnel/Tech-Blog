const  Post  = require('../models/blogPosts');

const postData = [
  {
    title: 'Post one',
    contents:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ducimus distinctio voluptatem quod, voluptates eius non et doloribus ratione. Tempore maiores voluptas architecto nisi molestiae soluta cumque commodi mollitia sequi?'
  },
  {
    title: 'Post two',
    contents:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ducimus distinctio voluptatem quod, voluptates eius non et doloribus ratione. Tempore maiores voluptas architecto nisi molestiae soluta cumque commodi mollitia sequi?'
  },
  {
    title: 'Post three',
    contents:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ducimus distinctio voluptatem quod, voluptates eius non et doloribus ratione. Tempore maiores voluptas architecto nisi molestiae soluta cumque commodi mollitia sequi?'
  },
];

const seedPosts = () => Post.bulkCreate(postData);


module.exports = seedPosts;
