const Users = require('../model/Users');

const handleLogout = async(req,res) => {
    const cookies = req.cookies;
    console.log('cookies',cookies);

    const { jwt } = cookies;
    console.log('jwt',jwt);

    if(!jwt) {
        return res.sendStatus(204);
    }

    // find the user based on the refresh token
    try {
        const findByRefreshToken = await Users.findOne({refreshToken : jwt}).exec();
        if(!findByRefreshToken) {
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              });

            return res.json({message : 'Logout successfully', statusCode : 204});
        }


        // clear the refresh token
        findByRefreshToken.refreshToken = '';
        await findByRefreshToken.save();

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          return res.json({statusCode : 204, message: 'Logout completed'});

    } catch (error) {
        console.error('error logout');
        return res.status(500).json({message : error.message});
    }
}

module.exports = {handleLogout}
