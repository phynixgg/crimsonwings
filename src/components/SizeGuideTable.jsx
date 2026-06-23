// Renders the size guide table from a product's sizeGuide object.
export default function SizeGuideTable({ sizeGuide }) {
  if (!sizeGuide) return null;
  const { columns, rows, unit, note } = sizeGuide;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-ink-800">
              {columns.map((c, i) => (
                <th
                  key={c}
                  className={`whitespace-nowrap border-b border-white/10 px-3 py-2.5 text-left font-tech text-xs uppercase tracking-wider2 ${
                    i === 0 ? "text-white/70" : "text-gold-500"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="odd:bg-ink-900/40">
                <td className="whitespace-nowrap border-b border-white/5 px-3 py-2.5 font-tc text-white/80">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className="border-b border-white/5 px-3 py-2.5 font-tech text-white/60"
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-tc text-xs text-white/40">
        單位 / Unit: {unit}. {note}
      </p>
    </div>
  );
}
