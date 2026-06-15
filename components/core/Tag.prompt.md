Removable / selectable chip for filters, location and group tags, and assigned peripherals. Optional leading color dot and dismiss affordance.

```jsx
<Tag dotColor="var(--teal-500)">Building C · Floor 3</Tag>
<Tag selected onClick={toggle}>Online only</Tag>
<Tag leadingIcon={<i data-lucide="map-pin" />} onRemove={clear}>San Jose HQ</Tag>
```

Pass `onClick` (or `selected`) to make it interactive; `onRemove` adds a dismiss button; `dotColor` adds a leading status/room dot.
