//import the database client and pass user data to the database
const supabase = require("../database/supabaseClient")
const session = require("../process/session")
const createAuthClient = require("../utils/supabaseAuthClient")
//set up api call for google
// GET /api/auth/google
async function googleLogin(req, res) {
  console.log("========== GOOGLE LOGIN ==========")

  const authClient = createAuthClient(req, res)

  const { data, error } = await authClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.API_BASE_URL}/api/auth/callback`,
    },
  })

  console.log("OAuth data:", data)
  console.log("OAuth error:", error)

  if (error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  console.log("OAuth URL:", data?.url)

  res.redirect(data.url)
}

//api callback function
// GET /api/auth/callback
async function oauthCallback(req, res) {
  console.log("========== OAUTH CALLBACK ==========")
  console.log("Query:", req.query)
  console.log("Cookies:", req.cookies)

  const { code } = req.query

  console.log("This is the code to be verified", code)

  if (!code) {
    return res.status(400).json({
      error: "Missing auth code",
    })
  }

  const authClient = createAuthClient(req, res)

  const { data, error } = await authClient.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("OAuth callback error:", error)

    return res.status(400).json({
      error: error.message,
    })
  }

  session.setSessionCookies(res, data.session)

  const { data: existing, error: ownerError } = await supabase
    .from("shop_owners")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle()

  if (ownerError) {
    console.error("Shop owner lookup failed:", ownerError)

    return res.status(500).json({
      error: "Failed to check shop owner",
    })
  }

  if (!existing) {
    const { error: insertError } = await supabase.from("shop_owners").insert({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || data.user.email,
    })

    if (insertError) {
      console.error("Shop owner creation failed:", insertError)

      return res.status(500).json({
        error: "Failed to create shop owner",
      })
    }
  }

  //after authenticating.. get the cookie data and then pass that as the redirect url
  const redirectTargert = req.cookies["post-login-redirect"]
  console.log("this is the redirect url", redirectTargert)

  console.log(redirectTargert)
  res.redirect(`${process.env.API_BASE_URL}${redirectTargert}`)
}

//export these to the route
module.exports = { googleLogin, oauthCallback }
