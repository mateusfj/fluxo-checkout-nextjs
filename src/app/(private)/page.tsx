"use client";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { ProductList } from "@/components/products/productList";

const Home = () => {
  return (
    <main>
      <h1>Private Home Page</h1>
      <CartDrawer />
      <ProductList />
    </main>
  );
};

export default Home;
