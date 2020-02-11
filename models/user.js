const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Sequelize.Model {
    static init(sequelize, type) {
        const instance = super.init(
            {
                id: {
                    type: type.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    field: "id"
                },
                username: {
                    field: 'username',
                    type: type.STRING,
                    notEmpty: true,
                    allowNull: false,
                },
                password: {
                    type: type.STRING,
                    allowNull: false,
                    field: "password"
                },
            },
            {
                tableName: 'users',
                timestamps: false,
                sequelize
            }
        );
        this.addHook('beforeCreate', (user, opts) => {
            user.setPassword(user.password);
        });

        return instance;
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    setPassword(password) {
        this.salt = bcrypt.genSaltSync(10);
        this.password = this.encryptPass(password);
    }

    encryptPass(password) {
        return bcrypt.hashSync(password, this.salt);
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username
        }
    }
}

module.exports = User;
