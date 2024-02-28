import IProduct from "interfaces/entities/IProduct";

export default interface ProductTable extends Omit<IProduct, 'categories'> {
  categories:string;
}