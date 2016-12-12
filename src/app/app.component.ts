import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

import { Bothy } from './models/bothy';
import { BothyService } from './services/bothy.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    iResults: number = 0;
    aResults: Bothy[];

    @Input() bounds: any = null;

    constructor(
        private ref: ChangeDetectorRef,
        private bothyService: BothyService
    ){}

    OnBoundsChanged(newBounds)
    {
        console.log("Bounds changed, search");
        this.bounds = newBounds.value;

        this.ref.detectChanges();

        this.aResults = this.bothyService.search(this.bounds);
        this.iResults = this.aResults.length;
        console.log(this.iResults + " results");
    }

    bothyPic(iResult) {
        return 'http://www.mountainbothies.org.uk/' + this.aResults[iResult].images.split(',')[0];
    }

}
