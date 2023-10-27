const userModel = require("../models/userModel");
const md5 = require("md5");

const jsonwebtoken = require("jsonwebtoken");

exports.Login = async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    if (email === "" || password === "" || email === undefined || password === undefined) {
     return response.status(400).json({
        message: "email and password must be filled in",
        success: false,
      });
    }

    const data = {
      email:request.body.email,
      password:md5(request.body.password)
    }

    const user = await userModel.findOne(data);

    if (!user) {
      return response.status(400).json({
        message: "email or password incorrect",
        success: false,
      });
    } else {
      const tokenPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET_KEY);

      return response.status(200).json({
        message: "successful login",
        data:{
          token,
        },
        success: true,
      });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.Register = async (request, response) => {
  try {
    const data = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };
    for (const [key, value] of Object.entries(data)) {
      if (!value || value === "") {
        return response
          .status(400)
          .json({ message: `${key} must be filled in`, success: false });
      }
    }
    const nameLowerCase = data.name.toLowerCase();
    const emailLowerCase = data.email.toLowerCase();
    const user = await userModel.findOne({
      $or: [{ name: { $regex: new RegExp(`^${nameLowerCase}$`, "i") } }, { email: { $regex: new RegExp(`^${emailLowerCase}$`, "i") } }],
    });

    if (!user) {
      const newUser = {
        name: request.body.name,
        email: request.body.email,
        password: md5(request.body.password),
      };

      const createdUser = await userModel.create(newUser);

      return response.status(200).json({
        message: "Success add User",
        data: 
          createdUser,
        success: true,
      });
    } else {
      return response.status(400).json({
        message: "User already exists, please look for another name or email",
        success: false,
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
