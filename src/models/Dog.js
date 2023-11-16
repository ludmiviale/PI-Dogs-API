const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the name",
          },
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the height",
          },
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the weight",
          },
        },
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the life span",
          },
        },
      },
      reference_image_id: {
        type: DataTypes.STRING,
        validate: {
          isURL: {
            args: {
              protocols: ["http", "https"],
            },
            msg: "Must be a valid URL",
          },
        },
      },
    },
    { timestamps: false }
  );
};
