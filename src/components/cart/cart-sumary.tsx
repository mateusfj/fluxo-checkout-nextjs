export const CartSummary = () => {
  return (
    <div className="border-t pt-4 mt-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>${10}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>$5.99</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax:</span>
          <span>${10 * 0.08}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-medium">
          <span>Total:</span>
          <span>${(10 + 5.99 + 10 * 0.08).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
