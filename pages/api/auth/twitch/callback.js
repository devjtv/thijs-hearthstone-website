import { createRouter } from "next-connect";
import passport from "../../../../lib/passport";
import session from "express-session";

const router = createRouter();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// In your Twitch callback route handler
router.get(
  passport.authenticate("twitch", { failureRedirect: "/login" }),
  (req, res) => {
    const userProfile = req.user; // Assuming user profile is attached to req.user
    res.setHeader(
      "Set-Cookie",
      `userProfile=${encodeURIComponent(
        JSON.stringify(userProfile)
      )}; HttpOnly; Path=/; Secure`
    );

    res.redirect("/");
  }
);

export default router.handler();
