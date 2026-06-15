KPI tile — a labelled headline number with optional unit, trend delta, and footnote. The building block of the fleet dashboard's metric strip.

```jsx
<MetricStat label="Online" value="1,184" unit="/ 1,240" delta="+12" trend="up" footnote="vs. yesterday" />
<MetricStat label="In call now" value="318" icon={<i data-lucide="video" />} />
<MetricStat label="Critical" value="7" trend="down" delta="-3" size="sm" />
```

Trend colors: `up` = green, `down` = red, `flat` = muted. Note that for some metrics (e.g. "Critical") a downward trend is *good* — choose `trend` by sentiment, not arithmetic, or leave `flat`.
