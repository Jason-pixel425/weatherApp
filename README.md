# Atmos - WeatherApp

This is a weather web application learning project I took on.

**Deployed here:** https://atmosweatherwebapps.netlify.app

**Please Note:** Due to the how to free server (Render) operates, first viewing of the site may cause loading to take longer than usual.

## What I learned

To start with, In terms of incorperating new things, think I may have bitten off more than I can chew. Despite this, in the end, I'm happy with what I've ended up with.

I learnt enough Node.js to get by. Seeing as I have never used it before it's probably not great but it helped my understanding of the relationship between a backend and frontend.

This project was initiated as TypeScript, a language I had not used before. I eventually removed it because it caused issues when deploying. 
Furthermore, going into TypeScript blind on top of this being the first project developed with no figma file or external requirements was a little too much.

I solidified and furthered my understanding of React, JavaScript, CSS and HTML.

As a final note, React Router in this project might have been overkill. It was added as I was initially getting location by IP. This did not ask the user permission before getting their location and therefore I created a protected route using React Router to prompt the user for permission. This method caused more issues than it solved so I removed it and used navigator instead. The switch happened very late in the project and React Router wasn't hindering the project so therefore, I left its implementation as is.

## Technologies used
  - React
  - JavaScript
  - HTML
  - CSS
  - Node.js
  - React Router

## Things left to be done
- Need to add a 404 page
- Add user feedback when fetch requests fails

## Things I can improve upon
- Pre-planning. Specifically design choices, technologies and scoping of the project
- Comments in code explaining what the code is doing.
- Commiting more often and with more detailed descriptions.
- File cleanup - Some unused assets and commented out code still left in project.
