Checkbox (default) or radio (`shape="radio"`) with optional label and description. Supports the indeterminate "select-all" header state.

```jsx
<Checkbox label="Auto-install firmware" description="During the maintenance window" defaultChecked />
<Checkbox indeterminate aria-label="Select all" />   {/* table header */}
<Checkbox shape="radio" name="cadence" label="Weekly" />
```

Use `indeterminate` for partial table selection; use `shape="radio"` grouped by a shared `name`.
