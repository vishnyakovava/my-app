import {ShoppingList} from './shoplist';
export class Customer {
  constructor(
    public userId: number,
    public userFirstName: string,
    public userLastName: string,
    public userEmail: string,
    public userPassword: string,
    public shoppingList: Array<ShoppingList>
  ) {}
}
