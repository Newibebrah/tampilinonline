/** Renderer JSON-LD — native <script>, bukan next/script (JSON-LD adalah data, bukan kode eksekusi). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}
