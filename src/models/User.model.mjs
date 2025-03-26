import { DataTypes } from "sequelize";
import { sequelize } from "../configs/DB/db.mjs";
import bcrypt from "bcryptjs";


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },{
    timestamps: true,
    });

User.beforeSave(async (user) => {
    if(user.password){
        user.password = await bcrypt.hash(user.password, 10);
    }
})

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default User;