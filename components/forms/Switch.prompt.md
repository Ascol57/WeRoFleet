On/off toggle for instant-apply settings (auto-update, do-not-disturb, presence broadcast). For values that commit on form submit, use Checkbox.

```jsx
<Switch label="Automatic firmware updates" defaultChecked />
<Switch size="sm" label="Show offline devices" />
<Switch label="Digital signage mode" description="Display content when idle" />
```

Toggling applies immediately — pair with a Toast/Banner if the change has side effects.
