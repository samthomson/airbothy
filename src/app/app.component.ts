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
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{

    iResults: number = 0;
    aResults: Bothy[] = [];

    oSelectedBothy: Bothy = null;
    iSelected: number = null;
    iSmallImageIndexSelected: number = 0;
    sMainModalImage: string;

    @Input() bounds: any;

    @ViewChild('bothyModal') bothyModal:any;

    constructor(
        private ref: ChangeDetectorRef,
        private bothyService: BothyService
    ){}

    ngOnInit() {
    }

    onBoundsChanged(oNewBounds)
    {
        // map bounds changed - search on bothies
        this.bounds = oNewBounds.value;

        this.ref.detectChanges();

        this.doSearchFromBounds();
    }
    onMapIdle(oRestingBounds)
    {
        this.bounds = oRestingBounds.value;

        this.ref.detectChanges();

        this.doSearchFromBounds();

    }

    onMarkerClick(iClickedIndex)
    {
        this.onViewBothy(iClickedIndex);
    }

    onModalClose()
    {
        //this.bothyModal.close();
        this.iSelected = null;
        this.iSmallImageIndexSelected = 0;
    }
    onModalClickClose()
    {
        this.bothyModal.dismiss();
    }

    onViewBothy(iResultIndex)
    {
        //console.log(iResultIndex);
        // open modal and display pics and info on bothy

        if(iResultIndex < this.aResults.length)
        {
            this.iSelected = iResultIndex;
            this.setMainBothyModalPic(0);
            // force an update, since this event doesn't instantly trigger the renderers onchange detection
            this.ref.detectChanges();
            this.bothyModal.open();
        } else {
            alert("problem opening that bothy, try clicking the picture");
            //console.log("\nERROR: out of bounds\n");
        }
    }

    onSmallPicClick(iIndex)
    {
        this.setMainBothyModalPic(iIndex);
        // set as main pic in bothy
        this.iSmallImageIndexSelected = iIndex;
    }

    setMainBothyModalPic(iIndex)
    {
        this.sMainModalImage = this.bothyPic(this.iSelected, iIndex);
        this.ref.detectChanges();
    }

    doSearchFromBounds() {
        this.aResults = this.bothyService.search(this.bounds);
        this.iResults = this.aResults.length;
    }

    bothyPic(iResult, iIndex) {
        if(typeof(iIndex) === 'undefined')
        {
            iIndex = 0;
        }
        if(typeof(this.aResults[iResult]) !== 'undefined' && typeof(this.aResults[iResult].images) !== 'undefined' && this.aResults[iResult].images.length === 0) {
            return '';
        } else {
            return 'http://www.mountainbothies.org.uk/' + this.aResults[iResult].images.split(',')[iIndex];
        }
    }
    allBothyPics(iResult) {
        let aURLs = [];

        for (var iURL = 0; iURL < this.aResults[iResult].images.split(',').length; iURL++) {
            aURLs.push('http://www.mountainbothies.org.uk/' + this.aResults[iResult].images.split(',')[iURL]);
        }
        return aURLs;
    }

}
