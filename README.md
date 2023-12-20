# Installation

- Install latest version of node 20.x
- Ensure that you have `yarn`. For installation follow https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
- Run `yarn install`
- Run `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


#Required Configuration
- Configure NetLinx Processor Connection public > configuration > controller.json
- Configure buttons src > pages > Dashboard > index.js > btnGridConfig
- Configure Levels  src > pages > Dashboard > index.js > volumeControlConfig
- Configure Background Color src > context > ThemeContext.js - Updated line 6, and 7 to appropriate CSS class.

##Notes
- The preset/Square buttons will display 8 buttons per page, and a next/previous button will be visible if greater than 8 buttons
- The Volume controls will display 2 per page, and a next/previous button with display if greater than 2.