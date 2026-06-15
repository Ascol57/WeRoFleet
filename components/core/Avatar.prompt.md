Round avatar for a person (initials or photo) or a square glyph for a device. Person initials are tinted deterministically from the name.

```jsx
<Avatar name="Priya Anand" />
<Avatar name="Marcus Lee" src="/people/marcus.jpg" size="sm" statusColor="var(--status-online)" />
<Avatar kind="device" name="Boardroom A" />   {/* square monitor glyph */}
```

Sizes `xs–xl`. Use `kind="device"` for Room Kit rows, `statusColor` to overlay a presence/online ring.
