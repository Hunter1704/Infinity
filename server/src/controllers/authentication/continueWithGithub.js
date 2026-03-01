const axios = require("axios");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");

// Redirect user to Github's consent screen
const redirectToGithubPage = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user:email`;
  res.redirect(url);
}

const authWithGithub = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) throw new Error('No code received');

    // Get access token from GitHub
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { accept: 'application/json' },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // Get user profile
    const { data: userInfo } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
      },
    });

    // Get primary email (if not public in userInfo)
    let email = userInfo.email;

    if (!email) {
      try {
        const emailRes = await axios.get('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        email = emailRes.data.find((e) => e.primary && e.verified)?.email;
      } catch (err) {
        console.warn("Could not fetch emails from GitHub API:", err.message);
      }

      // If still no email, generate a placeholder
      if (!email) {
        email = `${userInfo.login}@github.com`; // placeholder email
      }
    }

    // Find or create user
    let user = await User.findOne({ emailId: email });
    if (!user) {
      const newUser = { 
        emailId: email, 
        username: userInfo.login || (userInfo.name ? (userInfo.name.split(' ')[0] + Math.floor(Math.random() * 50) + 1) : `user${Math.floor(Math.random() * 1000)}`),
        fullName: userInfo.name || null, 
        emailVerified: !!userInfo.email, // true only if GitHub returned a real email
      };
      if (userInfo.avatar_url) newUser.profileImageUrl = userInfo.avatar_url;

      user = await User.create(newUser);
    } else {
      if (!user.emailVerified && userInfo.email) user.emailVerified = true;
      if (!user.profileImageUrl && userInfo.avatar_url) user.profileImageUrl = userInfo.avatar_url;
      if (!user.fullName && userInfo.name) user.fullName = userInfo.name;

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, username: user.username, emailId: user.emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 3600 }
    );

    // Send cookie and redirect
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // true if using HTTPS
      sameSite: 'lax',
      maxAge: 3600000 // 1 hour
    });

    res.redirect(process.env.FRONTEND_ORIGIN);

  } catch (err) {
    console.error(err.response?.data || err.message);
    // Always redirect to frontend error page
    res.redirect(`${process.env.FRONTEND_ORIGIN}/sociallogin/error/github`);
  }
};

module.exports = { authWithGithub, redirectToGithubPage };