import { useState } from 'react'
import type { CSSProperties } from 'react'
import Papa from 'papaparse'
import { z } from 'zod'

const jsonArraySchema = z.array(z.record(z.string(), z.any()))

type Mode = 'json-to-csv' | 'csv-to-json'

export function DataConverterPage() {
  const [mode, setMode] = useState<Mode>('json-to-csv')
  const [input, setInput] = useState('[\n  {"name":"Alice","score":42},\n  {"name":"Bob","score":28}\n]')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const convert = () => {
    try {
      setError(null)
      if (mode === 'json-to-csv') {
        const parsed = jsonArraySchema.parse(JSON.parse(input))
        const csv = Papa.unparse(parsed)
        setOutput(csv)
        return
      }
      const result = Papa.parse<Record<string, string>>(input, { header: true, skipEmptyLines: true })
      if (result.errors.length) throw new Error(result.errors[0].message)
      setOutput(JSON.stringify(result.data, null, 2))
    } catch (e) {
      setError(e instanceof Error ? e.message : '변환 실패')
    }
  }

  const onUpload = async (file: File | null) => {
    if (!file) return
    const ext = file.name.toLowerCase()
    if (ext.endsWith('.xlsx') || ext.endsWith('.xls')) {
      const xlsx = await import('xlsx')
      const buf = await file.arrayBuffer()
      const wb = xlsx.read(buf, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const json = xlsx.utils.sheet_to_json(ws)
      setInput(JSON.stringify(json, null, 2))
      setMode('json-to-csv')
      return
    }
    const text = await file.text()
    setInput(text)
  }

  return (
    <section className="card">
      <h2>Data Converter (초안)</h2>
      <p className="subtitle">Papa Parse + Zod + (lazy) SheetJS 기반</p>

      <div className="phaseList">
        <section className="phaseItem">
          <strong>Mode</strong>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => setMode('json-to-csv')} style={btn(mode === 'json-to-csv')}>JSON → CSV</button>
            <button type="button" onClick={() => setMode('csv-to-json')} style={btn(mode === 'csv-to-json')}>CSV → JSON</button>
          </div>
          <div style={{ marginTop: 8 }}>
            <input type="file" accept=".json,.csv,.txt,.xlsx,.xls" onChange={(e) => onUpload(e.target.files?.[0] ?? null)} />
          </div>
        </section>

        <section className="phaseItem">
          <strong>Input</strong>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} style={area} />
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={convert} style={btn(true)}>변환 실행</button>
          </div>
        </section>

        <section className="phaseItem">
          <strong>Output</strong>
          <textarea value={output} readOnly rows={10} style={area} />
          {error && <p style={{ color: '#b91c1c' }}>오류: {error}</p>}
        </section>
      </div>
    </section>
  )
}

function btn(active: boolean): CSSProperties {
  return {
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: '6px 10px',
    background: active ? '#dbeafe' : '#fff',
    cursor: 'pointer',
  }
}

const area: CSSProperties = {
  marginTop: 8,
  width: '100%',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  padding: 8,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
}
