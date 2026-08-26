CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    amenities TEXT,
    size INT DEFAULT 0,
    year INT DEFAULT NULL,
    bedroom INT DEFAULT 0,
    bathroom INT DEFAULT 0,
    description TEXT,
    image VARCHAR(500),
    price DECIMAL(15,2) DEFAULT 0.00,
    views INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    summary VARCHAR(500) DEFAULT NULL,
    category ENUM(
        'General',
        'Market Trends',
        'Investment Tips',
        'Property News',
        'Legal Updates'
    ) DEFAULT 'General',
    image VARCHAR(500) DEFAULT NULL,
    author VARCHAR(100) DEFAULT 'Admin',
    created_at DATETIME DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS services (
    id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug TEXT DEFAULT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    display_order INT(11) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS service_queries (
    id CHAR(36) NOT NULL,
    service_id CHAR(36) NOT NULL,
    service_title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    email_status ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_service_queries_created_at (created_at),
    CONSTRAINT fk_service_queries_service
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    image VARCHAR(500) DEFAULT NULL,
    facebook VARCHAR(255) DEFAULT NULL,
    instagram VARCHAR(255) DEFAULT NULL,
    twitter VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    about VARCHAR(250) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS gallery (
    id VARCHAR(36) NOT NULL,
    title VARCHAR(255) DEFAULT NULL,
    image VARCHAR(500) NOT NULL,
    category ENUM(
        'bedroom',
        'bathroom',
        'kitchen',
        'garage',
        'basement',
        'exterior'
    ) DEFAULT 'bedroom',
    description VARCHAR(500) DEFAULT NULL,
    created_at DATETIME DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(255) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    new_id VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
