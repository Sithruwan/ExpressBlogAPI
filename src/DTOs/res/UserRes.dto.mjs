import { plainToClass } from "class-transformer";
import { isEmail, isNotEmpty, isString } from "class-validator";

class UserResDTO {
    @isNotEmpty({message: "id is required"})
    id;

    @isNotEmpty({message: "username is required"})
    @isString({message: "username must be a string"})
    username;

    @isNotEmpty({message: "email is required"})
    @isEmail({}, {message: "email must be a valid email"})
    email;
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }

    static toDTO(user) {
        return plainToClass(UserResDTO, {
            id: user.id,
            username: user.username,
            email: user.email
        }, {excludeExtraneousValues: true});
    }



}

export default UserResDTO;