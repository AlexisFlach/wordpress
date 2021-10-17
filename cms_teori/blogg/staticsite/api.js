const api = (function(){
  const data = [
    {
      title: 'My first Blog Post',
      text: 'This is the text for the blog post'
    },
    {
      title: 'My second Blog Post',
      text: 'This is the text for the blog post'
    },
    {
      title: 'My third Blog Post',
      text: 'This is the text for the blog post'
    },
    {
      title: 'My fourth Blog Posted',
      text: 'This is the text for the blog post'
    },
    {
      title: 'My Fifth blog post',
      text: 'This is the text for the blog post'
    }
  ];

  return {
    generatePosts: function() {
      return data;
    }
  }
})();


exports.api = api;