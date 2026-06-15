Single-line text input with optional label, lead/trail affixes, hint, and validation. Use `mono` for serials, MAC addresses, and IPs.

```jsx
<Input label="Search devices" leadingIcon={<i data-lucide="search" />} placeholder="Name, serial, room…" />
<Input label="Serial number" mono placeholder="FOC2530NXXX" required />
<Input label="Admin email" error="That address isn't recognized" defaultValue="bad@" />
```

`error` turns the field red and replaces `hint`. Sizes `sm | md | lg`.
