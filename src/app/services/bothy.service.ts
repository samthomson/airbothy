import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Bothy } from '../models/bothy';

@Injectable()
export class BothyService {

    aBothies: Bothy[];

    constructor(
        private http:Http
    ) {
        // load all bothies from file
        http.request('../../assets/bothies.json')
            .subscribe(response => this.aBothies = <Bothy[]>response.json());
    }

    search(oBounds) {
        let aReturn = [];

        // really not the fastest way to search but ...
        for (var iBothy = 0; iBothy < this.aBothies.length; iBothy++)
        {
            // latitude range
            if(this.aBothies[iBothy].latitude > oBounds.southWest.lat && this.aBothies[iBothy].latitude < oBounds.northEast.lat) {
                // longitude
                if(this.aBothies[iBothy].longitude > oBounds.southWest.lng && this.aBothies[iBothy].longitude < oBounds.northEast.lng) {
                    aReturn.push(this.aBothies[iBothy]);
                }
            }
        }
        return aReturn;
    }

}
