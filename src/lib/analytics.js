const track = (event, properties = {}) => {
  try {
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track(event, properties)
    }
  } catch {
    // analytics ne doit jamais casser l'app
  }
}

export const analytics = {
  productViewed: (product) =>
    track('product_view', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price,
    }),

  addToCart: (product, quantity = 1) =>
    track('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price,
      quantity,
    }),

  cartViewed: (itemCount, total) =>
    track('cart_view', {
      item_count: itemCount,
      cart_total: parseFloat(total.toFixed(2)),
    }),

  checkoutStarted: (cart, total) =>
    track('checkout_start', {
      item_count: cart.reduce((n, i) => n + i.quantity, 0),
      cart_total: parseFloat(total.toFixed(2)),
    }),

  orderCompleted: (orderNumber, total) =>
    track('order_complete', {
      order_number: orderNumber,
      revenue: parseFloat((total * 1.2).toFixed(2)),
    }),

  categoryFiltered: (category) =>
    track('category_filter', { category }),

  checkoutValidationError: (fields) =>
    track('checkout_validation_error', { invalid_fields: fields.join(',') }),
}
