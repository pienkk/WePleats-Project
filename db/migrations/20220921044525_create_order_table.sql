-- migrate:up
CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    order_list INT NOT NULL,
    order_status INT NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_user_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT order_product_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT order_list_fkey FOREIGN KEY (order_list) REFERENCES order_list (id)
)
-- migrate:down
DROP TABLE orders