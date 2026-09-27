const supabase = require("../database/supabaseClient")

async function requireAuth(req, res, next) {
  const token = req.cookies["sb-access-token"]

  if (!token) {
    res.cookie("post-login-redirect", req.originalUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 1000,
      path: "/",
    })
    return res.redirect("/api/auth/google")
  }

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired session" })
  }

  req.owner = data.user
  next()
}
module.exports = { requireAuth }
