const pool = require('../config/database');

class Todo {
  static async create({ userId, title, description }) {
    const query = `
      INSERT INTO todos (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [userId, title, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM todos 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findById(id, userId) {
    const query = 'SELECT * FROM todos WHERE id = $1 AND user_id = $2';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async update(id, userId, { title, description, completed }) {
    const query = `
      UPDATE todos 
      SET title = COALESCE($3, title),
          description = COALESCE($4, description),
          completed = COALESCE($5, completed),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const values = [id, userId, title, description, completed];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id, userId) {
    const query = 'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }

  static async toggleComplete(id, userId) {
    const query = `
      UPDATE todos 
      SET completed = NOT completed,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, userId]);
    return result.rows[0];
  }
}

module.exports = Todo;