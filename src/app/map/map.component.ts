import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, OnChanges {

    lat: number = 56.93;
    lng: number = -4.23;

    @Output() boundsChanged = new EventEmitter();
    @Output() idle = new EventEmitter();
    @Output() markerClick = new EventEmitter();

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    mapInitialised: boolean = false;
    apiKey: string = 'AIzaSyDR4kOXozjam-Y3xaMxq9mSABoJxHzsXhM';

    bounds: any;
    @Input() markerResults = null;
    markers = [];

    ngOnInit() {
        this.loadGoogleMaps();
    }
    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        // remove any previous markers
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];

        if(typeof(this.markerResults) !== 'undefined')
        {
            for(let iMarker = 0; iMarker < this.markerResults.length; iMarker++)
            {
                if(
                    this.isNumeric(this.markerResults[iMarker].latitude)
                    &&
                    this.isNumeric(this.markerResults[iMarker].longitude)
                ) {
                    let bothyLatLng = new google.maps.LatLng(
                        this.markerResults[iMarker].latitude,
                        this.markerResults[iMarker].longitude
                    );
                    let marker = new google.maps.Marker({
                        position: bothyLatLng,
                        map: this.map,
                        title: this.markerResults[iMarker].name,
                        clickRef: iMarker
                    });
                    marker.addListener('click', () => {
                        console.log("clickRef: " + marker.clickRef);
                        this.markerClick.emit(marker.clickRef
                        );
                    });
                    this.markers.push(marker);
                }
            }
        }
    }

    proxyMarkerClick(iMarkerClick)
    {
        this.markerClick.emit({
            value: iMarkerClick
        });
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
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


        //
        // bounds changed event registration
        //
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

        //
        // map idle event registration
        //
        google.maps.event.addListener(this.map, 'idle', () => {

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
            this.idle.emit({
                value: this.bounds
            });
        });
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
