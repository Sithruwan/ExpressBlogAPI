import { DataTypes } from "sequelize";
import { sequelize } from "../configs/DB/db.mjs";
import User from "./User.model.mjs";

const Post = sequelize.define("Post", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tittle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: true,
});

User.hasMany(Post,{foreignKey: 'userId', onDelete: 'CASCADE'});
Post.belongsTo(User,{foreignKey: 'userId'});

export default Post;