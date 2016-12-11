import { Component } from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    title = 'app works!';
    lat: number = 51.678418;
    lng: number = 7.809007;

    iQueryLocation = {}


    constructor(private mapsAPILoader:MapsAPILoader){}



    /*
    emitMap(){
        this._mapsWrapper.getNativeMap().then((map) => {
            this.mapLoaded.emit(map);
        });
    }
    */

    ngOnInit() {
        //this.wrapper.getBounds().then(x => console.log(x));
        this.mapsAPILoader.load().then(() => {
            let latlngbounds = new google.maps.LatLngBounds();
            console.log(latlngbounds);
        });
    }

    onHandle($event: MouseEvent) {
        this.iQueryLocation.lat = $event.lat;
        this.iQueryLocation.lng = $event.lng;

        console.log(this.generateBounds());
    }



    generateBounds(markers): any {
        if (markers && markers.length > 0) {
            var bounds = new google.maps.LatLngBounds();

            markers.forEach((marker: any) => {
                bounds.extend(new google.maps.LatLng({ lat: marker.latitude, lng: marker.longitude }));
            });

            //check if there is only one marker
            if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                var extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
                bounds.extend(extendPoint);
            }

            return {
                northeast: {
                    latitude: bounds.getNorthEast().lat(),
                    longitude: bounds.getNorthEast().lng()
                },
                southwest: {
                    latitude: bounds.getSouthWest().lat(),
                    longitude: bounds.getSouthWest().lng()
                }
            }
        }
        //return empty object when no bundle selected
        return {};
    }


}
