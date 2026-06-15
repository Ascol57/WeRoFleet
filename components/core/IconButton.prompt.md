Square icon-only button for toolbars, table-row quick actions, and panel chrome. Always pass `label` (accessible name + tooltip).

```jsx
<IconButton icon={<i data-lucide="more-horizontal" />} label="More actions" />
<IconButton variant="outline" icon={<i data-lucide="refresh-cw" />} label="Refresh" />
<IconButton variant="danger" size="sm" icon={<i data-lucide="power" />} label="Reboot device" />
```

Variants: `ghost` (default, in dense tables) · `outline` · `solid` · `danger`. Sizes `sm | md | lg`.
