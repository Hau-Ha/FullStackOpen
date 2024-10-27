

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index'); 
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Author 1',
    url: 'http://example.com/1',
    likes: 3,
  },
  {
    title: 'Test Blog 2',
    author: 'Author 2',
    url: 'http://example.com/2',
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Author 3',
    url: 'http://example.com/3',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('New Blog Post');
});

test('a blog can be deleted', async () => {
    // Fetch all blogs initially
    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];
  
    // Perform DELETE request
    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204);
  
    // Verify the blog count decreased by one
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  
    // Verify the deleted blog is no longer in the database
    const ids = blogsAtEnd.map(blog => blog._id.toString());
    expect(ids).not.toContain(blogToDelete._id.toString());
  }, 10000);
  
  describe('updating a blog', () => {
    test('succeeds in updating likes of an existing blog', async () => {
      const blogsAtStart = await Blog.find({});
      const blogToUpdate = blogsAtStart[0];
  
      const updatedBlogData = {
        likes: blogToUpdate.likes + 5,
      };
  
      const response = await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/);
  
      expect(response.body.likes).toBe(blogToUpdate.likes + 5);
  
      const blogsAtEnd = await Blog.find({});
      const updatedBlog = blogsAtEnd.find(b => b._id.toString() === blogToUpdate._id.toString());
      expect(updatedBlog.likes).toBe(blogToUpdate.likes + 5);
    });
  
    test('returns 404 if blog does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
  
      const updatedBlogData = {
        likes: 10,
      };
  
      await api
        .put(`/api/blogs/${nonExistentId}`)
        .send(updatedBlogData)
        .expect(404);
    });
  });
  
afterAll(() => {
  mongoose.connection.close();
});
