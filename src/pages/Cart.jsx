import { useEffect, useState } from "react";
import { getCart, deleteCart } from "../services/CartService";
import Navbar from "../components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null); // tracks which item is being deleted

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.map(item => ({ ...item, qty: item.quantity ?? 1 })));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = (index, delta) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = async (item, index) => {
    const id = item.id ?? item.cartId ?? item._id;
    if (!id) {
      // No ID → just remove locally
      setCartItems(prev => prev.filter((_, i) => i !== index));
      return;
    }

    setRemovingId(id);
    try {
      await deleteCart(id);
      setCartItems(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      alert("Could not remove item. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 6.99;
  const total    = subtotal + shipping;

  return (
    <>
    <Navbar/>
      <style>{css}</style>
      <main className="ct-page">

        {/* ── Header ── */}
        <div className="ct-header">
          <div className="ct-header-inner">
            <h1 className="ct-title">Your Cart</h1>
            <span className="ct-count">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <div className="ct-layout">

          {/* ── Items column ── */}
          <div className="ct-items-col">

            {loading && (
              <div className="ct-empty">
                <span className="ct-empty-icon">🍵</span>
                <p>Loading your cart…</p>
              </div>
            )}

            {!loading && cartItems.length === 0 && (
              <div className="ct-empty">
                <span className="ct-empty-icon">🛒</span>
                <p className="ct-empty-title">Your cart is empty</p>
                <p className="ct-empty-sub">Add some matcha to get started.</p>
                <a href="/shop" className="ct-btn-primary">Shop Now →</a>
              </div>
            )}

            {!loading && cartItems.length > 0 && (
              <>
                {/* Free shipping banner */}
                {shipping > 0 ? (
                  <div className="ct-shipping-banner">
                    🌿 Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for free shipping
                    <div className="ct-progress-track">
                      <div className="ct-progress-fill" style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="ct-shipping-banner ct-shipping-free">
                    ✅ You've unlocked <strong>free shipping!</strong>
                  </div>
                )}

                <ul className="ct-list">
                  {cartItems.map((item, i) => {
                    const id = item.id ?? item.cartId ?? item._id;
                    const isRemoving = removingId === id;

                    return (
                      <li key={id ?? i} className={`ct-item${isRemoving ? " ct-item-removing" : ""}`}>

                        {/* Image */}
                        <div className="ct-item-img">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.productName} className="ct-img" />
                            : <span className="ct-img-fallback">🍵</span>
                          }
                        </div>

                        {/* Info */}
                        <div className="ct-item-info">
                          <span className="ct-item-grade">{item.grade ?? "Matcha"}</span>
                          <h2 className="ct-item-name">{item.productName}</h2>
                          {item.weight && <p className="ct-item-meta">{item.weight}</p>}
                        </div>

                        {/* Controls */}
                        <div className="ct-item-controls">
                          <div className="ct-qty">
                            <button
                              className="ct-qty-btn"
                              onClick={() => updateQty(i, -1)}
                              aria-label="Decrease quantity"
                              disabled={item.qty <= 1 || isRemoving}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                              </svg>
                            </button>
                            <span className="ct-qty-val">{item.qty}</span>
                            <button
                              className="ct-qty-btn"
                              onClick={() => updateQty(i, +1)}
                              aria-label="Increase quantity"
                              disabled={isRemoving}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <line x1="12" y1="5" x2="12" y2="19"/>
                              </svg>
                            </button>
                          </div>

                          {item.price != null && (
                            <p className="ct-item-price">${(item.price * item.qty).toFixed(2)}</p>
                          )}

                          <button
                            className="ct-remove"
                            onClick={() => removeItem(item, i)}
                            aria-label="Remove item"
                            disabled={isRemoving}
                          >
                            {isRemoving ? (
                              <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "ct-spin 0.7s linear infinite" }}>
                                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                </svg>
                                Removing…
                              </>
                            ) : (
                              <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"/>
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                  <path d="M10 11v6"/><path d="M14 11v6"/>
                                  <path d="M9 6V4h6v2"/>
                                </svg>
                                Remove
                              </>
                            )}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>

          {/* ── Order summary ── */}
          {!loading && cartItems.length > 0 && (
            <aside className="ct-summary">
              <h2 className="ct-summary-title">Order Summary</h2>

              <div className="ct-summary-rows">
                <div className="ct-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="ct-summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "ct-free" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="ct-summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="ct-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="ct-promo">
                <input type="text" placeholder="Promo code" className="ct-promo-input" />
                <button className="ct-promo-btn" type="button">Apply</button>
              </div>

              <button className="ct-checkout-btn" type="button">Checkout →</button>

              <a href="/shop" className="ct-continue">← Continue Shopping</a>

              <div className="ct-trust">
                {["🔒 Secure checkout", "🌿 Eco packaging", "🚚 Fast delivery"].map(t => (
                  <span key={t} className="ct-trust-item">{t}</span>
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap');

  @keyframes ct-spin { to { transform: rotate(360deg); } }

  .ct-page { font-family: 'DM Sans', sans-serif; background: #f7f4ef; color: #2a2a20; min-height: 100vh; }

  .ct-header { background: #f0ece3; border-bottom: 1px solid #ddd8cc; padding: 2rem 0 1.5rem; }
  .ct-header-inner { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: baseline; gap: 12px; }
  .ct-title { font-family: 'Lora', serif; font-size: 28px; font-weight: 600; color: #1e2418; margin: 0; }
  .ct-count { font-size: 13px; color: #7a8a6a; }

  .ct-layout { max-width: 1100px; margin: 2rem auto; padding: 0 1.5rem; display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }

  .ct-empty { text-align: center; padding: 4rem 2rem; background: #fff; border: 1px solid #ddd8cc; border-radius: 14px; }
  .ct-empty-icon { font-size: 52px; display: block; margin-bottom: 1rem; }
  .ct-empty-title { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: #1e2418; margin: 0 0 6px; }
  .ct-empty-sub { font-size: 14px; color: #7a8a6a; margin: 0 0 1.5rem; }

  .ct-shipping-banner { background: #e8f4d8; border: 1px solid #c8ddb0; border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #3a5a2a; margin-bottom: 1rem; }
  .ct-shipping-free { background: #d8f0d0; border-color: #a8d090; }
  .ct-progress-track { background: #c8ddb0; border-radius: 10px; height: 5px; margin-top: 8px; overflow: hidden; }
  .ct-progress-fill { background: #3a5a2a; height: 100%; border-radius: 10px; transition: width 0.35s ease; }

  .ct-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

  .ct-item { background: #fff; border: 1px solid #ddd8cc; border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1.25rem; transition: box-shadow 0.15s, opacity 0.2s; margin-bottom: 10px; }
  .ct-item:hover { box-shadow: 0 4px 16px rgba(40,60,20,0.08); }
  .ct-item-removing { opacity: 0.45; pointer-events: none; }

  .ct-item-img { width: 80px; height: 80px; border-radius: 10px; overflow: hidden; background: #d4e8bc; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .ct-img { width: 100%; height: 100%; object-fit: cover; }
  .ct-img-fallback { font-size: 38px; }

  .ct-item-info { flex: 1; min-width: 0; }
  .ct-item-grade { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8aab5e; }
  .ct-item-name { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #1e2418; margin: 3px 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ct-item-meta { font-size: 12px; color: #7a8a6a; margin: 0; }

  .ct-item-controls { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }

  .ct-qty { display: flex; align-items: center; background: #f0ece3; border: 1px solid #ddd8cc; border-radius: 8px; overflow: hidden; }
  .ct-qty-btn { width: 32px; height: 32px; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #3a5a2a; transition: background 0.12s; }
  .ct-qty-btn:hover:not(:disabled) { background: #e0edd0; }
  .ct-qty-btn:disabled { color: #b8c8a8; cursor: not-allowed; }
  .ct-qty-val { min-width: 28px; text-align: center; font-size: 14px; font-weight: 500; color: #1e2418; }

  .ct-item-price { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #1e2418; margin: 0; }

  .ct-remove { display: flex; align-items: center; gap: 5px; background: none; border: none; cursor: pointer; font-size: 12px; color: #a08070; font-family: 'DM Sans', sans-serif; padding: 0; transition: color 0.12s; }
  .ct-remove:hover:not(:disabled) { color: #c0392b; }
  .ct-remove:disabled { cursor: not-allowed; opacity: 0.6; }

  .ct-summary { background: #fff; border: 1px solid #ddd8cc; border-radius: 14px; padding: 1.5rem; position: sticky; top: 1.5rem; }
  .ct-summary-title { font-family: 'Lora', serif; font-size: 18px; font-weight: 600; color: #1e2418; margin: 0 0 1.25rem; }
  .ct-summary-rows { display: flex; flex-direction: column; gap: 10px; padding-bottom: 1rem; border-bottom: 1px solid #ede9e0; margin-bottom: 1rem; }
  .ct-summary-row { display: flex; justify-content: space-between; font-size: 13.5px; color: #5a6050; }
  .ct-free { color: #3a5a2a; font-weight: 600; }
  .ct-summary-total { display: flex; justify-content: space-between; font-size: 16px; font-weight: 600; color: #1e2418; font-family: 'Lora', serif; margin-bottom: 1.25rem; }

  .ct-promo { display: flex; gap: 6px; margin-bottom: 1rem; }
  .ct-promo-input { flex: 1; height: 36px; padding: 0 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; border: 1px solid #ddd8cc; border-radius: 7px; background: #f7f4ef; color: #2a2a20; outline: none; transition: border-color 0.15s; }
  .ct-promo-input:focus { border-color: #5a7840; }
  .ct-promo-input::placeholder { color: #a8a898; }
  .ct-promo-btn { height: 36px; padding: 0 12px; background: #ede9e0; border: 1px solid #ddd8cc; border-radius: 7px; font-size: 13px; font-weight: 500; color: #3a5a2a; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.15s; }
  .ct-promo-btn:hover { background: #d8d4c8; }

  .ct-checkout-btn { width: 100%; height: 46px; background: #3a5a2a; color: #e8f0de; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: background 0.15s, transform 0.1s; margin-bottom: 0.875rem; }
  .ct-checkout-btn:hover { background: #2c4420; transform: translateY(-1px); }

  .ct-continue { display: block; text-align: center; font-size: 13px; color: #7a8a6a; text-decoration: none; margin-bottom: 1.25rem; transition: color 0.15s; }
  .ct-continue:hover { color: #3a5a2a; }

  .ct-trust { border-top: 1px solid #ede9e0; padding-top: 1rem; display: flex; flex-direction: column; gap: 6px; }
  .ct-trust-item { font-size: 12px; color: #7a8a6a; }

  .ct-btn-primary { height: 44px; padding: 0 24px; background: #3a5a2a; color: #e8f0de; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; transition: background 0.15s; }
  .ct-btn-primary:hover { background: #2c4420; }

  @media (max-width: 860px) {
    .ct-layout { grid-template-columns: 1fr; }
    .ct-summary { position: static; }
  }
  @media (max-width: 520px) {
    .ct-item { flex-wrap: wrap; }
    .ct-item-controls { flex-direction: row; align-items: center; width: 100%; justify-content: space-between; }
  }
`;

export default Cart;