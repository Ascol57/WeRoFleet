Surface container for panels, metric tiles, and grouped content. Standard header (title/subtitle/actions + leading icon) or a plain padded panel.

```jsx
<Card title="Firmware compliance" subtitle="248 devices" headerActions={<IconButton icon={<i data-lucide="more-horizontal" />} label="Options" />}>
  …body…
</Card>

<Card pad elevation="flat">Simple padded panel</Card>
```

`elevation`: flat | default | raised. `interactive` for clickable cards. Compose `MetricStat`, tables, and charts inside.
