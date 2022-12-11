import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingCreateComponent } from './listing/listing-create/listing-create.component';
import { ListingListComponent } from './listing/listing-list/listing-list.component';

const routes: Routes = [
  { path: '', component: ListingListComponent },
  { path: 'create', component: ListingCreateComponent },
  { path: 'edit/:listingId', component: ListingCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
