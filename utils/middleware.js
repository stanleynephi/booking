const supabase = require("../database/supabaseClient")

async function requireAuth(req, res, next) {
  const token = req.cookies["sb-access-token"]
  //get the current url create a cookie to store the url
  const currentURL = req.originalUrl

  console.log("this is the user curent url", currentURL)
  //cookie to store the url
  res.cookie("post-login-redirect", currentURL, {
    //set up the cookie parameter
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60 * 1000,
    path: "/",
  })

  //re-route to the login route if there is no token
  if (!token) return res.redirect("/api/auth/google")

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired session" })
  }

  req.owner = data.user
  next()
}

module.exports = { requireAuth }
