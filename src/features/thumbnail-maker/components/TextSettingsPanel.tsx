type Props = {
  mainText: string
  subText: string
  onChangeMainText: (text: string) => void
  onChangeSubText: (text: string) => void
}

export function TextSettingsPanel({ mainText, subText, onChangeMainText, onChangeSubText }: Props) {
  return (
    <section className="phaseItem">
      <strong>Text</strong>
      <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
        <textarea
          value={mainText}
          onChange={(e) => onChangeMainText(e.target.value)}
          rows={3}
          placeholder="메인 텍스트"
          style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
        />
        <textarea
          value={subText}
          onChange={(e) => onChangeSubText(e.target.value)}
          rows={2}
          placeholder="서브 텍스트"
          style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
        />
      </div>
    </section>
  )
}
