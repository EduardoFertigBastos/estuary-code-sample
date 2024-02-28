import { useEffect, useState } from "react";

import { useAuth } from "hooks/auth";

import api from "services/api";

import ProductTable from "../interfaces/productTable";

export function useProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductTable[]>([]);

  useEffect(() => {
    api.get(`points/${user.id}/products`).then(({ data }) => {
      setProducts(data)
    });
  }, []);

  return products;
}