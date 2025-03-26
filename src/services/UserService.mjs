import userRepo from "../repos/User.repo.mjs";
import UserReqDTO from "../DTOs/req/UserReq.dto.mjs";
import UserLoginDTO from "../DTOs/req/UserLogin.dto.mjs";
import sessionManager from "../utills/SessionManager.mjs";

class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    registerUser = async (user) => {
        
        try {
        
            const userDto = UserReqDTO.toDto(user);
            const userExists = await this.userRepo.findByEmail(userDto.email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const newUser = await this.userRepo.create(userDto);
            return newUser;

           
        } catch (error) {
            throw error;

        }
    }
   loginUser = async (reqbody) => {
        const { email, password} = reqbody;
        const userLoginDto = UserLoginDTO.toDto({ email, password });
        // Check if the email is already in the database
        const user = await this.userRepo.findByEmail(userLoginDto.email);
        const isMatch = await user.comparePassword(password);
        if (!user) {
            throw new Error("Username not exists");
        }
        if (!isMatch) {
            throw new Error("Incorrect password");
        }
        //genarate JWT token
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            
        }
        
        const token = await sessionManager.getToken(payload);
        //const refreshToken = await getRefreshToken(payload);
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
       
        return {token,userData};
    };
}

export default new UserService(userRepo);