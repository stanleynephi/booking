// create and handle sessions for user logins and logouts

function setSessionCookies(res, session) {
  res.cookie("sb-access-token", session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  })

  console.log("Cookie set: sb-access-token")

  res.cookie("sb-refresh-token", session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  console.log("Cookie set: sb-refresh-token")

  console.log("========== RESPONSE COOKIES ==========")
  console.log("Set-Cookie:", res.getHeader("Set-Cookie"))
}

module.exports = { setSessionCookies }
