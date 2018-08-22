const allLocations = [
    {title: 'Fushimi Inari-taisha', position: {lat: 34.966822, lng: 135.772721}},
    {title: 'Kiyomizu-dera', position: {lat: 34.994825, lng: 135.784909}},
    {title: 'Kōzan-ji', position: {lat: 35.060552, lng: 135.678453}},
    {title: 'Mount Kurama', position: {lat: 35.123135, lng: 135.776261}},
    {title: 'Ponto-chō', position: {lat: 35.005107, lng: 135.770954}}
];

const mapboxAPITiles = 'https://api.tiles.mapbox.com';

const mapboxAccessToken = 'access_token=pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg';

const wikipediaAPIURL = 'https://en.wikipedia.org/w/api.php';

const fetchWiki = title => (
    `${wikipediaAPIURL}?action=query&format=json&prop=extracts&titles=${title.replace(/\s/g, '_')}`
    +
    '&exsentences=1&exlimit=1&origin=*'
);

export {
    allLocations,
    mapboxAPITiles,
    mapboxAccessToken,
    wikipediaAPIURL,
    fetchWiki
}