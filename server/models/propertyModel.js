const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

class PropertyQuery {
  constructor() {
    this.query = "SELECT * FROM properties";
    this.orderBy = "";
    this.limitValue = null;
  }

  sort(data) {
    const column = Object.keys(data)[0];

    const order = data[column] === -1 ? "DESC" : "ASC";

    this.orderBy = ` ORDER BY ${column} ${order}`;

    return this;
  }

  limit(number) {
    this.limitValue = number;

    return this;
  }

  async execute() {
    let finalQuery = this.query;

    if (this.orderBy) {
      finalQuery += this.orderBy;
    }

    if (this.limitValue) {
      finalQuery += ` LIMIT ${this.limitValue}`;
    }

    const [rows] = await pool.query(finalQuery);

    return rows;
  }
}

class PropertyModel {
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async createProperty(
    title,
    location,
    type,
    amenities,
    size,
    year,
    bedroom,
    bathroom,
    description,
    image,
    price,
  ) {
    const id = uuidv4();

    await pool.query(
      `INSERT INTO properties
      (id, title, location, type, amenities, size, year, bedroom, bathroom, description, image, price, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        id,
        title,
        location,
        type,
        amenities,
        size,
        year,
        bedroom,
        bathroom,
        description,
        image,
        price,
      ],
    );

    return this.getById(id);
  }

  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM properties");
    return rows[0].total;
  }
  static async getAllProperty() {
    const [rows] = await pool.query("SELECT *  FROM properties");
    return rows;
  }

  static async aggregate(type) {
    try {
      let query = "";

      switch (type) {
        case "monthlyProperty":
          query = `
                    
                    SELECT 
                        MONTH(created_at) AS month,
                        COUNT(*) AS count

                    FROM properties

                    GROUP BY MONTH(created_at)

                    ORDER BY month ASC
                    
                    `;

          break;

        case "yearlyProperty":
          query = `
                    
                    SELECT 
                        YEAR(created_at) AS year,
                        COUNT(*) AS count

                    FROM properties

                    GROUP BY YEAR(created_at)

                    ORDER BY year ASC
                    
                    `;

          break;

        case "categoryWise":
          query = `
                    
                    SELECT 
                        category,
                        COUNT(*) AS count

                    FROM properties

                    GROUP BY category
                    
                    `;

          break;

        default:
          throw new Error("Invalid aggregate type");
      }
      const [rows] = await pool.query(query);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  static find() {
    return new PropertyQuery();
  }
}

module.exports = PropertyModel;
