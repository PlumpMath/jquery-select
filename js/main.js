
var list = new SelectMenu({
  data: [
    {key: 'a', value: 'value a is'},
    {key: 'b', value: 'value b'},
    {key: 'c', value: 'this is c'}
  ],
  select: 'a'
});

list.on('open', function(selection) {
  console.log('open', selection);
});

list.on('close', function(selection) {
  console.log('close', selection);
});

list.on('select', function(selection) {
  console.log('select', selection);
});

$('.area').empty().append(list.el);

$('.control .open').click(function() {
  list.trigger('open');
});
$('.control .close').click(function() {
  list.trigger('close');
});
$('.control .select').click(function() {
  list.trigger('select', 'b');
});