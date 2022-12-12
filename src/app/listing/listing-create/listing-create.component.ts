import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Listing } from '../listing.model';

import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: ['./listing-create.component.css'],
})
export class ListingCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  enteredPrice = '';
  enteredAddress = '';
  enteredResidenceType = '';
  enteredYearBuilt = '';
  enteredSqFeet = '';
  enteredPricePerSqFeet = '';
  private mode = 'create';
  private listingId: string;
  listing: Listing;

  constructor(
    public listingsService: ListingsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('listingId')) {
        this.mode = 'edit';
        this.listingId = paramMap.get('listingId');
        this.listingsService
          .getListing(this.listingId)
          .subscribe((listingData) => {
            this.listing = {
              id: listingData._id,
              title: listingData.title,
              content: listingData.content,
              price: listingData.price,
              address: listingData.address,
              residenceType: listingData.residenceType,
              yearBuilt: listingData.yearBuilt,
              sqFeet: listingData.sqFeet,
              pricePerSqFeet: listingData.pricePerSqFeet,
            };
          });
      } else {
        this.mode = 'create';
        this.listingId = null;
      }
    });
  }

  onSaveListing(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.listingsService.addListing(form.value.title, form.value.content, form.value.price,
        form.value.address,
        form.value.residenceType,
        form.value.yearBuilt,
        form.value.sqFeet,
        form.value.pricePerSqFeet,);
    } else {
      this.listingsService.updateListing(
        this.listingId,
        form.value.title,
        form.value.content,
        form.value.price,
        form.value.address,
        form.value.residenceType,
        form.value.yearBuilt,
        form.value.sqFeet,
        form.value.pricePerSqFeet,
      );
    }
    form.resetForm();
  }
}
