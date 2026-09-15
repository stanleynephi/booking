const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

function createAuthClient(req, res) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
      detectSessionInUrl: false,
      flowType: "pkce",
      autoRefreshToken: false,
      persistSession: true,
      experimental: { appendPkceFlowIdToRedirects: true },

      storage: {
        getItem: (key) => {
          const cookies = req.cookies || {}

          const value = cookies[key]

          return value || null
        },

        setItem: (key, value) => {
          res.cookie(key, value, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 5 * 60 * 1000,
            path: "/",
          })
        },

        removeItem: (key) => {
          res.clearCookie(key, {
            path: "/",
          })
        },
      },
    },
  })
}

module.exports = createAuthClient
