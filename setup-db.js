const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  // First, connect to postgres database to create our app database
  const adminPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Connect to default postgres database
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  });

  try {
    console.log('🔍 Checking if database exists...');
    
    // Check if database exists
    const dbExists = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME || 'todoapp']
    );

    if (dbExists.rows.length === 0) {
      console.log('📦 Creating database...');
      await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME || 'todoapp'}`);
      console.log('✅ Database created successfully!');
    } else {
      console.log('✅ Database already exists!');
    }

    await adminPool.end();

    // Now connect to our app database and create tables
    const appPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'todoapp',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
    });

    console.log('🏗️  Creating tables...');
    
    // Read and execute the init SQL file
    const initSQL = fs.readFileSync(path.join(__dirname, 'config/init.sql'), 'utf8');
    await appPool.query(initSQL);
    
    console.log('✅ Tables created successfully!');
    console.log('🎉 Database setup complete!');
    
    console.log('\n📋 Setup Summary:');
    console.log(`   Database: ${process.env.DB_NAME || 'todoapp'}`);
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Port: ${process.env.DB_PORT || 5432}`);
    console.log(`   User: ${process.env.DB_USER || 'postgres'}`);
    console.log('\n🚀 You can now start the application with: npm run dev');
    
    await appPool.end();
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. PostgreSQL is running');
    console.error('   2. Your database credentials in .env are correct');
    console.error('   3. The database user has permission to create databases');
    process.exit(1);
  }
}

// Run the setup
setupDatabase();