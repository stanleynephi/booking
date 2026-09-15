//import the database client and pass user data to the database
const supabase = require("../database/supabaseClient")
const session = require("../process/session")
const createAuthClient = require("../utils/supabaseAuthClient")
require("dotenv").config()
//set up api call for google
// GET /api/auth/google
async function googleLogin(req, res) {
  console.log("========== GOOGLE LOGIN ==========")

  const authClient = createAuthClient(req, res)

  const { data, error } = await authClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:2001/auth/v1/callback`,
    },
  })

  if (error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  res.redirect(data.url)
}

//api callback function
// GET /auth/v1/callback
async function oauthCallback(req, res) {
  //console log this to make sure that the callback controller has been hit
  console.log("=======CALL BACK CONTROLLER HAS BEEN HIT=======")
  const { code, state, sb_flow_id } = req.query

  if (!code) {
    return res.status(400).json({
      error: "Missing auth code",
    })
  }

  const authClient = createAuthClient(req, res)

  if (!authClient) {
    return res.status(500).json({ error: "Failed to initialize auth client" })
  }

  const { data, error } = await authClient.auth.exchangeCodeForSession(code, {
    flowId: sb_flow_id,
  })

  if (error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  //check if there are any session data being returned
  if (!data?.session || !data?.user) {
    return res
      .status(500)
      .json({ error: "Authentication succeeded but no session was returned" })
  }

  //else call the session function and then set the session cookie that is required
  session.setSessionCookies(res, data.session)

  //lookup owner in the database based on the id provided
  const { data: existing, error: ownerError } = await supabase
    .from("shop_owners")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle()

  //console log this message if the user exists
  console.log("has been found now unto the next")

  if (ownerError) {
    return res.status(500).json({
      error: "Failed to check shop owner",
    })
  }

  //check if that user data exist before running this code to create a new user..
  if (!existing) {
    const { error: insertError } = await supabase.from("shop_owners").insert({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || data.user.email,
    })

    if (insertError) {
      return res.status(500).json({
        error: "Failed to create shop owner",
      })
    }
  }

  const redirectTarget = req.cookies["post-login-redirect"]
  res.clearCookie("post-login-redirect", { path: "/" })

  const safeRedirect =
    typeof redirectTarget === "string" &&
    redirectTarget.startsWith("/") &&
    !redirectTarget.startsWith("//")
      ? redirectTarget
      : "/"

  return res.redirect(`${process.env.API_BASE_URL}${safeRedirect}`)
}
//export these to the route
module.exports = { googleLogin, oauthCallback }
