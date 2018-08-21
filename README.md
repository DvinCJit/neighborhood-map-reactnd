# Neighborhood Map (React)

A neighborhood-map react app of Japan's city of Kyoto that allows you to check out my top favourite places and discover information about them by selecting the markers in the map or the list view items. 

## Getting Started

This project uses [create-react-app](https://github.com/facebook/create-react-app) as starter code. You will need to have Node >= 6 on your local development machine. These are the steps for installation:
1. Clone or download this repository:
https://github.com/judithrea/neighborhood-map-reactnd.git
2. Install all dependencies with `npm install`
3. Use `npm start` to launch the app on **localhost:3000**

## Production Mode

You might want to use this app in production mode, since you will be able use the **Service Worker**.
On the 'neighborhood-map-reactnd' type the following command:
`npm run build`

Then, just set up your favorite HTTP server or use the following command if your environment uses **Node**:
`serve -s build`

Finally, head over to **localhost:5000 (serve - node)** or localhost:8000(HTTP server).

## Leaflet API 

The map was set up with the ['React-Leaflet' library](https://react-leaflet.js.org/en/). Also, Mapbox was used for creating the tile layer of the map. Installation and setup was possible thanks to [Leaflet's API Quick Start Guide](https://leafletjs.com/examples/quick-start/). 


## MediaWiki API

For information about the locations on the map the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page#The_format) was used in order to extract content from Wikipedia. To learn how to use the API the following link was quite useful:
https://www.youtube.com/watch?v=RPz75gcHj18

## License

None

