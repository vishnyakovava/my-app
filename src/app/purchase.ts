import {Products} from './products';

export class Purchase {
  constructor(
    public purchaseId: number,
    public purchaseName: string,
    public purchaseAddress: string,
    public productDescription: Array<Products>
  ) {}
}
