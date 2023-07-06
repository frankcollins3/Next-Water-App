# Next-Water-App
Happy, Healthy Water Cycling App that tracks user/human fluid intake.

changing this readme upon successful deployment.
Fluid_Container, an App that redoes General Assembly code bootcamp team project, with an update of: 
GraphQL, redux, and psql relational data instead of mongo, selection of profileIcons and puppeteer to search web for a user-specified-by-input icon, and added accuweatherAPI to the calendar page

This iteration attempts to bridge gaps and patch clogs with:
**GoogleLogin component 5.2.12** is having **compatibility issues** with **React 18.x** (for production only not for the local environment)
in my eyes: original looks great, but **mobile design** doesn't do its UI justice (but bootcamp split us into teams and we all only had a week to do it; don't want to sound jeerful)
overusing: --legacy-peer-deps, especially from GraphQLExpress. Problem made worse with install & uninstall of webpack, which react still is aware of beyond uninstall, remove node_mod,

** Brainstorm Bin **
now we can make the accuweatherAPI link up to the dailyData when the dailyData is saved. This would mean a rainy day would show up on calendar as a raincloud. Had to add psql data column, so instead:
I opted to allow the user to check, for "currentTodayConditions", specified by city (user input) That showed whether or not it was rainy. It never tracks rainy days by saved daily data which first wanted.
* Would have to gather user zip code if they want, might even implement "Want to share your location?" But imagine most people wouldn't want to. Still, to implement "share location" would be interesting.

---
* shark attack data // almost committed before realizing one could use "npm i puppeteer" to allow the user to scrape web for shark articles as well.
---

---
* revisiting the idea of water conservation: user signs up with "squid" included in username-string. Now a "Save our Seas" page becomes available,
* but with Context-facilitated-App-Theme there will be black, blotchy, ink in spots, and the conservation page would have L & R side waste pipes spilling black into the page.
---

note: out of these 3 ideas, only the rainy day accuweatherAPI feature was built. The conservation was NOT built and the shark attack was just thought of moments ago while looking up shark-articles.
  
** End Of Brainstorm Bin **
