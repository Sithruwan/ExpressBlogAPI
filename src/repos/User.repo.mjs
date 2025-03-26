import User from "../models/User.model.mjs";


class UserRepo {
    constructor(model) {
        this.model = model;
    }
    async create(user) {
        return await this.model.create(user);
    }
    async findOne(condition) {
        return await this.model.findOne({ where: condition });
    }
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }
    async findAll() {
        return await this.model.findAll();
    }
    async findById(id) {
        return await this.model.findByPk(id);
    }
    async update(id, user) {
        return await this.model.update(user, { where: { id } });
    }
    async delete(id) {
        return await this.model.destroy({ where: { id } });
    }

}
export default new UserRepo(User);