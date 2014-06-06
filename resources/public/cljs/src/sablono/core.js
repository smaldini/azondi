goog.provide('sablono.core');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('sablono.util');
goog.require('goog.dom');
goog.require('goog.dom');
goog.require('sablono.interpreter');
goog.require('sablono.interpreter');
goog.require('sablono.util');
goog.require('clojure.walk');
goog.require('clojure.string');
/**
* Add an optional attribute argument to a function that returns a element vector.
*/
sablono.core.wrap_attrs = (function wrap_attrs(func){return (function() { 
var G__42590__delegate = function (args){if(cljs.core.map_QMARK_(cljs.core.first(args)))
{var vec__42589 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(func,cljs.core.rest(args));var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42589,0,null);var body = cljs.core.nthnext(vec__42589,1);if(cljs.core.map_QMARK_(cljs.core.first(body)))
{return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,tag,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(body),cljs.core.first(args)], 0)),cljs.core.rest(body));
} else
{return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,tag,cljs.core.first(args),body);
}
} else
{return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(func,args);
}
};
var G__42590 = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__42590__delegate.call(this,args);};
G__42590.cljs$lang$maxFixedArity = 0;
G__42590.cljs$lang$applyTo = (function (arglist__42591){
var args = cljs.core.seq(arglist__42591);
return G__42590__delegate(args);
});
G__42590.cljs$core$IFn$_invoke$arity$variadic = G__42590__delegate;
return G__42590;
})()
;
});
sablono.core.update_arglists = (function update_arglists(arglists){var iter__21766__auto__ = (function iter__42596(s__42597){return (new cljs.core.LazySeq(null,(function (){var s__42597__$1 = s__42597;while(true){
var temp__4126__auto__ = cljs.core.seq(s__42597__$1);if(temp__4126__auto__)
{var s__42597__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__42597__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__42597__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__42599 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__42598 = 0;while(true){
if((i__42598 < size__21765__auto__))
{var args = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__42598);cljs.core.chunk_append(b__42599,cljs.core.vec(cljs.core.cons(new cljs.core.Symbol(null,"attr-map?","attr-map?",-1682549128,null),args)));
{
var G__42600 = (i__42598 + 1);
i__42598 = G__42600;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__42599),iter__42596(cljs.core.chunk_rest(s__42597__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__42599),null);
}
} else
{var args = cljs.core.first(s__42597__$2);return cljs.core.cons(cljs.core.vec(cljs.core.cons(new cljs.core.Symbol(null,"attr-map?","attr-map?",-1682549128,null),args)),iter__42596(cljs.core.rest(s__42597__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(arglists);
});
/**
* Render the React `component` as an HTML string.
*/
sablono.core.render = (function render(component){var html = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);React.renderComponentToString(component,(function (p1__42601_SHARP_){return cljs.core.reset_BANG_(html,p1__42601_SHARP_);
}));
return cljs.core.deref(html);
});
/**
* Include a list of external stylesheet files.
* @param {...*} var_args
*/
sablono.core.include_css = (function() { 
var include_css__delegate = function (styles){var iter__21766__auto__ = (function iter__42606(s__42607){return (new cljs.core.LazySeq(null,(function (){var s__42607__$1 = s__42607;while(true){
var temp__4126__auto__ = cljs.core.seq(s__42607__$1);if(temp__4126__auto__)
{var s__42607__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__42607__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__42607__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__42609 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__42608 = 0;while(true){
if((i__42608 < size__21765__auto__))
{var style = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__42608);cljs.core.chunk_append(b__42609,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",1017226092),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text/css",new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([style], 0)),new cljs.core.Keyword(null,"rel","rel",1014017035),"stylesheet"], null)], null));
{
var G__42610 = (i__42608 + 1);
i__42608 = G__42610;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__42609),iter__42606(cljs.core.chunk_rest(s__42607__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__42609),null);
}
} else
{var style = cljs.core.first(s__42607__$2);return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",1017226092),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text/css",new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([style], 0)),new cljs.core.Keyword(null,"rel","rel",1014017035),"stylesheet"], null)], null),iter__42606(cljs.core.rest(s__42607__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(styles);
};
var include_css = function (var_args){
var styles = null;if (arguments.length > 0) {
  styles = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return include_css__delegate.call(this,styles);};
include_css.cljs$lang$maxFixedArity = 0;
include_css.cljs$lang$applyTo = (function (arglist__42611){
var styles = cljs.core.seq(arglist__42611);
return include_css__delegate(styles);
});
include_css.cljs$core$IFn$_invoke$arity$variadic = include_css__delegate;
return include_css;
})()
;
/**
* Include the JavaScript library at `src`.
*/
sablono.core.include_js = (function include_js(src){return goog.dom.appendChild(goog.dom.getDocument().body,goog.dom.createDom("script",{"src": src}));
});
/**
* Include Facebook's React JavaScript library.
*/
sablono.core.include_react = (function include_react(){return sablono.core.include_js("http://fb.me/react-0.8.0.js");
});
/**
* Wraps some content in a HTML hyperlink with the supplied URL.
* @param {...*} var_args
*/
sablono.core.link_to42612 = (function() { 
var link_to42612__delegate = function (url,content){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([url], 0))], null),content], null);
};
var link_to42612 = function (url,var_args){
var content = null;if (arguments.length > 1) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return link_to42612__delegate.call(this,url,content);};
link_to42612.cljs$lang$maxFixedArity = 1;
link_to42612.cljs$lang$applyTo = (function (arglist__42613){
var url = cljs.core.first(arglist__42613);
var content = cljs.core.rest(arglist__42613);
return link_to42612__delegate(url,content);
});
link_to42612.cljs$core$IFn$_invoke$arity$variadic = link_to42612__delegate;
return link_to42612;
})()
;
sablono.core.link_to = sablono.core.wrap_attrs(sablono.core.link_to42612);
/**
* Wraps some content in a HTML hyperlink with the supplied e-mail
* address. If no content provided use the e-mail address as content.
* @param {...*} var_args
*/
sablono.core.mail_to42614 = (function() { 
var mail_to42614__delegate = function (e_mail,p__42615){var vec__42617 = p__42615;var content = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42617,0,null);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",1017115293),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__21049__auto__ = content;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return e_mail;
}
})()], null);
};
var mail_to42614 = function (e_mail,var_args){
var p__42615 = null;if (arguments.length > 1) {
  p__42615 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return mail_to42614__delegate.call(this,e_mail,p__42615);};
mail_to42614.cljs$lang$maxFixedArity = 1;
mail_to42614.cljs$lang$applyTo = (function (arglist__42618){
var e_mail = cljs.core.first(arglist__42618);
var p__42615 = cljs.core.rest(arglist__42618);
return mail_to42614__delegate(e_mail,p__42615);
});
mail_to42614.cljs$core$IFn$_invoke$arity$variadic = mail_to42614__delegate;
return mail_to42614;
})()
;
sablono.core.mail_to = sablono.core.wrap_attrs(sablono.core.mail_to42614);
/**
* Wrap a collection in an unordered list.
*/
sablono.core.unordered_list42619 = (function unordered_list42619(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),(function (){var iter__21766__auto__ = (function iter__42624(s__42625){return (new cljs.core.LazySeq(null,(function (){var s__42625__$1 = s__42625;while(true){
var temp__4126__auto__ = cljs.core.seq(s__42625__$1);if(temp__4126__auto__)
{var s__42625__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__42625__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__42625__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__42627 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__42626 = 0;while(true){
if((i__42626 < size__21765__auto__))
{var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__42626);cljs.core.chunk_append(b__42627,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null));
{
var G__42628 = (i__42626 + 1);
i__42626 = G__42628;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__42627),iter__42624(cljs.core.chunk_rest(s__42625__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__42627),null);
}
} else
{var x = cljs.core.first(s__42625__$2);return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null),iter__42624(cljs.core.rest(s__42625__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(coll);
})()], null);
});
sablono.core.unordered_list = sablono.core.wrap_attrs(sablono.core.unordered_list42619);
/**
* Wrap a collection in an ordered list.
*/
sablono.core.ordered_list42629 = (function ordered_list42629(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",1013907791),(function (){var iter__21766__auto__ = (function iter__42634(s__42635){return (new cljs.core.LazySeq(null,(function (){var s__42635__$1 = s__42635;while(true){
var temp__4126__auto__ = cljs.core.seq(s__42635__$1);if(temp__4126__auto__)
{var s__42635__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__42635__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__42635__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__42637 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__42636 = 0;while(true){
if((i__42636 < size__21765__auto__))
{var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__42636);cljs.core.chunk_append(b__42637,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null));
{
var G__42638 = (i__42636 + 1);
i__42636 = G__42638;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__42637),iter__42634(cljs.core.chunk_rest(s__42635__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__42637),null);
}
} else
{var x = cljs.core.first(s__42635__$2);return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null),iter__42634(cljs.core.rest(s__42635__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(coll);
})()], null);
});
sablono.core.ordered_list = sablono.core.wrap_attrs(sablono.core.ordered_list42629);
/**
* Create an image element.
*/
sablono.core.image42639 = (function() {
var image42639 = null;
var image42639__1 = (function (src){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([src], 0))], null)], null);
});
var image42639__2 = (function (src,alt){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([src], 0)),new cljs.core.Keyword(null,"alt","alt",1014000923),alt], null)], null);
});
image42639 = function(src,alt){
switch(arguments.length){
case 1:
return image42639__1.call(this,src);
case 2:
return image42639__2.call(this,src,alt);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
image42639.cljs$core$IFn$_invoke$arity$1 = image42639__1;
image42639.cljs$core$IFn$_invoke$arity$2 = image42639__2;
return image42639;
})()
;
sablono.core.image = sablono.core.wrap_attrs(sablono.core.image42639);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
* Create a field name from the supplied argument the current field group.
*/
sablono.core.make_name = (function make_name(name){return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2((function (p1__42640_SHARP_,p2__42641_SHARP_){return [cljs.core.str(p1__42640_SHARP_),cljs.core.str("["),cljs.core.str(p2__42641_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sablono.core._STAR_group_STAR_,sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([name], 0))));
});
/**
* Create a field id from the supplied argument and current field group.
*/
sablono.core.make_id = (function make_id(name){return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2((function (p1__42642_SHARP_,p2__42643_SHARP_){return [cljs.core.str(p1__42642_SHARP_),cljs.core.str("-"),cljs.core.str(p2__42643_SHARP_)].join('');
}),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sablono.core._STAR_group_STAR_,sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([name], 0))));
});
/**
* Creates a new <input> element.
*/
sablono.core.input_field = (function input_field(type,name,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name(name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id(name),new cljs.core.Keyword(null,"value","value",1125876963),value], null)], null);
});
/**
* Creates a hidden input field.
*/
sablono.core.hidden_field42644 = (function() {
var hidden_field42644 = null;
var hidden_field42644__1 = (function (name){return hidden_field42644.cljs$core$IFn$_invoke$arity$2(name,null);
});
var hidden_field42644__2 = (function (name,value){return sablono.core.input_field("hidden",name,value);
});
hidden_field42644 = function(name,value){
switch(arguments.length){
case 1:
return hidden_field42644__1.call(this,name);
case 2:
return hidden_field42644__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hidden_field42644.cljs$core$IFn$_invoke$arity$1 = hidden_field42644__1;
hidden_field42644.cljs$core$IFn$_invoke$arity$2 = hidden_field42644__2;
return hidden_field42644;
})()
;
sablono.core.hidden_field = sablono.core.wrap_attrs(sablono.core.hidden_field42644);
/**
* Creates a new text input field.
*/
sablono.core.text_field42645 = (function() {
var text_field42645 = null;
var text_field42645__1 = (function (name){return text_field42645.cljs$core$IFn$_invoke$arity$2(name,null);
});
var text_field42645__2 = (function (name,value){return sablono.core.input_field("text",name,value);
});
text_field42645 = function(name,value){
switch(arguments.length){
case 1:
return text_field42645__1.call(this,name);
case 2:
return text_field42645__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_field42645.cljs$core$IFn$_invoke$arity$1 = text_field42645__1;
text_field42645.cljs$core$IFn$_invoke$arity$2 = text_field42645__2;
return text_field42645;
})()
;
sablono.core.text_field = sablono.core.wrap_attrs(sablono.core.text_field42645);
/**
* Creates a new password field.
*/
sablono.core.password_field42646 = (function() {
var password_field42646 = null;
var password_field42646__1 = (function (name){return password_field42646.cljs$core$IFn$_invoke$arity$2(name,null);
});
var password_field42646__2 = (function (name,value){return sablono.core.input_field("password",name,value);
});
password_field42646 = function(name,value){
switch(arguments.length){
case 1:
return password_field42646__1.call(this,name);
case 2:
return password_field42646__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
password_field42646.cljs$core$IFn$_invoke$arity$1 = password_field42646__1;
password_field42646.cljs$core$IFn$_invoke$arity$2 = password_field42646__2;
return password_field42646;
})()
;
sablono.core.password_field = sablono.core.wrap_attrs(sablono.core.password_field42646);
/**
* Creates a new email input field.
*/
sablono.core.email_field42647 = (function() {
var email_field42647 = null;
var email_field42647__1 = (function (name){return email_field42647.cljs$core$IFn$_invoke$arity$2(name,null);
});
var email_field42647__2 = (function (name,value){return sablono.core.input_field("email",name,value);
});
email_field42647 = function(name,value){
switch(arguments.length){
case 1:
return email_field42647__1.call(this,name);
case 2:
return email_field42647__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
email_field42647.cljs$core$IFn$_invoke$arity$1 = email_field42647__1;
email_field42647.cljs$core$IFn$_invoke$arity$2 = email_field42647__2;
return email_field42647;
})()
;
sablono.core.email_field = sablono.core.wrap_attrs(sablono.core.email_field42647);
/**
* Creates a check box.
*/
sablono.core.check_box42648 = (function() {
var check_box42648 = null;
var check_box42648__1 = (function (name){return check_box42648.cljs$core$IFn$_invoke$arity$2(name,null);
});
var check_box42648__2 = (function (name,checked_QMARK_){return check_box42648.cljs$core$IFn$_invoke$arity$3(name,checked_QMARK_,"true");
});
var check_box42648__3 = (function (name,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1017479852),"checkbox",new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name(name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id(name),new cljs.core.Keyword(null,"value","value",1125876963),value,new cljs.core.Keyword(null,"checked","checked",1756218137),checked_QMARK_], null)], null);
});
check_box42648 = function(name,checked_QMARK_,value){
switch(arguments.length){
case 1:
return check_box42648__1.call(this,name);
case 2:
return check_box42648__2.call(this,name,checked_QMARK_);
case 3:
return check_box42648__3.call(this,name,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
check_box42648.cljs$core$IFn$_invoke$arity$1 = check_box42648__1;
check_box42648.cljs$core$IFn$_invoke$arity$2 = check_box42648__2;
check_box42648.cljs$core$IFn$_invoke$arity$3 = check_box42648__3;
return check_box42648;
})()
;
sablono.core.check_box = sablono.core.wrap_attrs(sablono.core.check_box42648);
/**
* Creates a radio button.
*/
sablono.core.radio_button42649 = (function() {
var radio_button42649 = null;
var radio_button42649__1 = (function (group){return radio_button42649.cljs$core$IFn$_invoke$arity$2(group,null);
});
var radio_button42649__2 = (function (group,checked_QMARK_){return radio_button42649.cljs$core$IFn$_invoke$arity$3(group,checked_QMARK_,"true");
});
var radio_button42649__3 = (function (group,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1017479852),"radio",new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name(group),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id([cljs.core.str(sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([group], 0))),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([value], 0)))].join('')),new cljs.core.Keyword(null,"value","value",1125876963),value,new cljs.core.Keyword(null,"checked","checked",1756218137),checked_QMARK_], null)], null);
});
radio_button42649 = function(group,checked_QMARK_,value){
switch(arguments.length){
case 1:
return radio_button42649__1.call(this,group);
case 2:
return radio_button42649__2.call(this,group,checked_QMARK_);
case 3:
return radio_button42649__3.call(this,group,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
radio_button42649.cljs$core$IFn$_invoke$arity$1 = radio_button42649__1;
radio_button42649.cljs$core$IFn$_invoke$arity$2 = radio_button42649__2;
radio_button42649.cljs$core$IFn$_invoke$arity$3 = radio_button42649__3;
return radio_button42649;
})()
;
sablono.core.radio_button = sablono.core.wrap_attrs(sablono.core.radio_button42649);
/**
* Creates a seq of option tags from a collection.
*/
sablono.core.select_options42650 = (function() {
var select_options42650 = null;
var select_options42650__1 = (function (coll){return select_options42650.cljs$core$IFn$_invoke$arity$2(coll,null);
});
var select_options42650__2 = (function (coll,selected){var iter__21766__auto__ = (function iter__42659(s__42660){return (new cljs.core.LazySeq(null,(function (){var s__42660__$1 = s__42660;while(true){
var temp__4126__auto__ = cljs.core.seq(s__42660__$1);if(temp__4126__auto__)
{var s__42660__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__42660__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__42660__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__42662 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__42661 = 0;while(true){
if((i__42661 < size__21765__auto__))
{var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__42661);cljs.core.chunk_append(b__42662,((cljs.core.sequential_QMARK_(x))?(function (){var vec__42665 = x;var text = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42665,0,null);var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42665,1,null);if(cljs.core.sequential_QMARK_(val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",933131038),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),text], null),select_options42650.cljs$core$IFn$_invoke$arity$2(val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),val,new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,selected)], null),x], null)));
{
var G__42667 = (i__42661 + 1);
i__42661 = G__42667;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__42662),iter__42659(cljs.core.chunk_rest(s__42660__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__42662),null);
}
} else
{var x = cljs.core.first(s__42660__$2);return cljs.core.cons(((cljs.core.sequential_QMARK_(x))?(function (){var vec__42666 = x;var text = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42666,0,null);var val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42666,1,null);if(cljs.core.sequential_QMARK_(val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",933131038),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),text], null),select_options42650.cljs$core$IFn$_invoke$arity$2(val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),val,new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,selected)], null),x], null)),iter__42659(cljs.core.rest(s__42660__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(coll);
});
select_options42650 = function(coll,selected){
switch(arguments.length){
case 1:
return select_options42650__1.call(this,coll);
case 2:
return select_options42650__2.call(this,coll,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
select_options42650.cljs$core$IFn$_invoke$arity$1 = select_options42650__1;
select_options42650.cljs$core$IFn$_invoke$arity$2 = select_options42650__2;
return select_options42650;
})()
;
sablono.core.select_options = sablono.core.wrap_attrs(sablono.core.select_options42650);
/**
* Creates a drop-down box using the <select> tag.
*/
sablono.core.drop_down42668 = (function() {
var drop_down42668 = null;
var drop_down42668__2 = (function (name,options){return drop_down42668.cljs$core$IFn$_invoke$arity$3(name,options,null);
});
var drop_down42668__3 = (function (name,options,selected){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",4402849902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name(name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id(name)], null),(sablono.core.select_options.cljs$core$IFn$_invoke$arity$2 ? sablono.core.select_options.cljs$core$IFn$_invoke$arity$2(options,selected) : sablono.core.select_options.call(null,options,selected))], null);
});
drop_down42668 = function(name,options,selected){
switch(arguments.length){
case 2:
return drop_down42668__2.call(this,name,options);
case 3:
return drop_down42668__3.call(this,name,options,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
drop_down42668.cljs$core$IFn$_invoke$arity$2 = drop_down42668__2;
drop_down42668.cljs$core$IFn$_invoke$arity$3 = drop_down42668__3;
return drop_down42668;
})()
;
sablono.core.drop_down = sablono.core.wrap_attrs(sablono.core.drop_down42668);
/**
* Creates a text area element.
*/
sablono.core.text_area42669 = (function() {
var text_area42669 = null;
var text_area42669__1 = (function (name){return text_area42669.cljs$core$IFn$_invoke$arity$2(name,null);
});
var text_area42669__2 = (function (name,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",4305627820),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name(name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id(name),new cljs.core.Keyword(null,"value","value",1125876963),value], null)], null);
});
text_area42669 = function(name,value){
switch(arguments.length){
case 1:
return text_area42669__1.call(this,name);
case 2:
return text_area42669__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_area42669.cljs$core$IFn$_invoke$arity$1 = text_area42669__1;
text_area42669.cljs$core$IFn$_invoke$arity$2 = text_area42669__2;
return text_area42669;
})()
;
sablono.core.text_area = sablono.core.wrap_attrs(sablono.core.text_area42669);
/**
* Creates a file upload input.
*/
sablono.core.file_upload42670 = (function file_upload42670(name){return sablono.core.input_field("file",name,null);
});
sablono.core.file_upload = sablono.core.wrap_attrs(sablono.core.file_upload42670);
/**
* Creates a label for an input field with the supplied name.
*/
sablono.core.label42671 = (function label42671(name,text){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1116631654),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",2249940112),sablono.core.make_id(name)], null),text], null);
});
sablono.core.label = sablono.core.wrap_attrs(sablono.core.label42671);
/**
* Creates a submit button.
*/
sablono.core.submit_button42672 = (function submit_button42672(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),text], null)], null);
});
sablono.core.submit_button = sablono.core.wrap_attrs(sablono.core.submit_button42672);
/**
* Creates a form reset button.
*/
sablono.core.reset_button42673 = (function reset_button42673(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"reset",new cljs.core.Keyword(null,"value","value",1125876963),text], null)], null);
});
sablono.core.reset_button = sablono.core.wrap_attrs(sablono.core.reset_button42673);
/**
* Create a form that points to a particular method and route.
* e.g. (form-to [:put "/post"]
* ...)
* @param {...*} var_args
*/
sablono.core.form_to42674 = (function() { 
var form_to42674__delegate = function (p__42675,body){var vec__42677 = p__42675;var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42677,0,null);var action = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42677,1,null);var method_str = clojure.string.upper_case(cljs.core.name(method));var action_uri = sablono.util.to_uri(action);return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1014006472),null,new cljs.core.Keyword(null,"post","post",1017351186),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",1017053238),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),method_str,new cljs.core.Keyword(null,"action","action",3885920680),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",1017053238),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),"POST",new cljs.core.Keyword(null,"action","action",3885920680),action_uri], null),(sablono.core.hidden_field.cljs$core$IFn$_invoke$arity$2 ? sablono.core.hidden_field.cljs$core$IFn$_invoke$arity$2("_method",method_str) : sablono.core.hidden_field.call(null,"_method",method_str))], null)),body));
};
var form_to42674 = function (p__42675,var_args){
var body = null;if (arguments.length > 1) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return form_to42674__delegate.call(this,p__42675,body);};
form_to42674.cljs$lang$maxFixedArity = 1;
form_to42674.cljs$lang$applyTo = (function (arglist__42678){
var p__42675 = cljs.core.first(arglist__42678);
var body = cljs.core.rest(arglist__42678);
return form_to42674__delegate(p__42675,body);
});
form_to42674.cljs$core$IFn$_invoke$arity$variadic = form_to42674__delegate;
return form_to42674;
})()
;
sablono.core.form_to = sablono.core.wrap_attrs(sablono.core.form_to42674);
//# sourceMappingURL=core.js.map