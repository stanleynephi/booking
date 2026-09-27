// create and handle sessions for user logins and logouts

function setSessionCookies(res, session) {
  res.cookie("sb-access-token", session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  })

  res.cookie("sb-refresh-token", session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

module.exports = { setSessionCookies }
