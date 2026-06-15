Inline alert / system message for incident notices, maintenance windows, and contextual warnings. For transient confirmations, use a toast instead.

```jsx
<Banner tone="critical" title="7 devices offline in San Jose HQ"
  actions={<Button size="sm" variant="secondary">View incident</Button>} onClose={dismiss}>
  Network switch SJ-3F-SW2 stopped responding at 09:14.
</Banner>
<Banner tone="warning" flush title="Firmware RoomOS 11.21 rolls out tonight 22:00–02:00" />
```

Tones: `info · success · warning · critical · neutral`. Use `flush` for page-spanning headers.
