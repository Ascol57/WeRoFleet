Live device-state pill with a colored status dot — the canonical way to show a Room Kit's operational state. `incall` and `critical` pulse by default.

```jsx
<StatusBadge state="online" />
<StatusBadge state="incall" />            {/* pulses */}
<StatusBadge state="degraded" label="Camera fault" />
<StatusBadge state="offline" plain />     {/* dot + text, no pill */}
```

States: `online` · `incall` · `degraded` · `critical` · `offline`. Use `plain` inside dense table cells; use the default filled pill in cards and headers.
