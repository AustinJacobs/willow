import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Listing } from '../listing.model';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css'],
})
export class ListingListComponent implements OnInit, OnDestroy {
  listings: Listing[] = [];
  private listingsSub: Subscription;

  constructor(public listingsService: ListingsService) {}

  ngOnInit() {
    this.listingsService.getListings();
    this.listingsSub = this.listingsService
      .getListingUpdateListener()
      .subscribe((listings: Listing[]) => {
        this.listings = listings;
      });
  }

  onDelete(listingId: string) {
    this.listingsService.deleteListing(listingId);
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
  }
}
