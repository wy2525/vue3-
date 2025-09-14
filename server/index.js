import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接配置
const dbConfig = {
  host: 'localhost',
  user: 'root',      // 默认用户名，根据你的MySQL配置修改
  password: '',      // 默认密码为空，根据你的MySQL配置修改
  database: 'product_admin'  // 数据库名称，需要在MySQL中创建
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 测试数据库连接
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: '数据库连接成功!' });
  } catch (error) {
    console.error('数据库连接失败:', error);
    res.status(500).json({ error: '数据库连接失败', details: error.message });
  }
});

// 获取所有商品
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('获取商品失败:', error);
    res.status(500).json({ error: '获取商品失败', details: error.message });
  }
});

// 添加商品
app.post('/api/products', async (req, res) => {
  const { name, price, description, stock } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)',
      [name, price, description, stock]
    );
    
    res.status(201).json({ 
      id: result.insertId,
      message: '商品添加成功' 
    });
  } catch (error) {
    console.error('添加商品失败:', error);
    res.status(500).json({ error: '添加商品失败', details: error.message });
  }
});

// 更新商品
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  
  try {
    const [result] = await pool.query(
      'UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?',
      [name, price, description, stock, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '商品不存在' });
    }
    
    res.json({ message: '商品更新成功' });
  } catch (error) {
    console.error('更新商品失败:', error);
    res.status(500).json({ error: '更新商品失败', details: error.message });
  }
});

// 删除商品
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '商品不存在' });
    }
    
    res.json({ message: '商品删除成功' });
  } catch (error) {
    console.error('删除商品失败:', error);
    res.status(500).json({ error: '删除商品失败', details: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});