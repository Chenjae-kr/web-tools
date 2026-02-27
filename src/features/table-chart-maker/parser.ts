import Papa from 'papaparse'

export type ChartDatum = { label: string; value: number }

export function parseTableText(text: string): ChartDatum[] {
  const parsed = Papa.parse<string[]>(text.trim(), { header: false, skipEmptyLines: true })
  const rows = parsed.data
  if (!rows.length) return []

  const maybeHeader = rows[0]
  const hasHeader = Number.isNaN(Number((maybeHeader?.[1] ?? '').toString().replace(/,/g, '')))
  const body = hasHeader ? rows.slice(1) : rows

  return body
    .map((r: string[]) => ({
      label: String(r?.[0] ?? '').trim(),
      value: Number(String(r?.[1] ?? '0').replace(/,/g, '')) || 0,
    }))
    .filter((x: ChartDatum) => x.label)
}

export function parseJsonText(text: string): ChartDatum[] {
  const parsed = JSON.parse(text)
  if (!Array.isArray(parsed)) throw new Error('JSON must be array')
  return parsed
    .map((it) => ({
      label: String(it?.label ?? it?.name ?? '').trim(),
      value: Number(it?.value ?? it?.y ?? 0) || 0,
    }))
    .filter((x) => x.label)
}
