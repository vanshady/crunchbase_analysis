module.exports = (sequelize, DataTypes) => (
  sequelize.define('people', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    object_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    affiliation_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'cb_people',
  })
);
