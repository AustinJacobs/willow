import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Listing } from './listing.model';

@Injectable({ providedIn: 'root' })
export class ListingsService {
  private listings: Listing[] = [];
  private listingsUpdated = new Subject<Listing[]>();

  constructor(private http: HttpClient) {}

  getListings() {
    this.http
      .get<{ message: string; listings: any }>('http://localhost:3000/listings')
      .pipe(
        map((listingData) => {
          return listingData.listings.map((listing) => {
            return {
              title: listing.title,
              content: listing.content,
              id: listing._id,
              price: listing.price,
              address: listing.address,
              residenceType: listing.residenceType,
              yearBuilt: listing.yearBuilt,
              sqFeet: listing.sqFeet,
              pricePerSqFeet: listing.pricePerSqFeet,
            };
          });
        })
      )
      .subscribe((transformedListings) => {
        this.listings = transformedListings;
        this.listingsUpdated.next([...this.listings]);
      });
  }

  getListingUpdateListener() {
    return this.listingsUpdated.asObservable();
  }

  getListing(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      price: string;
      address: string;
      residenceType: string;
      yearBuilt: string;
      sqFeet: string;
      pricePerSqFeet: string;
    }>('http://localhost:3000/listings/' + id);
  }

  addListing(
    title: string,
    content: string,
    price: string,
    address: string,
    residenceType: string,
    yearBuilt: string,
    sqFeet: string,
    pricePerSqFeet: string
  ) {
    const listing: Listing = {
      id: null,
      title: title,
      content: content,
      price: price,
      address: address,
      residenceType: residenceType,
      yearBuilt: yearBuilt,
      sqFeet: sqFeet,
      pricePerSqFeet: pricePerSqFeet,
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/listings', listing)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.listings.push(listing);
        this.listingsUpdated.next([...this.listings]);
      });
  }

  updateListing(
    id: string,
    title: string,
    content: string,
    price: string,
    address: string,
    residenceType: string,
    yearBuilt: string,
    sqFeet: string,
    pricePerSqFeet: string
  ) {
    const listing: Listing = {
      id: id,
      title: title,
      content: content,
      price: price,
      address: address,
      residenceType: residenceType,
      yearBuilt: yearBuilt,
      sqFeet: sqFeet,
      pricePerSqFeet: pricePerSqFeet,
    };
    this.http
      .put('http://localhost:3000/listings/' + id, listing)
      .subscribe((response) => {
        const updatedListings = [...this.listings];
        const oldListingIndex = updatedListings.findIndex(
          (l) => l.id === listing.id
        );
        updatedListings[oldListingIndex] = listing;
        this.listings = updatedListings;
        this.listingsUpdated.next([...this.listings]);
      });
  }

  deleteListing(listingId: string) {
    this.http
      .delete('http://localhost:3000/listings/' + listingId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }
}
