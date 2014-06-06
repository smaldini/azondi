goog.provide('azondi.main');
goog.require('cljs.core');
goog.require('azondi.chart');
goog.require('chord.client');
goog.require('cljs.core.async');
goog.require('azondi.net');
goog.require('sablono.core');
goog.require('azondi.csk');
goog.require('chord.client');
goog.require('cljs.core.async');
goog.require('sablono.core');
goog.require('azondi.chart');
goog.require('goog.events');
goog.require('clojure.string');
goog.require('om.core');
goog.require('om.core');
goog.require('azondi.csk');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('goog.events');
goog.require('cljs.reader');
goog.require('azondi.net');
cljs.core.enable_console_print_BANG_();
azondi.main.hostname = (function (){var a = document.createElement("a");a.href = document.URL;
return a.hostname;
})();
azondi.main.uri_init = [cljs.core.str("http://"),cljs.core.str(azondi.main.hostname),cljs.core.str(":3000/api/1.0")].join('');
azondi.main.app_model = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"user","user",1017503549),"nobody",new cljs.core.Keyword(null,"devices","devices",2573705295),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"device","device",3973714376),null,new cljs.core.Keyword(null,"topics","topics",4440837270),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"topic","topic",1124450465),null,new cljs.core.Keyword(null,"topic-detail","topic-detail",557925921),null,new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264),null,new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"messages","messages",551810238),cljs.core.PersistentVector.EMPTY], null)], null));
/**
* Show a list of devices
*/
azondi.main.devices_list_component = (function devices_list_component(app_state,owner){if(typeof azondi.main.t68542 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t68542 = (function (owner,app_state,devices_list_component,meta68543){
this.owner = owner;
this.app_state = app_state;
this.devices_list_component = devices_list_component;
this.meta68543 = meta68543;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t68542.cljs$lang$type = true;
azondi.main.t68542.cljs$lang$ctorStr = "azondi.main/t68542";
azondi.main.t68542.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t68542");
});
azondi.main.t68542.prototype.om$core$IRender$ = true;
azondi.main.t68542.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.p(null,"user: ",sablono.interpreter.interpret(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state))),sablono.interpreter.interpret((function (){var devices = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(self__.app_state);if(cljs.core.truth_(cljs.core.not_empty(devices)))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table.table-hover.table-condensed.tbl","table.table.table-hover.table-condensed.tbl",2199590137),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",1124231110),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Client id"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Name"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Description"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",1124062088),(function (){var iter__21766__auto__ = (function iter__68545(s__68546){return (new cljs.core.LazySeq(null,(function (){var s__68546__$1 = s__68546;while(true){
var temp__4126__auto__ = cljs.core.seq(s__68546__$1);if(temp__4126__auto__)
{var s__68546__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__68546__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__68546__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__68548 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__68547 = 0;while(true){
if((i__68547 < size__21765__auto__))
{var map__68645 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__68547);var map__68645__$1 = ((cljs.core.seq_QMARK_(map__68645))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__68645):map__68645);var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68645__$1,new cljs.core.Keyword(null,"description","description",3584325486));var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68645__$1,new cljs.core.Keyword(null,"name","name",1017277949));var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68645__$1,new cljs.core.Keyword(null,"client-id","client-id",3404733903));cljs.core.chunk_append(b__68548,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",3976677536),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null))))?"#ff0":"white")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.numeric","td.numeric",4490771713),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),((function (i__68547,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/devices/"),cljs.core.str(client_id)].join(''),new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (i__68547,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (i__68547,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__){
return (function (state_68673){var state_val_68674 = (state_68673[1]);if((state_val_68674 === 9))
{var inst_68671 = (state_68673[2]);var state_68673__$1 = state_68673;return cljs.core.async.impl.ioc_helpers.return_chan(state_68673__$1,inst_68671);
} else
{if((state_val_68674 === 8))
{var state_68673__$1 = state_68673;var statearr_68675_68759 = state_68673__$1;(statearr_68675_68759[2] = null);
(statearr_68675_68759[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 7))
{var inst_68657 = (state_68673[7]);var inst_68661 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_68662 = ["",""];var inst_68663 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_68661,inst_68662) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_68661,inst_68662));var inst_68664 = [new cljs.core.Keyword(null,"client-id","client-id",3404733903),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_68665 = (new cljs.core.PersistentVector(null,3,5,cljs.core.PersistentVector.EMPTY_NODE,inst_68664,null));var inst_68666 = cljs.core.select_keys(inst_68657,inst_68665);var inst_68667 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_68663,inst_68666], 0));var inst_68668 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"device","device",3973714376),inst_68667);var state_68673__$1 = state_68673;var statearr_68676_68760 = state_68673__$1;(statearr_68676_68760[2] = inst_68668);
(statearr_68676_68760[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 6))
{var inst_68656 = (state_68673[2]);var inst_68657 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68656,new cljs.core.Keyword(null,"body","body",1016933652));var inst_68658 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68656,new cljs.core.Keyword(null,"status","status",4416389988));var inst_68659 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_68658,200);var state_68673__$1 = (function (){var statearr_68677 = state_68673;(statearr_68677[7] = inst_68657);
return statearr_68677;
})();if(inst_68659)
{var statearr_68678_68761 = state_68673__$1;(statearr_68678_68761[1] = 7);
} else
{var statearr_68679_68762 = state_68673__$1;(statearr_68679_68762[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 5))
{var inst_68650 = (state_68673[8]);var state_68673__$1 = state_68673;var statearr_68680_68763 = state_68673__$1;(statearr_68680_68763[2] = inst_68650);
(statearr_68680_68763[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 4))
{var inst_68650 = (state_68673[8]);var inst_68653 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_68650);var state_68673__$1 = state_68673;var statearr_68681_68764 = state_68673__$1;(statearr_68681_68764[2] = inst_68653);
(statearr_68681_68764[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 3))
{var inst_68650 = (state_68673[8]);var inst_68650__$1 = (state_68673[2]);var inst_68651 = cljs.core.seq_QMARK_(inst_68650__$1);var state_68673__$1 = (function (){var statearr_68682 = state_68673;(statearr_68682[8] = inst_68650__$1);
return statearr_68682;
})();if(inst_68651)
{var statearr_68683_68765 = state_68673__$1;(statearr_68683_68765[1] = 4);
} else
{var statearr_68684_68766 = state_68673__$1;(statearr_68684_68766[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68674 === 2))
{var inst_68647 = (state_68673[2]);var state_68673__$1 = (function (){var statearr_68685 = state_68673;(statearr_68685[9] = inst_68647);
return statearr_68685;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_68673__$1,3,ajax_recv);
} else
{if((state_val_68674 === 1))
{var state_68673__$1 = state_68673;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_68673__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(i__68547,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__))
;return ((function (i__68547,switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_68689 = [null,null,null,null,null,null,null,null,null,null];(statearr_68689[0] = state_machine__24506__auto__);
(statearr_68689[1] = 1);
return statearr_68689;
});
var state_machine__24506__auto____1 = (function (state_68673){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_68673);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e68690){if((e68690 instanceof Object))
{var ex__24509__auto__ = e68690;var statearr_68691_68767 = state_68673;(statearr_68691_68767[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_68673);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e68690;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__68768 = state_68673;
state_68673 = G__68768;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_68673){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_68673);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(i__68547,switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_68692 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_68692[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_68692;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(i__68547,c__24520__auto__,ajax_send,ajax_recv,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(i__68547,map__68645,map__68645__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__68548,s__68546__$2,temp__4126__auto__))
], null),client_id], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),description], null)], null));
{
var G__68769 = (i__68547 + 1);
i__68547 = G__68769;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__68548),iter__68545(cljs.core.chunk_rest(s__68546__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__68548),null);
}
} else
{var map__68693 = cljs.core.first(s__68546__$2);var map__68693__$1 = ((cljs.core.seq_QMARK_(map__68693))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__68693):map__68693);var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68693__$1,new cljs.core.Keyword(null,"description","description",3584325486));var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68693__$1,new cljs.core.Keyword(null,"name","name",1017277949));var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68693__$1,new cljs.core.Keyword(null,"client-id","client-id",3404733903));return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",3976677536),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null))))?"#ff0":"white")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.numeric","td.numeric",4490771713),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),((function (map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/devices/"),cljs.core.str(client_id)].join(''),new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__){
return (function (state_68721){var state_val_68722 = (state_68721[1]);if((state_val_68722 === 9))
{var inst_68719 = (state_68721[2]);var state_68721__$1 = state_68721;return cljs.core.async.impl.ioc_helpers.return_chan(state_68721__$1,inst_68719);
} else
{if((state_val_68722 === 8))
{var state_68721__$1 = state_68721;var statearr_68723_68770 = state_68721__$1;(statearr_68723_68770[2] = null);
(statearr_68723_68770[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 7))
{var inst_68705 = (state_68721[7]);var inst_68709 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_68710 = ["",""];var inst_68711 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_68709,inst_68710) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_68709,inst_68710));var inst_68712 = [new cljs.core.Keyword(null,"client-id","client-id",3404733903),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_68713 = (new cljs.core.PersistentVector(null,3,5,cljs.core.PersistentVector.EMPTY_NODE,inst_68712,null));var inst_68714 = cljs.core.select_keys(inst_68705,inst_68713);var inst_68715 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_68711,inst_68714], 0));var inst_68716 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"device","device",3973714376),inst_68715);var state_68721__$1 = state_68721;var statearr_68724_68771 = state_68721__$1;(statearr_68724_68771[2] = inst_68716);
(statearr_68724_68771[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 6))
{var inst_68704 = (state_68721[2]);var inst_68705 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68704,new cljs.core.Keyword(null,"body","body",1016933652));var inst_68706 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68704,new cljs.core.Keyword(null,"status","status",4416389988));var inst_68707 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_68706,200);var state_68721__$1 = (function (){var statearr_68725 = state_68721;(statearr_68725[7] = inst_68705);
return statearr_68725;
})();if(inst_68707)
{var statearr_68726_68772 = state_68721__$1;(statearr_68726_68772[1] = 7);
} else
{var statearr_68727_68773 = state_68721__$1;(statearr_68727_68773[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 5))
{var inst_68698 = (state_68721[8]);var state_68721__$1 = state_68721;var statearr_68728_68774 = state_68721__$1;(statearr_68728_68774[2] = inst_68698);
(statearr_68728_68774[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 4))
{var inst_68698 = (state_68721[8]);var inst_68701 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_68698);var state_68721__$1 = state_68721;var statearr_68729_68775 = state_68721__$1;(statearr_68729_68775[2] = inst_68701);
(statearr_68729_68775[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 3))
{var inst_68698 = (state_68721[8]);var inst_68698__$1 = (state_68721[2]);var inst_68699 = cljs.core.seq_QMARK_(inst_68698__$1);var state_68721__$1 = (function (){var statearr_68730 = state_68721;(statearr_68730[8] = inst_68698__$1);
return statearr_68730;
})();if(inst_68699)
{var statearr_68731_68776 = state_68721__$1;(statearr_68731_68776[1] = 4);
} else
{var statearr_68732_68777 = state_68721__$1;(statearr_68732_68777[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68722 === 2))
{var inst_68695 = (state_68721[2]);var state_68721__$1 = (function (){var statearr_68733 = state_68721;(statearr_68733[9] = inst_68695);
return statearr_68733;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_68721__$1,3,ajax_recv);
} else
{if((state_val_68722 === 1))
{var state_68721__$1 = state_68721;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_68721__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__))
;return ((function (switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_68737 = [null,null,null,null,null,null,null,null,null,null];(statearr_68737[0] = state_machine__24506__auto__);
(statearr_68737[1] = 1);
return statearr_68737;
});
var state_machine__24506__auto____1 = (function (state_68721){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_68721);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e68738){if((e68738 instanceof Object))
{var ex__24509__auto__ = e68738;var statearr_68739_68778 = state_68721;(statearr_68739_68778[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_68721);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e68738;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__68779 = state_68721;
state_68721 = G__68779;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_68721){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_68721);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_68740 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_68740[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_68740;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto__,ajax_send,ajax_recv,map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(map__68693,map__68693__$1,description,name,client_id,s__68546__$2,temp__4126__auto__))
], null),client_id], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),description], null)], null),iter__68545(cljs.core.rest(s__68546__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(devices);
})()], null)], null);
} else
{return null;
}
})()));
});
azondi.main.t68542.prototype.om$core$IWillMount$ = true;
azondi.main.t68542.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var uri = [cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/devices/")].join('');var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri], 0));console.log([cljs.core.str("sending "),cljs.core.str(uri)].join(''));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_68749){var state_val_68750 = (state_68749[1]);if((state_val_68750 === 3))
{var inst_68744 = (state_68749[2]);var inst_68745 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_68744);var inst_68746 = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(inst_68745);var inst_68747 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_68746);var state_68749__$1 = state_68749;return cljs.core.async.impl.ioc_helpers.return_chan(state_68749__$1,inst_68747);
} else
{if((state_val_68750 === 2))
{var inst_68742 = (state_68749[2]);var state_68749__$1 = (function (){var statearr_68751 = state_68749;(statearr_68751[7] = inst_68742);
return statearr_68751;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_68749__$1,3,ajax_recv);
} else
{if((state_val_68750 === 1))
{var state_68749__$1 = state_68749;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_68749__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_68755 = [null,null,null,null,null,null,null,null];(statearr_68755[0] = state_machine__24506__auto__);
(statearr_68755[1] = 1);
return statearr_68755;
});
var state_machine__24506__auto____1 = (function (state_68749){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_68749);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e68756){if((e68756 instanceof Object))
{var ex__24509__auto__ = e68756;var statearr_68757_68780 = state_68749;(statearr_68757_68780[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_68749);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e68756;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__68781 = state_68749;
state_68749 = G__68781;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_68749){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_68749);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_68758 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_68758[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_68758;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
azondi.main.t68542.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_68544){var self__ = this;
var _68544__$1 = this;return self__.meta68543;
});
azondi.main.t68542.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_68544,meta68543__$1){var self__ = this;
var _68544__$1 = this;return (new azondi.main.t68542(self__.owner,self__.app_state,self__.devices_list_component,meta68543__$1));
});
azondi.main.__GT_t68542 = (function __GT_t68542(owner__$1,app_state__$1,devices_list_component__$1,meta68543){return (new azondi.main.t68542(owner__$1,app_state__$1,devices_list_component__$1,meta68543));
});
}
return (new azondi.main.t68542(owner,app_state,devices_list_component,null));
});
azondi.main.update_devices_list_BANG_ = (function update_devices_list_BANG_(user,app_state){var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(user),cljs.core.str("/devices/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_68808){var state_val_68809 = (state_68808[1]);if((state_val_68809 === 3))
{var inst_68803 = (state_68808[2]);var inst_68804 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_68803);var inst_68805 = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(inst_68804);var inst_68806 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_68805);var state_68808__$1 = state_68808;return cljs.core.async.impl.ioc_helpers.return_chan(state_68808__$1,inst_68806);
} else
{if((state_val_68809 === 2))
{var inst_68801 = (state_68808[2]);var state_68808__$1 = (function (){var statearr_68810 = state_68808;(statearr_68810[7] = inst_68801);
return statearr_68810;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_68808__$1,3,ajax_recv);
} else
{if((state_val_68809 === 1))
{var state_68808__$1 = state_68808;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_68808__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_68814 = [null,null,null,null,null,null,null,null];(statearr_68814[0] = state_machine__24506__auto__);
(statearr_68814[1] = 1);
return statearr_68814;
});
var state_machine__24506__auto____1 = (function (state_68808){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_68808);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e68815){if((e68815 instanceof Object))
{var ex__24509__auto__ = e68815;var statearr_68816_68818 = state_68808;(statearr_68816_68818[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_68808);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e68815;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__68819 = state_68808;
state_68808 = G__68819;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_68808){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_68808);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_68817 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_68817[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_68817;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Click this button to register a new device
*/
azondi.main.new_device_button_component = (function new_device_button_component(app_state,owner){if(typeof azondi.main.t68877 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t68877 = (function (owner,app_state,new_device_button_component,meta68878){
this.owner = owner;
this.app_state = app_state;
this.new_device_button_component = new_device_button_component;
this.meta68878 = meta68878;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t68877.cljs$lang$type = true;
azondi.main.t68877.cljs$lang$ctorStr = "azondi.main/t68877";
azondi.main.t68877.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t68877");
});
azondi.main.t68877.prototype.om$core$IRender$ = true;
azondi.main.t68877.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.form({"className": "form-horizontal", "onSubmit": (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"post","post",1017351186)], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_68912){var state_val_68913 = (state_68912[1]);if((state_val_68913 === 9))
{var inst_68910 = (state_68912[2]);var state_68912__$1 = state_68912;return cljs.core.async.impl.ioc_helpers.return_chan(state_68912__$1,inst_68910);
} else
{if((state_val_68913 === 8))
{var state_68912__$1 = state_68912;var statearr_68914_68933 = state_68912__$1;(statearr_68914_68933[2] = null);
(statearr_68914_68933[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 7))
{var inst_68900 = (state_68912[7]);var inst_68899 = (state_68912[8]);var inst_68898 = (state_68912[9]);var inst_68903 = (function (){var status = inst_68900;var body = inst_68899;var map__68890 = inst_68898;return ((function (status,body,map__68890,inst_68900,inst_68899,inst_68898,state_val_68913){
return (function (p1__68820_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__68820_SHARP_,body);
});
;})(status,body,map__68890,inst_68900,inst_68899,inst_68898,state_val_68913))
})();var inst_68904 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_68903);var inst_68905 = [new cljs.core.Keyword(null,"device","device",3973714376)];var inst_68906 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_68905,null));var inst_68907 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_68906,inst_68899);var state_68912__$1 = (function (){var statearr_68915 = state_68912;(statearr_68915[10] = inst_68904);
return statearr_68915;
})();var statearr_68916_68934 = state_68912__$1;(statearr_68916_68934[2] = inst_68907);
(statearr_68916_68934[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 6))
{var inst_68900 = (state_68912[7]);var inst_68898 = (state_68912[9]);var inst_68898__$1 = (state_68912[2]);var inst_68899 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68898__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_68900__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_68898__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_68901 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_68900__$1,201);var state_68912__$1 = (function (){var statearr_68917 = state_68912;(statearr_68917[7] = inst_68900__$1);
(statearr_68917[8] = inst_68899);
(statearr_68917[9] = inst_68898__$1);
return statearr_68917;
})();if(inst_68901)
{var statearr_68918_68935 = state_68912__$1;(statearr_68918_68935[1] = 7);
} else
{var statearr_68919_68936 = state_68912__$1;(statearr_68919_68936[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 5))
{var inst_68892 = (state_68912[11]);var state_68912__$1 = state_68912;var statearr_68920_68937 = state_68912__$1;(statearr_68920_68937[2] = inst_68892);
(statearr_68920_68937[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 4))
{var inst_68892 = (state_68912[11]);var inst_68895 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_68892);var state_68912__$1 = state_68912;var statearr_68921_68938 = state_68912__$1;(statearr_68921_68938[2] = inst_68895);
(statearr_68921_68938[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 3))
{var inst_68892 = (state_68912[11]);var inst_68892__$1 = (state_68912[2]);var inst_68893 = cljs.core.seq_QMARK_(inst_68892__$1);var state_68912__$1 = (function (){var statearr_68922 = state_68912;(statearr_68922[11] = inst_68892__$1);
return statearr_68922;
})();if(inst_68893)
{var statearr_68923_68939 = state_68912__$1;(statearr_68923_68939[1] = 4);
} else
{var statearr_68924_68940 = state_68912__$1;(statearr_68924_68940[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_68913 === 2))
{var inst_68889 = (state_68912[2]);var state_68912__$1 = (function (){var statearr_68925 = state_68912;(statearr_68925[12] = inst_68889);
return statearr_68925;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_68912__$1,3,ajax_recv);
} else
{if((state_val_68913 === 1))
{var inst_68882 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_68883 = cljs.core.deref(self__.app_state);var inst_68884 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_68883);var inst_68885 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_68884),cljs.core.str("/devices/")].join('');var inst_68886 = [inst_68885,cljs.core.PersistentHashMap.EMPTY];var inst_68887 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_68882,inst_68886) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_68882,inst_68886));var state_68912__$1 = state_68912;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_68912__$1,2,ajax_send,inst_68887);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_68929 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_68929[0] = state_machine__24506__auto__);
(statearr_68929[1] = 1);
return statearr_68929;
});
var state_machine__24506__auto____1 = (function (state_68912){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_68912);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e68930){if((e68930 instanceof Object))
{var ex__24509__auto__ = e68930;var statearr_68931_68941 = state_68912;(statearr_68931_68941[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_68912);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e68930;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__68942 = state_68912;
state_68912 = G__68942;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_68912){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_68912);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_68932 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_68932[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_68932;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},React.DOM.div({"className": "control-group"},React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"className": "btn btn-primary", "type": "submit", "value": "Register new device"}) : sablono.interpreter.input.call(null,{"className": "btn btn-primary", "type": "submit", "value": "Register new device"})))));
});
azondi.main.t68877.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_68879){var self__ = this;
var _68879__$1 = this;return self__.meta68878;
});
azondi.main.t68877.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_68879,meta68878__$1){var self__ = this;
var _68879__$1 = this;return (new azondi.main.t68877(self__.owner,self__.app_state,self__.new_device_button_component,meta68878__$1));
});
azondi.main.__GT_t68877 = (function __GT_t68877(owner__$1,app_state__$1,new_device_button_component__$1,meta68878){return (new azondi.main.t68877(owner__$1,app_state__$1,new_device_button_component__$1,meta68878));
});
}
return (new azondi.main.t68877(owner,app_state,new_device_button_component,null));
});
/**
* Connect the device debugger to the notification (server-sent event)
* source of the given client-id. This debugger is useful Events are put
* to notify-ch.
*/
azondi.main.connect_device_debugger = (function connect_device_debugger(owner,client_id,notify_ch){var temp__4126__auto___68943 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376));if(cljs.core.truth_(temp__4126__auto___68943))
{var es_68944 = temp__4126__auto___68943;es_68944.close();
} else
{}
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376),azondi.net.listen_sse([cljs.core.str("/events/"),cljs.core.str(client_id)].join(''),notify_ch));
});
azondi.main.device_details_component = (function device_details_component(app_state,owner){if(typeof azondi.main.t69151 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t69151 = (function (owner,app_state,device_details_component,meta69152){
this.owner = owner;
this.app_state = app_state;
this.device_details_component = device_details_component;
this.meta69152 = meta69152;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t69151.cljs$lang$type = true;
azondi.main.t69151.cljs$lang$ctorStr = "azondi.main/t69151";
azondi.main.t69151.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t69151");
});
azondi.main.t69151.prototype.om$core$IRender$ = true;
azondi.main.t69151.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return sablono.interpreter.interpret((function (){var id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));return new cljs.core.PersistentVector(null, 18, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",1013907516),(function (){var name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)], null));if(cljs.core.truth_((function (){var and__21037__auto__ = name;if(cljs.core.truth_(and__21037__auto__))
{return cljs.core.not_empty(name);
} else
{return and__21037__auto__;
}
})()))
{return [cljs.core.str("Device: "),cljs.core.str(name)].join('');
} else
{return "Device";
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617)], 0));var temp__4124__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));if(cljs.core.truth_(temp__4124__auto__))
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69188){var state_val_69189 = (state_69188[1]);if((state_val_69189 === 9))
{var inst_69182 = (state_69188[2]);var inst_69183 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to PUT is",inst_69182], 0));var inst_69184 = cljs.core.deref(self__.app_state);var inst_69185 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_69184);var inst_69186 = azondi.main.update_devices_list_BANG_(inst_69185,self__.app_state);var state_69188__$1 = (function (){var statearr_69190 = state_69188;(statearr_69190[7] = inst_69183);
return statearr_69190;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_69188__$1,inst_69186);
} else
{if((state_val_69189 === 8))
{var inst_69154 = (state_69188[8]);var inst_69166 = (state_69188[9]);var inst_69157 = (state_69188[10]);var inst_69158 = (state_69188[11]);var inst_69174 = (state_69188[2]);var inst_69175 = [inst_69166,inst_69174];var inst_69176 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69158,inst_69175) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69158,inst_69175));var inst_69177 = [inst_69157,inst_69176];var inst_69178 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69154,inst_69177) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69154,inst_69177));var state_69188__$1 = state_69188;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69188__$1,2,ajax_send,inst_69178);
} else
{if((state_val_69189 === 7))
{var state_69188__$1 = state_69188;var statearr_69191_69355 = state_69188__$1;(statearr_69191_69355[2] = "");
(statearr_69191_69355[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69189 === 6))
{var inst_69170 = (state_69188[12]);var state_69188__$1 = state_69188;var statearr_69192_69356 = state_69188__$1;(statearr_69192_69356[2] = inst_69170);
(statearr_69192_69356[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69189 === 5))
{var inst_69170 = (state_69188[12]);var inst_69166 = (state_69188[2]);var inst_69167 = cljs.core.deref(self__.app_state);var inst_69168 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_69169 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69168,null));var inst_69170__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_69167,inst_69169);var state_69188__$1 = (function (){var statearr_69193 = state_69188;(statearr_69193[12] = inst_69170__$1);
(statearr_69193[9] = inst_69166);
return statearr_69193;
})();if(cljs.core.truth_(inst_69170__$1))
{var statearr_69194_69357 = state_69188__$1;(statearr_69194_69357[1] = 6);
} else
{var statearr_69195_69358 = state_69188__$1;(statearr_69195_69358[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69189 === 4))
{var state_69188__$1 = state_69188;var statearr_69196_69359 = state_69188__$1;(statearr_69196_69359[2] = "");
(statearr_69196_69359[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69189 === 3))
{var inst_69162 = (state_69188[13]);var state_69188__$1 = state_69188;var statearr_69197_69360 = state_69188__$1;(statearr_69197_69360[2] = inst_69162);
(statearr_69197_69360[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69189 === 2))
{var inst_69180 = (state_69188[2]);var state_69188__$1 = (function (){var statearr_69198 = state_69188;(statearr_69198[14] = inst_69180);
return statearr_69198;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69188__$1,9,ajax_recv);
} else
{if((state_val_69189 === 1))
{var inst_69162 = (state_69188[13]);var inst_69154 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_69155 = cljs.core.deref(self__.app_state);var inst_69156 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_69155);var inst_69157 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_69156),cljs.core.str("/devices/"),cljs.core.str(id__$1)].join('');var inst_69158 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_69159 = cljs.core.deref(self__.app_state);var inst_69160 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)];var inst_69161 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69160,null));var inst_69162__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_69159,inst_69161);var state_69188__$1 = (function (){var statearr_69199 = state_69188;(statearr_69199[8] = inst_69154);
(statearr_69199[10] = inst_69157);
(statearr_69199[11] = inst_69158);
(statearr_69199[13] = inst_69162__$1);
return statearr_69199;
})();if(cljs.core.truth_(inst_69162__$1))
{var statearr_69200_69361 = state_69188__$1;(statearr_69200_69361[1] = 3);
} else
{var statearr_69201_69362 = state_69188__$1;(statearr_69201_69362[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69205 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_69205[0] = state_machine__24506__auto__);
(statearr_69205[1] = 1);
return statearr_69205;
});
var state_machine__24506__auto____1 = (function (state_69188){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69188);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69206){if((e69206 instanceof Object))
{var ex__24509__auto__ = e69206;var statearr_69207_69363 = state_69188;(statearr_69207_69363[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69188);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69206;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69364 = state_69188;
state_69188 = G__69364;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69188){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69188);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69208 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69208[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69208;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Client id"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1017277949),"id",new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null)),new cljs.core.Keyword(null,"editable","editable",2616320470),false,new cljs.core.Keyword(null,"disabled","disabled",1284845038),true], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Name"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1017277949),"name",new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional device name"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Description"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"description",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"90%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional description"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn","input.btn",2719727018),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Apply"], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Reset password"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["RESET PASSWORD"], 0));
ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"post","post",1017351186)], 0));var temp__4124__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));if(cljs.core.truth_(temp__4124__auto__))
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69245){var state_val_69246 = (state_69245[1]);if((state_val_69246 === 9))
{var inst_69238 = (state_69245[2]);var inst_69239 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"password","password",2230889997)];var inst_69240 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69239,null));var inst_69241 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_69238);var inst_69242 = new cljs.core.Keyword(null,"password","password",2230889997).cljs$core$IFn$_invoke$arity$1(inst_69241);var inst_69243 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_69240,inst_69242);var state_69245__$1 = state_69245;return cljs.core.async.impl.ioc_helpers.return_chan(state_69245__$1,inst_69243);
} else
{if((state_val_69246 === 8))
{var inst_69210 = (state_69245[7]);var inst_69213 = (state_69245[8]);var inst_69214 = (state_69245[9]);var inst_69222 = (state_69245[10]);var inst_69230 = (state_69245[2]);var inst_69231 = [inst_69222,inst_69230];var inst_69232 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69214,inst_69231) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69214,inst_69231));var inst_69233 = [inst_69213,inst_69232];var inst_69234 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69210,inst_69233) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69210,inst_69233));var state_69245__$1 = state_69245;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69245__$1,2,ajax_send,inst_69234);
} else
{if((state_val_69246 === 7))
{var state_69245__$1 = state_69245;var statearr_69247_69365 = state_69245__$1;(statearr_69247_69365[2] = "");
(statearr_69247_69365[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69246 === 6))
{var inst_69226 = (state_69245[11]);var state_69245__$1 = state_69245;var statearr_69248_69366 = state_69245__$1;(statearr_69248_69366[2] = inst_69226);
(statearr_69248_69366[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69246 === 5))
{var inst_69226 = (state_69245[11]);var inst_69222 = (state_69245[2]);var inst_69223 = cljs.core.deref(self__.app_state);var inst_69224 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_69225 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69224,null));var inst_69226__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_69223,inst_69225);var state_69245__$1 = (function (){var statearr_69249 = state_69245;(statearr_69249[10] = inst_69222);
(statearr_69249[11] = inst_69226__$1);
return statearr_69249;
})();if(cljs.core.truth_(inst_69226__$1))
{var statearr_69250_69367 = state_69245__$1;(statearr_69250_69367[1] = 6);
} else
{var statearr_69251_69368 = state_69245__$1;(statearr_69251_69368[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69246 === 4))
{var state_69245__$1 = state_69245;var statearr_69252_69369 = state_69245__$1;(statearr_69252_69369[2] = "");
(statearr_69252_69369[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69246 === 3))
{var inst_69218 = (state_69245[12]);var state_69245__$1 = state_69245;var statearr_69253_69370 = state_69245__$1;(statearr_69253_69370[2] = inst_69218);
(statearr_69253_69370[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69246 === 2))
{var inst_69236 = (state_69245[2]);var state_69245__$1 = (function (){var statearr_69254 = state_69245;(statearr_69254[13] = inst_69236);
return statearr_69254;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69245__$1,9,ajax_recv);
} else
{if((state_val_69246 === 1))
{var inst_69218 = (state_69245[12]);var inst_69209 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["here - reset password"], 0));var inst_69210 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_69211 = cljs.core.deref(self__.app_state);var inst_69212 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_69211);var inst_69213 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_69212),cljs.core.str("/devices/"),cljs.core.str(id__$1),cljs.core.str("/reset-password")].join('');var inst_69214 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_69215 = cljs.core.deref(self__.app_state);var inst_69216 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)];var inst_69217 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69216,null));var inst_69218__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_69215,inst_69217);var state_69245__$1 = (function (){var statearr_69255 = state_69245;(statearr_69255[7] = inst_69210);
(statearr_69255[8] = inst_69213);
(statearr_69255[9] = inst_69214);
(statearr_69255[12] = inst_69218__$1);
(statearr_69255[14] = inst_69209);
return statearr_69255;
})();if(cljs.core.truth_(inst_69218__$1))
{var statearr_69256_69371 = state_69245__$1;(statearr_69256_69371[1] = 3);
} else
{var statearr_69257_69372 = state_69245__$1;(statearr_69257_69372[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69261 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_69261[0] = state_machine__24506__auto__);
(statearr_69261[1] = 1);
return statearr_69261;
});
var state_machine__24506__auto____1 = (function (state_69245){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69245);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69262){if((e69262 instanceof Object))
{var ex__24509__auto__ = e69262;var statearr_69263_69373 = state_69245;(statearr_69263_69373[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69245);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69262;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69374 = state_69245;
state_69245 = G__69374;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69245){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69245);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69264 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69264[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69264;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn","input.btn",2719727018),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Reset"], null)], null)], null)], null)], null),(function (){var temp__4126__auto__ = new cljs.core.Keyword(null,"password","password",2230889997).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state));if(cljs.core.truth_(temp__4126__auto__))
{var password = temp__4126__auto__;return cljs.core._conj(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",3722789425),"2em"], null)], null),password], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"This device has a password that you must use when connecting to the broker. Please make a note of this password now, you will not get another chance. If you lose it you will have to delete and recreate the device."], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Password"], null));
} else
{return null;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Test this device"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",1013907518),"Mosquitto"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),[cljs.core.str("mosquitto_pub"),cljs.core.str(" -h "),cljs.core.str(azondi.main.hostname),cljs.core.str(" -i "),cljs.core.str(new cljs.core.Keyword(null,"client-id","client-id",3404733903).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))),cljs.core.str(" -t "),cljs.core.str([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/test")].join('')),cljs.core.str(" -m "),cljs.core.str("'This is a test'"),cljs.core.str(" -u "),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str(" -P "),cljs.core.str((function (){var or__21049__auto__ = new cljs.core.Keyword(null,"password","password",2230889997).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state));if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return "<enter password>";
}
})())].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),[cljs.core.str("mosquitto_sub"),cljs.core.str(" -h "),cljs.core.str(azondi.main.hostname),cljs.core.str(" -i "),cljs.core.str(new cljs.core.Keyword(null,"client-id","client-id",3404733903).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))),cljs.core.str(" -t "),cljs.core.str([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/test")].join('')),cljs.core.str(" -u "),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str(" -P "),cljs.core.str((function (){var or__21049__auto__ = new cljs.core.Keyword(null,"password","password",2230889997).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state));if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return "<enter password>";
}
})())].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",1013907518),"Events"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"We will show all connection attempts from this device to help you succeed in establishing a connection from your device to the broker."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),(function (){var iter__21766__auto__ = (function iter__69265(s__69266){return (new cljs.core.LazySeq(null,(function (){var s__69266__$1 = s__69266;while(true){
var temp__4126__auto__ = cljs.core.seq(s__69266__$1);if(temp__4126__auto__)
{var s__69266__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__69266__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__69266__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__69268 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__69267 = 0;while(true){
if((i__69267 < size__21765__auto__))
{var msg = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__69267);cljs.core.chunk_append(b__69268,[cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str("\r\n")].join(''));
{
var G__69375 = (i__69267 + 1);
i__69267 = G__69375;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__69268),iter__69265(cljs.core.chunk_rest(s__69266__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__69268),null);
}
} else
{var msg = cljs.core.first(s__69266__$2);return cljs.core.cons([cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str("\r\n")].join(''),iter__69265(cljs.core.rest(s__69266__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(new cljs.core.Keyword(null,"messages","messages",551810238).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn","button.btn",1371314450),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),(function (ev){return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"messages","messages",551810238)], null),cljs.core.PersistentVector.EMPTY);
})], null),"Clear"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",1013907518),"Charting"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"An example chart, plotting the messages"], null),om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.chart.chart_component,new cljs.core.Keyword(null,"messages","messages",551810238).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"delete","delete",3973413149)], 0));var temp__4124__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));if(cljs.core.truth_(temp__4124__auto__))
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69301){var state_val_69302 = (state_69301[1]);if((state_val_69302 === 9))
{var inst_69299 = (state_69301[2]);var state_69301__$1 = state_69301;return cljs.core.async.impl.ioc_helpers.return_chan(state_69301__$1,inst_69299);
} else
{if((state_val_69302 === 8))
{var state_69301__$1 = state_69301;var statearr_69303_69376 = state_69301__$1;(statearr_69303_69376[2] = null);
(statearr_69303_69376[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 7))
{var inst_69286 = (state_69301[7]);var inst_69285 = (state_69301[8]);var inst_69287 = (state_69301[9]);var inst_69290 = [new cljs.core.Keyword(null,"device","device",3973714376)];var inst_69291 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69290,null));var inst_69292 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_69291,null);var inst_69293 = [new cljs.core.Keyword(null,"devices","devices",2573705295)];var inst_69294 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69293,null));var inst_69295 = (function (){var status = inst_69287;var body = inst_69286;var map__69277 = inst_69285;return ((function (status,body,map__69277,inst_69286,inst_69285,inst_69287,inst_69290,inst_69291,inst_69292,inst_69293,inst_69294,state_val_69302){
return (function (devices){return cljs.core.remove(((function (status,body,map__69277,inst_69286,inst_69285,inst_69287,inst_69290,inst_69291,inst_69292,inst_69293,inst_69294,state_val_69302){
return (function (p1__68946_SHARP_){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-id","client-id",3404733903).cljs$core$IFn$_invoke$arity$1(p1__68946_SHARP_),id__$1);
});})(status,body,map__69277,inst_69286,inst_69285,inst_69287,inst_69290,inst_69291,inst_69292,inst_69293,inst_69294,state_val_69302))
,devices);
});
;})(status,body,map__69277,inst_69286,inst_69285,inst_69287,inst_69290,inst_69291,inst_69292,inst_69293,inst_69294,state_val_69302))
})();var inst_69296 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_69294,inst_69295);var state_69301__$1 = (function (){var statearr_69304 = state_69301;(statearr_69304[10] = inst_69292);
return statearr_69304;
})();var statearr_69305_69377 = state_69301__$1;(statearr_69305_69377[2] = inst_69296);
(statearr_69305_69377[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 6))
{var inst_69285 = (state_69301[8]);var inst_69287 = (state_69301[9]);var inst_69285__$1 = (state_69301[2]);var inst_69286 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69285__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_69287__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69285__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_69288 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_69287__$1,204);var state_69301__$1 = (function (){var statearr_69306 = state_69301;(statearr_69306[7] = inst_69286);
(statearr_69306[8] = inst_69285__$1);
(statearr_69306[9] = inst_69287__$1);
return statearr_69306;
})();if(inst_69288)
{var statearr_69307_69378 = state_69301__$1;(statearr_69307_69378[1] = 7);
} else
{var statearr_69308_69379 = state_69301__$1;(statearr_69308_69379[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 5))
{var inst_69279 = (state_69301[11]);var state_69301__$1 = state_69301;var statearr_69309_69380 = state_69301__$1;(statearr_69309_69380[2] = inst_69279);
(statearr_69309_69380[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 4))
{var inst_69279 = (state_69301[11]);var inst_69282 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_69279);var state_69301__$1 = state_69301;var statearr_69310_69381 = state_69301__$1;(statearr_69310_69381[2] = inst_69282);
(statearr_69310_69381[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 3))
{var inst_69279 = (state_69301[11]);var inst_69279__$1 = (state_69301[2]);var inst_69280 = cljs.core.seq_QMARK_(inst_69279__$1);var state_69301__$1 = (function (){var statearr_69311 = state_69301;(statearr_69311[11] = inst_69279__$1);
return statearr_69311;
})();if(inst_69280)
{var statearr_69312_69382 = state_69301__$1;(statearr_69312_69382[1] = 4);
} else
{var statearr_69313_69383 = state_69301__$1;(statearr_69313_69383[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69302 === 2))
{var inst_69276 = (state_69301[2]);var state_69301__$1 = (function (){var statearr_69314 = state_69301;(statearr_69314[12] = inst_69276);
return statearr_69314;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69301__$1,3,ajax_recv);
} else
{if((state_val_69302 === 1))
{var inst_69269 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_69270 = cljs.core.deref(self__.app_state);var inst_69271 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_69270);var inst_69272 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_69271),cljs.core.str("/devices/"),cljs.core.str(id__$1)].join('');var inst_69273 = [inst_69272];var inst_69274 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69269,inst_69273) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69269,inst_69273));var state_69301__$1 = state_69301;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69301__$1,2,ajax_send,inst_69274);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69318 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_69318[0] = state_machine__24506__auto__);
(statearr_69318[1] = 1);
return statearr_69318;
});
var state_machine__24506__auto____1 = (function (state_69301){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69301);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69319){if((e69319 instanceof Object))
{var ex__24509__auto__ = e69319;var statearr_69320_69384 = state_69301;(statearr_69320_69384[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69301);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69319;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69385 = state_69301;
state_69301 = G__69385;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69301){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69301);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69321 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69321[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69321;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Delete device"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"This will delete the device permanently."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn.btn-danger","input.btn.btn-danger",3258750876),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Delete device"], null)], null)], null)], null);
})());
});
azondi.main.t69151.prototype.om$core$IWillUpdate$ = true;
azondi.main.t69151.prototype.om$core$IWillUpdate$will_update$arity$3 = (function (this$,next_props,next_state){var self__ = this;
var this$__$1 = this;var old_client_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));var new_client_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(next_props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_client_id,new_client_id))
{return azondi.main.connect_device_debugger(self__.owner,new_client_id,om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719)));
} else
{return null;
}
});
azondi.main.t69151.prototype.om$core$IWillMount$ = true;
azondi.main.t69151.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var notify_ch = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719));var c__24520__auto___69386 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69337){var state_val_69338 = (state_69337[1]);if((state_val_69338 === 7))
{var inst_69333 = (state_69337[2]);var state_69337__$1 = state_69337;var statearr_69339_69387 = state_69337__$1;(statearr_69339_69387[2] = inst_69333);
(statearr_69339_69387[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69338 === 6))
{var state_69337__$1 = state_69337;var statearr_69340_69388 = state_69337__$1;(statearr_69340_69388[2] = null);
(statearr_69340_69388[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69338 === 5))
{var inst_69324 = (state_69337[7]);var inst_69326 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_69327 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69326,null));var inst_69328 = (function (){var message = inst_69324;var temp__4126__auto__ = inst_69324;return ((function (message,temp__4126__auto__,inst_69324,inst_69326,inst_69327,state_val_69338){
return (function (p1__68945_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__21049__auto__ = p1__68945_SHARP_;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message,(function (){var G__69341 = new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(message);if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"error","error",1110689146),G__69341))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),(function (){cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message], 0))], 0));
return "ERROR";
})()], null);
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"open","open",1017321916),G__69341))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),"Debugger connected"], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(message,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",1968829305),new cljs.core.Keyword(null,"message","message",1968829305)], null))], null);
} else
{return null;
}
}
}
})()], 0)));
});
;})(message,temp__4126__auto__,inst_69324,inst_69326,inst_69327,state_val_69338))
})();var inst_69329 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_69327,inst_69328);var state_69337__$1 = (function (){var statearr_69342 = state_69337;(statearr_69342[8] = inst_69329);
return statearr_69342;
})();var statearr_69343_69389 = state_69337__$1;(statearr_69343_69389[2] = null);
(statearr_69343_69389[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69338 === 4))
{var inst_69324 = (state_69337[7]);var inst_69324__$1 = (state_69337[2]);var state_69337__$1 = (function (){var statearr_69344 = state_69337;(statearr_69344[7] = inst_69324__$1);
return statearr_69344;
})();if(cljs.core.truth_(inst_69324__$1))
{var statearr_69345_69390 = state_69337__$1;(statearr_69345_69390[1] = 5);
} else
{var statearr_69346_69391 = state_69337__$1;(statearr_69346_69391[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69338 === 3))
{var inst_69335 = (state_69337[2]);var state_69337__$1 = state_69337;return cljs.core.async.impl.ioc_helpers.return_chan(state_69337__$1,inst_69335);
} else
{if((state_val_69338 === 2))
{var state_69337__$1 = state_69337;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69337__$1,4,notify_ch);
} else
{if((state_val_69338 === 1))
{var state_69337__$1 = state_69337;var statearr_69347_69392 = state_69337__$1;(statearr_69347_69392[2] = null);
(statearr_69347_69392[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69351 = [null,null,null,null,null,null,null,null,null];(statearr_69351[0] = state_machine__24506__auto__);
(statearr_69351[1] = 1);
return statearr_69351;
});
var state_machine__24506__auto____1 = (function (state_69337){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69337);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69352){if((e69352 instanceof Object))
{var ex__24509__auto__ = e69352;var statearr_69353_69393 = state_69337;(statearr_69353_69393[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69337);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69352;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69394 = state_69337;
state_69337 = G__69394;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69337){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69337);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69354 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69354[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___69386);
return statearr_69354;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return azondi.main.connect_device_debugger(self__.owner,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null)),notify_ch);
});
azondi.main.t69151.prototype.om$core$IInitState$ = true;
azondi.main.t69151.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719),cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0()], null);
});
azondi.main.t69151.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_69153){var self__ = this;
var _69153__$1 = this;return self__.meta69152;
});
azondi.main.t69151.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_69153,meta69152__$1){var self__ = this;
var _69153__$1 = this;return (new azondi.main.t69151(self__.owner,self__.app_state,self__.device_details_component,meta69152__$1));
});
azondi.main.__GT_t69151 = (function __GT_t69151(owner__$1,app_state__$1,device_details_component__$1,meta69152){return (new azondi.main.t69151(owner__$1,app_state__$1,device_details_component__$1,meta69152));
});
}
return (new azondi.main.t69151(owner,app_state,device_details_component,null));
});
azondi.main.devices_page_component = (function devices_page_component(app_state,owner){if(typeof azondi.main.t69399 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t69399 = (function (owner,app_state,devices_page_component,meta69400){
this.owner = owner;
this.app_state = app_state;
this.devices_page_component = devices_page_component;
this.meta69400 = meta69400;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t69399.cljs$lang$type = true;
azondi.main.t69399.cljs$lang$ctorStr = "azondi.main/t69399";
azondi.main.t69399.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t69399");
});
azondi.main.t69399.prototype.om$core$IRender$ = true;
azondi.main.t69399.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var attrs69402 = om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.devices_list_component,self__.app_state);if(cljs.core.map_QMARK_(attrs69402))
{return React.DOM.div(sablono.interpreter.attributes(attrs69402),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_device_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.device_details_component,self__.app_state):null)));
} else
{return React.DOM.div(null,sablono.interpreter.interpret(attrs69402),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_device_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.device_details_component,self__.app_state):null)));
}
});
azondi.main.t69399.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_69401){var self__ = this;
var _69401__$1 = this;return self__.meta69400;
});
azondi.main.t69399.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_69401,meta69400__$1){var self__ = this;
var _69401__$1 = this;return (new azondi.main.t69399(self__.owner,self__.app_state,self__.devices_page_component,meta69400__$1));
});
azondi.main.__GT_t69399 = (function __GT_t69399(owner__$1,app_state__$1,devices_page_component__$1,meta69400){return (new azondi.main.t69399(owner__$1,app_state__$1,devices_page_component__$1,meta69400));
});
}
return (new azondi.main.t69399(owner,app_state,devices_page_component,null));
});
azondi.main.devices_page = (function devices_page(user){cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(azondi.main.app_model,cljs.core.assoc,new cljs.core.Keyword(null,"user","user",1017503549),user);
return om.core.root(azondi.main.devices_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.devices_page', azondi.main.devices_page);
/**
* Show a list of topics
*/
azondi.main.topics_list_component = (function topics_list_component(app_state,owner){if(typeof azondi.main.t69632 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t69632 = (function (owner,app_state,topics_list_component,meta69633){
this.owner = owner;
this.app_state = app_state;
this.topics_list_component = topics_list_component;
this.meta69633 = meta69633;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t69632.cljs$lang$type = true;
azondi.main.t69632.cljs$lang$ctorStr = "azondi.main/t69632";
azondi.main.t69632.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t69632");
});
azondi.main.t69632.prototype.om$core$IRender$ = true;
azondi.main.t69632.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.table({"className": "table table-hover table-condensed tbl"},React.DOM.thead(null,React.DOM.tr(null,React.DOM.th(null,"Topic"),React.DOM.th(null,"Description"),React.DOM.th(null,"Unit of Measure"))),React.DOM.tbody(null,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1((function (){var iter__21766__auto__ = (function iter__69639(s__69640){return (new cljs.core.LazySeq(null,(function (){var s__69640__$1 = s__69640;while(true){
var temp__4126__auto__ = cljs.core.seq(s__69640__$1);if(temp__4126__auto__)
{var s__69640__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__69640__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__69640__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__69642 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__69641 = 0;while(true){
if((i__69641 < size__21765__auto__))
{var map__69743 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__69641);var map__69743__$1 = ((cljs.core.seq_QMARK_(map__69743))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69743):map__69743);var unit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69743__$1,new cljs.core.Keyword(null,"unit","unit",1017498870));var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69743__$1,new cljs.core.Keyword(null,"description","description",3584325486));var topic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69743__$1,new cljs.core.Keyword(null,"topic","topic",1124450465));cljs.core.chunk_append(b__69642,React.DOM.tr(null,React.DOM.td(null,React.DOM.a({"onClick": ((function (i__69641,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Getting topic detail for",topic], 0));
var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri,new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (i__69641,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (i__69641,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__){
return (function (state_69772){var state_val_69773 = (state_69772[1]);if((state_val_69773 === 9))
{var inst_69770 = (state_69772[2]);var state_69772__$1 = state_69772;return cljs.core.async.impl.ioc_helpers.return_chan(state_69772__$1,inst_69770);
} else
{if((state_val_69773 === 8))
{var state_69772__$1 = state_69772;var statearr_69774_69861 = state_69772__$1;(statearr_69774_69861[2] = null);
(statearr_69774_69861[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 7))
{var inst_69755 = (state_69772[7]);var inst_69759 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["body returned is",inst_69755], 0));var inst_69760 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_69761 = ["","","",""];var inst_69762 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69760,inst_69761) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69760,inst_69761));var inst_69763 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_69764 = (new cljs.core.PersistentVector(null,4,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69763,null));var inst_69765 = cljs.core.select_keys(inst_69755,inst_69764);var inst_69766 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_69762,inst_69765], 0));var inst_69767 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topic","topic",1124450465),inst_69766);var state_69772__$1 = (function (){var statearr_69775 = state_69772;(statearr_69775[8] = inst_69759);
return statearr_69775;
})();var statearr_69776_69862 = state_69772__$1;(statearr_69776_69862[2] = inst_69767);
(statearr_69776_69862[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 6))
{var inst_69754 = (state_69772[2]);var inst_69755 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69754,new cljs.core.Keyword(null,"body","body",1016933652));var inst_69756 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69754,new cljs.core.Keyword(null,"status","status",4416389988));var inst_69757 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_69756,200);var state_69772__$1 = (function (){var statearr_69777 = state_69772;(statearr_69777[7] = inst_69755);
return statearr_69777;
})();if(inst_69757)
{var statearr_69778_69863 = state_69772__$1;(statearr_69778_69863[1] = 7);
} else
{var statearr_69779_69864 = state_69772__$1;(statearr_69779_69864[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 5))
{var inst_69748 = (state_69772[9]);var state_69772__$1 = state_69772;var statearr_69780_69865 = state_69772__$1;(statearr_69780_69865[2] = inst_69748);
(statearr_69780_69865[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 4))
{var inst_69748 = (state_69772[9]);var inst_69751 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_69748);var state_69772__$1 = state_69772;var statearr_69781_69866 = state_69772__$1;(statearr_69781_69866[2] = inst_69751);
(statearr_69781_69866[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 3))
{var inst_69748 = (state_69772[9]);var inst_69748__$1 = (state_69772[2]);var inst_69749 = cljs.core.seq_QMARK_(inst_69748__$1);var state_69772__$1 = (function (){var statearr_69782 = state_69772;(statearr_69782[9] = inst_69748__$1);
return statearr_69782;
})();if(inst_69749)
{var statearr_69783_69867 = state_69772__$1;(statearr_69783_69867[1] = 4);
} else
{var statearr_69784_69868 = state_69772__$1;(statearr_69784_69868[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69773 === 2))
{var inst_69745 = (state_69772[2]);var state_69772__$1 = (function (){var statearr_69785 = state_69772;(statearr_69785[10] = inst_69745);
return statearr_69785;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69772__$1,3,ajax_recv);
} else
{if((state_val_69773 === 1))
{var state_69772__$1 = state_69772;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69772__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(i__69641,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__))
;return ((function (i__69641,switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69789 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_69789[0] = state_machine__24506__auto__);
(statearr_69789[1] = 1);
return statearr_69789;
});
var state_machine__24506__auto____1 = (function (state_69772){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69772);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69790){if((e69790 instanceof Object))
{var ex__24509__auto__ = e69790;var statearr_69791_69869 = state_69772;(statearr_69791_69869[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69772);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69790;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69870 = state_69772;
state_69772 = G__69870;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69772){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69772);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(i__69641,switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_69792 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69792[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69792;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(i__69641,c__24520__auto__,uri,ajax_send,ajax_recv,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(i__69641,map__69743,map__69743__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__69642,s__69640__$2,temp__4126__auto__))
},sablono.interpreter.interpret(topic))),(function (){var attrs69637 = description;if(cljs.core.map_QMARK_(attrs69637))
{return React.DOM.td(sablono.interpreter.attributes(attrs69637),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs69637));
}
})(),(function (){var attrs69638 = unit;if(cljs.core.map_QMARK_(attrs69638))
{return React.DOM.td(sablono.interpreter.attributes(attrs69638),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs69638));
}
})()));
{
var G__69871 = (i__69641 + 1);
i__69641 = G__69871;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__69642),iter__69639(cljs.core.chunk_rest(s__69640__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__69642),null);
}
} else
{var map__69793 = cljs.core.first(s__69640__$2);var map__69793__$1 = ((cljs.core.seq_QMARK_(map__69793))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69793):map__69793);var unit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69793__$1,new cljs.core.Keyword(null,"unit","unit",1017498870));var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69793__$1,new cljs.core.Keyword(null,"description","description",3584325486));var topic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69793__$1,new cljs.core.Keyword(null,"topic","topic",1124450465));return cljs.core.cons(React.DOM.tr(null,React.DOM.td(null,React.DOM.a({"onClick": ((function (map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Getting topic detail for",topic], 0));
var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri,new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__){
return (function (state_69822){var state_val_69823 = (state_69822[1]);if((state_val_69823 === 9))
{var inst_69820 = (state_69822[2]);var state_69822__$1 = state_69822;return cljs.core.async.impl.ioc_helpers.return_chan(state_69822__$1,inst_69820);
} else
{if((state_val_69823 === 8))
{var state_69822__$1 = state_69822;var statearr_69824_69872 = state_69822__$1;(statearr_69824_69872[2] = null);
(statearr_69824_69872[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 7))
{var inst_69805 = (state_69822[7]);var inst_69809 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["body returned is",inst_69805], 0));var inst_69810 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_69811 = ["","","",""];var inst_69812 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_69810,inst_69811) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_69810,inst_69811));var inst_69813 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_69814 = (new cljs.core.PersistentVector(null,4,5,cljs.core.PersistentVector.EMPTY_NODE,inst_69813,null));var inst_69815 = cljs.core.select_keys(inst_69805,inst_69814);var inst_69816 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_69812,inst_69815], 0));var inst_69817 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topic","topic",1124450465),inst_69816);var state_69822__$1 = (function (){var statearr_69825 = state_69822;(statearr_69825[8] = inst_69809);
return statearr_69825;
})();var statearr_69826_69873 = state_69822__$1;(statearr_69826_69873[2] = inst_69817);
(statearr_69826_69873[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 6))
{var inst_69804 = (state_69822[2]);var inst_69805 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69804,new cljs.core.Keyword(null,"body","body",1016933652));var inst_69806 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_69804,new cljs.core.Keyword(null,"status","status",4416389988));var inst_69807 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_69806,200);var state_69822__$1 = (function (){var statearr_69827 = state_69822;(statearr_69827[7] = inst_69805);
return statearr_69827;
})();if(inst_69807)
{var statearr_69828_69874 = state_69822__$1;(statearr_69828_69874[1] = 7);
} else
{var statearr_69829_69875 = state_69822__$1;(statearr_69829_69875[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 5))
{var inst_69798 = (state_69822[9]);var state_69822__$1 = state_69822;var statearr_69830_69876 = state_69822__$1;(statearr_69830_69876[2] = inst_69798);
(statearr_69830_69876[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 4))
{var inst_69798 = (state_69822[9]);var inst_69801 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_69798);var state_69822__$1 = state_69822;var statearr_69831_69877 = state_69822__$1;(statearr_69831_69877[2] = inst_69801);
(statearr_69831_69877[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 3))
{var inst_69798 = (state_69822[9]);var inst_69798__$1 = (state_69822[2]);var inst_69799 = cljs.core.seq_QMARK_(inst_69798__$1);var state_69822__$1 = (function (){var statearr_69832 = state_69822;(statearr_69832[9] = inst_69798__$1);
return statearr_69832;
})();if(inst_69799)
{var statearr_69833_69878 = state_69822__$1;(statearr_69833_69878[1] = 4);
} else
{var statearr_69834_69879 = state_69822__$1;(statearr_69834_69879[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_69823 === 2))
{var inst_69795 = (state_69822[2]);var state_69822__$1 = (function (){var statearr_69835 = state_69822;(statearr_69835[10] = inst_69795);
return statearr_69835;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69822__$1,3,ajax_recv);
} else
{if((state_val_69823 === 1))
{var state_69822__$1 = state_69822;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69822__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__))
;return ((function (switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69839 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_69839[0] = state_machine__24506__auto__);
(statearr_69839[1] = 1);
return statearr_69839;
});
var state_machine__24506__auto____1 = (function (state_69822){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69822);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69840){if((e69840 instanceof Object))
{var ex__24509__auto__ = e69840;var statearr_69841_69880 = state_69822;(statearr_69841_69880[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69822);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69840;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69881 = state_69822;
state_69822 = G__69881;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69822){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_69842 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69842[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69842;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto__,uri,ajax_send,ajax_recv,map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(map__69793,map__69793__$1,unit,description,topic,s__69640__$2,temp__4126__auto__))
},sablono.interpreter.interpret(topic))),(function (){var attrs69637 = description;if(cljs.core.map_QMARK_(attrs69637))
{return React.DOM.td(sablono.interpreter.attributes(attrs69637),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs69637));
}
})(),(function (){var attrs69638 = unit;if(cljs.core.map_QMARK_(attrs69638))
{return React.DOM.td(sablono.interpreter.attributes(attrs69638),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs69638));
}
})()),iter__69639(cljs.core.rest(s__69640__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(new cljs.core.Keyword(null,"topics","topics",4440837270).cljs$core$IFn$_invoke$arity$1(self__.app_state));
})())));
});
azondi.main.t69632.prototype.om$core$IWillMount$ = true;
azondi.main.t69632.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/topics/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69851){var state_val_69852 = (state_69851[1]);if((state_val_69852 === 3))
{var inst_69846 = (state_69851[2]);var inst_69847 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_69846);var inst_69848 = new cljs.core.Keyword(null,"topics","topics",4440837270).cljs$core$IFn$_invoke$arity$1(inst_69847);var inst_69849 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topics","topics",4440837270),inst_69848);var state_69851__$1 = state_69851;return cljs.core.async.impl.ioc_helpers.return_chan(state_69851__$1,inst_69849);
} else
{if((state_val_69852 === 2))
{var inst_69844 = (state_69851[2]);var state_69851__$1 = (function (){var statearr_69853 = state_69851;(statearr_69853[7] = inst_69844);
return statearr_69853;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69851__$1,3,ajax_recv);
} else
{if((state_val_69852 === 1))
{var state_69851__$1 = state_69851;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69851__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69857 = [null,null,null,null,null,null,null,null];(statearr_69857[0] = state_machine__24506__auto__);
(statearr_69857[1] = 1);
return statearr_69857;
});
var state_machine__24506__auto____1 = (function (state_69851){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69851);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69858){if((e69858 instanceof Object))
{var ex__24509__auto__ = e69858;var statearr_69859_69882 = state_69851;(statearr_69859_69882[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69851);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69858;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69883 = state_69851;
state_69851 = G__69883;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69851){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69851);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69860 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69860[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69860;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
azondi.main.t69632.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_69634){var self__ = this;
var _69634__$1 = this;return self__.meta69633;
});
azondi.main.t69632.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_69634,meta69633__$1){var self__ = this;
var _69634__$1 = this;return (new azondi.main.t69632(self__.owner,self__.app_state,self__.topics_list_component,meta69633__$1));
});
azondi.main.__GT_t69632 = (function __GT_t69632(owner__$1,app_state__$1,topics_list_component__$1,meta69633){return (new azondi.main.t69632(owner__$1,app_state__$1,topics_list_component__$1,meta69633));
});
}
return (new azondi.main.t69632(owner,app_state,topics_list_component,null));
});
azondi.main.update_topics_list_BANG_ = (function update_topics_list_BANG_(user,app_state){var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(user),cljs.core.str("/topics/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_69910){var state_val_69911 = (state_69910[1]);if((state_val_69911 === 3))
{var inst_69905 = (state_69910[2]);var inst_69906 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_69905);var inst_69907 = new cljs.core.Keyword(null,"topics","topics",4440837270).cljs$core$IFn$_invoke$arity$1(inst_69906);var inst_69908 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(app_state,new cljs.core.Keyword(null,"topics","topics",4440837270),inst_69907);var state_69910__$1 = state_69910;return cljs.core.async.impl.ioc_helpers.return_chan(state_69910__$1,inst_69908);
} else
{if((state_val_69911 === 2))
{var inst_69903 = (state_69910[2]);var state_69910__$1 = (function (){var statearr_69912 = state_69910;(statearr_69912[7] = inst_69903);
return statearr_69912;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69910__$1,3,ajax_recv);
} else
{if((state_val_69911 === 1))
{var state_69910__$1 = state_69910;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_69910__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_69916 = [null,null,null,null,null,null,null,null];(statearr_69916[0] = state_machine__24506__auto__);
(statearr_69916[1] = 1);
return statearr_69916;
});
var state_machine__24506__auto____1 = (function (state_69910){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_69910);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e69917){if((e69917 instanceof Object))
{var ex__24509__auto__ = e69917;var statearr_69918_69920 = state_69910;(statearr_69918_69920[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_69910);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e69917;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__69921 = state_69910;
state_69910 = G__69921;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_69910){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_69910);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_69919 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_69919[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_69919;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Click this button to register  new topic
*/
azondi.main.new_topic_button_component = (function new_topic_button_component(app_state,owner){if(typeof azondi.main.t70000 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t70000 = (function (owner,app_state,new_topic_button_component,meta70001){
this.owner = owner;
this.app_state = app_state;
this.new_topic_button_component = new_topic_button_component;
this.meta70001 = meta70001;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t70000.cljs$lang$type = true;
azondi.main.t70000.cljs$lang$ctorStr = "azondi.main/t70000";
azondi.main.t70000.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t70000");
});
azondi.main.t70000.prototype.om$core$IRender$ = true;
azondi.main.t70000.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.form({"className": "form-horizontal", "onSubmit": (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617)], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70052){var state_val_70053 = (state_70052[1]);if((state_val_70053 === 7))
{var state_70052__$1 = state_70052;var statearr_70054_70078 = state_70052__$1;(statearr_70054_70078[2] = "");
(statearr_70054_70078[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 1))
{var inst_70015 = (state_70052[7]);var inst_70005 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_70006 = cljs.core.deref(self__.app_state);var inst_70007 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_70006);var inst_70008 = cljs.core.deref(self__.app_state);var inst_70009 = new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(inst_70008);var inst_70010 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_70007),cljs.core.str("/topics/"),cljs.core.str(inst_70009)].join('');var inst_70011 = [new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_70012 = cljs.core.deref(self__.app_state);var inst_70013 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_70014 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70013,null));var inst_70015__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_70012,inst_70014);var state_70052__$1 = (function (){var statearr_70055 = state_70052;(statearr_70055[8] = inst_70010);
(statearr_70055[9] = inst_70005);
(statearr_70055[7] = inst_70015__$1);
(statearr_70055[10] = inst_70011);
return statearr_70055;
})();if(cljs.core.truth_(inst_70015__$1))
{var statearr_70056_70079 = state_70052__$1;(statearr_70056_70079[1] = 3);
} else
{var statearr_70057_70080 = state_70052__$1;(statearr_70057_70080[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 4))
{var state_70052__$1 = state_70052;var statearr_70058_70081 = state_70052__$1;(statearr_70058_70081[2] = "");
(statearr_70058_70081[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 6))
{var inst_70023 = (state_70052[11]);var state_70052__$1 = state_70052;var statearr_70059_70082 = state_70052__$1;(statearr_70059_70082[2] = inst_70023);
(statearr_70059_70082[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 3))
{var inst_70015 = (state_70052[7]);var state_70052__$1 = state_70052;var statearr_70060_70083 = state_70052__$1;(statearr_70060_70083[2] = inst_70015);
(statearr_70060_70083[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 12))
{var inst_70042 = (state_70052[2]);var inst_70043 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70042,new cljs.core.Keyword(null,"body","body",1016933652));var inst_70044 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70042,new cljs.core.Keyword(null,"status","status",4416389988));var inst_70045 = [inst_70044,inst_70043];var inst_70046 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70045,null));var inst_70047 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to creating topic is",inst_70046], 0));var inst_70048 = cljs.core.deref(self__.app_state);var inst_70049 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_70048);var inst_70050 = azondi.main.update_topics_list_BANG_(inst_70049,self__.app_state);var state_70052__$1 = (function (){var statearr_70061 = state_70052;(statearr_70061[12] = inst_70047);
return statearr_70061;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_70052__$1,inst_70050);
} else
{if((state_val_70053 === 2))
{var inst_70033 = (state_70052[2]);var state_70052__$1 = (function (){var statearr_70062 = state_70052;(statearr_70062[13] = inst_70033);
return statearr_70062;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70052__$1,9,ajax_recv);
} else
{if((state_val_70053 === 11))
{var inst_70036 = (state_70052[14]);var state_70052__$1 = state_70052;var statearr_70063_70084 = state_70052__$1;(statearr_70063_70084[2] = inst_70036);
(statearr_70063_70084[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 9))
{var inst_70036 = (state_70052[14]);var inst_70036__$1 = (state_70052[2]);var inst_70037 = cljs.core.seq_QMARK_(inst_70036__$1);var state_70052__$1 = (function (){var statearr_70064 = state_70052;(statearr_70064[14] = inst_70036__$1);
return statearr_70064;
})();if(inst_70037)
{var statearr_70065_70085 = state_70052__$1;(statearr_70065_70085[1] = 10);
} else
{var statearr_70066_70086 = state_70052__$1;(statearr_70066_70086[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 5))
{var inst_70023 = (state_70052[11]);var inst_70019 = (state_70052[2]);var inst_70020 = cljs.core.deref(self__.app_state);var inst_70021 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_70022 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70021,null));var inst_70023__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_70020,inst_70022);var state_70052__$1 = (function (){var statearr_70067 = state_70052;(statearr_70067[11] = inst_70023__$1);
(statearr_70067[15] = inst_70019);
return statearr_70067;
})();if(cljs.core.truth_(inst_70023__$1))
{var statearr_70068_70087 = state_70052__$1;(statearr_70068_70087[1] = 6);
} else
{var statearr_70069_70088 = state_70052__$1;(statearr_70069_70088[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 10))
{var inst_70036 = (state_70052[14]);var inst_70039 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_70036);var state_70052__$1 = state_70052;var statearr_70070_70089 = state_70052__$1;(statearr_70070_70089[2] = inst_70039);
(statearr_70070_70089[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70053 === 8))
{var inst_70010 = (state_70052[8]);var inst_70005 = (state_70052[9]);var inst_70011 = (state_70052[10]);var inst_70019 = (state_70052[15]);var inst_70027 = (state_70052[2]);var inst_70028 = [inst_70019,inst_70027];var inst_70029 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70011,inst_70028) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70011,inst_70028));var inst_70030 = [inst_70010,inst_70029];var inst_70031 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70005,inst_70030) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70005,inst_70030));var state_70052__$1 = state_70052;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_70052__$1,2,ajax_send,inst_70031);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70074 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_70074[0] = state_machine__24506__auto__);
(statearr_70074[1] = 1);
return statearr_70074;
});
var state_machine__24506__auto____1 = (function (state_70052){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70052);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70075){if((e70075 instanceof Object))
{var ex__24509__auto__ = e70075;var statearr_70076_70090 = state_70052;(statearr_70076_70090[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70052);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70075;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70091 = state_70052;
state_70052 = G__70091;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70052){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70052);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70077 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70077[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_70077;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},React.DOM.div({"className": "control-group"},React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"id": "name", "type": "text", "placeholder": "Name of new topic", "onChange": (function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264)], null),value);
})}) : sablono.interpreter.input.call(null,{"id": "name", "type": "text", "placeholder": "Name of new topic", "onChange": (function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264)], null),value);
})})),sablono.interpreter.interpret((cljs.core.truth_(cljs.core.not_empty(new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(self__.app_state)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"Topic will be created as ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1016963423),[cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/"),cljs.core.str(new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(self__.app_state))].join('')], null)], null):null))),React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"className": "btn btn-primary", "type": "submit", "value": "Create user topic"}) : sablono.interpreter.input.call(null,{"className": "btn btn-primary", "type": "submit", "value": "Create user topic"})))));
});
azondi.main.t70000.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_70002){var self__ = this;
var _70002__$1 = this;return self__.meta70001;
});
azondi.main.t70000.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_70002,meta70001__$1){var self__ = this;
var _70002__$1 = this;return (new azondi.main.t70000(self__.owner,self__.app_state,self__.new_topic_button_component,meta70001__$1));
});
azondi.main.__GT_t70000 = (function __GT_t70000(owner__$1,app_state__$1,new_topic_button_component__$1,meta70001){return (new azondi.main.t70000(owner__$1,app_state__$1,new_topic_button_component__$1,meta70001));
});
}
return (new azondi.main.t70000(owner,app_state,new_topic_button_component,null));
});
/**
* Connect the topic debugger to the notification (server-sent event)
* source of the given topic name. Events are put to notify-ch.
*/
azondi.main.connect_topic_debugger = (function connect_topic_debugger(owner,name,notify_ch){var temp__4126__auto___70092 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376));if(cljs.core.truth_(temp__4126__auto___70092))
{var es_70093 = temp__4126__auto___70092;es_70093.close();
} else
{}
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376),azondi.net.listen_sse([cljs.core.str("/topic-events/"),cljs.core.str(name)].join(''),notify_ch));
});
azondi.main.topic_details_component = (function topic_details_component(app_state,owner){if(typeof azondi.main.t70242 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t70242 = (function (owner,app_state,topic_details_component,meta70243){
this.owner = owner;
this.app_state = app_state;
this.topic_details_component = topic_details_component;
this.meta70243 = meta70243;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t70242.cljs$lang$type = true;
azondi.main.t70242.cljs$lang$ctorStr = "azondi.main/t70242";
azondi.main.t70242.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t70242");
});
azondi.main.t70242.prototype.om$core$IRender$ = true;
azondi.main.t70242.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return sablono.interpreter.interpret((function (){var topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617)], 0));var temp__4126__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.truth_(temp__4126__auto__))
{var topic__$1 = temp__4126__auto__;var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic__$1,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["PUT to topic detail uri:",uri], 0));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70276){var state_val_70277 = (state_70276[1]);if((state_val_70277 === 9))
{var inst_70270 = (state_70276[2]);var inst_70271 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to PUT is",inst_70270], 0));var inst_70272 = cljs.core.deref(self__.app_state);var inst_70273 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_70272);var inst_70274 = azondi.main.update_topics_list_BANG_(inst_70273,self__.app_state);var state_70276__$1 = (function (){var statearr_70278 = state_70276;(statearr_70278[7] = inst_70271);
return statearr_70278;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_70276__$1,inst_70274);
} else
{if((state_val_70277 === 8))
{var inst_70245 = (state_70276[8]);var inst_70246 = (state_70276[9]);var inst_70254 = (state_70276[10]);var inst_70262 = (state_70276[2]);var inst_70263 = [inst_70254,inst_70262];var inst_70264 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70246,inst_70263) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70246,inst_70263));var inst_70265 = [uri,inst_70264];var inst_70266 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70245,inst_70265) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70245,inst_70265));var state_70276__$1 = state_70276;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_70276__$1,2,ajax_send,inst_70266);
} else
{if((state_val_70277 === 7))
{var state_70276__$1 = state_70276;var statearr_70279_70388 = state_70276__$1;(statearr_70279_70388[2] = "");
(statearr_70279_70388[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70277 === 6))
{var inst_70258 = (state_70276[11]);var state_70276__$1 = state_70276;var statearr_70280_70389 = state_70276__$1;(statearr_70280_70389[2] = inst_70258);
(statearr_70280_70389[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70277 === 5))
{var inst_70258 = (state_70276[11]);var inst_70254 = (state_70276[2]);var inst_70255 = cljs.core.deref(self__.app_state);var inst_70256 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_70257 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70256,null));var inst_70258__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_70255,inst_70257);var state_70276__$1 = (function (){var statearr_70281 = state_70276;(statearr_70281[11] = inst_70258__$1);
(statearr_70281[10] = inst_70254);
return statearr_70281;
})();if(cljs.core.truth_(inst_70258__$1))
{var statearr_70282_70390 = state_70276__$1;(statearr_70282_70390[1] = 6);
} else
{var statearr_70283_70391 = state_70276__$1;(statearr_70283_70391[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70277 === 4))
{var state_70276__$1 = state_70276;var statearr_70284_70392 = state_70276__$1;(statearr_70284_70392[2] = "");
(statearr_70284_70392[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70277 === 3))
{var inst_70250 = (state_70276[12]);var state_70276__$1 = state_70276;var statearr_70285_70393 = state_70276__$1;(statearr_70285_70393[2] = inst_70250);
(statearr_70285_70393[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70277 === 2))
{var inst_70268 = (state_70276[2]);var state_70276__$1 = (function (){var statearr_70286 = state_70276;(statearr_70286[13] = inst_70268);
return statearr_70286;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70276__$1,9,ajax_recv);
} else
{if((state_val_70277 === 1))
{var inst_70250 = (state_70276[12]);var inst_70245 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_70246 = [new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_70247 = cljs.core.deref(self__.app_state);var inst_70248 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_70249 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70248,null));var inst_70250__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_70247,inst_70249);var state_70276__$1 = (function (){var statearr_70287 = state_70276;(statearr_70287[8] = inst_70245);
(statearr_70287[9] = inst_70246);
(statearr_70287[12] = inst_70250__$1);
return statearr_70287;
})();if(cljs.core.truth_(inst_70250__$1))
{var statearr_70288_70394 = state_70276__$1;(statearr_70288_70394[1] = 3);
} else
{var statearr_70289_70395 = state_70276__$1;(statearr_70289_70395[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70293 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_70293[0] = state_machine__24506__auto__);
(statearr_70293[1] = 1);
return statearr_70293;
});
var state_machine__24506__auto____1 = (function (state_70276){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70276);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70294){if((e70294 instanceof Object))
{var ex__24509__auto__ = e70294;var statearr_70295_70396 = state_70276;(statearr_70295_70396[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70276);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70294;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70397 = state_70276;
state_70276 = G__70397;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70276){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70276);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70296 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70296[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_70296;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Topic"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"topic",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null)),new cljs.core.Keyword(null,"editable","editable",2616320470),false,new cljs.core.Keyword(null,"disabled","disabled",1284845038),true], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Description"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"description",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional description"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Unit"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"unit",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional unit of measure e.g. PM25, celcius"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn","input.btn",2719727018),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Apply"], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send_70398 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv_70399 = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send_70398,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"delete","delete",3973413149)], 0));var temp__4124__auto___70400 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.truth_(temp__4124__auto___70400))
{var topic_70401__$1 = temp__4124__auto___70400;var c__24520__auto___70402 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70334){var state_val_70335 = (state_70334[1]);if((state_val_70335 === 9))
{var inst_70332 = (state_70334[2]);var state_70334__$1 = state_70334;return cljs.core.async.impl.ioc_helpers.return_chan(state_70334__$1,inst_70332);
} else
{if((state_val_70335 === 8))
{var state_70334__$1 = state_70334;var statearr_70336_70403 = state_70334__$1;(statearr_70336_70403[2] = null);
(statearr_70336_70403[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 7))
{var inst_70318 = (state_70334[7]);var inst_70319 = (state_70334[8]);var inst_70320 = (state_70334[9]);var inst_70323 = [new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_70324 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70323,null));var inst_70325 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_70324,null);var inst_70326 = [new cljs.core.Keyword(null,"topics","topics",4440837270)];var inst_70327 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70326,null));var inst_70328 = (function (){var status = inst_70320;var body = inst_70319;var map__70310 = inst_70318;return ((function (status,body,map__70310,inst_70318,inst_70319,inst_70320,inst_70323,inst_70324,inst_70325,inst_70326,inst_70327,state_val_70335){
return (function (topics){return cljs.core.remove(((function (status,body,map__70310,inst_70318,inst_70319,inst_70320,inst_70323,inst_70324,inst_70325,inst_70326,inst_70327,state_val_70335){
return (function (p1__70095_SHARP_){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__70095_SHARP_),cljs.core.name);
});})(status,body,map__70310,inst_70318,inst_70319,inst_70320,inst_70323,inst_70324,inst_70325,inst_70326,inst_70327,state_val_70335))
,topics);
});
;})(status,body,map__70310,inst_70318,inst_70319,inst_70320,inst_70323,inst_70324,inst_70325,inst_70326,inst_70327,state_val_70335))
})();var inst_70329 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_70327,inst_70328);var state_70334__$1 = (function (){var statearr_70337 = state_70334;(statearr_70337[10] = inst_70325);
return statearr_70337;
})();var statearr_70338_70404 = state_70334__$1;(statearr_70338_70404[2] = inst_70329);
(statearr_70338_70404[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 6))
{var inst_70318 = (state_70334[7]);var inst_70320 = (state_70334[9]);var inst_70318__$1 = (state_70334[2]);var inst_70319 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70318__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_70320__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70318__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_70321 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_70320__$1,204);var state_70334__$1 = (function (){var statearr_70339 = state_70334;(statearr_70339[7] = inst_70318__$1);
(statearr_70339[8] = inst_70319);
(statearr_70339[9] = inst_70320__$1);
return statearr_70339;
})();if(inst_70321)
{var statearr_70340_70405 = state_70334__$1;(statearr_70340_70405[1] = 7);
} else
{var statearr_70341_70406 = state_70334__$1;(statearr_70341_70406[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 5))
{var inst_70312 = (state_70334[11]);var state_70334__$1 = state_70334;var statearr_70342_70407 = state_70334__$1;(statearr_70342_70407[2] = inst_70312);
(statearr_70342_70407[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 4))
{var inst_70312 = (state_70334[11]);var inst_70315 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_70312);var state_70334__$1 = state_70334;var statearr_70343_70408 = state_70334__$1;(statearr_70343_70408[2] = inst_70315);
(statearr_70343_70408[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 3))
{var inst_70312 = (state_70334[11]);var inst_70312__$1 = (state_70334[2]);var inst_70313 = cljs.core.seq_QMARK_(inst_70312__$1);var state_70334__$1 = (function (){var statearr_70344 = state_70334;(statearr_70344[11] = inst_70312__$1);
return statearr_70344;
})();if(inst_70313)
{var statearr_70345_70409 = state_70334__$1;(statearr_70345_70409[1] = 4);
} else
{var statearr_70346_70410 = state_70334__$1;(statearr_70346_70410[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70335 === 2))
{var inst_70309 = (state_70334[2]);var state_70334__$1 = (function (){var statearr_70347 = state_70334;(statearr_70347[12] = inst_70309);
return statearr_70347;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70334__$1,3,ajax_recv_70399);
} else
{if((state_val_70335 === 1))
{var inst_70297 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_70298 = cljs.core.deref(self__.app_state);var inst_70299 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_70298);var inst_70300 = cljs.core.deref(self__.app_state);var inst_70301 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_70300);var inst_70302 = [cljs.core.str("/users/"),cljs.core.str(inst_70301),cljs.core.str("/")].join('');var inst_70303 = cljs.core.count(inst_70302);var inst_70304 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic_70401__$1,inst_70303);var inst_70305 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_70299),cljs.core.str("/topics/"),cljs.core.str(inst_70304)].join('');var inst_70306 = [inst_70305];var inst_70307 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70297,inst_70306) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70297,inst_70306));var state_70334__$1 = state_70334;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_70334__$1,2,ajax_send_70398,inst_70307);
} else
{return null;
}
}
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70351 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_70351[0] = state_machine__24506__auto__);
(statearr_70351[1] = 1);
return statearr_70351;
});
var state_machine__24506__auto____1 = (function (state_70334){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70334);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70352){if((e70352 instanceof Object))
{var ex__24509__auto__ = e70352;var statearr_70353_70411 = state_70334;(statearr_70353_70411[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70334);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70352;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70412 = state_70334;
state_70334 = G__70412;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70334){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70334);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70354 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70354[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___70402);
return statearr_70354;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
} else
{}
return azondi.main.update_topics_list_BANG_(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state)),self__.app_state);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Delete topic"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"This will delete the topic permanently."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn.btn-danger","input.btn.btn-danger",3258750876),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Delete topic"], null)], null)], null)], null);
})());
});
azondi.main.t70242.prototype.om$core$IWillUpdate$ = true;
azondi.main.t70242.prototype.om$core$IWillUpdate$will_update$arity$3 = (function (this$,next_props,next_state){var self__ = this;
var this$__$1 = this;var old_topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));var new_topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(next_props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_topic,new_topic))
{return null;
} else
{return null;
}
});
azondi.main.t70242.prototype.om$core$IWillMount$ = true;
azondi.main.t70242.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var notify_ch = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719));var c__24520__auto___70413 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70370){var state_val_70371 = (state_70370[1]);if((state_val_70371 === 7))
{var inst_70366 = (state_70370[2]);var state_70370__$1 = state_70370;var statearr_70372_70414 = state_70370__$1;(statearr_70372_70414[2] = inst_70366);
(statearr_70372_70414[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70371 === 6))
{var state_70370__$1 = state_70370;var statearr_70373_70415 = state_70370__$1;(statearr_70373_70415[2] = null);
(statearr_70373_70415[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70371 === 5))
{var inst_70357 = (state_70370[7]);var inst_70359 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_70360 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70359,null));var inst_70361 = (function (){var message = inst_70357;var temp__4126__auto__ = inst_70357;return ((function (message,temp__4126__auto__,inst_70357,inst_70359,inst_70360,state_val_70371){
return (function (p1__70094_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__21049__auto__ = p1__70094_SHARP_;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),[cljs.core.str(new cljs.core.Keyword(null,"time","time",1017464383).cljs$core$IFn$_invoke$arity$1(message)),cljs.core.str(" "),cljs.core.str((function (){var G__70374 = new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(message);if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"error","error",1110689146),G__70374))
{cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message], 0))], 0));
return "ERROR";
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"open","open",1017321916),G__70374))
{return "Debugger connected";
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(message,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",1968829305),new cljs.core.Keyword(null,"message","message",1968829305)], null));
} else
{return null;
}
}
}
})())].join(''));
});
;})(message,temp__4126__auto__,inst_70357,inst_70359,inst_70360,state_val_70371))
})();var inst_70362 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_70360,inst_70361);var state_70370__$1 = (function (){var statearr_70375 = state_70370;(statearr_70375[8] = inst_70362);
return statearr_70375;
})();var statearr_70376_70416 = state_70370__$1;(statearr_70376_70416[2] = null);
(statearr_70376_70416[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70371 === 4))
{var inst_70357 = (state_70370[7]);var inst_70357__$1 = (state_70370[2]);var state_70370__$1 = (function (){var statearr_70377 = state_70370;(statearr_70377[7] = inst_70357__$1);
return statearr_70377;
})();if(cljs.core.truth_(inst_70357__$1))
{var statearr_70378_70417 = state_70370__$1;(statearr_70378_70417[1] = 5);
} else
{var statearr_70379_70418 = state_70370__$1;(statearr_70379_70418[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70371 === 3))
{var inst_70368 = (state_70370[2]);var state_70370__$1 = state_70370;return cljs.core.async.impl.ioc_helpers.return_chan(state_70370__$1,inst_70368);
} else
{if((state_val_70371 === 2))
{var state_70370__$1 = state_70370;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70370__$1,4,notify_ch);
} else
{if((state_val_70371 === 1))
{var state_70370__$1 = state_70370;var statearr_70380_70419 = state_70370__$1;(statearr_70380_70419[2] = null);
(statearr_70380_70419[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70384 = [null,null,null,null,null,null,null,null,null];(statearr_70384[0] = state_machine__24506__auto__);
(statearr_70384[1] = 1);
return statearr_70384;
});
var state_machine__24506__auto____1 = (function (state_70370){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70370);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70385){if((e70385 instanceof Object))
{var ex__24509__auto__ = e70385;var statearr_70386_70420 = state_70370;(statearr_70386_70420[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70370);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70385;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70421 = state_70370;
state_70370 = G__70421;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70370){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70370);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70387 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70387[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___70413);
return statearr_70387;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return azondi.main.connect_topic_debugger(self__.owner,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"name","name",1017277949)], null)),notify_ch);
});
azondi.main.t70242.prototype.om$core$IInitState$ = true;
azondi.main.t70242.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719),cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0()], null);
});
azondi.main.t70242.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_70244){var self__ = this;
var _70244__$1 = this;return self__.meta70243;
});
azondi.main.t70242.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_70244,meta70243__$1){var self__ = this;
var _70244__$1 = this;return (new azondi.main.t70242(self__.owner,self__.app_state,self__.topic_details_component,meta70243__$1));
});
azondi.main.__GT_t70242 = (function __GT_t70242(owner__$1,app_state__$1,topic_details_component__$1,meta70243){return (new azondi.main.t70242(owner__$1,app_state__$1,topic_details_component__$1,meta70243));
});
}
return (new azondi.main.t70242(owner,app_state,topic_details_component,null));
});
azondi.main.topics_page_component = (function topics_page_component(app_state,owner){if(typeof azondi.main.t70426 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t70426 = (function (owner,app_state,topics_page_component,meta70427){
this.owner = owner;
this.app_state = app_state;
this.topics_page_component = topics_page_component;
this.meta70427 = meta70427;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t70426.cljs$lang$type = true;
azondi.main.t70426.cljs$lang$ctorStr = "azondi.main/t70426";
azondi.main.t70426.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t70426");
});
azondi.main.t70426.prototype.om$core$IRender$ = true;
azondi.main.t70426.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var attrs70429 = om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topics_list_component,self__.app_state);if(cljs.core.map_QMARK_(attrs70429))
{return React.DOM.div(sablono.interpreter.attributes(attrs70429),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_topic_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"topic","topic",1124450465).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topic_details_component,self__.app_state):null)));
} else
{return React.DOM.div(null,sablono.interpreter.interpret(attrs70429),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_topic_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"topic","topic",1124450465).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topic_details_component,self__.app_state):null)));
}
});
azondi.main.t70426.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_70428){var self__ = this;
var _70428__$1 = this;return self__.meta70427;
});
azondi.main.t70426.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_70428,meta70427__$1){var self__ = this;
var _70428__$1 = this;return (new azondi.main.t70426(self__.owner,self__.app_state,self__.topics_page_component,meta70427__$1));
});
azondi.main.__GT_t70426 = (function __GT_t70426(owner__$1,app_state__$1,topics_page_component__$1,meta70427){return (new azondi.main.t70426(owner__$1,app_state__$1,topics_page_component__$1,meta70427));
});
}
return (new azondi.main.t70426(owner,app_state,topics_page_component,null));
});
azondi.main.topics_page = (function topics_page(user){cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(azondi.main.app_model,cljs.core.assoc,new cljs.core.Keyword(null,"user","user",1017503549),user);
return om.core.root(azondi.main.topics_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.topics_page', azondi.main.topics_page);
azondi.main.test_card_page_component = (function test_card_page_component(app_state,owner){if(typeof azondi.main.t70516 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t70516 = (function (owner,app_state,test_card_page_component,meta70517){
this.owner = owner;
this.app_state = app_state;
this.test_card_page_component = test_card_page_component;
this.meta70517 = meta70517;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t70516.cljs$lang$type = true;
azondi.main.t70516.cljs$lang$ctorStr = "azondi.main/t70516";
azondi.main.t70516.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t70516");
});
azondi.main.t70516.prototype.om$core$IRender$ = true;
azondi.main.t70516.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.h1(null,"Test Card"),React.DOM.p(null,"Click on the buttons to test the API."),React.DOM.p(null,"This demonstrates (and tests) that the JSON messages of the API are rendered as canonical JSON with camelCase keys. Check this by analysing the request/response of each message with the Developer Tools of your browser."),React.DOM.p(null,"The use of the ",React.DOM.code(null,"ajaj<")," core.async function ensures that the ClojureScript code doesn't have to deal with JSON. Check this by looking at the format of the messages printed below. They should be in canonical EDN format with kebab-case keywords. JSON keys, in contrast, don't work well with many ClojureScript forms, such as map destructuring."),React.DOM.p(null,React.DOM.button({"className": "btn btn-primary", "onClick": (function (){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70537){var state_val_70538 = (state_70537[1]);if((state_val_70538 === 2))
{var inst_70535 = (state_70537[2]);var state_70537__$1 = state_70537;return cljs.core.async.impl.ioc_helpers.return_chan(state_70537__$1,inst_70535);
} else
{if((state_val_70538 === 1))
{var inst_70530 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"channel","channel",1752854645));var inst_70531 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_70532 = ["/api/1.0"];var inst_70533 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70531,inst_70532) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70531,inst_70532));var state_70537__$1 = state_70537;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_70537__$1,2,inst_70530,inst_70533);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70542 = [null,null,null,null,null,null,null];(statearr_70542[0] = state_machine__24506__auto__);
(statearr_70542[1] = 1);
return statearr_70542;
});
var state_machine__24506__auto____1 = (function (state_70537){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70537);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70543){if((e70543 instanceof Object))
{var ex__24509__auto__ = e70543;var statearr_70544_70601 = state_70537;(statearr_70544_70601[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70537);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70543;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70602 = state_70537;
state_70537 = G__70602;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70537){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70537);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70545 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70545[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_70545;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},"Welcome in JSON"),React.DOM.button({"className": "btn", "onClick": (function (){return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.Keyword(null,"messages","messages",551810238)], null),cljs.core.PersistentVector.EMPTY);
})},"Clear"),React.DOM.button({"className": "btn", "onClick": (function (ev){cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Connecting"], 0));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70554){var state_val_70555 = (state_70554[1]);if((state_val_70555 === 2))
{var inst_70551 = (state_70554[2]);var inst_70552 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Websocket ch",chord.client.ws_ch], 0));var state_70554__$1 = (function (){var statearr_70556 = state_70554;(statearr_70556[7] = inst_70551);
return statearr_70556;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_70554__$1,inst_70552);
} else
{if((state_val_70555 === 1))
{var inst_70546 = [new cljs.core.Keyword(null,"format","format",4040092521)];var inst_70547 = [new cljs.core.Keyword(null,"json-kw","json-kw",3998200803)];var inst_70548 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_70546,inst_70547) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_70546,inst_70547));var inst_70549 = chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic("ws://localhost:8083/events/stream/users/alice",cljs.core.array_seq([inst_70548], 0));var state_70554__$1 = state_70554;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70554__$1,2,inst_70549);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70560 = [null,null,null,null,null,null,null,null];(statearr_70560[0] = state_machine__24506__auto__);
(statearr_70560[1] = 1);
return statearr_70560;
});
var state_machine__24506__auto____1 = (function (state_70554){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70554);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70561){if((e70561 instanceof Object))
{var ex__24509__auto__ = e70561;var statearr_70562_70603 = state_70554;(statearr_70562_70603[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70554);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70561;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70604 = state_70554;
state_70554 = G__70604;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70554){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70554);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70563 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70563[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_70563;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},"Connect")),React.DOM.h2(null,"Messages"),cljs.core.into_array.cljs$core$IFn$_invoke$arity$1((function (){var iter__21766__auto__ = (function iter__70564(s__70565){return (new cljs.core.LazySeq(null,(function (){var s__70565__$1 = s__70565;while(true){
var temp__4126__auto__ = cljs.core.seq(s__70565__$1);if(temp__4126__auto__)
{var s__70565__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__70565__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__70565__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__70567 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__70566 = 0;while(true){
if((i__70566 < size__21765__auto__))
{var msg = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__70566);cljs.core.chunk_append(b__70567,(function (){var attrs70529 = msg;if(cljs.core.map_QMARK_(attrs70529))
{return React.DOM.p(sablono.interpreter.attributes(attrs70529),null);
} else
{return React.DOM.p(null,sablono.interpreter.interpret(attrs70529));
}
})());
{
var G__70605 = (i__70566 + 1);
i__70566 = G__70605;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__70567),iter__70564(cljs.core.chunk_rest(s__70565__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__70567),null);
}
} else
{var msg = cljs.core.first(s__70565__$2);return cljs.core.cons((function (){var attrs70529 = msg;if(cljs.core.map_QMARK_(attrs70529))
{return React.DOM.p(sablono.interpreter.attributes(attrs70529),null);
} else
{return React.DOM.p(null,sablono.interpreter.interpret(attrs70529));
}
})(),iter__70564(cljs.core.rest(s__70565__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.Keyword(null,"messages","messages",551810238)], null)));
})()));
});
azondi.main.t70516.prototype.om$core$IWillMount$ = true;
azondi.main.t70516.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472)], 0));var c__24520__auto___70606 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_70584){var state_val_70585 = (state_70584[1]);if((state_val_70585 === 7))
{var inst_70580 = (state_70584[2]);var state_70584__$1 = state_70584;var statearr_70586_70607 = state_70584__$1;(statearr_70586_70607[2] = inst_70580);
(statearr_70586_70607[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70585 === 6))
{var state_70584__$1 = state_70584;var statearr_70587_70608 = state_70584__$1;(statearr_70587_70608[2] = null);
(statearr_70587_70608[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70585 === 5))
{var inst_70570 = (state_70584[7]);var inst_70572 = cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_70570], 0));var inst_70573 = [new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_70574 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_70573,null));var inst_70575 = (function (){var data = inst_70570;var temp__4126__auto__ = inst_70570;return ((function (data,temp__4126__auto__,inst_70570,inst_70572,inst_70573,inst_70574,state_val_70585){
return (function (p1__70430_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__70430_SHARP_,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data], 0)));
});
;})(data,temp__4126__auto__,inst_70570,inst_70572,inst_70573,inst_70574,state_val_70585))
})();var inst_70576 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_70574,inst_70575);var state_70584__$1 = (function (){var statearr_70588 = state_70584;(statearr_70588[8] = inst_70572);
(statearr_70588[9] = inst_70576);
return statearr_70588;
})();var statearr_70589_70609 = state_70584__$1;(statearr_70589_70609[2] = null);
(statearr_70589_70609[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70585 === 4))
{var inst_70570 = (state_70584[7]);var inst_70570__$1 = (state_70584[2]);var state_70584__$1 = (function (){var statearr_70590 = state_70584;(statearr_70590[7] = inst_70570__$1);
return statearr_70590;
})();if(cljs.core.truth_(inst_70570__$1))
{var statearr_70591_70610 = state_70584__$1;(statearr_70591_70610[1] = 5);
} else
{var statearr_70592_70611 = state_70584__$1;(statearr_70592_70611[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_70585 === 3))
{var inst_70582 = (state_70584[2]);var state_70584__$1 = state_70584;return cljs.core.async.impl.ioc_helpers.return_chan(state_70584__$1,inst_70582);
} else
{if((state_val_70585 === 2))
{var state_70584__$1 = state_70584;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70584__$1,4,ajax_recv);
} else
{if((state_val_70585 === 1))
{var state_70584__$1 = state_70584;var statearr_70593_70612 = state_70584__$1;(statearr_70593_70612[2] = null);
(statearr_70593_70612[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_70597 = [null,null,null,null,null,null,null,null,null,null];(statearr_70597[0] = state_machine__24506__auto__);
(statearr_70597[1] = 1);
return statearr_70597;
});
var state_machine__24506__auto____1 = (function (state_70584){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_70584);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e70598){if((e70598 instanceof Object))
{var ex__24509__auto__ = e70598;var statearr_70599_70613 = state_70584;(statearr_70599_70613[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_70584);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e70598;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__70614 = state_70584;
state_70584 = G__70614;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_70584){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_70584);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_70600 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_70600[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___70606);
return statearr_70600;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(self__.owner,new cljs.core.Keyword(null,"channel","channel",1752854645),ajax_send);
});
azondi.main.t70516.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_70518){var self__ = this;
var _70518__$1 = this;return self__.meta70517;
});
azondi.main.t70516.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_70518,meta70517__$1){var self__ = this;
var _70518__$1 = this;return (new azondi.main.t70516(self__.owner,self__.app_state,self__.test_card_page_component,meta70517__$1));
});
azondi.main.__GT_t70516 = (function __GT_t70516(owner__$1,app_state__$1,test_card_page_component__$1,meta70517){return (new azondi.main.t70516(owner__$1,app_state__$1,test_card_page_component__$1,meta70517));
});
}
return (new azondi.main.t70516(owner,app_state,test_card_page_component,null));
});
azondi.main.test_card = (function test_card(){return om.core.root(azondi.main.test_card_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.test_card', azondi.main.test_card);
//# sourceMappingURL=main.js.map