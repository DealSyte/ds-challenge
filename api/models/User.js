import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,   
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rol: {
                type: Sequelize.ENUM,
                values: ['admin', 'user'],
                allowNull: false,
            },
          },
          {
            modelName: 'User',
            sequelize,
          },
        );
    }

    async isValidPassword(password) {
        const res = await bcrypt.compare(password, this.password);
        return res;
    }

    static associate(models) {
        this.hasMany(models.Claim, { foreignKey: 'claimerId' });
        this.hasMany(models.Claim, { foreignKey: 'attendantId' });
    }
}

export default User;
