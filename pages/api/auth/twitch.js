import { createRouter } from "next-connect";
import passport from "../../../lib/passport";
import session from "express-session";

const router = createRouter();

// https://dev.twitch.tv/docs/api/reference/ (DOCS)

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
router.get(passport.authenticate("twitch"));

export default router.handler();
