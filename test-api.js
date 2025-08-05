const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check:', healthResponse.data.message);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
      console.log('✅ User registration successful');
      console.log('   Token received:', !!registerResponse.data.token);
      
      const token = registerResponse.data.token;

      // Test creating a todo
      console.log('\n3. Testing todo creation...');
      const todoData = {
        title: 'Test Todo',
        description: 'This is a test todo created by the API test'
      };

      const todoResponse = await axios.post(`${API_URL}/todos`, todoData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Todo creation successful');
      console.log('   Todo ID:', todoResponse.data.id);

      // Test getting todos
      console.log('\n4. Testing get todos...');
      const todosResponse = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Get todos successful');
      console.log('   Number of todos:', todosResponse.data.length);

      console.log('\n🎉 All API tests passed!');
      
    } catch (error) {
      if (error.response?.data?.error === 'User already exists with this email') {
        console.log('ℹ️  Test user already exists, trying login...');
        
        // Test login
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Login successful');
        console.log('   Token received:', !!loginResponse.data.token);
        
        console.log('\n🎉 API test completed (using existing user)!');
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    console.error('\n💡 Make sure:');
    console.error('   1. The server is running (npm run dev)');
    console.error('   2. PostgreSQL is running and configured');
    console.error('   3. Database tables are created');
  }
}

// Run the test
testAPI();