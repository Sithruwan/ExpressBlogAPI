
import UserLoginDTO from "../DTOs/req/UserLogin.dto.mjs";
import UserReqDTO from "../DTOs/req/UserReq.dto.mjs";
import userService from "../services/UserService.mjs";

class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }

     registerUser=async(req, res)=> {
        try {
            // Create DTO with validation
            const userReqDTO = UserReqDTO.toDto(req.body);

            // Register user
            const user = await this.userService.registerUser(userReqDTO);
            return res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
            });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(400).json({ error: error.message });
        }
    }

    loginUser=async(req, res)=> {
        try {
            // Create DTO with validation
            const userLoginDto = UserLoginDTO.toDto(req.body);

            // Register user
            const user = await this.userService.loginUser(userLoginDto);
            res.cookie('jwtToken', user.token, {
                httpOnly: true,
                sameSite: 'None', secure: true,
                maxAge: 24 * 60 * 60 * 1000 //7day
            });
            return res.status(201).json({
                status: 'success',
                message: 'User logged in successfully',
                data: user,
            });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController(userService);