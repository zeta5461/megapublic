<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import review from '#lib/data/report-review.json';
  import { causeOf, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const overrides = new Map(review.overrides.map((r) => [r.id, r]));
  const merged = uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471);
  const reviewed = merged.map((r) => ({ ...r, problem: overrides.get(r.id)?.problem ?? causeOf(r, tenantOf(r)) ?? 'unplaced' }));
  const labels = new Map([
    ['parser', 'Shared parser — body-supported or contextual'],
    ['hint', 'booking-v3 hint'],
    ['day-discrepancy', 'Day discrepancy — investigate'],
    ['premature-invite', 'Invite received before booking — investigate']
  ]);
  const groups = [...labels].map(([key, label]) => ({ label, reports: reviewed.filter((r) => r.problem === key) }));
  const anomalies = reviewed.filter((r) => overrides.has(r.id));
  const week = (iso: string) => {
    const d = new Date(iso.slice(0, 10));
    d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
    return d.toISOString().slice(0, 10);
  };
</script>

<h3>Reviewed ticket split</h3>
<p>{merged.length} unique reports; each appears in exactly one proposed ticket. Counts are computed from report IDs and explicit review annotations.</p>
<table>
  <thead><tr><th>Problem</th><th>Reports</th></tr></thead>
  <tbody>{#each groups as g}<tr><td>{g.label}</td><td>{g.reports.length}</td></tr>{/each}</tbody>
</table>

<h3>Desk-noted reports: evidence and queue placement</h3>
<p>The only desk note is membership in <code>oneDayMove</code>; it is not an individual diagnosis. Queue weeks match QueueTimeline: Monday–Sunday using the date written in each export timestamp.</p>
{#each anomalies as r}
  {@const tenant = tenantOf(r)}
  <h4>{r.id} · {labels.get(r.problem)}</h4>
  <blockquote>{r.body}</blockquote>
  <p>{tenant?.name}: locale <code>{tenant?.locale}</code>, <code>{tenant?.form}</code>, channel <code>{r.channel}</code>. Exported classification: <code>{causeOf(r, tenant)}</code>. Desk note: <code>oneDayMove</code>.</p>
  <p>Received <code>{r.receivedAt}</code> (week {week(r.receivedAt)}); merged <code>{r.mergedAt}</code> (week {week(r.mergedAt!)}).</p>
{/each}
