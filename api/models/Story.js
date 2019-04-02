import Sequelize from 'sequelize';

class Story extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            record_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
            },
          },
          {
            modelName: 'Story',
            sequelize,
          },
        );
    }

    static associate(models) {
        this.belongsTo(models.Record, { foreignKey: 'record_id' });
    }

    static async getById(id) {
        const story = await this.findById(id);
        if (!story) {
            throw new StoryError('StoryNotFound', `You don't have a story with the Id ${id}`);
        }
        return story;
    }

    static async reply(recordId, storyId, answer) {
        // if record does not exist, throw an error
        await Record.getById(recordId);
         // if story does not exist, throw an error
        await this.getById(storyId);
        
        await this.update({
            answer,
        }, {
            where: {
                id: storyId,
                record_id: recordId,
            },
        });
        return true;
    }
    // static create(data) {
    //     return super.create(data)
    // }
}

export default Story;
