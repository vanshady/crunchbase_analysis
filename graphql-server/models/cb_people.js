module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cb_people', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    object_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    affiliation_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'cb_people'
  });
};
