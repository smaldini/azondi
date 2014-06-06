goog.provide('dommy.attrs');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
/**
* does class-name string have class starting at index idx.
* only will be used when Element::classList doesn't exist
*/
dommy.attrs.class_match_QMARK_ = (function class_match_QMARK_(class_name,class$,idx){var and__21037__auto__ = ((idx === 0)) || ((" " === class_name.charAt((idx - 1))));if(and__21037__auto__)
{var total_len = class_name.length;var stop = (idx + class$.length);if((stop <= total_len))
{return ((stop === total_len)) || ((" " === class_name.charAt(stop)));
} else
{return null;
}
} else
{return and__21037__auto__;
}
});
/**
* Finds the index of class in a space-delimited class-name
* only will be used when Element::classList doesn't exist
*/
dommy.attrs.class_index = (function class_index(class_name,class$){var start_from = 0;while(true){
var i = class_name.indexOf(class$,start_from);if((i >= 0))
{if(dommy.attrs.class_match_QMARK_(class_name,class$,i))
{return i;
} else
{{
var G__41367 = (i + class$.length);
start_from = G__41367;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Does an HTML element have a class. Uses Element::classList if
* available and otherwise does fast parse of className string
*/
dommy.attrs.has_class_QMARK_ = (function has_class_QMARK_(elem,class$){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var class$__$1 = cljs.core.name(class$);var temp__4124__auto__ = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto__))
{var class_list = temp__4124__auto__;return class_list.contains(class$__$1);
} else
{var temp__4126__auto__ = elem__$1.className;if(cljs.core.truth_(temp__4126__auto__))
{var class_name = temp__4126__auto__;var temp__4126__auto____$1 = dommy.attrs.class_index(class_name,class$__$1);if(cljs.core.truth_(temp__4126__auto____$1))
{var i = temp__4126__auto____$1;return (i >= 0);
} else
{return null;
}
} else
{return null;
}
}
});
/**
* add class to element
* @param {...*} var_args
*/
dommy.attrs.add_class_BANG_ = (function() {
var add_class_BANG_ = null;
var add_class_BANG___2 = (function (elem,classes){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var classes__$1 = clojure.string.trim(cljs.core.name(classes));if(cljs.core.seq(classes__$1))
{var temp__4124__auto___41392 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___41392))
{var class_list_41393 = temp__4124__auto___41392;var seq__41380_41394 = cljs.core.seq(classes__$1.split(/\s+/));var chunk__41381_41395 = null;var count__41382_41396 = 0;var i__41383_41397 = 0;while(true){
if((i__41383_41397 < count__41382_41396))
{var class_41398 = chunk__41381_41395.cljs$core$IIndexed$_nth$arity$2(null,i__41383_41397);class_list_41393.add(class_41398);
{
var G__41399 = seq__41380_41394;
var G__41400 = chunk__41381_41395;
var G__41401 = count__41382_41396;
var G__41402 = (i__41383_41397 + 1);
seq__41380_41394 = G__41399;
chunk__41381_41395 = G__41400;
count__41382_41396 = G__41401;
i__41383_41397 = G__41402;
continue;
}
} else
{var temp__4126__auto___41403 = cljs.core.seq(seq__41380_41394);if(temp__4126__auto___41403)
{var seq__41380_41404__$1 = temp__4126__auto___41403;if(cljs.core.chunked_seq_QMARK_(seq__41380_41404__$1))
{var c__21797__auto___41405 = cljs.core.chunk_first(seq__41380_41404__$1);{
var G__41406 = cljs.core.chunk_rest(seq__41380_41404__$1);
var G__41407 = c__21797__auto___41405;
var G__41408 = cljs.core.count(c__21797__auto___41405);
var G__41409 = 0;
seq__41380_41394 = G__41406;
chunk__41381_41395 = G__41407;
count__41382_41396 = G__41408;
i__41383_41397 = G__41409;
continue;
}
} else
{var class_41410 = cljs.core.first(seq__41380_41404__$1);class_list_41393.add(class_41410);
{
var G__41411 = cljs.core.next(seq__41380_41404__$1);
var G__41412 = null;
var G__41413 = 0;
var G__41414 = 0;
seq__41380_41394 = G__41411;
chunk__41381_41395 = G__41412;
count__41382_41396 = G__41413;
i__41383_41397 = G__41414;
continue;
}
}
} else
{}
}
break;
}
} else
{var class_name_41415 = elem__$1.className;var seq__41384_41416 = cljs.core.seq(classes__$1.split(/\s+/));var chunk__41385_41417 = null;var count__41386_41418 = 0;var i__41387_41419 = 0;while(true){
if((i__41387_41419 < count__41386_41418))
{var class_41420 = chunk__41385_41417.cljs$core$IIndexed$_nth$arity$2(null,i__41387_41419);if(cljs.core.truth_(dommy.attrs.class_index(class_name_41415,class_41420)))
{} else
{elem__$1.className = (((class_name_41415 === ""))?class_41420:[cljs.core.str(class_name_41415),cljs.core.str(" "),cljs.core.str(class_41420)].join(''));
}
{
var G__41421 = seq__41384_41416;
var G__41422 = chunk__41385_41417;
var G__41423 = count__41386_41418;
var G__41424 = (i__41387_41419 + 1);
seq__41384_41416 = G__41421;
chunk__41385_41417 = G__41422;
count__41386_41418 = G__41423;
i__41387_41419 = G__41424;
continue;
}
} else
{var temp__4126__auto___41425 = cljs.core.seq(seq__41384_41416);if(temp__4126__auto___41425)
{var seq__41384_41426__$1 = temp__4126__auto___41425;if(cljs.core.chunked_seq_QMARK_(seq__41384_41426__$1))
{var c__21797__auto___41427 = cljs.core.chunk_first(seq__41384_41426__$1);{
var G__41428 = cljs.core.chunk_rest(seq__41384_41426__$1);
var G__41429 = c__21797__auto___41427;
var G__41430 = cljs.core.count(c__21797__auto___41427);
var G__41431 = 0;
seq__41384_41416 = G__41428;
chunk__41385_41417 = G__41429;
count__41386_41418 = G__41430;
i__41387_41419 = G__41431;
continue;
}
} else
{var class_41432 = cljs.core.first(seq__41384_41426__$1);if(cljs.core.truth_(dommy.attrs.class_index(class_name_41415,class_41432)))
{} else
{elem__$1.className = (((class_name_41415 === ""))?class_41432:[cljs.core.str(class_name_41415),cljs.core.str(" "),cljs.core.str(class_41432)].join(''));
}
{
var G__41433 = cljs.core.next(seq__41384_41426__$1);
var G__41434 = null;
var G__41435 = 0;
var G__41436 = 0;
seq__41384_41416 = G__41433;
chunk__41385_41417 = G__41434;
count__41386_41418 = G__41435;
i__41387_41419 = G__41436;
continue;
}
}
} else
{}
}
break;
}
}
} else
{}
return elem__$1;
});
var add_class_BANG___3 = (function() { 
var G__41437__delegate = function (elem,classes,more_classes){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var seq__41388_41438 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(more_classes,classes));var chunk__41389_41439 = null;var count__41390_41440 = 0;var i__41391_41441 = 0;while(true){
if((i__41391_41441 < count__41390_41440))
{var c_41442 = chunk__41389_41439.cljs$core$IIndexed$_nth$arity$2(null,i__41391_41441);add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,c_41442);
{
var G__41443 = seq__41388_41438;
var G__41444 = chunk__41389_41439;
var G__41445 = count__41390_41440;
var G__41446 = (i__41391_41441 + 1);
seq__41388_41438 = G__41443;
chunk__41389_41439 = G__41444;
count__41390_41440 = G__41445;
i__41391_41441 = G__41446;
continue;
}
} else
{var temp__4126__auto___41447 = cljs.core.seq(seq__41388_41438);if(temp__4126__auto___41447)
{var seq__41388_41448__$1 = temp__4126__auto___41447;if(cljs.core.chunked_seq_QMARK_(seq__41388_41448__$1))
{var c__21797__auto___41449 = cljs.core.chunk_first(seq__41388_41448__$1);{
var G__41450 = cljs.core.chunk_rest(seq__41388_41448__$1);
var G__41451 = c__21797__auto___41449;
var G__41452 = cljs.core.count(c__21797__auto___41449);
var G__41453 = 0;
seq__41388_41438 = G__41450;
chunk__41389_41439 = G__41451;
count__41390_41440 = G__41452;
i__41391_41441 = G__41453;
continue;
}
} else
{var c_41454 = cljs.core.first(seq__41388_41448__$1);add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,c_41454);
{
var G__41455 = cljs.core.next(seq__41388_41448__$1);
var G__41456 = null;
var G__41457 = 0;
var G__41458 = 0;
seq__41388_41438 = G__41455;
chunk__41389_41439 = G__41456;
count__41390_41440 = G__41457;
i__41391_41441 = G__41458;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__41437 = function (elem,classes,var_args){
var more_classes = null;if (arguments.length > 2) {
  more_classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__41437__delegate.call(this,elem,classes,more_classes);};
G__41437.cljs$lang$maxFixedArity = 2;
G__41437.cljs$lang$applyTo = (function (arglist__41459){
var elem = cljs.core.first(arglist__41459);
arglist__41459 = cljs.core.next(arglist__41459);
var classes = cljs.core.first(arglist__41459);
var more_classes = cljs.core.rest(arglist__41459);
return G__41437__delegate(elem,classes,more_classes);
});
G__41437.cljs$core$IFn$_invoke$arity$variadic = G__41437__delegate;
return G__41437;
})()
;
add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return add_class_BANG___2.call(this,elem,classes);
default:
return add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_class_BANG_.cljs$lang$maxFixedArity = 2;
add_class_BANG_.cljs$lang$applyTo = add_class_BANG___3.cljs$lang$applyTo;
add_class_BANG_.cljs$core$IFn$_invoke$arity$2 = add_class_BANG___2;
add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return add_class_BANG_;
})()
;
dommy.attrs.remove_class_str = (function remove_class_str(init_class_name,class$){var class_name = init_class_name;while(true){
var class_len = class_name.length;var temp__4124__auto__ = dommy.attrs.class_index(class_name,class$);if(cljs.core.truth_(temp__4124__auto__))
{var i = temp__4124__auto__;{
var G__41460 = (function (){var end = (i + class$.length);return [cljs.core.str((((end < class_len))?[cljs.core.str(class_name.substring(0,i)),cljs.core.str(class_name.substr((end + 1)))].join(''):class_name.substring(0,(i - 1))))].join('');
})();
class_name = G__41460;
continue;
}
} else
{return class_name;
}
break;
}
});
/**
* remove class from and returns `elem`
* @param {...*} var_args
*/
dommy.attrs.remove_class_BANG_ = (function() {
var remove_class_BANG_ = null;
var remove_class_BANG___2 = (function (elem,class$){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var class$__$1 = cljs.core.name(class$);var temp__4124__auto___41469 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___41469))
{var class_list_41470 = temp__4124__auto___41469;class_list_41470.remove(class$__$1);
} else
{var class_name_41471 = elem__$1.className;var new_class_name_41472 = dommy.attrs.remove_class_str(class_name_41471,class$__$1);if((class_name_41471 === new_class_name_41472))
{} else
{elem__$1.className = new_class_name_41472;
}
}
return elem__$1;
});
var remove_class_BANG___3 = (function() { 
var G__41473__delegate = function (elem,class$,classes){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var seq__41465 = cljs.core.seq(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(classes,class$));var chunk__41466 = null;var count__41467 = 0;var i__41468 = 0;while(true){
if((i__41468 < count__41467))
{var c = chunk__41466.cljs$core$IIndexed$_nth$arity$2(null,i__41468);remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,c);
{
var G__41474 = seq__41465;
var G__41475 = chunk__41466;
var G__41476 = count__41467;
var G__41477 = (i__41468 + 1);
seq__41465 = G__41474;
chunk__41466 = G__41475;
count__41467 = G__41476;
i__41468 = G__41477;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq(seq__41465);if(temp__4126__auto__)
{var seq__41465__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(seq__41465__$1))
{var c__21797__auto__ = cljs.core.chunk_first(seq__41465__$1);{
var G__41478 = cljs.core.chunk_rest(seq__41465__$1);
var G__41479 = c__21797__auto__;
var G__41480 = cljs.core.count(c__21797__auto__);
var G__41481 = 0;
seq__41465 = G__41478;
chunk__41466 = G__41479;
count__41467 = G__41480;
i__41468 = G__41481;
continue;
}
} else
{var c = cljs.core.first(seq__41465__$1);remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,c);
{
var G__41482 = cljs.core.next(seq__41465__$1);
var G__41483 = null;
var G__41484 = 0;
var G__41485 = 0;
seq__41465 = G__41482;
chunk__41466 = G__41483;
count__41467 = G__41484;
i__41468 = G__41485;
continue;
}
}
} else
{return null;
}
}
break;
}
};
var G__41473 = function (elem,class$,var_args){
var classes = null;if (arguments.length > 2) {
  classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__41473__delegate.call(this,elem,class$,classes);};
G__41473.cljs$lang$maxFixedArity = 2;
G__41473.cljs$lang$applyTo = (function (arglist__41486){
var elem = cljs.core.first(arglist__41486);
arglist__41486 = cljs.core.next(arglist__41486);
var class$ = cljs.core.first(arglist__41486);
var classes = cljs.core.rest(arglist__41486);
return G__41473__delegate(elem,class$,classes);
});
G__41473.cljs$core$IFn$_invoke$arity$variadic = G__41473__delegate;
return G__41473;
})()
;
remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return remove_class_BANG___2.call(this,elem,class$);
default:
return remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_class_BANG_.cljs$lang$maxFixedArity = 2;
remove_class_BANG_.cljs$lang$applyTo = remove_class_BANG___3.cljs$lang$applyTo;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_class_BANG___2;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_class_BANG_;
})()
;
/**
* (toggle-class! elem class) will add-class! if elem does not have class
* and remove-class! otherwise.
* (toggle-class! elem class add?) will add-class! if add? is truthy,
* otherwise it will remove-class!
*/
dommy.attrs.toggle_class_BANG_ = (function() {
var toggle_class_BANG_ = null;
var toggle_class_BANG___2 = (function (elem,class$){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var class$__$1 = cljs.core.name(class$);var temp__4124__auto___41487 = elem__$1.classList;if(cljs.core.truth_(temp__4124__auto___41487))
{var class_list_41488 = temp__4124__auto___41487;class_list_41488.toggle(class$__$1);
} else
{toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3(elem__$1,class$__$1,!(dommy.attrs.has_class_QMARK_(elem__$1,class$__$1)));
}
return elem__$1;
});
var toggle_class_BANG___3 = (function (elem,class$,add_QMARK_){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));if(add_QMARK_)
{dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,class$);
} else
{dommy.attrs.remove_class_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,class$);
}
return elem__$1;
});
toggle_class_BANG_ = function(elem,class$,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_class_BANG___2.call(this,elem,class$);
case 3:
return toggle_class_BANG___3.call(this,elem,class$,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_class_BANG___2;
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_class_BANG___3;
return toggle_class_BANG_;
})()
;
dommy.attrs.style_str = (function style_str(x){if(typeof x === 'string')
{return x;
} else
{return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__41491){var vec__41492 = p__41491;var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41492,0,null);var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41492,1,null);return [cljs.core.str(cljs.core.name(k)),cljs.core.str(":"),cljs.core.str(cljs.core.name(v)),cljs.core.str(";")].join('');
}),x));
}
});
/**
* @param {...*} var_args
*/
dommy.attrs.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_(cljs.core.count(kvs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null)))], 0)))].join('')));
}
var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var style = elem__$1.style;var seq__41499_41505 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,kvs));var chunk__41500_41506 = null;var count__41501_41507 = 0;var i__41502_41508 = 0;while(true){
if((i__41502_41508 < count__41501_41507))
{var vec__41503_41509 = chunk__41500_41506.cljs$core$IIndexed$_nth$arity$2(null,i__41502_41508);var k_41510 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41503_41509,0,null);var v_41511 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41503_41509,1,null);(style[cljs.core.name(k_41510)] = v_41511);
{
var G__41512 = seq__41499_41505;
var G__41513 = chunk__41500_41506;
var G__41514 = count__41501_41507;
var G__41515 = (i__41502_41508 + 1);
seq__41499_41505 = G__41512;
chunk__41500_41506 = G__41513;
count__41501_41507 = G__41514;
i__41502_41508 = G__41515;
continue;
}
} else
{var temp__4126__auto___41516 = cljs.core.seq(seq__41499_41505);if(temp__4126__auto___41516)
{var seq__41499_41517__$1 = temp__4126__auto___41516;if(cljs.core.chunked_seq_QMARK_(seq__41499_41517__$1))
{var c__21797__auto___41518 = cljs.core.chunk_first(seq__41499_41517__$1);{
var G__41519 = cljs.core.chunk_rest(seq__41499_41517__$1);
var G__41520 = c__21797__auto___41518;
var G__41521 = cljs.core.count(c__21797__auto___41518);
var G__41522 = 0;
seq__41499_41505 = G__41519;
chunk__41500_41506 = G__41520;
count__41501_41507 = G__41521;
i__41502_41508 = G__41522;
continue;
}
} else
{var vec__41504_41523 = cljs.core.first(seq__41499_41517__$1);var k_41524 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41504_41523,0,null);var v_41525 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41504_41523,1,null);(style[cljs.core.name(k_41524)] = v_41525);
{
var G__41526 = cljs.core.next(seq__41499_41517__$1);
var G__41527 = null;
var G__41528 = 0;
var G__41529 = 0;
seq__41499_41505 = G__41526;
chunk__41500_41506 = G__41527;
count__41501_41507 = G__41528;
i__41502_41508 = G__41529;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var set_style_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_style_BANG___delegate.call(this,elem,kvs);};
set_style_BANG_.cljs$lang$maxFixedArity = 1;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__41530){
var elem = cljs.core.first(arglist__41530);
var kvs = cljs.core.rest(arglist__41530);
return set_style_BANG___delegate(elem,kvs);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
dommy.attrs.style = (function style(elem,k){if(cljs.core.truth_(k))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"k","k",-1640531420,null)], 0)))].join('')));
}
return (window.getComputedStyle((dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)))[cljs.core.name(k)]);
});
/**
* @param {...*} var_args
*/
dommy.attrs.set_px_BANG_ = (function() { 
var set_px_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_(cljs.core.count(kvs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null)))], 0)))].join('')));
}
var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var seq__41537_41543 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,kvs));var chunk__41538_41544 = null;var count__41539_41545 = 0;var i__41540_41546 = 0;while(true){
if((i__41540_41546 < count__41539_41545))
{var vec__41541_41547 = chunk__41538_41544.cljs$core$IIndexed$_nth$arity$2(null,i__41540_41546);var k_41548 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41541_41547,0,null);var v_41549 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41541_41547,1,null);dommy.attrs.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem__$1,cljs.core.array_seq([k_41548,[cljs.core.str(v_41549),cljs.core.str("px")].join('')], 0));
{
var G__41550 = seq__41537_41543;
var G__41551 = chunk__41538_41544;
var G__41552 = count__41539_41545;
var G__41553 = (i__41540_41546 + 1);
seq__41537_41543 = G__41550;
chunk__41538_41544 = G__41551;
count__41539_41545 = G__41552;
i__41540_41546 = G__41553;
continue;
}
} else
{var temp__4126__auto___41554 = cljs.core.seq(seq__41537_41543);if(temp__4126__auto___41554)
{var seq__41537_41555__$1 = temp__4126__auto___41554;if(cljs.core.chunked_seq_QMARK_(seq__41537_41555__$1))
{var c__21797__auto___41556 = cljs.core.chunk_first(seq__41537_41555__$1);{
var G__41557 = cljs.core.chunk_rest(seq__41537_41555__$1);
var G__41558 = c__21797__auto___41556;
var G__41559 = cljs.core.count(c__21797__auto___41556);
var G__41560 = 0;
seq__41537_41543 = G__41557;
chunk__41538_41544 = G__41558;
count__41539_41545 = G__41559;
i__41540_41546 = G__41560;
continue;
}
} else
{var vec__41542_41561 = cljs.core.first(seq__41537_41555__$1);var k_41562 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41542_41561,0,null);var v_41563 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41542_41561,1,null);dommy.attrs.set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem__$1,cljs.core.array_seq([k_41562,[cljs.core.str(v_41563),cljs.core.str("px")].join('')], 0));
{
var G__41564 = cljs.core.next(seq__41537_41555__$1);
var G__41565 = null;
var G__41566 = 0;
var G__41567 = 0;
seq__41537_41543 = G__41564;
chunk__41538_41544 = G__41565;
count__41539_41545 = G__41566;
i__41540_41546 = G__41567;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var set_px_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_px_BANG___delegate.call(this,elem,kvs);};
set_px_BANG_.cljs$lang$maxFixedArity = 1;
set_px_BANG_.cljs$lang$applyTo = (function (arglist__41568){
var elem = cljs.core.first(arglist__41568);
var kvs = cljs.core.rest(arglist__41568);
return set_px_BANG___delegate(elem,kvs);
});
set_px_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_px_BANG___delegate;
return set_px_BANG_;
})()
;
dommy.attrs.px = (function px(elem,k){var pixels = dommy.attrs.style((dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)),k);if(cljs.core.seq(pixels))
{return parseInt(pixels);
} else
{return null;
}
});
/**
* Sets dom attributes on and returns `elem`.
* Attributes without values will be set to "true":
* 
* (set-attr! elem :disabled)
* 
* With values, the function takes variadic kv pairs:
* 
* (set-attr! elem :id "some-id"
* :name "some-name")
* @param {...*} var_args
*/
dommy.attrs.set_attr_BANG_ = (function() {
var set_attr_BANG_ = null;
var set_attr_BANG___2 = (function (elem,k){return set_attr_BANG_.cljs$core$IFn$_invoke$arity$3((dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)),k,"true");
});
var set_attr_BANG___3 = (function (elem,k,v){if(cljs.core.truth_(v))
{if(cljs.core.fn_QMARK_(v))
{var G__41577 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));(G__41577[cljs.core.name(k)] = v);
return G__41577;
} else
{var G__41578 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));G__41578.setAttribute(cljs.core.name(k),(((k === new cljs.core.Keyword(null,"style","style",1123684643)))?dommy.attrs.style_str(v):v));
return G__41578;
}
} else
{return null;
}
});
var set_attr_BANG___4 = (function() { 
var G__41585__delegate = function (elem,k,v,kvs){if(cljs.core.even_QMARK_(cljs.core.count(kvs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null)))], 0)))].join('')));
}
var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var seq__41579_41586 = cljs.core.seq(cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,kvs)));var chunk__41580_41587 = null;var count__41581_41588 = 0;var i__41582_41589 = 0;while(true){
if((i__41582_41589 < count__41581_41588))
{var vec__41583_41590 = chunk__41580_41587.cljs$core$IIndexed$_nth$arity$2(null,i__41582_41589);var k_41591__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41583_41590,0,null);var v_41592__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41583_41590,1,null);set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem__$1,k_41591__$1,v_41592__$1);
{
var G__41593 = seq__41579_41586;
var G__41594 = chunk__41580_41587;
var G__41595 = count__41581_41588;
var G__41596 = (i__41582_41589 + 1);
seq__41579_41586 = G__41593;
chunk__41580_41587 = G__41594;
count__41581_41588 = G__41595;
i__41582_41589 = G__41596;
continue;
}
} else
{var temp__4126__auto___41597 = cljs.core.seq(seq__41579_41586);if(temp__4126__auto___41597)
{var seq__41579_41598__$1 = temp__4126__auto___41597;if(cljs.core.chunked_seq_QMARK_(seq__41579_41598__$1))
{var c__21797__auto___41599 = cljs.core.chunk_first(seq__41579_41598__$1);{
var G__41600 = cljs.core.chunk_rest(seq__41579_41598__$1);
var G__41601 = c__21797__auto___41599;
var G__41602 = cljs.core.count(c__21797__auto___41599);
var G__41603 = 0;
seq__41579_41586 = G__41600;
chunk__41580_41587 = G__41601;
count__41581_41588 = G__41602;
i__41582_41589 = G__41603;
continue;
}
} else
{var vec__41584_41604 = cljs.core.first(seq__41579_41598__$1);var k_41605__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41584_41604,0,null);var v_41606__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41584_41604,1,null);set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem__$1,k_41605__$1,v_41606__$1);
{
var G__41607 = cljs.core.next(seq__41579_41598__$1);
var G__41608 = null;
var G__41609 = 0;
var G__41610 = 0;
seq__41579_41586 = G__41607;
chunk__41580_41587 = G__41608;
count__41581_41588 = G__41609;
i__41582_41589 = G__41610;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__41585 = function (elem,k,v,var_args){
var kvs = null;if (arguments.length > 3) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return G__41585__delegate.call(this,elem,k,v,kvs);};
G__41585.cljs$lang$maxFixedArity = 3;
G__41585.cljs$lang$applyTo = (function (arglist__41611){
var elem = cljs.core.first(arglist__41611);
arglist__41611 = cljs.core.next(arglist__41611);
var k = cljs.core.first(arglist__41611);
arglist__41611 = cljs.core.next(arglist__41611);
var v = cljs.core.first(arglist__41611);
var kvs = cljs.core.rest(arglist__41611);
return G__41585__delegate(elem,k,v,kvs);
});
G__41585.cljs$core$IFn$_invoke$arity$variadic = G__41585__delegate;
return G__41585;
})()
;
set_attr_BANG_ = function(elem,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 2:
return set_attr_BANG___2.call(this,elem,k);
case 3:
return set_attr_BANG___3.call(this,elem,k,v);
default:
return set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, cljs.core.array_seq(arguments, 3));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
set_attr_BANG_.cljs$lang$maxFixedArity = 3;
set_attr_BANG_.cljs$lang$applyTo = set_attr_BANG___4.cljs$lang$applyTo;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = set_attr_BANG___2;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = set_attr_BANG___3;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic;
return set_attr_BANG_;
})()
;
/**
* @param {...*} var_args
*/
dommy.attrs.remove_attr_BANG_ = (function() {
var remove_attr_BANG_ = null;
var remove_attr_BANG___2 = (function (elem,k){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",1108647146),null,new cljs.core.Keyword(null,"classes","classes",1867525016),null], null), null).call(null,k)))
{elem__$1.className = "";
} else
{elem__$1.removeAttribute(cljs.core.name(k));
}
return elem__$1;
});
var remove_attr_BANG___3 = (function() { 
var G__41620__delegate = function (elem,k,ks){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var seq__41616_41621 = cljs.core.seq(cljs.core.cons(k,ks));var chunk__41617_41622 = null;var count__41618_41623 = 0;var i__41619_41624 = 0;while(true){
if((i__41619_41624 < count__41618_41623))
{var k_41625__$1 = chunk__41617_41622.cljs$core$IIndexed$_nth$arity$2(null,i__41619_41624);remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,k_41625__$1);
{
var G__41626 = seq__41616_41621;
var G__41627 = chunk__41617_41622;
var G__41628 = count__41618_41623;
var G__41629 = (i__41619_41624 + 1);
seq__41616_41621 = G__41626;
chunk__41617_41622 = G__41627;
count__41618_41623 = G__41628;
i__41619_41624 = G__41629;
continue;
}
} else
{var temp__4126__auto___41630 = cljs.core.seq(seq__41616_41621);if(temp__4126__auto___41630)
{var seq__41616_41631__$1 = temp__4126__auto___41630;if(cljs.core.chunked_seq_QMARK_(seq__41616_41631__$1))
{var c__21797__auto___41632 = cljs.core.chunk_first(seq__41616_41631__$1);{
var G__41633 = cljs.core.chunk_rest(seq__41616_41631__$1);
var G__41634 = c__21797__auto___41632;
var G__41635 = cljs.core.count(c__21797__auto___41632);
var G__41636 = 0;
seq__41616_41621 = G__41633;
chunk__41617_41622 = G__41634;
count__41618_41623 = G__41635;
i__41619_41624 = G__41636;
continue;
}
} else
{var k_41637__$1 = cljs.core.first(seq__41616_41631__$1);remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,k_41637__$1);
{
var G__41638 = cljs.core.next(seq__41616_41631__$1);
var G__41639 = null;
var G__41640 = 0;
var G__41641 = 0;
seq__41616_41621 = G__41638;
chunk__41617_41622 = G__41639;
count__41618_41623 = G__41640;
i__41619_41624 = G__41641;
continue;
}
}
} else
{}
}
break;
}
return elem__$1;
};
var G__41620 = function (elem,k,var_args){
var ks = null;if (arguments.length > 2) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__41620__delegate.call(this,elem,k,ks);};
G__41620.cljs$lang$maxFixedArity = 2;
G__41620.cljs$lang$applyTo = (function (arglist__41642){
var elem = cljs.core.first(arglist__41642);
arglist__41642 = cljs.core.next(arglist__41642);
var k = cljs.core.first(arglist__41642);
var ks = cljs.core.rest(arglist__41642);
return G__41620__delegate(elem,k,ks);
});
G__41620.cljs$core$IFn$_invoke$arity$variadic = G__41620__delegate;
return G__41620;
})()
;
remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return remove_attr_BANG___2.call(this,elem,k);
default:
return remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_attr_BANG_.cljs$lang$maxFixedArity = 2;
remove_attr_BANG_.cljs$lang$applyTo = remove_attr_BANG___3.cljs$lang$applyTo;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_attr_BANG___2;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_attr_BANG_;
})()
;
dommy.attrs.attr = (function attr(elem,k){if(cljs.core.truth_(k))
{return (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)).getAttribute(cljs.core.name(k));
} else
{return null;
}
});
dommy.attrs.toggle_attr_BANG_ = (function() {
var toggle_attr_BANG_ = null;
var toggle_attr_BANG___2 = (function (elem,k){return toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3(elem,k,cljs.core.boolean$(dommy.attrs.attr(elem,k)));
});
var toggle_attr_BANG___3 = (function (elem,k,add_QMARK_){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));if(add_QMARK_)
{return dommy.attrs.set_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,k);
} else
{return dommy.attrs.remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,k);
}
});
toggle_attr_BANG_ = function(elem,k,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_attr_BANG___2.call(this,elem,k);
case 3:
return toggle_attr_BANG___3.call(this,elem,k,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_attr_BANG___2;
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_attr_BANG___3;
return toggle_attr_BANG_;
})()
;
dommy.attrs.hidden_QMARK_ = (function hidden_QMARK_(elem){return ("none" === (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)).style.display);
});
/**
* Display or hide the given `elem`. Takes an optional boolean `show?`
* indicating whether to show or hide `elem`.
*/
dommy.attrs.toggle_BANG_ = (function() {
var toggle_BANG_ = null;
var toggle_BANG___1 = (function (elem){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));toggle_BANG_.cljs$core$IFn$_invoke$arity$2(elem__$1,dommy.attrs.hidden_QMARK_(elem__$1));
return elem__$1;
});
var toggle_BANG___2 = (function (elem,show_QMARK_){var G__41644 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));G__41644.style.display = ((show_QMARK_)?"":"none");
return G__41644;
});
toggle_BANG_ = function(elem,show_QMARK_){
switch(arguments.length){
case 1:
return toggle_BANG___1.call(this,elem);
case 2:
return toggle_BANG___2.call(this,elem,show_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_BANG_.cljs$core$IFn$_invoke$arity$1 = toggle_BANG___1;
toggle_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_BANG___2;
return toggle_BANG_;
})()
;
dommy.attrs.hide_BANG_ = (function hide_BANG_(elem){var G__41646 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));dommy.attrs.toggle_BANG_.cljs$core$IFn$_invoke$arity$2(G__41646,false);
return G__41646;
});
dommy.attrs.show_BANG_ = (function show_BANG_(elem){var G__41648 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));dommy.attrs.toggle_BANG_.cljs$core$IFn$_invoke$arity$2(G__41648,true);
return G__41648;
});
/**
* Returns a map of the bounding client rect of `elem`
* as a map with [:top :left :right :bottom :width :height]
*/
dommy.attrs.bounding_client_rect = (function bounding_client_rect(elem){return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic((function (){var G__41650 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem)).getBoundingClientRect();(G__41650["constructor"] = Object);
return G__41650;
})(),cljs.core.array_seq([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true], 0));
});
dommy.attrs.scroll_into_view = (function scroll_into_view(elem,align_with_top_QMARK_){var elem__$1 = (dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1 ? dommy.template.__GT_node_like.cljs$core$IFn$_invoke$arity$1(elem) : dommy.template.__GT_node_like.call(null,elem));var top = new cljs.core.Keyword(null,"top","top",1014019271).cljs$core$IFn$_invoke$arity$1(dommy.attrs.bounding_client_rect(elem__$1));if((window.innerHeight < (top + elem__$1.offsetHeight)))
{return elem__$1.scrollIntoView(align_with_top_QMARK_);
} else
{return null;
}
});
//# sourceMappingURL=attrs.js.map