
jQuery Select menu
------

Trying to make a alternative for the default `<select>`.

[Demo](http://s.jiyinyiyong.info/jquery-select/index.html)

### Installation

```
bower install --save jquery-select-simple
```

### Usage

Create a select manu:

```coffee
menu = new SelectMenu
  data:
    a:
      key: 'key a'
      value: 'value a'
    b:
      key: 'key b'
      value: 'value b'

  select: 'key a'

menu.on 'open', (selection) ->
menu.on 'close', (seletion) ->
menu.on 'select', (selection) ->

menu.trigger 'open'
menu.trigger 'close'
menu.trigger 'select', key: 'key a'
menu.trigger 'select', value: 'value a'
```

### Internal events

Inside the object, we use `bind emit` to handle the events.
Events binded with `on` will be triggered by `emit` from inside.
Events binded with `bind` will be triggered by `trigger` from outside.

### UI

By now the dropdown hint if a utf8 character:
http://unicode-table.com/en/search/?q=triangle

```
▾
```

### License

MIT
