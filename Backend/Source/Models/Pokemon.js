const { DataTypes } = require('sequelize') // Se usa para definir los tipos de datos de los atributos de los modelos.
const sequelize = require('./Connection')

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1 // restricción
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 20] // Restricción de longitud
    }
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 10
  },
  vida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  ataque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  defensa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  velocidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  altura: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  peso: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
})

module.exports = Pokemon
