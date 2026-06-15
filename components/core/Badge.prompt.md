Compact count / label badge — device counts, firmware versions, "NEW", unread alert counts. For *live device state* reach for `StatusBadge` instead.

```jsx
<Badge>RoomOS 11.14</Badge>
<Badge tone="accent" shape="pill">12 rooms</Badge>
<Badge tone="critical" shape="pill">3</Badge>
```

Tones: `neutral · accent · online · incall · degraded · critical · offline`. `shape="pill"`, `outline` for transparent fill.
