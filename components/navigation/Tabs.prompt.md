Horizontal tab strip — `underline` for page sections, `pill` for a compact segmented control. Controlled via `value` + `onChange`.

```jsx
const [tab, setTab] = React.useState('all');
<Tabs value={tab} onChange={setTab} tabs={[
  { value: 'all', label: 'All devices', count: 1240 },
  { value: 'alerts', label: 'Needs attention', icon: <i data-lucide="alert-triangle" />, count: 14 },
  { value: 'rooms', label: 'Rooms' },
]} />

<Tabs variant="pill" value={range} onChange={setRange} tabs={[
  { value: '24h', label: '24h' }, { value: '7d', label: '7d' }, { value: '30d', label: '30d' },
]} />
```

Use `count` to surface queue sizes; `pill` for time-range / view toggles.
