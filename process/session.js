// create and handle sessions for user logins and logouts

function setSessionCookies(res, session) {
  console.log("========== SETTING SESSION COOKIES ==========")

  console.log("Access token exists:", !!session?.access_token)
  console.log("Refresh token exists:", !!session?.refresh_token)

  console.log("Access token length:", session?.access_token?.length)
  console.log("Refresh token length:", session?.refresh_token?.length)

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
