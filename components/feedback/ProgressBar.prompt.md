Thin progress bar for firmware rollout coverage, transfers, and storage usage. Determinate by default; set `indeterminate` for unknown-duration work.

```jsx
<ProgressBar label="RoomOS 11.21 rollout" value={842} max={1240} showValue valueText="842 / 1,240" tone="online" />
<ProgressBar label="Disk usage" value={88} showValue tone="degraded" />
<ProgressBar label="Pushing config…" indeterminate />
```

Choose `tone` by sentiment. Pair with a Banner for the surrounding status message.
