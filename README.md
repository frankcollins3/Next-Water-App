<!--  -->
original app sensibly restricts user from seeing any content while approaching the app. 
Want this app to show water-cycle-schedule determining settings bar on <main> page if no user.
User validation will go between input population & data submission
<!--  -->

<!-- component | composition -->
    during FE assignment thought of .toMoney() which takes (i.e):   38885 & (thx chatGPT) returns 38,885. 
    huge motivation to remake this project:     slight personal improvement in web design 

Number.prototype.toMetrics() Number.prototype.toImperial() 
<component-composition> 
<!-- component | composition -->

<!--  -->
the page defaults to new instance of day-correspondent table.waterData upon page load. 
new vesion will create that day-correspondent waterData not at page load but at upon first user-engagement of water cycle 
<!--  -->

<!-- settings -->
settings "quietly' overwrites settings in the event of duplicate data submission
admittedly the cycle responds immediately to the change so user would know data submission affected the page. 
still would be nice to change the settings bar

ideally put a mini version of that user's water cycling data in the settings panel from which they made changes.
(which would take more space than the current panel allows, hence both elems need dynamic sizing)
settings also because as top explains I want a non-member-page-visitor to see that settings panel without submittability 
<!-- settings -->

<!--  -->
npm i rechart -> pass in { success: true | false } as 2 data points represented, probably specifically by their <LineChart/> | <AreaChart/>
calendar page also has section with clouds though which connect to accuweather API to return confirmation of user-input-locale-data 

given the clouds and the fact that their <RadialComponent>, I think, with curvature that looks rainbow, if we can somehow:

    cross the concepts of that same page: (conveniently already connecting analytics, the calendar) the icon with clouds
    analytics of pass fail data same data as calendar option to see it on chart, also like to icon_cloud as like to icon_rainbow
{rainyDay?}
<!--  -->

drop in (with the bucket) login
dip your toes footer
calendar today: drip water sign. 
allow settings to seen without login. a schedule of water-cycle-data as well so the user can see app usage, like how ig has (i.e.) w/ phone

<!-- animation and component composition  -->
This could be your new drip with example data in the beginning.
<component-composition>
    gray text but the word that is light-blue will change to also display a message:
    "YOUR" -> "new" -> "drip" --------------> "YOUR" -> "new" "YOU" //( !.char(r) )"            the "YOU" same "YOUR" with last char removed
    asserted by inherited child props and hidde

<!--  -->



# Next-Water-App 💧 
## A Happy, Healthy Water Cycling App that tracks user/human fluid intake.
#### sidenote: redoing layout adding hero page (1 large scrolling website) or what I'd call 3 amigos format (nav, centersquare, footer)
#### : adding some prototype extension (just learned from a .toString() example that changes (i.e.) 38885 to 38,885. also more `<composition>` if can find need
Dive into the app with this link. 👉 next-water-app.vercel.app
Water App is a Single Page Application with Next, TS, GraphQL, @redux/toolkit, Oauth2.0, JWT, (had redis cache).
The App gathers height, weight, age, and other settings to prepare water cycle intake.
Daily Data is based on Pass/Failing cycles based on: start-time, end-time, notification intensity.
User can then see daily data with react-calendar in /dashboard.
Lastly, the app features AccuweatherAPI data to allow user to check input-specified location weather conditions.

# Screenshots:

#### Main Page: Settings, water-cycle-reminder-bars to submit data, sidepanel: reminder-timer, streak, day and intake
https://github.com/frankcollins3/Next-Water-App/assets/73137934/1a0379d4-82dc-41a4-8d71-1a56d7ee4c01
![if (loading) { just a drop in the bucket } ](https://github.com/frankcollins3/Next-Water-App/assets/73137934/a2946c6d-f4a4-42bc-8a5a-c0beb48d6405)

#### Dashboard with calendar and location based AccuweatherAPI weather condition checker 
https://github.com/frankcollins3/Next-Water-App/assets/73137934/41421881-0f4c-4ba7-b27e-7c716e0e2bf6

#### Oauth2.0 signup + input checker & cookie based login + single-drop captcha: check human behavior upon incorrect attempt.
https://github.com/frankcollins3/Next-Water-App/assets/73137934/daa7e81c-e493-43dc-a048-64ab0e213efc
https://github.com/frankcollins3/Next-Water-App/assets/73137934/15011653-a35a-49b2-a5a5-f008b70c4491

#### web scraping puppeteer provides choice between web icons or app provided icons with loading bar boat.
https://github.com/frankcollins3/Next-Water-App/assets/73137934/a3fa3941-9aef-470c-ada6-2ee77f3d1371

## API:
Oauth2.0, GraphQL API, AccuweatherAPI (had google Oauth2.0 in react-express)

## Technologies / Frameworks
// this is a reiteration of a react-express app
* NextJS
* Typescript/Javascript
* PSQL / Prisma
* CSS/💋SASS💋
* NodeJS
* @redux/toolkit
* GraphQL: {apollo-server-micro}
* useContext: {ImageBank-Context} {RegexBank-Context} {PromiseBankContext}
* Dynamic-UI / component-composition

## User Stories
As a user, you will be able to log in using your Google account.
As a user, you will able set your settings for age, weight, height, start of day, end of day, and notification intensity.
As a user, you will able to keep track of your progress for the day based on notification intesity.
As a user, you will able to track the last 7 days' progress.

## Code Snippets

#### reminder
![reminder](https://github.com/frankcollins3/Next-Water-App/assets/73137934/d55e1a80-1eff-43a7-8fae-59e796b2203d)

#### puppeteer handler
![puppeteerPromise](https://github.com/frankcollins3/Next-Water-App/assets/73137934/7462dffd-a6c0-4a85-b701-2832fc419f6b)

#### weather data promises
![Screen Shot 2023-07-02 at 1 18 50 PM](https://github.com/frankcollins3/Next-Water-App/assets/73137934/4f65f202-f03d-4506-a5e3-abadd2649080)

# To Get your Toes Wet with Water App:
#### Repo is here: www.github.com/frankcollins3
* Go to the Repo
* `fork` and `clone` the repo -> `git clone` repo
* npm i for dependencies

# .ENV:
*  NEXT_PUBLIC_DATABASE_URL=postgresql://postgres:fakepassword@localhost:5432/yourDB?connection_limit=÷50
*  NEXT_PUBLIC_WEATHER_APP=CG0C6Jl44486772XhBUOi19659Jl1543LWZGyBP6LkD // fake but similar accuweatherkey

## https://developer.accuweather.com/apis 
// pretty confusing to set up.
1) get a user account key. This will be the NEXT_PUBLIC_WEATHER_APP
2) If you want to explore with i.e. `"Current Conditions endpoint"`
#### 3) We first need retrieve a key from "Locations API" So this will take 2 promises or async func()
#### 1 func() handler for locations API -> 2 func() handler to access other accuweatherAPI endpoints

![Screen Shot 2023-08-02 at 2 26 07 AM](https://github.com/frankcollins3/Next-Water-App/assets/73137934/c36d0891-21f8-4fb4-adc6-e43688e1b1c0)
