import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init({
    quote: DataTypes.TEXT,
    author: DataTypes.STRING,
    authorTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Testimonial',
  });
  return Testimonial;
};