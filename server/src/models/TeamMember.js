import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamMember.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};