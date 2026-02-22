import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Database, ExternalLink, Sparkles } from 'lucide-react'
import { GLOSSARY } from '@/glossary'

interface Report {
  year: number
  title: string
  url?: string
  file?: string
}

interface DataSourcesMethodologyPageProps {
  embedded?: boolean
}

export function DataSourcesMethodologyPage({ embedded }: DataSourcesMethodologyPageProps) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}annual-reports/reports.json`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setReports)
      .catch(() => setReports([]))
  }, [])

  return (
    <div className={embedded ? 'mx-auto max-w-3xl' : ''}>
      <p className="mb-6 text-sm text-muted-foreground">
        Data is extracted from Vanuatu Judiciary Annual Reports at{' '}
        <a href="https://courts.gov.vu" target="_blank" rel="noopener noreferrer" className="text-[#422AFB] hover:underline">
          courts.gov.vu
        </a>
        . For local PDFs, place files in <code className="rounded bg-muted px-1.5 py-0.5">public/annual-reports/</code> and use <code className="rounded bg-muted px-1.5 py-0.5">file</code> in <code className="rounded bg-muted px-1.5 py-0.5">reports.json</code>.
      </p>

      <div className="space-y-6">
        <Card className="border-[#7551ff]/30 bg-gradient-to-br from-[#7551ff]/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-[#7551ff]" />
              What&apos;s New
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Feb 2026:</strong> Added 2025 Annual Statistics; improved DV trend visibility (dedicated card, YoY, rate per 100k); comparison mode (compare two years side-by-side); trend lines on key charts; WCAG contrast; NA values shown as greyed &quot;—&quot;.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              PDFs Used (Annual Reports)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm font-medium">Reports used:</p>
            <ul className="space-y-2">
              {reports.length === 0 ? (
                <li className="text-sm text-muted-foreground">Loading reports…</li>
              ) : (
                reports.map((r) => {
                  const href = r.file
                    ? `${import.meta.env.BASE_URL}annual-reports/${r.file}`
                    : r.url ?? '#'
                  return (
                    <li key={r.year} className="flex items-center justify-between gap-4 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                      <span className="font-medium">{r.title}</span>
                      <a
                        href={href}
                        target={r.url ? '_blank' : undefined}
                        rel={r.url ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-[#422AFB] hover:underline"
                      >
                        View PDF
                        {r.url && <ExternalLink className="size-3.5" />}
                      </a>
                    </li>
                  )
                })
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="size-5" />
              Extraction Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Data was extracted from annual report PDFs using LLM-assisted parsing. Metrics include filings, disposals, clearance rates, pending cases, timeliness, attendance, productivity, outcomes, and workload by type and location.
            </p>
            <p className="text-sm text-muted-foreground">
              Assumptions: Court names are standardized (Court of Appeal, Supreme Court, Magistrates Court, Island Court). Island Court has no criminal/civil outcome data. Percentages and rates are as published unless otherwise noted.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Glossary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              {Object.entries(GLOSSARY).map(([term, def]) => (
                <div key={term} className="border-b border-border/60 pb-2 last:border-0 last:pb-0">
                  <dt className="font-medium text-foreground">{term}</dt>
                  <dd className="mt-0.5 text-muted-foreground">{def}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
