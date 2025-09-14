-- 创建数据库
CREATE DATABASE IF NOT EXISTS product_admin;

-- 使用数据库
USE product_admin;

-- 创建商品表
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 插入一些测试数据
INSERT INTO products (name, price, description, stock) VALUES
('iPhone 15', 6999.00, 'Apple最新款手机', 100),
('MacBook Pro', 12999.00, '专业级笔记本电脑', 50),
('iPad Air', 4999.00, '轻薄平板电脑', 75);