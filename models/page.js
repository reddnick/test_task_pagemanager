const Sequelize = require('sequelize');

class Page extends Sequelize.Model {
    static init(sequelize, type) {
        return super.init(
            {
                id: {
                    type: type.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    field: "id"
                },
                name: {
                    field: 'name',
                    type: type.STRING,
                    notEmpty: true,
                    allowNull: false,
                },
                meta: {
                    field: 'meta',
                    type: type.STRING,
                    notEmpty: true,
                    allowNull: false
                },
                slug: {
                    type: type.STRING,
                    allowNull: false,
                    unique: true,
                    field: 'slug'
                },
                content: {
                    type: type.TEXT,
                    allowNull: false,
                    field: 'content'
                },

            },
            {
                tableName: 'pages',
                timestamps: false,
                sequelize
            }
        );
    }


    toJSON() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            content: this.content,
            meta: this.meta
        }
    }
}

module.exports = Page;
