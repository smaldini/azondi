goog.provide('dommy.core');
goog.require('cljs.core');
goog.require('dommy.template');
goog.require('dommy.template');
goog.require('dommy.attrs');
goog.require('dommy.attrs');
goog.require('dommy.utils');
goog.require('dommy.utils');
goog.require('clojure.string');
goog.require('clojure.string');
dommy.core.has_class_QMARK_ = dommy.attrs.has_class_QMARK_;
dommy.core.add_class_BANG_ = dommy.attrs.add_class_BANG_;
dommy.core.remove_class_BANG_ = dommy.attrs.remove_class_BANG_;
dommy.core.toggle_class_BANG_ = dommy.attrs.toggle_class_BANG_;
dommy.core.set_attr_BANG_ = dommy.attrs.set_attr_BANG_;
dommy.core.set_style_BANG_ = dommy.attrs.set_style_BANG_;
dommy.core.set_px_BANG_ = dommy.attrs.set_px_BANG_;
dommy.core.px = dommy.attrs.px;
dommy.core.style_str = dommy.attrs.style_str;
dommy.core.style = dommy.attrs.style;
dommy.core.remove_attr_BANG_ = dommy.attrs.remove_attr_BANG_;
dommy.core.toggle_attr_BANG_ = dommy.attrs.toggle_attr_BANG_;
dommy.core.attr = dommy.attrs.attr;
dommy.core.hidden_QMARK_ = dommy.attrs.hidden_QMARK_;
dommy.core.toggle_BANG_ = dommy.attrs.toggle_BANG_;
dommy.core.hide_BANG_ = dommy.attrs.hide_BANG_;
dommy.core.show_BANG_ = dommy.attrs.show_BANG_;
dommy.core.bounding_client_rect = dommy.attrs.bounding_client_rect;
dommy.core.scroll_into_view = dommy.attrs.scroll_into_view;
dommy.core.dissoc_in = dommy.utils.dissoc_in;
dommy.core.__GT_Array = dommy.utils.__GT_Array;
dommy.core.set_html_BANG_ = (function set_html_BANG_(elem,html){var elem__$1 = dommy.template.__GT_node_like(elem);elem__$1.innerHTML = html;
return elem__$1;
});
dommy.core.html = (function html(elem){return dommy.template.__GT_node_like(elem).innerHTML;
});
dommy.core.set_text_BANG_ = (function set_text_BANG_(elem,text){var elem__$1 = dommy.template.__GT_node_like(elem);var prop = (cljs.core.truth_(elem__$1.textContent)?"textContent":"innerText");(elem__$1[prop] = text);
return elem__$1;
});
dommy.core.text = (function text(elem){var or__21049__auto__ = elem.textContent;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return elem.innerText;
}
});
dommy.core.value = (function value(elem){return dommy.template.__GT_node_like(elem).value;
});
dommy.core.set_value_BANG_ = (function set_value_BANG_(elem,value){var elem__$1 = dommy.template.__GT_node_like(elem);elem__$1.value = value;
return elem__$1;
});
/**
* append `child` to `parent`. 'parent' and 'child' should be node-like
* (work with dommy.template/->node-like). The node-like projection
* of parent is returned after appending child.
* @param {...*} var_args
*/
dommy.core.append_BANG_ = (function() {
var append_BANG_ = null;
var append_BANG___2 = (function (parent,child){var G__41813 = dommy.template.__GT_node_like(parent);G__41813.appendChild(dommy.template.__GT_node_like(child));
return G__41813;
});
var append_BANG___3 = (function() { 
var G__41818__delegate = function (parent,child,more_children){var parent__$1 = dommy.template.__GT_node_like(parent);var seq__41814_41819 = cljs.core.seq(cljs.core.cons(child,more_children));var chunk__41815_41820 = null;var count__41816_41821 = 0;var i__41817_41822 = 0;while(true){
if((i__41817_41822 < count__41816_41821))
{var c_41823 = chunk__41815_41820.cljs$core$IIndexed$_nth$arity$2(null,i__41817_41822);append_BANG_.cljs$core$IFn$_invoke$arity$2(parent__$1,c_41823);
{
var G__41824 = seq__41814_41819;
var G__41825 = chunk__41815_41820;
var G__41826 = count__41816_41821;
var G__41827 = (i__41817_41822 + 1);
seq__41814_41819 = G__41824;
chunk__41815_41820 = G__41825;
count__41816_41821 = G__41826;
i__41817_41822 = G__41827;
continue;
}
} else
{var temp__4126__auto___41828 = cljs.core.seq(seq__41814_41819);if(temp__4126__auto___41828)
{var seq__41814_41829__$1 = temp__4126__auto___41828;if(cljs.core.chunked_seq_QMARK_(seq__41814_41829__$1))
{var c__21797__auto___41830 = cljs.core.chunk_first(seq__41814_41829__$1);{
var G__41831 = cljs.core.chunk_rest(seq__41814_41829__$1);
var G__41832 = c__21797__auto___41830;
var G__41833 = cljs.core.count(c__21797__auto___41830);
var G__41834 = 0;
seq__41814_41819 = G__41831;
chunk__41815_41820 = G__41832;
count__41816_41821 = G__41833;
i__41817_41822 = G__41834;
continue;
}
} else
{var c_41835 = cljs.core.first(seq__41814_41829__$1);append_BANG_.cljs$core$IFn$_invoke$arity$2(parent__$1,c_41835);
{
var G__41836 = cljs.core.next(seq__41814_41829__$1);
var G__41837 = null;
var G__41838 = 0;
var G__41839 = 0;
seq__41814_41819 = G__41836;
chunk__41815_41820 = G__41837;
count__41816_41821 = G__41838;
i__41817_41822 = G__41839;
continue;
}
}
} else
{}
}
break;
}
return parent__$1;
};
var G__41818 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__41818__delegate.call(this,parent,child,more_children);};
G__41818.cljs$lang$maxFixedArity = 2;
G__41818.cljs$lang$applyTo = (function (arglist__41840){
var parent = cljs.core.first(arglist__41840);
arglist__41840 = cljs.core.next(arglist__41840);
var child = cljs.core.first(arglist__41840);
var more_children = cljs.core.rest(arglist__41840);
return G__41818__delegate(parent,child,more_children);
});
G__41818.cljs$core$IFn$_invoke$arity$variadic = G__41818__delegate;
return G__41818;
})()
;
append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return append_BANG___2.call(this,parent,child);
default:
return append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
append_BANG_.cljs$lang$maxFixedArity = 2;
append_BANG_.cljs$lang$applyTo = append_BANG___3.cljs$lang$applyTo;
append_BANG_.cljs$core$IFn$_invoke$arity$2 = append_BANG___2;
append_BANG_.cljs$core$IFn$_invoke$arity$variadic = append_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return append_BANG_;
})()
;
/**
* prepend `child` to `parent`, both node-like
* return ->node-like projection of `parent`
* @param {...*} var_args
*/
dommy.core.prepend_BANG_ = (function() {
var prepend_BANG_ = null;
var prepend_BANG___2 = (function (parent,child){var parent__$1 = dommy.template.__GT_node_like(parent);return parent__$1.insertBefore(dommy.template.__GT_node_like(child),parent__$1.firstChild);
});
var prepend_BANG___3 = (function() { 
var G__41849__delegate = function (parent,child,more_children){var parent__$1 = dommy.template.__GT_node_like(parent);var seq__41845_41850 = cljs.core.seq(cljs.core.cons(child,more_children));var chunk__41846_41851 = null;var count__41847_41852 = 0;var i__41848_41853 = 0;while(true){
if((i__41848_41853 < count__41847_41852))
{var c_41854 = chunk__41846_41851.cljs$core$IIndexed$_nth$arity$2(null,i__41848_41853);prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent__$1,c_41854);
{
var G__41855 = seq__41845_41850;
var G__41856 = chunk__41846_41851;
var G__41857 = count__41847_41852;
var G__41858 = (i__41848_41853 + 1);
seq__41845_41850 = G__41855;
chunk__41846_41851 = G__41856;
count__41847_41852 = G__41857;
i__41848_41853 = G__41858;
continue;
}
} else
{var temp__4126__auto___41859 = cljs.core.seq(seq__41845_41850);if(temp__4126__auto___41859)
{var seq__41845_41860__$1 = temp__4126__auto___41859;if(cljs.core.chunked_seq_QMARK_(seq__41845_41860__$1))
{var c__21797__auto___41861 = cljs.core.chunk_first(seq__41845_41860__$1);{
var G__41862 = cljs.core.chunk_rest(seq__41845_41860__$1);
var G__41863 = c__21797__auto___41861;
var G__41864 = cljs.core.count(c__21797__auto___41861);
var G__41865 = 0;
seq__41845_41850 = G__41862;
chunk__41846_41851 = G__41863;
count__41847_41852 = G__41864;
i__41848_41853 = G__41865;
continue;
}
} else
{var c_41866 = cljs.core.first(seq__41845_41860__$1);prepend_BANG_.cljs$core$IFn$_invoke$arity$2(parent__$1,c_41866);
{
var G__41867 = cljs.core.next(seq__41845_41860__$1);
var G__41868 = null;
var G__41869 = 0;
var G__41870 = 0;
seq__41845_41850 = G__41867;
chunk__41846_41851 = G__41868;
count__41847_41852 = G__41869;
i__41848_41853 = G__41870;
continue;
}
}
} else
{}
}
break;
}
return parent__$1;
};
var G__41849 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__41849__delegate.call(this,parent,child,more_children);};
G__41849.cljs$lang$maxFixedArity = 2;
G__41849.cljs$lang$applyTo = (function (arglist__41871){
var parent = cljs.core.first(arglist__41871);
arglist__41871 = cljs.core.next(arglist__41871);
var child = cljs.core.first(arglist__41871);
var more_children = cljs.core.rest(arglist__41871);
return G__41849__delegate(parent,child,more_children);
});
G__41849.cljs$core$IFn$_invoke$arity$variadic = G__41849__delegate;
return G__41849;
})()
;
prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return prepend_BANG___2.call(this,parent,child);
default:
return prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
prepend_BANG_.cljs$lang$maxFixedArity = 2;
prepend_BANG_.cljs$lang$applyTo = prepend_BANG___3.cljs$lang$applyTo;
prepend_BANG_.cljs$core$IFn$_invoke$arity$2 = prepend_BANG___2;
prepend_BANG_.cljs$core$IFn$_invoke$arity$variadic = prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return prepend_BANG_;
})()
;
/**
* insert `node` before `other`, both node-like,
* `other` must have a parent. return `node`
*/
dommy.core.insert_before_BANG_ = (function insert_before_BANG_(elem,other){var actual_node = dommy.template.__GT_node_like(elem);var other__$1 = dommy.template.__GT_node_like(other);if(cljs.core.truth_(other__$1.parentNode))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,".-parentNode",".-parentNode",499016324,null),new cljs.core.Symbol(null,"other","other",-1534461751,null))], 0)))].join('')));
}
other__$1.parentNode.insertBefore(actual_node,other__$1);
return actual_node;
});
/**
* insert `node` after `other`, both node-like,
* `other` must have a parent. return `node`
*/
dommy.core.insert_after_BANG_ = (function insert_after_BANG_(elem,other){var actual_node = dommy.template.__GT_node_like(elem);var other__$1 = dommy.template.__GT_node_like(other);var parent = other__$1.parentNode;var temp__4124__auto___41872 = other__$1.nextSibling;if(cljs.core.truth_(temp__4124__auto___41872))
{var next_41873 = temp__4124__auto___41872;parent.insertBefore(actual_node,next_41873);
} else
{parent.appendChild(actual_node);
}
return actual_node;
});
/**
* replace `elem` with `new`, both node-like, return node-like projection of new.
* node-like projection of elem must have parent.
*/
dommy.core.replace_BANG_ = (function replace_BANG_(elem,new$){var new$__$1 = dommy.template.__GT_node_like(new$);var elem__$1 = dommy.template.__GT_node_like(elem);if(cljs.core.truth_(elem__$1.parentNode))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,".-parentNode",".-parentNode",499016324,null),new cljs.core.Symbol(null,"elem","elem",-1637415608,null))], 0)))].join('')));
}
elem__$1.parentNode.replaceChild(new$__$1,elem__$1);
return new$__$1;
});
dommy.core.replace_contents_BANG_ = (function replace_contents_BANG_(parent,node_like){var G__41875 = dommy.template.__GT_node_like(parent);G__41875.innerHTML = "";
dommy.core.append_BANG_.cljs$core$IFn$_invoke$arity$2(G__41875,node_like);
return G__41875;
});
/**
* remove node-like `elem` from parent, return node-like projection of elem
*/
dommy.core.remove_BANG_ = (function remove_BANG_(elem){var elem__$1 = dommy.template.__GT_node_like(elem);var G__41877 = elem__$1.parentNode;G__41877.removeChild(elem__$1);
return G__41877;
});
/**
* clears all children from `elem`
*/
dommy.core.clear_BANG_ = (function clear_BANG_(elem){return dommy.template.__GT_node_like(elem).innerHTML = "";
});
dommy.core.selector = (function selector(data){if(cljs.core.coll_QMARK_(data))
{return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(selector,data));
} else
{if((typeof data === 'string') || ((data instanceof cljs.core.Keyword)))
{return cljs.core.name(data);
} else
{return null;
}
}
});
dommy.core.selector_map = (function selector_map(template,key_selectors_map){var container = dommy.template.__GT_node_like(template);if(!(cljs.core.contains_QMARK_(key_selectors_map,new cljs.core.Keyword(null,"container","container",602947571))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"key-selectors-map","key-selectors-map",19054414,null),new cljs.core.Keyword(null,"container","container",602947571)))], 0)))].join('')));
}
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",602947571),container], null),cljs.core.into(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__41883){var vec__41884 = p__41883;var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41884,0,null);var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41884,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v)))?(function (){if(typeof dommy.core.t41885 !== 'undefined')
{} else
{
/**
* @constructor
*/
dommy.core.t41885 = (function (v,k,vec__41884,p__41883,container,key_selectors_map,template,selector_map,meta41886){
this.v = v;
this.k = k;
this.vec__41884 = vec__41884;
this.p__41883 = p__41883;
this.container = container;
this.key_selectors_map = key_selectors_map;
this.template = template;
this.selector_map = selector_map;
this.meta41886 = meta41886;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 425984;
})
dommy.core.t41885.cljs$lang$type = true;
dommy.core.t41885.cljs$lang$ctorStr = "dommy.core/t41885";
dommy.core.t41885.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"dommy.core/t41885");
});
dommy.core.t41885.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return dommy.utils.__GT_Array(dommy.template.__GT_node_like(self__.container).querySelectorAll(dommy.core.selector(self__.v)));
});
dommy.core.t41885.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41887){var self__ = this;
var _41887__$1 = this;return self__.meta41886;
});
dommy.core.t41885.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41887,meta41886__$1){var self__ = this;
var _41887__$1 = this;return (new dommy.core.t41885(self__.v,self__.k,self__.vec__41884,self__.p__41883,self__.container,self__.key_selectors_map,self__.template,self__.selector_map,meta41886__$1));
});
dommy.core.__GT_t41885 = (function __GT_t41885(v__$1,k__$1,vec__41884__$1,p__41883__$1,container__$1,key_selectors_map__$1,template__$1,selector_map__$1,meta41886){return (new dommy.core.t41885(v__$1,k__$1,vec__41884__$1,p__41883__$1,container__$1,key_selectors_map__$1,template__$1,selector_map__$1,meta41886));
});
}
return (new dommy.core.t41885(v,k,vec__41884,p__41883,container,key_selectors_map,template,selector_map,null));
})():dommy.template.__GT_node_like(container).querySelector(dommy.core.selector(v)))], null);
}),key_selectors_map))], 0));
});
/**
* a lazy seq of the ancestors of `node`
*/
dommy.core.ancestor_nodes = (function ancestor_nodes(elem){return cljs.core.take_while(cljs.core.identity,cljs.core.iterate((function (p1__41888_SHARP_){return p1__41888_SHARP_.parentNode;
}),dommy.template.__GT_node_like(elem)));
});
/**
* returns a predicate on nodes that match `selector` at the
* time of this `matches-pred` call (may return outdated results
* if you fuck with the DOM)
*/
dommy.core.matches_pred = (function() {
var matches_pred = null;
var matches_pred__1 = (function (selector){return matches_pred.cljs$core$IFn$_invoke$arity$2(document,selector);
});
var matches_pred__2 = (function (base,selector){var matches = dommy.utils.__GT_Array(dommy.template.__GT_node_like(dommy.template.__GT_node_like(base)).querySelectorAll(dommy.core.selector(selector)));return (function (elem){return (matches.indexOf(elem) >= 0);
});
});
matches_pred = function(base,selector){
switch(arguments.length){
case 1:
return matches_pred__1.call(this,base);
case 2:
return matches_pred__2.call(this,base,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
matches_pred.cljs$core$IFn$_invoke$arity$1 = matches_pred__1;
matches_pred.cljs$core$IFn$_invoke$arity$2 = matches_pred__2;
return matches_pred;
})()
;
/**
* closest ancestor of `node` (up to `base`, if provided)
* that matches `selector`
*/
dommy.core.closest = (function() {
var closest = null;
var closest__2 = (function (elem,selector){return cljs.core.first(cljs.core.filter(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$1(selector),dommy.core.ancestor_nodes(dommy.template.__GT_node_like(elem))));
});
var closest__3 = (function (base,elem,selector){var base__$1 = dommy.template.__GT_node_like(base);var elem__$1 = dommy.template.__GT_node_like(elem);return cljs.core.first(cljs.core.filter(dommy.core.matches_pred.cljs$core$IFn$_invoke$arity$2(base__$1,selector),cljs.core.take_while((function (p1__41889_SHARP_){return !((p1__41889_SHARP_ === base__$1));
}),dommy.core.ancestor_nodes(elem__$1))));
});
closest = function(base,elem,selector){
switch(arguments.length){
case 2:
return closest__2.call(this,base,elem);
case 3:
return closest__3.call(this,base,elem,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
closest.cljs$core$IFn$_invoke$arity$2 = closest__2;
closest.cljs$core$IFn$_invoke$arity$3 = closest__3;
return closest;
})()
;
/**
* is `descendant` a descendant of `ancestor`?
*/
dommy.core.descendant_QMARK_ = (function descendant_QMARK_(descendant,ancestor){var descendant__$1 = dommy.template.__GT_node_like(descendant);var ancestor__$1 = dommy.template.__GT_node_like(ancestor);if(cljs.core.truth_(ancestor__$1.contains))
{return ancestor__$1.contains(descendant__$1);
} else
{if(cljs.core.truth_(ancestor__$1.compareDocumentPosition))
{return ((ancestor__$1.compareDocumentPosition(descendant__$1) & (1 << 4)) != 0);
} else
{return null;
}
}
});
dommy.core.special_listener_makers = cljs.core.into(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__41890){var vec__41891 = p__41890;var special_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41891,0,null);var real_mouse_event = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41891,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,(function (f){return (function (event){var related_target = event.relatedTarget;var listener_target = (function (){var or__21049__auto__ = event.selectedTarget;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return event.currentTarget;
}
})();if(cljs.core.truth_((function (){var and__21037__auto__ = related_target;if(cljs.core.truth_(and__21037__auto__))
{return dommy.core.descendant_QMARK_(related_target,listener_target);
} else
{return and__21037__auto__;
}
})()))
{return null;
} else
{return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(event) : f.call(null,event));
}
});
})], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mouseenter","mouseenter",2027084997),new cljs.core.Keyword(null,"mouseover","mouseover",1601081963),new cljs.core.Keyword(null,"mouseleave","mouseleave",2033263780),new cljs.core.Keyword(null,"mouseout","mouseout",894298107)], null)));
/**
* fires f if event.target is found with `selector`
*/
dommy.core.live_listener = (function live_listener(elem,selector,f){return (function (event){var selected_target = dommy.core.closest.cljs$core$IFn$_invoke$arity$3(dommy.template.__GT_node_like(elem),event.target,selector);if(cljs.core.truth_((function (){var and__21037__auto__ = selected_target;if(cljs.core.truth_(and__21037__auto__))
{return cljs.core.not((dommy.core.attr.cljs$core$IFn$_invoke$arity$2 ? dommy.core.attr.cljs$core$IFn$_invoke$arity$2(selected_target,new cljs.core.Keyword(null,"disabled","disabled",1284845038)) : dommy.core.attr.call(null,selected_target,new cljs.core.Keyword(null,"disabled","disabled",1284845038))));
} else
{return and__21037__auto__;
}
})()))
{event.selectedTarget = selected_target;
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(event) : f.call(null,event));
} else
{return null;
}
});
});
/**
* Returns a nested map of event listeners on `nodes`
*/
dommy.core.event_listeners = (function event_listeners(elem){var or__21049__auto__ = dommy.template.__GT_node_like(elem).dommyEventListeners;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
});
/**
* @param {...*} var_args
*/
dommy.core.update_event_listeners_BANG_ = (function() { 
var update_event_listeners_BANG___delegate = function (elem,f,args){var elem__$1 = dommy.template.__GT_node_like(elem);return elem__$1.dommyEventListeners = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,dommy.core.event_listeners(elem__$1),args);
};
var update_event_listeners_BANG_ = function (elem,f,var_args){
var args = null;if (arguments.length > 2) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return update_event_listeners_BANG___delegate.call(this,elem,f,args);};
update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__41892){
var elem = cljs.core.first(arglist__41892);
arglist__41892 = cljs.core.next(arglist__41892);
var f = cljs.core.first(arglist__41892);
var args = cljs.core.rest(arglist__41892);
return update_event_listeners_BANG___delegate(elem,f,args);
});
update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic = update_event_listeners_BANG___delegate;
return update_event_listeners_BANG_;
})()
;
dommy.core.elem_and_selector = (function elem_and_selector(elem_sel){if(cljs.core.sequential_QMARK_(elem_sel))
{return cljs.core.juxt.cljs$core$IFn$_invoke$arity$2((function (p1__41893_SHARP_){return dommy.template.__GT_node_like(cljs.core.first(p1__41893_SHARP_));
}),cljs.core.rest).call(null,elem_sel);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dommy.template.__GT_node_like(elem_sel),null], null);
}
});
/**
* Adds `f` as a listener for events of type `event-type` on
* `elem-sel`, which must either be a DOM node, or a sequence
* whose first item is a DOM node.
* 
* In other words, the call to `listen!` can take two forms:
* 
* If `elem-sel` is a DOM node, i.e., you're doing something like:
* 
* (listen! elem :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on the `elem`.
* 
* If `elem-sel` is a sequence:
* 
* (listen! [elem :.selector.for :.some.descendants] :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on descendants of `elem` that match the selector
* 
* Also accepts any number of event-type and handler pairs for setting
* multiple listeners at once:
* 
* (listen! some-elem :click click-handler :hover hover-handler)
* @param {...*} var_args
*/
dommy.core.listen_BANG_ = (function() { 
var listen_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_(cljs.core.count(type_fs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null)))], 0)))].join('')));
}
var vec__41917_41940 = dommy.core.elem_and_selector(elem_sel);var elem_41941 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41917_41940,0,null);var selector_41942 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41917_41940,1,null);var seq__41918_41943 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,type_fs));var chunk__41925_41944 = null;var count__41926_41945 = 0;var i__41927_41946 = 0;while(true){
if((i__41927_41946 < count__41926_41945))
{var vec__41934_41947 = chunk__41925_41944.cljs$core$IIndexed$_nth$arity$2(null,i__41927_41946);var orig_type_41948 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41934_41947,0,null);var f_41949 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41934_41947,1,null);var seq__41928_41950 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_41948,new cljs.core.PersistentArrayMap.fromArray([orig_type_41948,cljs.core.identity], true, false)));var chunk__41930_41951 = null;var count__41931_41952 = 0;var i__41932_41953 = 0;while(true){
if((i__41932_41953 < count__41931_41952))
{var vec__41935_41954 = chunk__41930_41951.cljs$core$IIndexed$_nth$arity$2(null,i__41932_41953);var actual_type_41955 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41935_41954,0,null);var factory_41956 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41935_41954,1,null);var canonical_f_41957 = (cljs.core.truth_(selector_41942)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_41941,selector_41942):cljs.core.identity).call(null,(factory_41956.cljs$core$IFn$_invoke$arity$1 ? factory_41956.cljs$core$IFn$_invoke$arity$1(f_41949) : factory_41956.call(null,f_41949)));dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_41941,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_41942,actual_type_41955,f_41949], null),canonical_f_41957], 0));
if(cljs.core.truth_(elem_41941.addEventListener))
{elem_41941.addEventListener(cljs.core.name(actual_type_41955),canonical_f_41957);
} else
{elem_41941.attachEvent(cljs.core.name(actual_type_41955),canonical_f_41957);
}
{
var G__41958 = seq__41928_41950;
var G__41959 = chunk__41930_41951;
var G__41960 = count__41931_41952;
var G__41961 = (i__41932_41953 + 1);
seq__41928_41950 = G__41958;
chunk__41930_41951 = G__41959;
count__41931_41952 = G__41960;
i__41932_41953 = G__41961;
continue;
}
} else
{var temp__4126__auto___41962 = cljs.core.seq(seq__41928_41950);if(temp__4126__auto___41962)
{var seq__41928_41963__$1 = temp__4126__auto___41962;if(cljs.core.chunked_seq_QMARK_(seq__41928_41963__$1))
{var c__21797__auto___41964 = cljs.core.chunk_first(seq__41928_41963__$1);{
var G__41965 = cljs.core.chunk_rest(seq__41928_41963__$1);
var G__41966 = c__21797__auto___41964;
var G__41967 = cljs.core.count(c__21797__auto___41964);
var G__41968 = 0;
seq__41928_41950 = G__41965;
chunk__41930_41951 = G__41966;
count__41931_41952 = G__41967;
i__41932_41953 = G__41968;
continue;
}
} else
{var vec__41936_41969 = cljs.core.first(seq__41928_41963__$1);var actual_type_41970 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41936_41969,0,null);var factory_41971 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41936_41969,1,null);var canonical_f_41972 = (cljs.core.truth_(selector_41942)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_41941,selector_41942):cljs.core.identity).call(null,(factory_41971.cljs$core$IFn$_invoke$arity$1 ? factory_41971.cljs$core$IFn$_invoke$arity$1(f_41949) : factory_41971.call(null,f_41949)));dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_41941,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_41942,actual_type_41970,f_41949], null),canonical_f_41972], 0));
if(cljs.core.truth_(elem_41941.addEventListener))
{elem_41941.addEventListener(cljs.core.name(actual_type_41970),canonical_f_41972);
} else
{elem_41941.attachEvent(cljs.core.name(actual_type_41970),canonical_f_41972);
}
{
var G__41973 = cljs.core.next(seq__41928_41963__$1);
var G__41974 = null;
var G__41975 = 0;
var G__41976 = 0;
seq__41928_41950 = G__41973;
chunk__41930_41951 = G__41974;
count__41931_41952 = G__41975;
i__41932_41953 = G__41976;
continue;
}
}
} else
{}
}
break;
}
{
var G__41977 = seq__41918_41943;
var G__41978 = chunk__41925_41944;
var G__41979 = count__41926_41945;
var G__41980 = (i__41927_41946 + 1);
seq__41918_41943 = G__41977;
chunk__41925_41944 = G__41978;
count__41926_41945 = G__41979;
i__41927_41946 = G__41980;
continue;
}
} else
{var temp__4126__auto___41981 = cljs.core.seq(seq__41918_41943);if(temp__4126__auto___41981)
{var seq__41918_41982__$1 = temp__4126__auto___41981;if(cljs.core.chunked_seq_QMARK_(seq__41918_41982__$1))
{var c__21797__auto___41983 = cljs.core.chunk_first(seq__41918_41982__$1);{
var G__41984 = cljs.core.chunk_rest(seq__41918_41982__$1);
var G__41985 = c__21797__auto___41983;
var G__41986 = cljs.core.count(c__21797__auto___41983);
var G__41987 = 0;
seq__41918_41943 = G__41984;
chunk__41925_41944 = G__41985;
count__41926_41945 = G__41986;
i__41927_41946 = G__41987;
continue;
}
} else
{var vec__41937_41988 = cljs.core.first(seq__41918_41982__$1);var orig_type_41989 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41937_41988,0,null);var f_41990 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41937_41988,1,null);var seq__41919_41991 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_41989,new cljs.core.PersistentArrayMap.fromArray([orig_type_41989,cljs.core.identity], true, false)));var chunk__41921_41992 = null;var count__41922_41993 = 0;var i__41923_41994 = 0;while(true){
if((i__41923_41994 < count__41922_41993))
{var vec__41938_41995 = chunk__41921_41992.cljs$core$IIndexed$_nth$arity$2(null,i__41923_41994);var actual_type_41996 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41938_41995,0,null);var factory_41997 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41938_41995,1,null);var canonical_f_41998 = (cljs.core.truth_(selector_41942)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_41941,selector_41942):cljs.core.identity).call(null,(factory_41997.cljs$core$IFn$_invoke$arity$1 ? factory_41997.cljs$core$IFn$_invoke$arity$1(f_41990) : factory_41997.call(null,f_41990)));dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_41941,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_41942,actual_type_41996,f_41990], null),canonical_f_41998], 0));
if(cljs.core.truth_(elem_41941.addEventListener))
{elem_41941.addEventListener(cljs.core.name(actual_type_41996),canonical_f_41998);
} else
{elem_41941.attachEvent(cljs.core.name(actual_type_41996),canonical_f_41998);
}
{
var G__41999 = seq__41919_41991;
var G__42000 = chunk__41921_41992;
var G__42001 = count__41922_41993;
var G__42002 = (i__41923_41994 + 1);
seq__41919_41991 = G__41999;
chunk__41921_41992 = G__42000;
count__41922_41993 = G__42001;
i__41923_41994 = G__42002;
continue;
}
} else
{var temp__4126__auto___42003__$1 = cljs.core.seq(seq__41919_41991);if(temp__4126__auto___42003__$1)
{var seq__41919_42004__$1 = temp__4126__auto___42003__$1;if(cljs.core.chunked_seq_QMARK_(seq__41919_42004__$1))
{var c__21797__auto___42005 = cljs.core.chunk_first(seq__41919_42004__$1);{
var G__42006 = cljs.core.chunk_rest(seq__41919_42004__$1);
var G__42007 = c__21797__auto___42005;
var G__42008 = cljs.core.count(c__21797__auto___42005);
var G__42009 = 0;
seq__41919_41991 = G__42006;
chunk__41921_41992 = G__42007;
count__41922_41993 = G__42008;
i__41923_41994 = G__42009;
continue;
}
} else
{var vec__41939_42010 = cljs.core.first(seq__41919_42004__$1);var actual_type_42011 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41939_42010,0,null);var factory_42012 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41939_42010,1,null);var canonical_f_42013 = (cljs.core.truth_(selector_41942)?cljs.core.partial.cljs$core$IFn$_invoke$arity$3(dommy.core.live_listener,elem_41941,selector_41942):cljs.core.identity).call(null,(factory_42012.cljs$core$IFn$_invoke$arity$1 ? factory_42012.cljs$core$IFn$_invoke$arity$1(f_41990) : factory_42012.call(null,f_41990)));dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_41941,cljs.core.assoc_in,cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_41942,actual_type_42011,f_41990], null),canonical_f_42013], 0));
if(cljs.core.truth_(elem_41941.addEventListener))
{elem_41941.addEventListener(cljs.core.name(actual_type_42011),canonical_f_42013);
} else
{elem_41941.attachEvent(cljs.core.name(actual_type_42011),canonical_f_42013);
}
{
var G__42014 = cljs.core.next(seq__41919_42004__$1);
var G__42015 = null;
var G__42016 = 0;
var G__42017 = 0;
seq__41919_41991 = G__42014;
chunk__41921_41992 = G__42015;
count__41922_41993 = G__42016;
i__41923_41994 = G__42017;
continue;
}
}
} else
{}
}
break;
}
{
var G__42018 = cljs.core.next(seq__41918_41982__$1);
var G__42019 = null;
var G__42020 = 0;
var G__42021 = 0;
seq__41918_41943 = G__42018;
chunk__41925_41944 = G__42019;
count__41926_41945 = G__42020;
i__41927_41946 = G__42021;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_BANG___delegate.call(this,elem_sel,type_fs);};
listen_BANG_.cljs$lang$maxFixedArity = 1;
listen_BANG_.cljs$lang$applyTo = (function (arglist__42022){
var elem_sel = cljs.core.first(arglist__42022);
var type_fs = cljs.core.rest(arglist__42022);
return listen_BANG___delegate(elem_sel,type_fs);
});
listen_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_BANG___delegate;
return listen_BANG_;
})()
;
/**
* Removes event listener for the element defined in `elem-sel`,
* which is the same format as listen!.
* 
* The following forms are allowed, and will remove all handlers
* that match the parameters passed in:
* 
* (unlisten! [elem :.selector] :click event-listener)
* 
* (unlisten! [elem :.selector]
* :click event-listener
* :mouseover other-event-listener)
* @param {...*} var_args
*/
dommy.core.unlisten_BANG_ = (function() { 
var unlisten_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_(cljs.core.count(type_fs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null)))], 0)))].join('')));
}
var vec__42046_42069 = dommy.core.elem_and_selector(elem_sel);var elem_42070 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42046_42069,0,null);var selector_42071 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42046_42069,1,null);var seq__42047_42072 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,type_fs));var chunk__42054_42073 = null;var count__42055_42074 = 0;var i__42056_42075 = 0;while(true){
if((i__42056_42075 < count__42055_42074))
{var vec__42063_42076 = chunk__42054_42073.cljs$core$IIndexed$_nth$arity$2(null,i__42056_42075);var orig_type_42077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42063_42076,0,null);var f_42078 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42063_42076,1,null);var seq__42057_42079 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_42077,new cljs.core.PersistentArrayMap.fromArray([orig_type_42077,cljs.core.identity], true, false)));var chunk__42059_42080 = null;var count__42060_42081 = 0;var i__42061_42082 = 0;while(true){
if((i__42061_42082 < count__42060_42081))
{var vec__42064_42083 = chunk__42059_42080.cljs$core$IIndexed$_nth$arity$2(null,i__42061_42082);var actual_type_42084 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42064_42083,0,null);var __42085 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42064_42083,1,null);var keys_42086 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_42071,actual_type_42084,f_42078], null);var canonical_f_42087 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_42070),keys_42086);dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_42070,dommy.utils.dissoc_in,cljs.core.array_seq([keys_42086], 0));
if(cljs.core.truth_(elem_42070.removeEventListener))
{elem_42070.removeEventListener(cljs.core.name(actual_type_42084),canonical_f_42087);
} else
{elem_42070.detachEvent(cljs.core.name(actual_type_42084),canonical_f_42087);
}
{
var G__42088 = seq__42057_42079;
var G__42089 = chunk__42059_42080;
var G__42090 = count__42060_42081;
var G__42091 = (i__42061_42082 + 1);
seq__42057_42079 = G__42088;
chunk__42059_42080 = G__42089;
count__42060_42081 = G__42090;
i__42061_42082 = G__42091;
continue;
}
} else
{var temp__4126__auto___42092 = cljs.core.seq(seq__42057_42079);if(temp__4126__auto___42092)
{var seq__42057_42093__$1 = temp__4126__auto___42092;if(cljs.core.chunked_seq_QMARK_(seq__42057_42093__$1))
{var c__21797__auto___42094 = cljs.core.chunk_first(seq__42057_42093__$1);{
var G__42095 = cljs.core.chunk_rest(seq__42057_42093__$1);
var G__42096 = c__21797__auto___42094;
var G__42097 = cljs.core.count(c__21797__auto___42094);
var G__42098 = 0;
seq__42057_42079 = G__42095;
chunk__42059_42080 = G__42096;
count__42060_42081 = G__42097;
i__42061_42082 = G__42098;
continue;
}
} else
{var vec__42065_42099 = cljs.core.first(seq__42057_42093__$1);var actual_type_42100 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42065_42099,0,null);var __42101 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42065_42099,1,null);var keys_42102 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_42071,actual_type_42100,f_42078], null);var canonical_f_42103 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_42070),keys_42102);dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_42070,dommy.utils.dissoc_in,cljs.core.array_seq([keys_42102], 0));
if(cljs.core.truth_(elem_42070.removeEventListener))
{elem_42070.removeEventListener(cljs.core.name(actual_type_42100),canonical_f_42103);
} else
{elem_42070.detachEvent(cljs.core.name(actual_type_42100),canonical_f_42103);
}
{
var G__42104 = cljs.core.next(seq__42057_42093__$1);
var G__42105 = null;
var G__42106 = 0;
var G__42107 = 0;
seq__42057_42079 = G__42104;
chunk__42059_42080 = G__42105;
count__42060_42081 = G__42106;
i__42061_42082 = G__42107;
continue;
}
}
} else
{}
}
break;
}
{
var G__42108 = seq__42047_42072;
var G__42109 = chunk__42054_42073;
var G__42110 = count__42055_42074;
var G__42111 = (i__42056_42075 + 1);
seq__42047_42072 = G__42108;
chunk__42054_42073 = G__42109;
count__42055_42074 = G__42110;
i__42056_42075 = G__42111;
continue;
}
} else
{var temp__4126__auto___42112 = cljs.core.seq(seq__42047_42072);if(temp__4126__auto___42112)
{var seq__42047_42113__$1 = temp__4126__auto___42112;if(cljs.core.chunked_seq_QMARK_(seq__42047_42113__$1))
{var c__21797__auto___42114 = cljs.core.chunk_first(seq__42047_42113__$1);{
var G__42115 = cljs.core.chunk_rest(seq__42047_42113__$1);
var G__42116 = c__21797__auto___42114;
var G__42117 = cljs.core.count(c__21797__auto___42114);
var G__42118 = 0;
seq__42047_42072 = G__42115;
chunk__42054_42073 = G__42116;
count__42055_42074 = G__42117;
i__42056_42075 = G__42118;
continue;
}
} else
{var vec__42066_42119 = cljs.core.first(seq__42047_42113__$1);var orig_type_42120 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42066_42119,0,null);var f_42121 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42066_42119,1,null);var seq__42048_42122 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$3(dommy.core.special_listener_makers,orig_type_42120,new cljs.core.PersistentArrayMap.fromArray([orig_type_42120,cljs.core.identity], true, false)));var chunk__42050_42123 = null;var count__42051_42124 = 0;var i__42052_42125 = 0;while(true){
if((i__42052_42125 < count__42051_42124))
{var vec__42067_42126 = chunk__42050_42123.cljs$core$IIndexed$_nth$arity$2(null,i__42052_42125);var actual_type_42127 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42067_42126,0,null);var __42128 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42067_42126,1,null);var keys_42129 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_42071,actual_type_42127,f_42121], null);var canonical_f_42130 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_42070),keys_42129);dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_42070,dommy.utils.dissoc_in,cljs.core.array_seq([keys_42129], 0));
if(cljs.core.truth_(elem_42070.removeEventListener))
{elem_42070.removeEventListener(cljs.core.name(actual_type_42127),canonical_f_42130);
} else
{elem_42070.detachEvent(cljs.core.name(actual_type_42127),canonical_f_42130);
}
{
var G__42131 = seq__42048_42122;
var G__42132 = chunk__42050_42123;
var G__42133 = count__42051_42124;
var G__42134 = (i__42052_42125 + 1);
seq__42048_42122 = G__42131;
chunk__42050_42123 = G__42132;
count__42051_42124 = G__42133;
i__42052_42125 = G__42134;
continue;
}
} else
{var temp__4126__auto___42135__$1 = cljs.core.seq(seq__42048_42122);if(temp__4126__auto___42135__$1)
{var seq__42048_42136__$1 = temp__4126__auto___42135__$1;if(cljs.core.chunked_seq_QMARK_(seq__42048_42136__$1))
{var c__21797__auto___42137 = cljs.core.chunk_first(seq__42048_42136__$1);{
var G__42138 = cljs.core.chunk_rest(seq__42048_42136__$1);
var G__42139 = c__21797__auto___42137;
var G__42140 = cljs.core.count(c__21797__auto___42137);
var G__42141 = 0;
seq__42048_42122 = G__42138;
chunk__42050_42123 = G__42139;
count__42051_42124 = G__42140;
i__42052_42125 = G__42141;
continue;
}
} else
{var vec__42068_42142 = cljs.core.first(seq__42048_42136__$1);var actual_type_42143 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42068_42142,0,null);var __42144 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42068_42142,1,null);var keys_42145 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_42071,actual_type_42143,f_42121], null);var canonical_f_42146 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(dommy.core.event_listeners(elem_42070),keys_42145);dommy.core.update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_42070,dommy.utils.dissoc_in,cljs.core.array_seq([keys_42145], 0));
if(cljs.core.truth_(elem_42070.removeEventListener))
{elem_42070.removeEventListener(cljs.core.name(actual_type_42143),canonical_f_42146);
} else
{elem_42070.detachEvent(cljs.core.name(actual_type_42143),canonical_f_42146);
}
{
var G__42147 = cljs.core.next(seq__42048_42136__$1);
var G__42148 = null;
var G__42149 = 0;
var G__42150 = 0;
seq__42048_42122 = G__42147;
chunk__42050_42123 = G__42148;
count__42051_42124 = G__42149;
i__42052_42125 = G__42150;
continue;
}
}
} else
{}
}
break;
}
{
var G__42151 = cljs.core.next(seq__42047_42113__$1);
var G__42152 = null;
var G__42153 = 0;
var G__42154 = 0;
seq__42047_42072 = G__42151;
chunk__42054_42073 = G__42152;
count__42055_42074 = G__42153;
i__42056_42075 = G__42154;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var unlisten_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
unlisten_BANG_.cljs$lang$maxFixedArity = 1;
unlisten_BANG_.cljs$lang$applyTo = (function (arglist__42155){
var elem_sel = cljs.core.first(arglist__42155);
var type_fs = cljs.core.rest(arglist__42155);
return unlisten_BANG___delegate(elem_sel,type_fs);
});
unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic = unlisten_BANG___delegate;
return unlisten_BANG_;
})()
;
/**
* @param {...*} var_args
*/
dommy.core.listen_once_BANG_ = (function() { 
var listen_once_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_(cljs.core.count(type_fs)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null)))], 0)))].join('')));
}
var vec__42163_42170 = dommy.core.elem_and_selector(elem_sel);var elem_42171 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42163_42170,0,null);var selector_42172 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42163_42170,1,null);var seq__42164_42173 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2,type_fs));var chunk__42165_42174 = null;var count__42166_42175 = 0;var i__42167_42176 = 0;while(true){
if((i__42167_42176 < count__42166_42175))
{var vec__42168_42177 = chunk__42165_42174.cljs$core$IIndexed$_nth$arity$2(null,i__42167_42176);var type_42178 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42168_42177,0,null);var f_42179 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42168_42177,1,null);dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_42178,((function (seq__42164_42173,chunk__42165_42174,count__42166_42175,i__42167_42176,vec__42168_42177,type_42178,f_42179){
return (function this_fn(e){dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_42178,this_fn], 0));
return (f_42179.cljs$core$IFn$_invoke$arity$1 ? f_42179.cljs$core$IFn$_invoke$arity$1(e) : f_42179.call(null,e));
});})(seq__42164_42173,chunk__42165_42174,count__42166_42175,i__42167_42176,vec__42168_42177,type_42178,f_42179))
], 0));
{
var G__42180 = seq__42164_42173;
var G__42181 = chunk__42165_42174;
var G__42182 = count__42166_42175;
var G__42183 = (i__42167_42176 + 1);
seq__42164_42173 = G__42180;
chunk__42165_42174 = G__42181;
count__42166_42175 = G__42182;
i__42167_42176 = G__42183;
continue;
}
} else
{var temp__4126__auto___42184 = cljs.core.seq(seq__42164_42173);if(temp__4126__auto___42184)
{var seq__42164_42185__$1 = temp__4126__auto___42184;if(cljs.core.chunked_seq_QMARK_(seq__42164_42185__$1))
{var c__21797__auto___42186 = cljs.core.chunk_first(seq__42164_42185__$1);{
var G__42187 = cljs.core.chunk_rest(seq__42164_42185__$1);
var G__42188 = c__21797__auto___42186;
var G__42189 = cljs.core.count(c__21797__auto___42186);
var G__42190 = 0;
seq__42164_42173 = G__42187;
chunk__42165_42174 = G__42188;
count__42166_42175 = G__42189;
i__42167_42176 = G__42190;
continue;
}
} else
{var vec__42169_42191 = cljs.core.first(seq__42164_42185__$1);var type_42192 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42169_42191,0,null);var f_42193 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42169_42191,1,null);dommy.core.listen_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_42192,((function (seq__42164_42173,chunk__42165_42174,count__42166_42175,i__42167_42176,vec__42169_42191,type_42192,f_42193,seq__42164_42185__$1,temp__4126__auto___42184){
return (function this_fn(e){dommy.core.unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic(elem_sel,cljs.core.array_seq([type_42192,this_fn], 0));
return (f_42193.cljs$core$IFn$_invoke$arity$1 ? f_42193.cljs$core$IFn$_invoke$arity$1(e) : f_42193.call(null,e));
});})(seq__42164_42173,chunk__42165_42174,count__42166_42175,i__42167_42176,vec__42169_42191,type_42192,f_42193,seq__42164_42185__$1,temp__4126__auto___42184))
], 0));
{
var G__42194 = cljs.core.next(seq__42164_42185__$1);
var G__42195 = null;
var G__42196 = 0;
var G__42197 = 0;
seq__42164_42173 = G__42194;
chunk__42165_42174 = G__42195;
count__42166_42175 = G__42196;
i__42167_42176 = G__42197;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_once_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
listen_once_BANG_.cljs$lang$maxFixedArity = 1;
listen_once_BANG_.cljs$lang$applyTo = (function (arglist__42198){
var elem_sel = cljs.core.first(arglist__42198);
var type_fs = cljs.core.rest(arglist__42198);
return listen_once_BANG___delegate(elem_sel,type_fs);
});
listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_once_BANG___delegate;
return listen_once_BANG_;
})()
;
/**
* NOTE: ONLY TO BE USED FOR TESTS. May not work at mocking many
* event types or their bubbling behaviours
* 
* Creates an event of type `event-type`, optionally having
* `update-event!` mutate and return an updated event object,
* and fires it on `node`.
* Only works when `node` is in the DOM
* @param {...*} var_args
*/
dommy.core.fire_BANG_ = (function() { 
var fire_BANG___delegate = function (node,event_type,p__42199){var vec__42201 = p__42199;var update_event_BANG_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42201,0,null);if(dommy.core.descendant_QMARK_(node,document.documentElement))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"descendant?","descendant?",-1886221157,null),new cljs.core.Symbol(null,"node","node",-1637144645,null),new cljs.core.Symbol("js","document.documentElement","js/document.documentElement",-1449696112,null))], 0)))].join('')));
}
var update_event_BANG___$1 = (function (){var or__21049__auto__ = update_event_BANG_;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.identity;
}
})();if(cljs.core.truth_(document.createEvent))
{var event = document.createEvent("Event");event.initEvent(cljs.core.name(event_type),true,true);
return node.dispatchEvent((update_event_BANG___$1.cljs$core$IFn$_invoke$arity$1 ? update_event_BANG___$1.cljs$core$IFn$_invoke$arity$1(event) : update_event_BANG___$1.call(null,event)));
} else
{return node.fireEvent([cljs.core.str("on"),cljs.core.str(cljs.core.name(event_type))].join(''),(update_event_BANG___$1.cljs$core$IFn$_invoke$arity$1 ? update_event_BANG___$1.cljs$core$IFn$_invoke$arity$1(document.createEventObject()) : update_event_BANG___$1.call(null,document.createEventObject())));
}
};
var fire_BANG_ = function (node,event_type,var_args){
var p__42199 = null;if (arguments.length > 2) {
  p__42199 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return fire_BANG___delegate.call(this,node,event_type,p__42199);};
fire_BANG_.cljs$lang$maxFixedArity = 2;
fire_BANG_.cljs$lang$applyTo = (function (arglist__42202){
var node = cljs.core.first(arglist__42202);
arglist__42202 = cljs.core.next(arglist__42202);
var event_type = cljs.core.first(arglist__42202);
var p__42199 = cljs.core.rest(arglist__42202);
return fire_BANG___delegate(node,event_type,p__42199);
});
fire_BANG_.cljs$core$IFn$_invoke$arity$variadic = fire_BANG___delegate;
return fire_BANG_;
})()
;
//# sourceMappingURL=core.js.map