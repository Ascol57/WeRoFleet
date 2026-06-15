WeRoFleet primary action button — solid teal for the single main action in a view; secondary/ghost for supporting actions, danger for destructive device ops.

```jsx
<Button variant="primary" onClick={pushUpdate}>Deploy update</Button>
<Button variant="secondary" leadingIcon={<i data-lucide="rotate-cw" />}>Reboot</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger" leadingIcon={<i data-lucide="trash-2" />}>Remove from fleet</Button>
```

Variants: `primary` · `secondary` · `ghost` · `danger`. Sizes: `sm | md | lg`. Use `block` for full-width (mobile / drawer footers), `leadingIcon` / `trailingIcon` for icon+label. One primary per view.
