import Sequelize from 'sequelize';

class Record extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            claim_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
          },
          {
            modelName: 'Record',
            sequelize,
          },
        );
    }

    static associate(models) {
        this.hasMany(models.Story, { foreignKey: 'record_id', as: 'stories' });
        this.belongsTo(models.Claim, { foreignKey: 'claim_id' });
    }

    static async getById(id) {
        const record = await this.findById(id);
        if (!record) {
            throw new RecordError('RecordNotFound', `You don't have a record with the Id ${id}`);
        }
        return record;
    }

    static async getByClaim(claimId) {
        // if claim does not exist, throw an error
        await Claim.getById(claimId);

        const record = await this.findOne({
            include: [{
                model: Story, as: 'stories',
            }],
            where: {
                claim_id: claimId,
            },
        });
        return record;
    }
}

export default Record;
