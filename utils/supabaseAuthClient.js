const { createClient } = require("@supabase/supabase-js")

function createAuthClient(req, res) {
  console.log("createAuthClient called")
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
      flowType: "pkce",
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,

      storage: {
        getItem: (key) => {
          console.log("GET COOKIE:", key)
          console.log("AVAILABLE COOKIES:", req.cookies)

          return req.cookies?.[key] || null
        },

        setItem: (key, value) => {
          console.log("SET COOKIE:", key)

          res.cookie(key, value, {
            httpOnly: true,
            secure: false, // development
            sameSite: "lax",
            maxAge: 5 * 60 * 1000,
            path: "/",
          })
        },

        removeItem: (key) => {
          console.log("REMOVE COOKIE:", key)

          res.clearCookie(key, {
            path: "/",
          })
        },
      },
    },
  })
}

module.exports = createAuthClient
