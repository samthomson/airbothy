import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    lat: number = 56.93;
    lng: number = -4.23;

    @Output() boundsChanged = new EventEmitter();

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    mapInitialised: boolean = false;
    apiKey: string = 'AIzaSyDR4kOXozjam-Y3xaMxq9mSABoJxHzsXhM';

    bounds: any;

    ngOnInit() {
        this.loadGoogleMaps();
    }
    mapupdater = null;
    initMap() {
        this.mapInitialised = true;

        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let mapOptions = {
            center: latLng,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


        google.maps.event.addListener(this.map, 'bounds_changed', () => {

            clearTimeout(this.mapupdater);

            this.mapupdater = setTimeout(() => {
                let mBounds = this.map.getBounds();

                this.bounds = {
                    northEast: {
                        lat: mBounds.getNorthEast().lat(),
                        lng: mBounds.getNorthEast().lng()
                    },
                    southWest: {
                        lat: mBounds.getSouthWest().lat(),
                        lng: mBounds.getSouthWest().lng()
                    }
                };
                this.boundsChanged.emit({
                    value: this.bounds
                });

            }, 500);

        });
    }


    addMarker(){

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);

    }

    addInfoWindow(marker, content){

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }


    loadGoogleMaps()
    {

        if(typeof google == "undefined" || typeof google.maps == "undefined")
        {
            console.log("online, loading map");

            //Load the SDK
            window['mapInit'] = () => {
                this.initMap();
            }

            let script = document.createElement("script");
            script.id = "googleMaps";

            if(this.apiKey){

                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
            }

            document.body.appendChild(script);

        } else {
            this.initMap();
        }
    }
}
