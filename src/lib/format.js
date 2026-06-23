// Format an integer amount with a currency prefix and thousands separators.
// formatPrice(1899, "NT$") -> "NT$1,899"
export function formatPrice(amount, currency = "NT$") {
  const n = Number(amount) || 0;
  return `${currency}${n.toLocaleString("en-US")}`;
}

// Build a stable cart line id from product slug + size + customization.
// Two identical configurations stack; different sizes are separate lines.
export function lineId(slug, size, customization) {
  const c = customization
    ? Object.entries(customization)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}:${v}`)
        .join("|")
    : "";
  return [slug, size || "", c].join("__");
}
