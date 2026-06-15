Native-backed dropdown select with WeRoFleet chrome. Pass `options` or raw `<option>` children.

```jsx
<Select label="Site" options={['All sites', 'San Jose HQ', 'London', 'Sydney']} />
<Select label="Status" placeholder="Any status"
  options={[{value:'online',label:'Online'},{value:'critical',label:'Critical'}]} />
```

Sizes `sm | md | lg`. For a multi-select filter, compose `Tag`s below the field instead.
