import userRepo from "../repos/User.repo.mjs";
import UserReqDTO from "../DTOs/req/UserReq.dto.mjs";
import UserLoginDTO from "../DTOs/req/UserLogin.dto.mjs";
import sessionManager from "../utills/SessionManager.mjs";
import AppError from "../utills/errorHandlers/AppError.mjs";

class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    registerUser = async (user,next) => {
        
        try {
        
            const userDto = UserReqDTO.toDto(user);
            const userExists = await this.userRepo.findByEmail(userDto.email);
            if (userExists) {
               return next(new AppError('User already exists', 400, 'UserService-registerUser'));
            }
            const newUser = await this.userRepo.create(userDto);
            return newUser;

           
        } catch (error) {
            next(new AppError(error.message, 400, 'UserService-registerUser'));

        }
    }
   loginUser = async (reqbody,next) => {
        const { email, password} = reqbody;
        const userLoginDto = UserLoginDTO.toDto({ email, password });
        // Check if the email is already in the database
        const user = await this.userRepo.findByEmail(userLoginDto.email);
        const isMatch = await user.comparePassword(userLoginDto.password);
        if (!user) {
            return next(new AppError('User not found', 404, 'UserService-loginUser'));
        }
        if (!isMatch) {
            return next(new AppError('Invalid password', 401, 'UserService-loginUser'));
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