// import { Component } from '@angular/core';
import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import {Purchase} from './purchase';
import {PurchaseService} from './purchase.service';
import {Products} from './products';
import {ProductsService} from './products.service';
import {ShoppingList} from './shoplist';
import {ShoplistService} from './shoplist.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CustomerService, ProductsService, PurchaseService, ShoplistService]
})
export class AppComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  // @ViewChild('readOnlyPurchaseTemplate') readOnlyPurchaseTemplate: TemplateRef<any>;
  // @ViewChild('editPurchaseTemplate') editPurchaseTemplate: TemplateRef<any>;

  editedUser: Customer;
  users: Array<Customer>;
  isNewRecord: boolean;
  statusMessage: string;

  purchases: Array<Purchase>;
  products: Array<Products>;
  editedPurchase: Purchase;
  isNewAdded: boolean;
  lists: Array<ShoppingList>;

  constructor(
    private serv: CustomerService,
    private listService: ShoplistService,
    private purchaseServ: PurchaseService,
    private productsServ: ProductsService) {
    this.users = [];
    this.lists = [];
    this.products = [];
    this.purchases = [];
  }
  ngOnInit() {
    this.loadUsers();
    this.loadLists();
    // this.loadPurchases();
    // this.loadProducts();
  }

  private loadUsers() {
    this.serv.getUsers().subscribe((data: Customer[]) => {
      this.users = data;
      console.log(this.users);
    });
  }
  private loadLists() {
    this.listService.getLists().subscribe((data: ShoppingList[]) => {
      this.lists = data;
      console.log(this.lists);
    });
  }

  // private loadPurchases() {
  //   this.purchaseServ.getPurchases().subscribe((data: Purchase[]) => {
  //     this.purchases = data;
  //     console.log('purchases', data);
  //     // this.selectionPurchases = this.purchases.map(a => a.purchaseName);
  //     // console.log('purchases re', this.selectionPurchases);
  //   });
  // }
  //
  // private loadProducts() {
  //   this.productsServ.getProducts().subscribe((data: Products[]) => {
  //       this.products = data;
  //       console.log('products', data);
  //     });
  // }

  loadTemplate(user: Customer) {
    if (this.editedUser && this.editedUser.userId === user.userId) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  // loadPurchaseTemplate(purchase: Purchase) {
  //   if (this.editedPurchase && this.editedPurchase.purchaseId === purchase.purchaseId) {
  //     return this.editPurchaseTemplate;
  //   } else {
  //     return this.readOnlyPurchaseTemplate;
  //   }
  // }

  addUser() {
    this.editedUser = new Customer(0, '', '', '', '', new Array<ShoppingList>());
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  // addPurchase() {
  //   this.editedPurchase = new Purchase(0,'','', []);
  //   this.purchases.push(this.editedPurchase);
  //   this.isNewAdded = true;
  // }

  editUser(user: Customer) {
    this.editedUser = new Customer( user.userId,
                                    user.userFirstName,
                                    user.userLastName,
                                    user.userEmail,
                                    user.userPassword,
                                    user.shoppingList);
  }

  // editPurchase(purchase: Purchase) {
  //   this.editedPurchase = new Purchase( purchase.purchaseId, purchase.purchaseName,
  // purchase.purchaseAddress, purchase.productDescription);
  // }

  saveUser() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createUser(this.editedUser).subscribe(data => {
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // изменяем пользователя
      this.serv.updateUser(this.editedUser).subscribe(data => {
        console.log(data);
      }, (err) => {
        console.log('err', err);
        this.loadUsers();
      });
      this.editedUser = null;
    }
  }

  // savePurchase() {
  //   if (this.isNewAdded) {
  //     console.log(this.editedPurchase);
  //     this.purchaseServ.createPurchase(this.editedPurchase).subscribe(data => {
  //         this.loadPurchases();
  //     });
  //     this.isNewAdded = false;
  //     this.editedPurchase = null;
  //   } else {
  //     console.log(this.editedPurchase);
  //     this.purchaseServ.updatePurchase(this.editedPurchase).subscribe(data => {
  //       console.log(data);
  //     }, (err) => {
  //       console.log('err', err);
  //       this.loadPurchases();
  //     });
  //     this.editedPurchase = null;
  //   }
  // }

  cancel() {
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }

  // cancelAction() {
  //   if (this.isNewAdded) {
  //     this.products.pop();
  //     this.isNewAdded = false;
  //   }
  //   this.editedPurchase = null;
  // }

  deleteUser(user: Customer) {
    this.serv.deleteUser(user.userEmail).subscribe(data => {
      this.loadUsers();
    }, (err) => {
      console.log('err', err);
      this.loadUsers();
    });
  }

  // deletePurchase(purchase: Purchase) {
  //   this.purchaseServ.deletePurchase(purchase.purchaseId).subscribe(data => {
  //     this.loadPurchases();
  //   }, (err) => {
  //     console.log('err', err);
  //     this.loadPurchases();
  //   });
  // }


}
