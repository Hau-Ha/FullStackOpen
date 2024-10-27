

const dummy = (blogs) => {
    return 1;
  };
  
  // Function to calculate the total likes for all blogs
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };
  
  module.exports = {
    dummy,
    totalLikes,
  };
  