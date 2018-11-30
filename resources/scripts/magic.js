console.log('oof');

/* map intialization */
var map;

function initMap() { //initation
    map = new google.maps.Map(document.querySelector('#map'), { // where the map is located in HMTL
      center: {lat:21.4389, lng:-158.0001}, //where it will be defaulted too
      zoom: 11 //zoom of how close it is
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
};

var imageExport = (imageName) => `<img src='../../images/${imageName}' />`;

//for vue

var headerHolder = Vue.component("always", { /* component header */
    props : ["img","title","items","location"],
    template : `
    <div id="header">

            <div id="titleStuff">
                <h2 class="pageTitle" v-html="title"></h2>
                <span class="pageLogo" v-html="img"></span>
            </div>

            <div id="category">
                <p v-text="location"> </p>
            </div>
            
            <div id="header-itemHolder">

                <a v-for="item in items" href="item.link" class="items"> {{item.name}} </a>

            </div>
    </div>
    `
});

Vue.directive('scroll', { //vue directive for scrolling
    inserted: function (el, binding) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener('scroll', f)
        }
      }
      window.addEventListener('scroll', f)
    }
});

var dataPath = new Vue({
    el:'#root',
    data: {
        slogans: {
            map: { slogan: "View the entire map of Hawaii with a Map", link: 'map.html', button: 'Go to Maps'},
            camera: { slogan: "Get a live scoop of the road", link: '', button: 'Go to Cameras'},
            about : { slogan: "A little shouout for credits", link: '', button: 'Go to about'},
            forum : {slogan: "A problem on the street or a question, report it on the forums",link: '', button: 'Go to Forums'}
        },
        header: {
            title: 'ProjecTraffic',
            currentLocation: 'Daily Report',
            image: imageExport('Logo.png'),
            contents: [
                {link: 'google.com', name:'Near You'},
                {link: 'google.com', name:'Map'},
                {link: 'google.com', name:'Traffic Cam'},
                {link: 'google.com', name:'About Me'},
            ]
        },
        Report: {
            date: '18/11/02',
            options: ["traffic","weather","Incidents"]
        },
        cameraStuff: {
            image: imageExport('camera.png'),
            cameraCase: [
                {link:'../../images/traffic/TL-0040.jpg',name:'H1 & H2 Merge'},
                {link:'../../images/traffic/TL-0060.jpg',name:'H1 & Waikele'},
                {link:'../../images/traffic/TL-0253.jpg',name:'H1 & Waikele(Eastbound)'}
            ]
        },
        forumStuff: {
            motif: imageExport('motif.png')
        },
        navStuff: {
            buttons: {
                homeButton: [
                    // {name: template, does: this.methods} comeback
                ]
            }
        },
        cameraPage: {
            placeholder: 'Search...',
            options: {
                open: false,
                closed: true,
                freeway: [
                    {name: 'H1',value:' '},
                    {name: 'H2',value:' '},
                    {name: 'H3',value:' '}
                ],
                H1Toggle: false,
                H2Toggle: false,
                H3Toggle: false,
                location: [
                    {name: 'Windward',value:' '},
                    {name: 'Leeward',value:' '},
                ],
                windardToggle: false,
                leewardToggle: false,
                freewaySlogan: 'Freeway',
                locationSlogan: 'Location'
            }
        }
    },
    methods: {
        images : function() {
            return this.cameraStuff.cameraCase
        },
        toggleOptions: function() {
            this.cameraPage.options.open = !this.cameraPage.options.open;
            this.cameraPage.options.closed = !this.cameraPage.options.closed;          
        },
        toggle : function(what) {
            what = !what;
        },
        handleScroll: function (evt, el) { /* handles the scrolling happening in function */
            // console.log(window.scrollY)
            if(window.scrollY >= 0 && window.scrollY < 560) {
                this.header.currentLocation = 'Daily Report';
            }
            if (window.scrollY >= 560 && window.scrollY < 1175) {
                this.header.currentLocation = 'Maps';
            } else if(window.scrollY >= 1175 && window.scrollY < 1775) {
                this.header.currentLocation = 'Camera Feed';
            }
            else if(window.scrollY > 1775){
                this.header.currentLocation = 'Forums';
            }

          }
    }
});
