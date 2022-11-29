-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(2000) NULL,
    category INT NOT NULL,
    color INT NULL,
    price INT NOT NULL,
    size_id INT NULL,
    new BOOLEAN NOT NULL DEFAULT 0,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_category_fkey FOREIGN KEY (category) REFERENCES categorys (id),
    CONSTRAINT product_color_fkey FOREIGN KEY (color) REFERENCES colors (id),
    CONSTRAINT product_size_fkey FOREIGN KEY (size_id) REFERENCES sizes (id)
);
-- migrate:down
DROP TABLE products
