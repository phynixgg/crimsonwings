"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import SectionEyebrow from "@/components/SectionEyebrow";

// ---------------------------------------------------------------------------
// MOCK CHECKOUT.
// No real payment is processed. This collects shipping details and writes a
// confirmation to localStorage, then routes to /checkout/success.
//
// >>> TO ADD STRIPE CHECKOUT LATER <<<
// 1. npm install stripe @stripe/stripe-js
// 2. Add keys to .env.local (see .env.local.example).
// 3. Create a route handler at src/app/api/checkout/route.js that builds a
//    Stripe Checkout Session from `items` (server-side, using STRIPE_SECRET_KEY)
//    and returns the session URL.
// 4. In handlePlaceOrder() below, POST the cart to /api/checkout and redirect
//    to the returned session.url instead of the mock flow.
// Never expose STRIPE_SECRET_KEY to the client — keep it server-side only.
// ---------------------------------------------------------------------------

const EMPTY = { name: "", email: "", phone: "", address: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, currency, count, clearCart } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "請填寫姓名 — name required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "請填寫有效 Email.";
    if (!form.phone.trim()) e.phone = "請填寫電話 — phone required.";
    if (!form.address.trim()) e.address = "請填寫寄送地址 — address required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePlaceOrder() {
    if (items.length === 0 || !validate()) return;

    const order = {
      id: "AKL-" + Date.now().toString().slice(-8),
      placedAt: new Date().toISOString(),
      customer: form,
      items,
      subtotal,
      currency,
      count,
    };
    try {
      window.localStorage.setItem("akahane_last_order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    clearCart();
    router.push("/checkout/success");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <SectionEyebrow>Checkout</SectionEyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">結帳</h1>
        <div className="mt-10 flex flex-col items-start gap-5 border border-white/10 bg-ink-900/50 p-10">
          <p className="font-tc text-white/60">購物車是空的，無法結帳。</p>
          <Link href="/#products" className="btn-gold">Browse Gear</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <SectionEyebrow>Checkout</SectionEyebrow>
      <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">結帳</h1>
      <p className="mt-2 font-tc text-sm text-white/50">
        這是示範結帳流程，不會進行真實付款。This is a mock checkout — no real payment is taken.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* CUSTOMER FORM */}
        <div className="space-y-6">
          <Field label="Name 姓名" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
          <Field label="Phone 電話" type="tel" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
          <Field
            label="Shipping address 寄送地址"
            textarea
            value={form.address}
            onChange={(v) => set("address", v)}
            error={errors.address}
          />

          {/* Payment placeholder */}
          <div className="border border-dashed border-gold-700/40 bg-gold-500/[0.03] p-5">
            <p className="font-tech text-xs uppercase tracking-wider2 text-gold-500">
              Payment 付款
            </p>
            <p className="mt-2 font-tc text-sm text-white/50">
              💳 Payment integration goes here. Stripe Checkout can be wired in via
              environment variables — see the comment block in this file.
            </p>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <aside className="h-fit border border-white/10 bg-ink-900/50 p-6">
          <p className="font-tech text-xs uppercase tracking-wider2 text-white/50">
            Order summary 訂單摘要 ({count})
          </p>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden border border-white/10 bg-ink-800">
                  {item.image && <Image src={item.image} alt={item.nameEn} fill sizes="48px" className="object-cover" />}
                </div>
                <div className="flex-1">
                  <p className="font-tc text-sm text-white">{item.name}</p>
                  <p className="font-tech text-[10px] uppercase tracking-wider2 text-white/40">
                    {item.size} · ×{item.qty}
                  </p>
                </div>
                <span className="font-display text-sm text-white">
                  {formatPrice(item.price * item.qty, item.currency)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
            <Row label="Subtotal 小計" value={formatPrice(subtotal, currency)} />
            <Row label="Shipping 運費" value="Calculated later" muted />
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-tech text-sm uppercase tracking-wider2 text-white/70">Total 總計</span>
              <span className="font-display text-lg text-gold-grad">{formatPrice(subtotal, currency)}</span>
            </div>
          </div>

          <button onClick={handlePlaceOrder} className="btn-gold mt-6 w-full">
            Place order 送出訂單
          </button>
          <Link href="/cart" className="mt-3 block text-center font-tech text-xs uppercase tracking-wider2 text-white/50 hover:text-gold-400">
            Back to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, type = "text", textarea }) {
  return (
    <label className="block">
      <span className="mb-2 block font-tech text-xs uppercase tracking-wider2 text-white/70">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none border border-white/15 bg-ink-950 px-4 py-3 font-tc text-sm text-white outline-none transition-colors focus:border-gold-500"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-white/15 bg-ink-950 px-4 py-3 font-tc text-sm text-white outline-none transition-colors focus:border-gold-500"
        />
      )}
      {error && <span className="mt-1 block font-tc text-xs text-gold-400">{error}</span>}
    </label>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-tc text-sm text-white/60">{label}</span>
      <span className={`font-tech text-sm ${muted ? "text-white/40" : "text-white"}`}>{value}</span>
    </div>
  );
}
