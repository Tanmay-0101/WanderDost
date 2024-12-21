mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

console.log("Title:", title);
console.log("Location:", loc);


const marker=new mapboxgl.Marker({color:"teal"})
                .setLngLat(coordinates)
                .setPopup(
                    new mapboxgl.Popup({offset:25}).setHTML(
                        `<br><h4>${title}</h4>
                        <p>Location : ${loc}</p>`)
                )
                .addTo(map);