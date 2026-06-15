Lightweight CSS hover/focus tooltip wrapping a single interactive child. Best for icon buttons and truncated values.

```jsx
<Tooltip label="Reboot device" kbd="R"><IconButton icon={<i data-lucide="rotate-cw" />} label="Reboot" /></Tooltip>
<Tooltip label="Last seen 2 min ago" side="right"><StatusBadge state="online" /></Tooltip>
```

Sides: `top · bottom · left · right`. Keep labels short — for rich content use a popover/menu instead.
