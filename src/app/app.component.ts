import {
    Component,
    Input,
    OnInit,
    ChangeDetectorRef,
	ViewChild,
	ElementRef,
	Renderer
} from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

import { Bothy } from './models/bothy';
import { BothyService } from './services/bothy.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    iResults: number = 0;
    aResults: Bothy[];

    oSelectedBothy: Bothy = null;
    iSelected = null;

    @Input() bounds: any = null;

    @ViewChild('bothyModal') bothyModal:any;

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
    allBothyPics(iResult) {
        let aURLs = [];

        for (var iURL = 0; iURL < this.aResults[iResult].images.split(',').length; iURL++) {
            aURLs.push('http://www.mountainbothies.org.uk/' + this.aResults[iResult].images.split(',')[iURL]);
        }
        return aURLs;
    }

    viewBothy(iResultId) {
        // open modal and display pics and info on bothy
        console.log("selected bothy: " + iResultId);
        this.oSelectedBothy = this.aResults[iResultId];
        console.log(this.oSelectedBothy);
        this.iSelected = iResultId;
        this.bothyModal.open();
    }

}
