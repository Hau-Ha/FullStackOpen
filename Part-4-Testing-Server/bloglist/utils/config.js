

const PORT = 3003; // Your desired port

// Use different MongoDB URLs based on the environment
const MONGODB_URL = process.env.NODE_ENV === 'test'
  ? 'mongodb+srv://haduyhau:Qaz195200@cluster0.dsxkr.mongodb.net/bloglist_test?retryWrites=true&w=majority&appName=Cluster0' // Test database
  : 'mongodb+srv://haduyhau:Qaz195200@cluster0.dsxkr.mongodb.net/bloglist?retryWrites=true&w=majority&appName=Cluster0'; // Development database

module.exports = { PORT, MONGODB_URL };

