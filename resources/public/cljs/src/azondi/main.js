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
azondi.main.uri_init = [cljs.core.str(azondi.main.hostname),cljs.core.str(":3000/api/1.0")].join('');
azondi.main.app_model = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"user","user",1017503549),"nobody",new cljs.core.Keyword(null,"devices","devices",2573705295),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"device","device",3973714376),null,new cljs.core.Keyword(null,"topics","topics",4440837270),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"topic","topic",1124450465),null,new cljs.core.Keyword(null,"topic-detail","topic-detail",557925921),null,new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264),null,new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"messages","messages",551810238),cljs.core.PersistentVector.EMPTY], null)], null));
/**
* Show a list of devices
*/
azondi.main.devices_list_component = (function devices_list_component(app_state,owner){if(typeof azondi.main.t43757 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t43757 = (function (owner,app_state,devices_list_component,meta43758){
this.owner = owner;
this.app_state = app_state;
this.devices_list_component = devices_list_component;
this.meta43758 = meta43758;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t43757.cljs$lang$type = true;
azondi.main.t43757.cljs$lang$ctorStr = "azondi.main/t43757";
azondi.main.t43757.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t43757");
});
azondi.main.t43757.prototype.om$core$IRender$ = true;
azondi.main.t43757.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.p(null,"user: ",sablono.interpreter.interpret(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state))),sablono.interpreter.interpret((function (){var devices = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(self__.app_state);if(cljs.core.truth_(cljs.core.not_empty(devices)))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table.table-hover.table-condensed.tbl","table.table.table-hover.table-condensed.tbl",2199590137),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",1124231110),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Client id"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Name"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",1013907942),"Description"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",1124062088),(function (){var iter__21766__auto__ = (function iter__43760(s__43761){return (new cljs.core.LazySeq(null,(function (){var s__43761__$1 = s__43761;while(true){
var temp__4126__auto__ = cljs.core.seq(s__43761__$1);if(temp__4126__auto__)
{var s__43761__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__43761__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__43761__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__43763 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__43762 = 0;while(true){
if((i__43762 < size__21765__auto__))
{var map__43860 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__43762);var map__43860__$1 = ((cljs.core.seq_QMARK_(map__43860))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__43860):map__43860);var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43860__$1,new cljs.core.Keyword(null,"description","description",3584325486));var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43860__$1,new cljs.core.Keyword(null,"name","name",1017277949));var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43860__$1,new cljs.core.Keyword(null,"client-id","client-id",3404733903));cljs.core.chunk_append(b__43763,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",3976677536),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null))))?"#ff0":"white")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.numeric","td.numeric",4490771713),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),((function (i__43762,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/devices/"),cljs.core.str(client_id)].join(''),new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (i__43762,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (i__43762,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__){
return (function (state_43888){var state_val_43889 = (state_43888[1]);if((state_val_43889 === 9))
{var inst_43886 = (state_43888[2]);var state_43888__$1 = state_43888;return cljs.core.async.impl.ioc_helpers.return_chan(state_43888__$1,inst_43886);
} else
{if((state_val_43889 === 8))
{var state_43888__$1 = state_43888;var statearr_43890_43974 = state_43888__$1;(statearr_43890_43974[2] = null);
(statearr_43890_43974[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 7))
{var inst_43872 = (state_43888[7]);var inst_43876 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_43877 = ["",""];var inst_43878 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_43876,inst_43877) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_43876,inst_43877));var inst_43879 = [new cljs.core.Keyword(null,"client-id","client-id",3404733903),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_43880 = (new cljs.core.PersistentVector(null,3,5,cljs.core.PersistentVector.EMPTY_NODE,inst_43879,null));var inst_43881 = cljs.core.select_keys(inst_43872,inst_43880);var inst_43882 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_43878,inst_43881], 0));var inst_43883 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"device","device",3973714376),inst_43882);var state_43888__$1 = state_43888;var statearr_43891_43975 = state_43888__$1;(statearr_43891_43975[2] = inst_43883);
(statearr_43891_43975[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 6))
{var inst_43871 = (state_43888[2]);var inst_43872 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_43871,new cljs.core.Keyword(null,"body","body",1016933652));var inst_43873 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_43871,new cljs.core.Keyword(null,"status","status",4416389988));var inst_43874 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_43873,200);var state_43888__$1 = (function (){var statearr_43892 = state_43888;(statearr_43892[7] = inst_43872);
return statearr_43892;
})();if(inst_43874)
{var statearr_43893_43976 = state_43888__$1;(statearr_43893_43976[1] = 7);
} else
{var statearr_43894_43977 = state_43888__$1;(statearr_43894_43977[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 5))
{var inst_43865 = (state_43888[8]);var state_43888__$1 = state_43888;var statearr_43895_43978 = state_43888__$1;(statearr_43895_43978[2] = inst_43865);
(statearr_43895_43978[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 4))
{var inst_43865 = (state_43888[8]);var inst_43868 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_43865);var state_43888__$1 = state_43888;var statearr_43896_43979 = state_43888__$1;(statearr_43896_43979[2] = inst_43868);
(statearr_43896_43979[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 3))
{var inst_43865 = (state_43888[8]);var inst_43865__$1 = (state_43888[2]);var inst_43866 = cljs.core.seq_QMARK_(inst_43865__$1);var state_43888__$1 = (function (){var statearr_43897 = state_43888;(statearr_43897[8] = inst_43865__$1);
return statearr_43897;
})();if(inst_43866)
{var statearr_43898_43980 = state_43888__$1;(statearr_43898_43980[1] = 4);
} else
{var statearr_43899_43981 = state_43888__$1;(statearr_43899_43981[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43889 === 2))
{var inst_43862 = (state_43888[2]);var state_43888__$1 = (function (){var statearr_43900 = state_43888;(statearr_43900[9] = inst_43862);
return statearr_43900;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_43888__$1,3,ajax_recv);
} else
{if((state_val_43889 === 1))
{var state_43888__$1 = state_43888;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_43888__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
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
});})(i__43762,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__))
;return ((function (i__43762,switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_43904 = [null,null,null,null,null,null,null,null,null,null];(statearr_43904[0] = state_machine__24506__auto__);
(statearr_43904[1] = 1);
return statearr_43904;
});
var state_machine__24506__auto____1 = (function (state_43888){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_43888);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e43905){if((e43905 instanceof Object))
{var ex__24509__auto__ = e43905;var statearr_43906_43982 = state_43888;(statearr_43906_43982[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_43888);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e43905;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__43983 = state_43888;
state_43888 = G__43983;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_43888){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_43888);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(i__43762,switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_43907 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_43907[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_43907;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(i__43762,c__24520__auto__,ajax_send,ajax_recv,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(i__43762,map__43860,map__43860__$1,description,name,client_id,c__21764__auto__,size__21765__auto__,b__43763,s__43761__$2,temp__4126__auto__))
], null),client_id], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),description], null)], null));
{
var G__43984 = (i__43762 + 1);
i__43762 = G__43984;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__43763),iter__43760(cljs.core.chunk_rest(s__43761__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__43763),null);
}
} else
{var map__43908 = cljs.core.first(s__43761__$2);var map__43908__$1 = ((cljs.core.seq_QMARK_(map__43908))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__43908):map__43908);var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43908__$1,new cljs.core.Keyword(null,"description","description",3584325486));var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43908__$1,new cljs.core.Keyword(null,"name","name",1017277949));var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43908__$1,new cljs.core.Keyword(null,"client-id","client-id",3404733903));return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",3976677536),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null))))?"#ff0":"white")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.numeric","td.numeric",4490771713),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),((function (map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/devices/"),cljs.core.str(client_id)].join(''),new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__){
return (function (state_43936){var state_val_43937 = (state_43936[1]);if((state_val_43937 === 9))
{var inst_43934 = (state_43936[2]);var state_43936__$1 = state_43936;return cljs.core.async.impl.ioc_helpers.return_chan(state_43936__$1,inst_43934);
} else
{if((state_val_43937 === 8))
{var state_43936__$1 = state_43936;var statearr_43938_43985 = state_43936__$1;(statearr_43938_43985[2] = null);
(statearr_43938_43985[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 7))
{var inst_43920 = (state_43936[7]);var inst_43924 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_43925 = ["",""];var inst_43926 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_43924,inst_43925) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_43924,inst_43925));var inst_43927 = [new cljs.core.Keyword(null,"client-id","client-id",3404733903),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_43928 = (new cljs.core.PersistentVector(null,3,5,cljs.core.PersistentVector.EMPTY_NODE,inst_43927,null));var inst_43929 = cljs.core.select_keys(inst_43920,inst_43928);var inst_43930 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_43926,inst_43929], 0));var inst_43931 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"device","device",3973714376),inst_43930);var state_43936__$1 = state_43936;var statearr_43939_43986 = state_43936__$1;(statearr_43939_43986[2] = inst_43931);
(statearr_43939_43986[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 6))
{var inst_43919 = (state_43936[2]);var inst_43920 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_43919,new cljs.core.Keyword(null,"body","body",1016933652));var inst_43921 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_43919,new cljs.core.Keyword(null,"status","status",4416389988));var inst_43922 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_43921,200);var state_43936__$1 = (function (){var statearr_43940 = state_43936;(statearr_43940[7] = inst_43920);
return statearr_43940;
})();if(inst_43922)
{var statearr_43941_43987 = state_43936__$1;(statearr_43941_43987[1] = 7);
} else
{var statearr_43942_43988 = state_43936__$1;(statearr_43942_43988[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 5))
{var inst_43913 = (state_43936[8]);var state_43936__$1 = state_43936;var statearr_43943_43989 = state_43936__$1;(statearr_43943_43989[2] = inst_43913);
(statearr_43943_43989[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 4))
{var inst_43913 = (state_43936[8]);var inst_43916 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_43913);var state_43936__$1 = state_43936;var statearr_43944_43990 = state_43936__$1;(statearr_43944_43990[2] = inst_43916);
(statearr_43944_43990[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 3))
{var inst_43913 = (state_43936[8]);var inst_43913__$1 = (state_43936[2]);var inst_43914 = cljs.core.seq_QMARK_(inst_43913__$1);var state_43936__$1 = (function (){var statearr_43945 = state_43936;(statearr_43945[8] = inst_43913__$1);
return statearr_43945;
})();if(inst_43914)
{var statearr_43946_43991 = state_43936__$1;(statearr_43946_43991[1] = 4);
} else
{var statearr_43947_43992 = state_43936__$1;(statearr_43947_43992[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43937 === 2))
{var inst_43910 = (state_43936[2]);var state_43936__$1 = (function (){var statearr_43948 = state_43936;(statearr_43948[9] = inst_43910);
return statearr_43948;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_43936__$1,3,ajax_recv);
} else
{if((state_val_43937 === 1))
{var state_43936__$1 = state_43936;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_43936__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
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
});})(c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__))
;return ((function (switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_43952 = [null,null,null,null,null,null,null,null,null,null];(statearr_43952[0] = state_machine__24506__auto__);
(statearr_43952[1] = 1);
return statearr_43952;
});
var state_machine__24506__auto____1 = (function (state_43936){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_43936);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e43953){if((e43953 instanceof Object))
{var ex__24509__auto__ = e43953;var statearr_43954_43993 = state_43936;(statearr_43954_43993[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_43936);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e43953;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__43994 = state_43936;
state_43936 = G__43994;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_43936){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_43936);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_43955 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_43955[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_43955;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto__,ajax_send,ajax_recv,map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(map__43908,map__43908__$1,description,name,client_id,s__43761__$2,temp__4126__auto__))
], null),client_id], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1013907938),description], null)], null),iter__43760(cljs.core.rest(s__43761__$2)));
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
azondi.main.t43757.prototype.om$core$IWillMount$ = true;
azondi.main.t43757.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var uri = [cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/devices/")].join('');var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri], 0));console.log([cljs.core.str("sending "),cljs.core.str(uri)].join(''));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_43964){var state_val_43965 = (state_43964[1]);if((state_val_43965 === 3))
{var inst_43959 = (state_43964[2]);var inst_43960 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_43959);var inst_43961 = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(inst_43960);var inst_43962 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_43961);var state_43964__$1 = state_43964;return cljs.core.async.impl.ioc_helpers.return_chan(state_43964__$1,inst_43962);
} else
{if((state_val_43965 === 2))
{var inst_43957 = (state_43964[2]);var state_43964__$1 = (function (){var statearr_43966 = state_43964;(statearr_43966[7] = inst_43957);
return statearr_43966;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_43964__$1,3,ajax_recv);
} else
{if((state_val_43965 === 1))
{var state_43964__$1 = state_43964;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_43964__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_43970 = [null,null,null,null,null,null,null,null];(statearr_43970[0] = state_machine__24506__auto__);
(statearr_43970[1] = 1);
return statearr_43970;
});
var state_machine__24506__auto____1 = (function (state_43964){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_43964);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e43971){if((e43971 instanceof Object))
{var ex__24509__auto__ = e43971;var statearr_43972_43995 = state_43964;(statearr_43972_43995[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_43964);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e43971;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__43996 = state_43964;
state_43964 = G__43996;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_43964){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_43964);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_43973 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_43973[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_43973;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
azondi.main.t43757.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_43759){var self__ = this;
var _43759__$1 = this;return self__.meta43758;
});
azondi.main.t43757.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_43759,meta43758__$1){var self__ = this;
var _43759__$1 = this;return (new azondi.main.t43757(self__.owner,self__.app_state,self__.devices_list_component,meta43758__$1));
});
azondi.main.__GT_t43757 = (function __GT_t43757(owner__$1,app_state__$1,devices_list_component__$1,meta43758){return (new azondi.main.t43757(owner__$1,app_state__$1,devices_list_component__$1,meta43758));
});
}
return (new azondi.main.t43757(owner,app_state,devices_list_component,null));
});
azondi.main.update_devices_list_BANG_ = (function update_devices_list_BANG_(user,app_state){var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.uri_init),cljs.core.str("/users/"),cljs.core.str(user),cljs.core.str("/devices/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44023){var state_val_44024 = (state_44023[1]);if((state_val_44024 === 3))
{var inst_44018 = (state_44023[2]);var inst_44019 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_44018);var inst_44020 = new cljs.core.Keyword(null,"devices","devices",2573705295).cljs$core$IFn$_invoke$arity$1(inst_44019);var inst_44021 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_44020);var state_44023__$1 = state_44023;return cljs.core.async.impl.ioc_helpers.return_chan(state_44023__$1,inst_44021);
} else
{if((state_val_44024 === 2))
{var inst_44016 = (state_44023[2]);var state_44023__$1 = (function (){var statearr_44025 = state_44023;(statearr_44025[7] = inst_44016);
return statearr_44025;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44023__$1,3,ajax_recv);
} else
{if((state_val_44024 === 1))
{var state_44023__$1 = state_44023;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44023__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_44029 = [null,null,null,null,null,null,null,null];(statearr_44029[0] = state_machine__24506__auto__);
(statearr_44029[1] = 1);
return statearr_44029;
});
var state_machine__24506__auto____1 = (function (state_44023){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44023);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44030){if((e44030 instanceof Object))
{var ex__24509__auto__ = e44030;var statearr_44031_44033 = state_44023;(statearr_44031_44033[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44023);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44030;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44034 = state_44023;
state_44023 = G__44034;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44023){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44023);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44032 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44032[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_44032;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Click this button to register a new device
*/
azondi.main.new_device_button_component = (function new_device_button_component(app_state,owner){if(typeof azondi.main.t44092 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t44092 = (function (owner,app_state,new_device_button_component,meta44093){
this.owner = owner;
this.app_state = app_state;
this.new_device_button_component = new_device_button_component;
this.meta44093 = meta44093;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t44092.cljs$lang$type = true;
azondi.main.t44092.cljs$lang$ctorStr = "azondi.main/t44092";
azondi.main.t44092.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t44092");
});
azondi.main.t44092.prototype.om$core$IRender$ = true;
azondi.main.t44092.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.form({"className": "form-horizontal", "onSubmit": (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"post","post",1017351186)], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44127){var state_val_44128 = (state_44127[1]);if((state_val_44128 === 9))
{var inst_44125 = (state_44127[2]);var state_44127__$1 = state_44127;return cljs.core.async.impl.ioc_helpers.return_chan(state_44127__$1,inst_44125);
} else
{if((state_val_44128 === 8))
{var state_44127__$1 = state_44127;var statearr_44129_44148 = state_44127__$1;(statearr_44129_44148[2] = null);
(statearr_44129_44148[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 7))
{var inst_44114 = (state_44127[7]);var inst_44115 = (state_44127[8]);var inst_44113 = (state_44127[9]);var inst_44118 = (function (){var status = inst_44115;var body = inst_44114;var map__44105 = inst_44113;return ((function (status,body,map__44105,inst_44114,inst_44115,inst_44113,state_val_44128){
return (function (p1__44035_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__44035_SHARP_,body);
});
;})(status,body,map__44105,inst_44114,inst_44115,inst_44113,state_val_44128))
})();var inst_44119 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"devices","devices",2573705295),inst_44118);var inst_44120 = [new cljs.core.Keyword(null,"device","device",3973714376)];var inst_44121 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44120,null));var inst_44122 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_44121,inst_44114);var state_44127__$1 = (function (){var statearr_44130 = state_44127;(statearr_44130[10] = inst_44119);
return statearr_44130;
})();var statearr_44131_44149 = state_44127__$1;(statearr_44131_44149[2] = inst_44122);
(statearr_44131_44149[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 6))
{var inst_44115 = (state_44127[8]);var inst_44113 = (state_44127[9]);var inst_44113__$1 = (state_44127[2]);var inst_44114 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44113__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_44115__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44113__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_44116 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_44115__$1,201);var state_44127__$1 = (function (){var statearr_44132 = state_44127;(statearr_44132[7] = inst_44114);
(statearr_44132[8] = inst_44115__$1);
(statearr_44132[9] = inst_44113__$1);
return statearr_44132;
})();if(inst_44116)
{var statearr_44133_44150 = state_44127__$1;(statearr_44133_44150[1] = 7);
} else
{var statearr_44134_44151 = state_44127__$1;(statearr_44134_44151[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 5))
{var inst_44107 = (state_44127[11]);var state_44127__$1 = state_44127;var statearr_44135_44152 = state_44127__$1;(statearr_44135_44152[2] = inst_44107);
(statearr_44135_44152[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 4))
{var inst_44107 = (state_44127[11]);var inst_44110 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_44107);var state_44127__$1 = state_44127;var statearr_44136_44153 = state_44127__$1;(statearr_44136_44153[2] = inst_44110);
(statearr_44136_44153[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 3))
{var inst_44107 = (state_44127[11]);var inst_44107__$1 = (state_44127[2]);var inst_44108 = cljs.core.seq_QMARK_(inst_44107__$1);var state_44127__$1 = (function (){var statearr_44137 = state_44127;(statearr_44137[11] = inst_44107__$1);
return statearr_44137;
})();if(inst_44108)
{var statearr_44138_44154 = state_44127__$1;(statearr_44138_44154[1] = 4);
} else
{var statearr_44139_44155 = state_44127__$1;(statearr_44139_44155[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44128 === 2))
{var inst_44104 = (state_44127[2]);var state_44127__$1 = (function (){var statearr_44140 = state_44127;(statearr_44140[12] = inst_44104);
return statearr_44140;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44127__$1,3,ajax_recv);
} else
{if((state_val_44128 === 1))
{var inst_44097 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_44098 = cljs.core.deref(self__.app_state);var inst_44099 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_44098);var inst_44100 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_44099),cljs.core.str("/devices/")].join('');var inst_44101 = [inst_44100,cljs.core.PersistentHashMap.EMPTY];var inst_44102 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44097,inst_44101) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44097,inst_44101));var state_44127__$1 = state_44127;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44127__$1,2,ajax_send,inst_44102);
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
var state_machine__24506__auto____0 = (function (){var statearr_44144 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_44144[0] = state_machine__24506__auto__);
(statearr_44144[1] = 1);
return statearr_44144;
});
var state_machine__24506__auto____1 = (function (state_44127){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44127);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44145){if((e44145 instanceof Object))
{var ex__24509__auto__ = e44145;var statearr_44146_44156 = state_44127;(statearr_44146_44156[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44127);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44145;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44157 = state_44127;
state_44127 = G__44157;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44127){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44127);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44147 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44147[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_44147;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},React.DOM.div({"className": "control-group"},React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"className": "btn btn-primary", "type": "submit", "value": "Register new device"}) : sablono.interpreter.input.call(null,{"className": "btn btn-primary", "type": "submit", "value": "Register new device"})))));
});
azondi.main.t44092.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44094){var self__ = this;
var _44094__$1 = this;return self__.meta44093;
});
azondi.main.t44092.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44094,meta44093__$1){var self__ = this;
var _44094__$1 = this;return (new azondi.main.t44092(self__.owner,self__.app_state,self__.new_device_button_component,meta44093__$1));
});
azondi.main.__GT_t44092 = (function __GT_t44092(owner__$1,app_state__$1,new_device_button_component__$1,meta44093){return (new azondi.main.t44092(owner__$1,app_state__$1,new_device_button_component__$1,meta44093));
});
}
return (new azondi.main.t44092(owner,app_state,new_device_button_component,null));
});
/**
* Connect the device debugger to the notification (server-sent event)
* source of the given client-id. This debugger is useful Events are put
* to notify-ch.
*/
azondi.main.connect_device_debugger = (function connect_device_debugger(owner,client_id,notify_ch){var temp__4126__auto___44158 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376));if(cljs.core.truth_(temp__4126__auto___44158))
{var es_44159 = temp__4126__auto___44158;es_44159.close();
} else
{}
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376),azondi.net.listen_sse([cljs.core.str("/events/"),cljs.core.str(client_id)].join(''),notify_ch));
});
azondi.main.device_details_component = (function device_details_component(app_state,owner){if(typeof azondi.main.t44366 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t44366 = (function (owner,app_state,device_details_component,meta44367){
this.owner = owner;
this.app_state = app_state;
this.device_details_component = device_details_component;
this.meta44367 = meta44367;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t44366.cljs$lang$type = true;
azondi.main.t44366.cljs$lang$ctorStr = "azondi.main/t44366";
azondi.main.t44366.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t44366");
});
azondi.main.t44366.prototype.om$core$IRender$ = true;
azondi.main.t44366.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
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
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44403){var state_val_44404 = (state_44403[1]);if((state_val_44404 === 9))
{var inst_44397 = (state_44403[2]);var inst_44398 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to PUT is",inst_44397], 0));var inst_44399 = cljs.core.deref(self__.app_state);var inst_44400 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_44399);var inst_44401 = azondi.main.update_devices_list_BANG_(inst_44400,self__.app_state);var state_44403__$1 = (function (){var statearr_44405 = state_44403;(statearr_44405[7] = inst_44398);
return statearr_44405;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_44403__$1,inst_44401);
} else
{if((state_val_44404 === 8))
{var inst_44381 = (state_44403[8]);var inst_44373 = (state_44403[9]);var inst_44369 = (state_44403[10]);var inst_44372 = (state_44403[11]);var inst_44389 = (state_44403[2]);var inst_44390 = [inst_44381,inst_44389];var inst_44391 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44373,inst_44390) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44373,inst_44390));var inst_44392 = [inst_44372,inst_44391];var inst_44393 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44369,inst_44392) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44369,inst_44392));var state_44403__$1 = state_44403;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44403__$1,2,ajax_send,inst_44393);
} else
{if((state_val_44404 === 7))
{var state_44403__$1 = state_44403;var statearr_44406_44570 = state_44403__$1;(statearr_44406_44570[2] = "");
(statearr_44406_44570[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44404 === 6))
{var inst_44385 = (state_44403[12]);var state_44403__$1 = state_44403;var statearr_44407_44571 = state_44403__$1;(statearr_44407_44571[2] = inst_44385);
(statearr_44407_44571[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44404 === 5))
{var inst_44385 = (state_44403[12]);var inst_44381 = (state_44403[2]);var inst_44382 = cljs.core.deref(self__.app_state);var inst_44383 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_44384 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44383,null));var inst_44385__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_44382,inst_44384);var state_44403__$1 = (function (){var statearr_44408 = state_44403;(statearr_44408[8] = inst_44381);
(statearr_44408[12] = inst_44385__$1);
return statearr_44408;
})();if(cljs.core.truth_(inst_44385__$1))
{var statearr_44409_44572 = state_44403__$1;(statearr_44409_44572[1] = 6);
} else
{var statearr_44410_44573 = state_44403__$1;(statearr_44410_44573[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44404 === 4))
{var state_44403__$1 = state_44403;var statearr_44411_44574 = state_44403__$1;(statearr_44411_44574[2] = "");
(statearr_44411_44574[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44404 === 3))
{var inst_44377 = (state_44403[13]);var state_44403__$1 = state_44403;var statearr_44412_44575 = state_44403__$1;(statearr_44412_44575[2] = inst_44377);
(statearr_44412_44575[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44404 === 2))
{var inst_44395 = (state_44403[2]);var state_44403__$1 = (function (){var statearr_44413 = state_44403;(statearr_44413[14] = inst_44395);
return statearr_44413;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44403__$1,9,ajax_recv);
} else
{if((state_val_44404 === 1))
{var inst_44377 = (state_44403[13]);var inst_44369 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_44370 = cljs.core.deref(self__.app_state);var inst_44371 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_44370);var inst_44372 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_44371),cljs.core.str("/devices/"),cljs.core.str(id__$1)].join('');var inst_44373 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_44374 = cljs.core.deref(self__.app_state);var inst_44375 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)];var inst_44376 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44375,null));var inst_44377__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_44374,inst_44376);var state_44403__$1 = (function (){var statearr_44414 = state_44403;(statearr_44414[9] = inst_44373);
(statearr_44414[13] = inst_44377__$1);
(statearr_44414[10] = inst_44369);
(statearr_44414[11] = inst_44372);
return statearr_44414;
})();if(cljs.core.truth_(inst_44377__$1))
{var statearr_44415_44576 = state_44403__$1;(statearr_44415_44576[1] = 3);
} else
{var statearr_44416_44577 = state_44403__$1;(statearr_44416_44577[1] = 4);
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
var state_machine__24506__auto____0 = (function (){var statearr_44420 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_44420[0] = state_machine__24506__auto__);
(statearr_44420[1] = 1);
return statearr_44420;
});
var state_machine__24506__auto____1 = (function (state_44403){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44403);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44421){if((e44421 instanceof Object))
{var ex__24509__auto__ = e44421;var statearr_44422_44578 = state_44403;(statearr_44422_44578[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44403);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44421;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44579 = state_44403;
state_44403 = G__44579;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44403){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44403);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44423 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44423[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_44423;
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
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44460){var state_val_44461 = (state_44460[1]);if((state_val_44461 === 9))
{var inst_44453 = (state_44460[2]);var inst_44454 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"password","password",2230889997)];var inst_44455 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44454,null));var inst_44456 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_44453);var inst_44457 = new cljs.core.Keyword(null,"password","password",2230889997).cljs$core$IFn$_invoke$arity$1(inst_44456);var inst_44458 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_44455,inst_44457);var state_44460__$1 = state_44460;return cljs.core.async.impl.ioc_helpers.return_chan(state_44460__$1,inst_44458);
} else
{if((state_val_44461 === 8))
{var inst_44429 = (state_44460[7]);var inst_44437 = (state_44460[8]);var inst_44428 = (state_44460[9]);var inst_44425 = (state_44460[10]);var inst_44445 = (state_44460[2]);var inst_44446 = [inst_44437,inst_44445];var inst_44447 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44429,inst_44446) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44429,inst_44446));var inst_44448 = [inst_44428,inst_44447];var inst_44449 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44425,inst_44448) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44425,inst_44448));var state_44460__$1 = state_44460;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44460__$1,2,ajax_send,inst_44449);
} else
{if((state_val_44461 === 7))
{var state_44460__$1 = state_44460;var statearr_44462_44580 = state_44460__$1;(statearr_44462_44580[2] = "");
(statearr_44462_44580[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44461 === 6))
{var inst_44441 = (state_44460[11]);var state_44460__$1 = state_44460;var statearr_44463_44581 = state_44460__$1;(statearr_44463_44581[2] = inst_44441);
(statearr_44463_44581[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44461 === 5))
{var inst_44441 = (state_44460[11]);var inst_44437 = (state_44460[2]);var inst_44438 = cljs.core.deref(self__.app_state);var inst_44439 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_44440 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44439,null));var inst_44441__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_44438,inst_44440);var state_44460__$1 = (function (){var statearr_44464 = state_44460;(statearr_44464[8] = inst_44437);
(statearr_44464[11] = inst_44441__$1);
return statearr_44464;
})();if(cljs.core.truth_(inst_44441__$1))
{var statearr_44465_44582 = state_44460__$1;(statearr_44465_44582[1] = 6);
} else
{var statearr_44466_44583 = state_44460__$1;(statearr_44466_44583[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44461 === 4))
{var state_44460__$1 = state_44460;var statearr_44467_44584 = state_44460__$1;(statearr_44467_44584[2] = "");
(statearr_44467_44584[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44461 === 3))
{var inst_44433 = (state_44460[12]);var state_44460__$1 = state_44460;var statearr_44468_44585 = state_44460__$1;(statearr_44468_44585[2] = inst_44433);
(statearr_44468_44585[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44461 === 2))
{var inst_44451 = (state_44460[2]);var state_44460__$1 = (function (){var statearr_44469 = state_44460;(statearr_44469[13] = inst_44451);
return statearr_44469;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44460__$1,9,ajax_recv);
} else
{if((state_val_44461 === 1))
{var inst_44433 = (state_44460[12]);var inst_44424 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["here - reset password"], 0));var inst_44425 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_44426 = cljs.core.deref(self__.app_state);var inst_44427 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_44426);var inst_44428 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_44427),cljs.core.str("/devices/"),cljs.core.str(id__$1),cljs.core.str("/reset-password")].join('');var inst_44429 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_44430 = cljs.core.deref(self__.app_state);var inst_44431 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"name","name",1017277949)];var inst_44432 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44431,null));var inst_44433__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_44430,inst_44432);var state_44460__$1 = (function (){var statearr_44470 = state_44460;(statearr_44470[12] = inst_44433__$1);
(statearr_44470[7] = inst_44429);
(statearr_44470[9] = inst_44428);
(statearr_44470[14] = inst_44424);
(statearr_44470[10] = inst_44425);
return statearr_44470;
})();if(cljs.core.truth_(inst_44433__$1))
{var statearr_44471_44586 = state_44460__$1;(statearr_44471_44586[1] = 3);
} else
{var statearr_44472_44587 = state_44460__$1;(statearr_44472_44587[1] = 4);
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
var state_machine__24506__auto____0 = (function (){var statearr_44476 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_44476[0] = state_machine__24506__auto__);
(statearr_44476[1] = 1);
return statearr_44476;
});
var state_machine__24506__auto____1 = (function (state_44460){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44460);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44477){if((e44477 instanceof Object))
{var ex__24509__auto__ = e44477;var statearr_44478_44588 = state_44460;(statearr_44478_44588[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44460);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44477;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44589 = state_44460;
state_44460 = G__44589;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44460){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44460);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44479 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44479[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_44479;
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
})())].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",1013907518),"Events"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"We will show all connection attempts from this device to help you succeed in establishing a connection from your device to the broker."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),(function (){var iter__21766__auto__ = (function iter__44480(s__44481){return (new cljs.core.LazySeq(null,(function (){var s__44481__$1 = s__44481;while(true){
var temp__4126__auto__ = cljs.core.seq(s__44481__$1);if(temp__4126__auto__)
{var s__44481__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__44481__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__44481__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__44483 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__44482 = 0;while(true){
if((i__44482 < size__21765__auto__))
{var msg = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__44482);cljs.core.chunk_append(b__44483,[cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str("\r\n")].join(''));
{
var G__44590 = (i__44482 + 1);
i__44482 = G__44590;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__44483),iter__44480(cljs.core.chunk_rest(s__44481__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__44483),null);
}
} else
{var msg = cljs.core.first(s__44481__$2);return cljs.core.cons([cljs.core.str(new cljs.core.Keyword(null,"text","text",1017460895).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str("\r\n")].join(''),iter__44480(cljs.core.rest(s__44481__$2)));
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
{var id__$1 = temp__4124__auto__;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44516){var state_val_44517 = (state_44516[1]);if((state_val_44517 === 9))
{var inst_44514 = (state_44516[2]);var state_44516__$1 = state_44516;return cljs.core.async.impl.ioc_helpers.return_chan(state_44516__$1,inst_44514);
} else
{if((state_val_44517 === 8))
{var state_44516__$1 = state_44516;var statearr_44518_44591 = state_44516__$1;(statearr_44518_44591[2] = null);
(statearr_44518_44591[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 7))
{var inst_44502 = (state_44516[7]);var inst_44500 = (state_44516[8]);var inst_44501 = (state_44516[9]);var inst_44505 = [new cljs.core.Keyword(null,"device","device",3973714376)];var inst_44506 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44505,null));var inst_44507 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_44506,null);var inst_44508 = [new cljs.core.Keyword(null,"devices","devices",2573705295)];var inst_44509 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44508,null));var inst_44510 = (function (){var status = inst_44502;var body = inst_44501;var map__44492 = inst_44500;return ((function (status,body,map__44492,inst_44502,inst_44500,inst_44501,inst_44505,inst_44506,inst_44507,inst_44508,inst_44509,state_val_44517){
return (function (devices){return cljs.core.remove(((function (status,body,map__44492,inst_44502,inst_44500,inst_44501,inst_44505,inst_44506,inst_44507,inst_44508,inst_44509,state_val_44517){
return (function (p1__44161_SHARP_){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-id","client-id",3404733903).cljs$core$IFn$_invoke$arity$1(p1__44161_SHARP_),id__$1);
});})(status,body,map__44492,inst_44502,inst_44500,inst_44501,inst_44505,inst_44506,inst_44507,inst_44508,inst_44509,state_val_44517))
,devices);
});
;})(status,body,map__44492,inst_44502,inst_44500,inst_44501,inst_44505,inst_44506,inst_44507,inst_44508,inst_44509,state_val_44517))
})();var inst_44511 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_44509,inst_44510);var state_44516__$1 = (function (){var statearr_44519 = state_44516;(statearr_44519[10] = inst_44507);
return statearr_44519;
})();var statearr_44520_44592 = state_44516__$1;(statearr_44520_44592[2] = inst_44511);
(statearr_44520_44592[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 6))
{var inst_44502 = (state_44516[7]);var inst_44500 = (state_44516[8]);var inst_44500__$1 = (state_44516[2]);var inst_44501 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44500__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_44502__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44500__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_44503 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_44502__$1,204);var state_44516__$1 = (function (){var statearr_44521 = state_44516;(statearr_44521[7] = inst_44502__$1);
(statearr_44521[8] = inst_44500__$1);
(statearr_44521[9] = inst_44501);
return statearr_44521;
})();if(inst_44503)
{var statearr_44522_44593 = state_44516__$1;(statearr_44522_44593[1] = 7);
} else
{var statearr_44523_44594 = state_44516__$1;(statearr_44523_44594[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 5))
{var inst_44494 = (state_44516[11]);var state_44516__$1 = state_44516;var statearr_44524_44595 = state_44516__$1;(statearr_44524_44595[2] = inst_44494);
(statearr_44524_44595[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 4))
{var inst_44494 = (state_44516[11]);var inst_44497 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_44494);var state_44516__$1 = state_44516;var statearr_44525_44596 = state_44516__$1;(statearr_44525_44596[2] = inst_44497);
(statearr_44525_44596[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 3))
{var inst_44494 = (state_44516[11]);var inst_44494__$1 = (state_44516[2]);var inst_44495 = cljs.core.seq_QMARK_(inst_44494__$1);var state_44516__$1 = (function (){var statearr_44526 = state_44516;(statearr_44526[11] = inst_44494__$1);
return statearr_44526;
})();if(inst_44495)
{var statearr_44527_44597 = state_44516__$1;(statearr_44527_44597[1] = 4);
} else
{var statearr_44528_44598 = state_44516__$1;(statearr_44528_44598[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44517 === 2))
{var inst_44491 = (state_44516[2]);var state_44516__$1 = (function (){var statearr_44529 = state_44516;(statearr_44529[12] = inst_44491);
return statearr_44529;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44516__$1,3,ajax_recv);
} else
{if((state_val_44517 === 1))
{var inst_44484 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_44485 = cljs.core.deref(self__.app_state);var inst_44486 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_44485);var inst_44487 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_44486),cljs.core.str("/devices/"),cljs.core.str(id__$1)].join('');var inst_44488 = [inst_44487];var inst_44489 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44484,inst_44488) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44484,inst_44488));var state_44516__$1 = state_44516;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44516__$1,2,ajax_send,inst_44489);
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
var state_machine__24506__auto____0 = (function (){var statearr_44533 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_44533[0] = state_machine__24506__auto__);
(statearr_44533[1] = 1);
return statearr_44533;
});
var state_machine__24506__auto____1 = (function (state_44516){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44516);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44534){if((e44534 instanceof Object))
{var ex__24509__auto__ = e44534;var statearr_44535_44599 = state_44516;(statearr_44535_44599[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44516);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44534;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44600 = state_44516;
state_44516 = G__44600;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44516){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44516);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44536 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44536[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_44536;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Delete device"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"This will delete the device permanently."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn.btn-danger","input.btn.btn-danger",3258750876),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Delete device"], null)], null)], null)], null);
})());
});
azondi.main.t44366.prototype.om$core$IWillUpdate$ = true;
azondi.main.t44366.prototype.om$core$IWillUpdate$will_update$arity$3 = (function (this$,next_props,next_state){var self__ = this;
var this$__$1 = this;var old_client_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));var new_client_id = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(next_props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null));if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_client_id,new_client_id))
{return azondi.main.connect_device_debugger(self__.owner,new_client_id,om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719)));
} else
{return null;
}
});
azondi.main.t44366.prototype.om$core$IWillMount$ = true;
azondi.main.t44366.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var notify_ch = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719));var c__24520__auto___44601 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_44552){var state_val_44553 = (state_44552[1]);if((state_val_44553 === 7))
{var inst_44548 = (state_44552[2]);var state_44552__$1 = state_44552;var statearr_44554_44602 = state_44552__$1;(statearr_44554_44602[2] = inst_44548);
(statearr_44554_44602[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44553 === 6))
{var state_44552__$1 = state_44552;var statearr_44555_44603 = state_44552__$1;(statearr_44555_44603[2] = null);
(statearr_44555_44603[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44553 === 5))
{var inst_44539 = (state_44552[7]);var inst_44541 = [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_44542 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44541,null));var inst_44543 = (function (){var message = inst_44539;var temp__4126__auto__ = inst_44539;return ((function (message,temp__4126__auto__,inst_44539,inst_44541,inst_44542,state_val_44553){
return (function (p1__44160_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__21049__auto__ = p1__44160_SHARP_;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message,(function (){var G__44556 = new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(message);if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"error","error",1110689146),G__44556))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",1017460895),(function (){cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message], 0))], 0));
return "ERROR";
})()], null);
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"open","open",1017321916),G__44556))
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
;})(message,temp__4126__auto__,inst_44539,inst_44541,inst_44542,state_val_44553))
})();var inst_44544 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_44542,inst_44543);var state_44552__$1 = (function (){var statearr_44557 = state_44552;(statearr_44557[8] = inst_44544);
return statearr_44557;
})();var statearr_44558_44604 = state_44552__$1;(statearr_44558_44604[2] = null);
(statearr_44558_44604[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44553 === 4))
{var inst_44539 = (state_44552[7]);var inst_44539__$1 = (state_44552[2]);var state_44552__$1 = (function (){var statearr_44559 = state_44552;(statearr_44559[7] = inst_44539__$1);
return statearr_44559;
})();if(cljs.core.truth_(inst_44539__$1))
{var statearr_44560_44605 = state_44552__$1;(statearr_44560_44605[1] = 5);
} else
{var statearr_44561_44606 = state_44552__$1;(statearr_44561_44606[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44553 === 3))
{var inst_44550 = (state_44552[2]);var state_44552__$1 = state_44552;return cljs.core.async.impl.ioc_helpers.return_chan(state_44552__$1,inst_44550);
} else
{if((state_val_44553 === 2))
{var state_44552__$1 = state_44552;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44552__$1,4,notify_ch);
} else
{if((state_val_44553 === 1))
{var state_44552__$1 = state_44552;var statearr_44562_44607 = state_44552__$1;(statearr_44562_44607[2] = null);
(statearr_44562_44607[1] = 2);
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
var state_machine__24506__auto____0 = (function (){var statearr_44566 = [null,null,null,null,null,null,null,null,null];(statearr_44566[0] = state_machine__24506__auto__);
(statearr_44566[1] = 1);
return statearr_44566;
});
var state_machine__24506__auto____1 = (function (state_44552){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44552);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e44567){if((e44567 instanceof Object))
{var ex__24509__auto__ = e44567;var statearr_44568_44608 = state_44552;(statearr_44568_44608[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44552);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e44567;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__44609 = state_44552;
state_44552 = G__44609;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44552){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44552);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_44569 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_44569[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___44601);
return statearr_44569;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return azondi.main.connect_device_debugger(self__.owner,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"device","device",3973714376),new cljs.core.Keyword(null,"client-id","client-id",3404733903)], null)),notify_ch);
});
azondi.main.t44366.prototype.om$core$IInitState$ = true;
azondi.main.t44366.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719),cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0()], null);
});
azondi.main.t44366.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44368){var self__ = this;
var _44368__$1 = this;return self__.meta44367;
});
azondi.main.t44366.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44368,meta44367__$1){var self__ = this;
var _44368__$1 = this;return (new azondi.main.t44366(self__.owner,self__.app_state,self__.device_details_component,meta44367__$1));
});
azondi.main.__GT_t44366 = (function __GT_t44366(owner__$1,app_state__$1,device_details_component__$1,meta44367){return (new azondi.main.t44366(owner__$1,app_state__$1,device_details_component__$1,meta44367));
});
}
return (new azondi.main.t44366(owner,app_state,device_details_component,null));
});
azondi.main.devices_page_component = (function devices_page_component(app_state,owner){if(typeof azondi.main.t44614 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t44614 = (function (owner,app_state,devices_page_component,meta44615){
this.owner = owner;
this.app_state = app_state;
this.devices_page_component = devices_page_component;
this.meta44615 = meta44615;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t44614.cljs$lang$type = true;
azondi.main.t44614.cljs$lang$ctorStr = "azondi.main/t44614";
azondi.main.t44614.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t44614");
});
azondi.main.t44614.prototype.om$core$IRender$ = true;
azondi.main.t44614.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var attrs44617 = om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.devices_list_component,self__.app_state);if(cljs.core.map_QMARK_(attrs44617))
{return React.DOM.div(sablono.interpreter.attributes(attrs44617),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_device_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.device_details_component,self__.app_state):null)));
} else
{return React.DOM.div(null,sablono.interpreter.interpret(attrs44617),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_device_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"device","device",3973714376).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.device_details_component,self__.app_state):null)));
}
});
azondi.main.t44614.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44616){var self__ = this;
var _44616__$1 = this;return self__.meta44615;
});
azondi.main.t44614.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44616,meta44615__$1){var self__ = this;
var _44616__$1 = this;return (new azondi.main.t44614(self__.owner,self__.app_state,self__.devices_page_component,meta44615__$1));
});
azondi.main.__GT_t44614 = (function __GT_t44614(owner__$1,app_state__$1,devices_page_component__$1,meta44615){return (new azondi.main.t44614(owner__$1,app_state__$1,devices_page_component__$1,meta44615));
});
}
return (new azondi.main.t44614(owner,app_state,devices_page_component,null));
});
azondi.main.devices_page = (function devices_page(user){cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(azondi.main.app_model,cljs.core.assoc,new cljs.core.Keyword(null,"user","user",1017503549),user);
return om.core.root(azondi.main.devices_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.devices_page', azondi.main.devices_page);
/**
* Show a list of topics
*/
azondi.main.topics_list_component = (function topics_list_component(app_state,owner){if(typeof azondi.main.t44847 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t44847 = (function (owner,app_state,topics_list_component,meta44848){
this.owner = owner;
this.app_state = app_state;
this.topics_list_component = topics_list_component;
this.meta44848 = meta44848;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t44847.cljs$lang$type = true;
azondi.main.t44847.cljs$lang$ctorStr = "azondi.main/t44847";
azondi.main.t44847.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t44847");
});
azondi.main.t44847.prototype.om$core$IRender$ = true;
azondi.main.t44847.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.table({"className": "table table-hover table-condensed tbl"},React.DOM.thead(null,React.DOM.tr(null,React.DOM.th(null,"Topic"),React.DOM.th(null,"Description"),React.DOM.th(null,"Unit of Measure"))),React.DOM.tbody(null,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1((function (){var iter__21766__auto__ = (function iter__44854(s__44855){return (new cljs.core.LazySeq(null,(function (){var s__44855__$1 = s__44855;while(true){
var temp__4126__auto__ = cljs.core.seq(s__44855__$1);if(temp__4126__auto__)
{var s__44855__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__44855__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__44855__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__44857 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__44856 = 0;while(true){
if((i__44856 < size__21765__auto__))
{var map__44958 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__44856);var map__44958__$1 = ((cljs.core.seq_QMARK_(map__44958))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__44958):map__44958);var unit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__44958__$1,new cljs.core.Keyword(null,"unit","unit",1017498870));var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__44958__$1,new cljs.core.Keyword(null,"description","description",3584325486));var topic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__44958__$1,new cljs.core.Keyword(null,"topic","topic",1124450465));cljs.core.chunk_append(b__44857,React.DOM.tr(null,React.DOM.td(null,React.DOM.a({"onClick": ((function (i__44856,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Getting topic detail for",topic], 0));
var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri,new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (i__44856,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (i__44856,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__){
return (function (state_44987){var state_val_44988 = (state_44987[1]);if((state_val_44988 === 9))
{var inst_44985 = (state_44987[2]);var state_44987__$1 = state_44987;return cljs.core.async.impl.ioc_helpers.return_chan(state_44987__$1,inst_44985);
} else
{if((state_val_44988 === 8))
{var state_44987__$1 = state_44987;var statearr_44989_45076 = state_44987__$1;(statearr_44989_45076[2] = null);
(statearr_44989_45076[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 7))
{var inst_44970 = (state_44987[7]);var inst_44974 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["body returned is",inst_44970], 0));var inst_44975 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_44976 = ["","","",""];var inst_44977 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_44975,inst_44976) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_44975,inst_44976));var inst_44978 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_44979 = (new cljs.core.PersistentVector(null,4,5,cljs.core.PersistentVector.EMPTY_NODE,inst_44978,null));var inst_44980 = cljs.core.select_keys(inst_44970,inst_44979);var inst_44981 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_44977,inst_44980], 0));var inst_44982 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topic","topic",1124450465),inst_44981);var state_44987__$1 = (function (){var statearr_44990 = state_44987;(statearr_44990[8] = inst_44974);
return statearr_44990;
})();var statearr_44991_45077 = state_44987__$1;(statearr_44991_45077[2] = inst_44982);
(statearr_44991_45077[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 6))
{var inst_44969 = (state_44987[2]);var inst_44970 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44969,new cljs.core.Keyword(null,"body","body",1016933652));var inst_44971 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_44969,new cljs.core.Keyword(null,"status","status",4416389988));var inst_44972 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_44971,200);var state_44987__$1 = (function (){var statearr_44992 = state_44987;(statearr_44992[7] = inst_44970);
return statearr_44992;
})();if(inst_44972)
{var statearr_44993_45078 = state_44987__$1;(statearr_44993_45078[1] = 7);
} else
{var statearr_44994_45079 = state_44987__$1;(statearr_44994_45079[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 5))
{var inst_44963 = (state_44987[9]);var state_44987__$1 = state_44987;var statearr_44995_45080 = state_44987__$1;(statearr_44995_45080[2] = inst_44963);
(statearr_44995_45080[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 4))
{var inst_44963 = (state_44987[9]);var inst_44966 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_44963);var state_44987__$1 = state_44987;var statearr_44996_45081 = state_44987__$1;(statearr_44996_45081[2] = inst_44966);
(statearr_44996_45081[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 3))
{var inst_44963 = (state_44987[9]);var inst_44963__$1 = (state_44987[2]);var inst_44964 = cljs.core.seq_QMARK_(inst_44963__$1);var state_44987__$1 = (function (){var statearr_44997 = state_44987;(statearr_44997[9] = inst_44963__$1);
return statearr_44997;
})();if(inst_44964)
{var statearr_44998_45082 = state_44987__$1;(statearr_44998_45082[1] = 4);
} else
{var statearr_44999_45083 = state_44987__$1;(statearr_44999_45083[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_44988 === 2))
{var inst_44960 = (state_44987[2]);var state_44987__$1 = (function (){var statearr_45000 = state_44987;(statearr_45000[10] = inst_44960);
return statearr_45000;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_44987__$1,3,ajax_recv);
} else
{if((state_val_44988 === 1))
{var state_44987__$1 = state_44987;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_44987__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
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
});})(i__44856,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__))
;return ((function (i__44856,switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45004 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_45004[0] = state_machine__24506__auto__);
(statearr_45004[1] = 1);
return statearr_45004;
});
var state_machine__24506__auto____1 = (function (state_44987){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_44987);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45005){if((e45005 instanceof Object))
{var ex__24509__auto__ = e45005;var statearr_45006_45084 = state_44987;(statearr_45006_45084[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_44987);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45005;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45085 = state_44987;
state_44987 = G__45085;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_44987){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_44987);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(i__44856,switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_45007 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45007[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45007;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(i__44856,c__24520__auto__,uri,ajax_send,ajax_recv,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(i__44856,map__44958,map__44958__$1,unit,description,topic,c__21764__auto__,size__21765__auto__,b__44857,s__44855__$2,temp__4126__auto__))
},sablono.interpreter.interpret(topic))),(function (){var attrs44852 = description;if(cljs.core.map_QMARK_(attrs44852))
{return React.DOM.td(sablono.interpreter.attributes(attrs44852),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs44852));
}
})(),(function (){var attrs44853 = unit;if(cljs.core.map_QMARK_(attrs44853))
{return React.DOM.td(sablono.interpreter.attributes(attrs44853),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs44853));
}
})()));
{
var G__45086 = (i__44856 + 1);
i__44856 = G__45086;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__44857),iter__44854(cljs.core.chunk_rest(s__44855__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__44857),null);
}
} else
{var map__45008 = cljs.core.first(s__44855__$2);var map__45008__$1 = ((cljs.core.seq_QMARK_(map__45008))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__45008):map__45008);var unit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45008__$1,new cljs.core.Keyword(null,"unit","unit",1017498870));var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45008__$1,new cljs.core.Keyword(null,"description","description",3584325486));var topic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45008__$1,new cljs.core.Keyword(null,"topic","topic",1124450465));return cljs.core.cons(React.DOM.tr(null,React.DOM.td(null,React.DOM.a({"onClick": ((function (map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__){
return (function (ev){ev.preventDefault();
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Getting topic detail for",topic], 0));
var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),uri,new cljs.core.Keyword(null,"content","content",1965434859),cljs.core.PersistentArrayMap.EMPTY], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__){
return (function (state_45037){var state_val_45038 = (state_45037[1]);if((state_val_45038 === 9))
{var inst_45035 = (state_45037[2]);var state_45037__$1 = state_45037;return cljs.core.async.impl.ioc_helpers.return_chan(state_45037__$1,inst_45035);
} else
{if((state_val_45038 === 8))
{var state_45037__$1 = state_45037;var statearr_45039_45087 = state_45037__$1;(statearr_45039_45087[2] = null);
(statearr_45039_45087[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 7))
{var inst_45020 = (state_45037[7]);var inst_45024 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["body returned is",inst_45020], 0));var inst_45025 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_45026 = ["","","",""];var inst_45027 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45025,inst_45026) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45025,inst_45026));var inst_45028 = [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870),new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_45029 = (new cljs.core.PersistentVector(null,4,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45028,null));var inst_45030 = cljs.core.select_keys(inst_45020,inst_45029);var inst_45031 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_45027,inst_45030], 0));var inst_45032 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topic","topic",1124450465),inst_45031);var state_45037__$1 = (function (){var statearr_45040 = state_45037;(statearr_45040[8] = inst_45024);
return statearr_45040;
})();var statearr_45041_45088 = state_45037__$1;(statearr_45041_45088[2] = inst_45032);
(statearr_45041_45088[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 6))
{var inst_45019 = (state_45037[2]);var inst_45020 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45019,new cljs.core.Keyword(null,"body","body",1016933652));var inst_45021 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45019,new cljs.core.Keyword(null,"status","status",4416389988));var inst_45022 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_45021,200);var state_45037__$1 = (function (){var statearr_45042 = state_45037;(statearr_45042[7] = inst_45020);
return statearr_45042;
})();if(inst_45022)
{var statearr_45043_45089 = state_45037__$1;(statearr_45043_45089[1] = 7);
} else
{var statearr_45044_45090 = state_45037__$1;(statearr_45044_45090[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 5))
{var inst_45013 = (state_45037[9]);var state_45037__$1 = state_45037;var statearr_45045_45091 = state_45037__$1;(statearr_45045_45091[2] = inst_45013);
(statearr_45045_45091[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 4))
{var inst_45013 = (state_45037[9]);var inst_45016 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_45013);var state_45037__$1 = state_45037;var statearr_45046_45092 = state_45037__$1;(statearr_45046_45092[2] = inst_45016);
(statearr_45046_45092[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 3))
{var inst_45013 = (state_45037[9]);var inst_45013__$1 = (state_45037[2]);var inst_45014 = cljs.core.seq_QMARK_(inst_45013__$1);var state_45037__$1 = (function (){var statearr_45047 = state_45037;(statearr_45047[9] = inst_45013__$1);
return statearr_45047;
})();if(inst_45014)
{var statearr_45048_45093 = state_45037__$1;(statearr_45048_45093[1] = 4);
} else
{var statearr_45049_45094 = state_45037__$1;(statearr_45049_45094[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45038 === 2))
{var inst_45010 = (state_45037[2]);var state_45037__$1 = (function (){var statearr_45050 = state_45037;(statearr_45050[10] = inst_45010);
return statearr_45050;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45037__$1,3,ajax_recv);
} else
{if((state_val_45038 === 1))
{var state_45037__$1 = state_45037;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45037__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
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
});})(c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__))
;return ((function (switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45054 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_45054[0] = state_machine__24506__auto__);
(statearr_45054[1] = 1);
return statearr_45054;
});
var state_machine__24506__auto____1 = (function (state_45037){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45037);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45055){if((e45055 instanceof Object))
{var ex__24509__auto__ = e45055;var statearr_45056_45095 = state_45037;(statearr_45056_45095[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45037);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45055;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45096 = state_45037;
state_45037 = G__45096;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45037){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45037);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_45057 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45057[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45057;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto__,uri,ajax_send,ajax_recv,map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__))
);
return c__24520__auto__;
});})(map__45008,map__45008__$1,unit,description,topic,s__44855__$2,temp__4126__auto__))
},sablono.interpreter.interpret(topic))),(function (){var attrs44852 = description;if(cljs.core.map_QMARK_(attrs44852))
{return React.DOM.td(sablono.interpreter.attributes(attrs44852),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs44852));
}
})(),(function (){var attrs44853 = unit;if(cljs.core.map_QMARK_(attrs44853))
{return React.DOM.td(sablono.interpreter.attributes(attrs44853),null);
} else
{return React.DOM.td(null,sablono.interpreter.interpret(attrs44853));
}
})()),iter__44854(cljs.core.rest(s__44855__$2)));
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
azondi.main.t44847.prototype.om$core$IWillMount$ = true;
azondi.main.t44847.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/topics/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45066){var state_val_45067 = (state_45066[1]);if((state_val_45067 === 3))
{var inst_45061 = (state_45066[2]);var inst_45062 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_45061);var inst_45063 = new cljs.core.Keyword(null,"topics","topics",4440837270).cljs$core$IFn$_invoke$arity$1(inst_45062);var inst_45064 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.Keyword(null,"topics","topics",4440837270),inst_45063);var state_45066__$1 = state_45066;return cljs.core.async.impl.ioc_helpers.return_chan(state_45066__$1,inst_45064);
} else
{if((state_val_45067 === 2))
{var inst_45059 = (state_45066[2]);var state_45066__$1 = (function (){var statearr_45068 = state_45066;(statearr_45068[7] = inst_45059);
return statearr_45068;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45066__$1,3,ajax_recv);
} else
{if((state_val_45067 === 1))
{var state_45066__$1 = state_45066;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45066__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45072 = [null,null,null,null,null,null,null,null];(statearr_45072[0] = state_machine__24506__auto__);
(statearr_45072[1] = 1);
return statearr_45072;
});
var state_machine__24506__auto____1 = (function (state_45066){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45066);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45073){if((e45073 instanceof Object))
{var ex__24509__auto__ = e45073;var statearr_45074_45097 = state_45066;(statearr_45074_45097[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45066);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45073;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45098 = state_45066;
state_45066 = G__45098;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45066){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45066);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45075 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45075[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45075;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
azondi.main.t44847.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44849){var self__ = this;
var _44849__$1 = this;return self__.meta44848;
});
azondi.main.t44847.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44849,meta44848__$1){var self__ = this;
var _44849__$1 = this;return (new azondi.main.t44847(self__.owner,self__.app_state,self__.topics_list_component,meta44848__$1));
});
azondi.main.__GT_t44847 = (function __GT_t44847(owner__$1,app_state__$1,topics_list_component__$1,meta44848){return (new azondi.main.t44847(owner__$1,app_state__$1,topics_list_component__$1,meta44848));
});
}
return (new azondi.main.t44847(owner,app_state,topics_list_component,null));
});
azondi.main.update_topics_list_BANG_ = (function update_topics_list_BANG_(user,app_state){var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"uri","uri",1014020318),[cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(user),cljs.core.str("/topics/")].join('')], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45125){var state_val_45126 = (state_45125[1]);if((state_val_45126 === 3))
{var inst_45120 = (state_45125[2]);var inst_45121 = new cljs.core.Keyword(null,"body","body",1016933652).cljs$core$IFn$_invoke$arity$1(inst_45120);var inst_45122 = new cljs.core.Keyword(null,"topics","topics",4440837270).cljs$core$IFn$_invoke$arity$1(inst_45121);var inst_45123 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(app_state,new cljs.core.Keyword(null,"topics","topics",4440837270),inst_45122);var state_45125__$1 = state_45125;return cljs.core.async.impl.ioc_helpers.return_chan(state_45125__$1,inst_45123);
} else
{if((state_val_45126 === 2))
{var inst_45118 = (state_45125[2]);var state_45125__$1 = (function (){var statearr_45127 = state_45125;(statearr_45127[7] = inst_45118);
return statearr_45127;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45125__$1,3,ajax_recv);
} else
{if((state_val_45126 === 1))
{var state_45125__$1 = state_45125;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45125__$1,2,ajax_send,cljs.core.PersistentHashMap.EMPTY);
} else
{return null;
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45131 = [null,null,null,null,null,null,null,null];(statearr_45131[0] = state_machine__24506__auto__);
(statearr_45131[1] = 1);
return statearr_45131;
});
var state_machine__24506__auto____1 = (function (state_45125){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45125);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45132){if((e45132 instanceof Object))
{var ex__24509__auto__ = e45132;var statearr_45133_45135 = state_45125;(statearr_45133_45135[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45125);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45132;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45136 = state_45125;
state_45125 = G__45136;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45125){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45125);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45134 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45134[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45134;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Click this button to register  new topic
*/
azondi.main.new_topic_button_component = (function new_topic_button_component(app_state,owner){if(typeof azondi.main.t45215 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t45215 = (function (owner,app_state,new_topic_button_component,meta45216){
this.owner = owner;
this.app_state = app_state;
this.new_topic_button_component = new_topic_button_component;
this.meta45216 = meta45216;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t45215.cljs$lang$type = true;
azondi.main.t45215.cljs$lang$ctorStr = "azondi.main/t45215";
azondi.main.t45215.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t45215");
});
azondi.main.t45215.prototype.om$core$IRender$ = true;
azondi.main.t45215.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.form({"className": "form-horizontal", "onSubmit": (function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617)], 0));var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45267){var state_val_45268 = (state_45267[1]);if((state_val_45268 === 7))
{var state_45267__$1 = state_45267;var statearr_45269_45293 = state_45267__$1;(statearr_45269_45293[2] = "");
(statearr_45269_45293[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 1))
{var inst_45230 = (state_45267[7]);var inst_45220 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_45221 = cljs.core.deref(self__.app_state);var inst_45222 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_45221);var inst_45223 = cljs.core.deref(self__.app_state);var inst_45224 = new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(inst_45223);var inst_45225 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_45222),cljs.core.str("/topics/"),cljs.core.str(inst_45224)].join('');var inst_45226 = [new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_45227 = cljs.core.deref(self__.app_state);var inst_45228 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_45229 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45228,null));var inst_45230__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_45227,inst_45229);var state_45267__$1 = (function (){var statearr_45270 = state_45267;(statearr_45270[7] = inst_45230__$1);
(statearr_45270[8] = inst_45220);
(statearr_45270[9] = inst_45225);
(statearr_45270[10] = inst_45226);
return statearr_45270;
})();if(cljs.core.truth_(inst_45230__$1))
{var statearr_45271_45294 = state_45267__$1;(statearr_45271_45294[1] = 3);
} else
{var statearr_45272_45295 = state_45267__$1;(statearr_45272_45295[1] = 4);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 4))
{var state_45267__$1 = state_45267;var statearr_45273_45296 = state_45267__$1;(statearr_45273_45296[2] = "");
(statearr_45273_45296[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 6))
{var inst_45238 = (state_45267[11]);var state_45267__$1 = state_45267;var statearr_45274_45297 = state_45267__$1;(statearr_45274_45297[2] = inst_45238);
(statearr_45274_45297[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 3))
{var inst_45230 = (state_45267[7]);var state_45267__$1 = state_45267;var statearr_45275_45298 = state_45267__$1;(statearr_45275_45298[2] = inst_45230);
(statearr_45275_45298[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 12))
{var inst_45257 = (state_45267[2]);var inst_45258 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45257,new cljs.core.Keyword(null,"body","body",1016933652));var inst_45259 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45257,new cljs.core.Keyword(null,"status","status",4416389988));var inst_45260 = [inst_45259,inst_45258];var inst_45261 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45260,null));var inst_45262 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to creating topic is",inst_45261], 0));var inst_45263 = cljs.core.deref(self__.app_state);var inst_45264 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_45263);var inst_45265 = azondi.main.update_topics_list_BANG_(inst_45264,self__.app_state);var state_45267__$1 = (function (){var statearr_45276 = state_45267;(statearr_45276[12] = inst_45262);
return statearr_45276;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_45267__$1,inst_45265);
} else
{if((state_val_45268 === 2))
{var inst_45248 = (state_45267[2]);var state_45267__$1 = (function (){var statearr_45277 = state_45267;(statearr_45277[13] = inst_45248);
return statearr_45277;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45267__$1,9,ajax_recv);
} else
{if((state_val_45268 === 11))
{var inst_45251 = (state_45267[14]);var state_45267__$1 = state_45267;var statearr_45278_45299 = state_45267__$1;(statearr_45278_45299[2] = inst_45251);
(statearr_45278_45299[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 9))
{var inst_45251 = (state_45267[14]);var inst_45251__$1 = (state_45267[2]);var inst_45252 = cljs.core.seq_QMARK_(inst_45251__$1);var state_45267__$1 = (function (){var statearr_45279 = state_45267;(statearr_45279[14] = inst_45251__$1);
return statearr_45279;
})();if(inst_45252)
{var statearr_45280_45300 = state_45267__$1;(statearr_45280_45300[1] = 10);
} else
{var statearr_45281_45301 = state_45267__$1;(statearr_45281_45301[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 5))
{var inst_45238 = (state_45267[11]);var inst_45234 = (state_45267[2]);var inst_45235 = cljs.core.deref(self__.app_state);var inst_45236 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_45237 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45236,null));var inst_45238__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_45235,inst_45237);var state_45267__$1 = (function (){var statearr_45282 = state_45267;(statearr_45282[11] = inst_45238__$1);
(statearr_45282[15] = inst_45234);
return statearr_45282;
})();if(cljs.core.truth_(inst_45238__$1))
{var statearr_45283_45302 = state_45267__$1;(statearr_45283_45302[1] = 6);
} else
{var statearr_45284_45303 = state_45267__$1;(statearr_45284_45303[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 10))
{var inst_45251 = (state_45267[14]);var inst_45254 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_45251);var state_45267__$1 = state_45267;var statearr_45285_45304 = state_45267__$1;(statearr_45285_45304[2] = inst_45254);
(statearr_45285_45304[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45268 === 8))
{var inst_45220 = (state_45267[8]);var inst_45234 = (state_45267[15]);var inst_45225 = (state_45267[9]);var inst_45226 = (state_45267[10]);var inst_45242 = (state_45267[2]);var inst_45243 = [inst_45234,inst_45242];var inst_45244 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45226,inst_45243) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45226,inst_45243));var inst_45245 = [inst_45225,inst_45244];var inst_45246 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45220,inst_45245) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45220,inst_45245));var state_45267__$1 = state_45267;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45267__$1,2,ajax_send,inst_45246);
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
var state_machine__24506__auto____0 = (function (){var statearr_45289 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_45289[0] = state_machine__24506__auto__);
(statearr_45289[1] = 1);
return statearr_45289;
});
var state_machine__24506__auto____1 = (function (state_45267){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45267);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45290){if((e45290 instanceof Object))
{var ex__24509__auto__ = e45290;var statearr_45291_45305 = state_45267;(statearr_45291_45305[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45267);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45290;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45306 = state_45267;
state_45267 = G__45306;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45267){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45267);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45292 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45292[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45292;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},React.DOM.div({"className": "control-group"},React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"id": "name", "type": "text", "placeholder": "Name of new topic", "onChange": (function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264)], null),value);
})}) : sablono.interpreter.input.call(null,{"id": "name", "type": "text", "placeholder": "Name of new topic", "onChange": (function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264)], null),value);
})})),sablono.interpreter.interpret((cljs.core.truth_(cljs.core.not_empty(new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(self__.app_state)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"Topic will be created as ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1016963423),[cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(self__.app_state)),cljs.core.str("/"),cljs.core.str(new cljs.core.Keyword(null,"new-topic-name","new-topic-name",4004980264).cljs$core$IFn$_invoke$arity$1(self__.app_state))].join('')], null)], null):null))),React.DOM.div({"className": "controls"},(sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1 ? sablono.interpreter.input.cljs$core$IFn$_invoke$arity$1({"className": "btn btn-primary", "type": "submit", "value": "Create user topic"}) : sablono.interpreter.input.call(null,{"className": "btn btn-primary", "type": "submit", "value": "Create user topic"})))));
});
azondi.main.t45215.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_45217){var self__ = this;
var _45217__$1 = this;return self__.meta45216;
});
azondi.main.t45215.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_45217,meta45216__$1){var self__ = this;
var _45217__$1 = this;return (new azondi.main.t45215(self__.owner,self__.app_state,self__.new_topic_button_component,meta45216__$1));
});
azondi.main.__GT_t45215 = (function __GT_t45215(owner__$1,app_state__$1,new_topic_button_component__$1,meta45216){return (new azondi.main.t45215(owner__$1,app_state__$1,new_topic_button_component__$1,meta45216));
});
}
return (new azondi.main.t45215(owner,app_state,new_topic_button_component,null));
});
/**
* Connect the topic debugger to the notification (server-sent event)
* source of the given topic name. Events are put to notify-ch.
*/
azondi.main.connect_topic_debugger = (function connect_topic_debugger(owner,name,notify_ch){var temp__4126__auto___45307 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376));if(cljs.core.truth_(temp__4126__auto___45307))
{var es_45308 = temp__4126__auto___45307;es_45308.close();
} else
{}
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(owner,new cljs.core.Keyword(null,"event-source","event-source",643961376),azondi.net.listen_sse([cljs.core.str("/topic-events/"),cljs.core.str(name)].join(''),notify_ch));
});
azondi.main.topic_details_component = (function topic_details_component(app_state,owner){if(typeof azondi.main.t45457 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t45457 = (function (owner,app_state,topic_details_component,meta45458){
this.owner = owner;
this.app_state = app_state;
this.topic_details_component = topic_details_component;
this.meta45458 = meta45458;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t45457.cljs$lang$type = true;
azondi.main.t45457.cljs$lang$ctorStr = "azondi.main/t45457";
azondi.main.t45457.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t45457");
});
azondi.main.t45457.prototype.om$core$IRender$ = true;
azondi.main.t45457.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return sablono.interpreter.interpret((function (){var topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"put","put",1014015617)], 0));var temp__4126__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.truth_(temp__4126__auto__))
{var topic__$1 = temp__4126__auto__;var uri = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/topics/"),cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic__$1,cljs.core.count([cljs.core.str("/users/"),cljs.core.str(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state))),cljs.core.str("/")].join(''))))].join('');cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["PUT to topic detail uri:",uri], 0));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45491){var state_val_45492 = (state_45491[1]);if((state_val_45492 === 9))
{var inst_45485 = (state_45491[2]);var inst_45486 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Response to PUT is",inst_45485], 0));var inst_45487 = cljs.core.deref(self__.app_state);var inst_45488 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_45487);var inst_45489 = azondi.main.update_topics_list_BANG_(inst_45488,self__.app_state);var state_45491__$1 = (function (){var statearr_45493 = state_45491;(statearr_45493[7] = inst_45486);
return statearr_45493;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_45491__$1,inst_45489);
} else
{if((state_val_45492 === 8))
{var inst_45469 = (state_45491[8]);var inst_45460 = (state_45491[9]);var inst_45461 = (state_45491[10]);var inst_45477 = (state_45491[2]);var inst_45478 = [inst_45469,inst_45477];var inst_45479 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45461,inst_45478) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45461,inst_45478));var inst_45480 = [uri,inst_45479];var inst_45481 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45460,inst_45480) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45460,inst_45480));var state_45491__$1 = state_45491;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45491__$1,2,ajax_send,inst_45481);
} else
{if((state_val_45492 === 7))
{var state_45491__$1 = state_45491;var statearr_45494_45603 = state_45491__$1;(statearr_45494_45603[2] = "");
(statearr_45494_45603[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45492 === 6))
{var inst_45473 = (state_45491[11]);var state_45491__$1 = state_45491;var statearr_45495_45604 = state_45491__$1;(statearr_45495_45604[2] = inst_45473);
(statearr_45495_45604[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45492 === 5))
{var inst_45473 = (state_45491[11]);var inst_45469 = (state_45491[2]);var inst_45470 = cljs.core.deref(self__.app_state);var inst_45471 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_45472 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45471,null));var inst_45473__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_45470,inst_45472);var state_45491__$1 = (function (){var statearr_45496 = state_45491;(statearr_45496[8] = inst_45469);
(statearr_45496[11] = inst_45473__$1);
return statearr_45496;
})();if(cljs.core.truth_(inst_45473__$1))
{var statearr_45497_45605 = state_45491__$1;(statearr_45497_45605[1] = 6);
} else
{var statearr_45498_45606 = state_45491__$1;(statearr_45498_45606[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45492 === 4))
{var state_45491__$1 = state_45491;var statearr_45499_45607 = state_45491__$1;(statearr_45499_45607[2] = "");
(statearr_45499_45607[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45492 === 3))
{var inst_45465 = (state_45491[12]);var state_45491__$1 = state_45491;var statearr_45500_45608 = state_45491__$1;(statearr_45500_45608[2] = inst_45465);
(statearr_45500_45608[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45492 === 2))
{var inst_45483 = (state_45491[2]);var state_45491__$1 = (function (){var statearr_45501 = state_45491;(statearr_45501[13] = inst_45483);
return statearr_45501;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45491__$1,9,ajax_recv);
} else
{if((state_val_45492 === 1))
{var inst_45465 = (state_45491[12]);var inst_45460 = [new cljs.core.Keyword(null,"uri","uri",1014020318),new cljs.core.Keyword(null,"content","content",1965434859)];var inst_45461 = [new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"unit","unit",1017498870)];var inst_45462 = cljs.core.deref(self__.app_state);var inst_45463 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)];var inst_45464 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45463,null));var inst_45465__$1 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(inst_45462,inst_45464);var state_45491__$1 = (function (){var statearr_45502 = state_45491;(statearr_45502[9] = inst_45460);
(statearr_45502[12] = inst_45465__$1);
(statearr_45502[10] = inst_45461);
return statearr_45502;
})();if(cljs.core.truth_(inst_45465__$1))
{var statearr_45503_45609 = state_45491__$1;(statearr_45503_45609[1] = 3);
} else
{var statearr_45504_45610 = state_45491__$1;(statearr_45504_45610[1] = 4);
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
var state_machine__24506__auto____0 = (function (){var statearr_45508 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_45508[0] = state_machine__24506__auto__);
(statearr_45508[1] = 1);
return statearr_45508;
});
var state_machine__24506__auto____1 = (function (state_45491){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45491);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45509){if((e45509 instanceof Object))
{var ex__24509__auto__ = e45509;var statearr_45510_45611 = state_45491;(statearr_45510_45611[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45491);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45509;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45612 = state_45491;
state_45491 = G__45612;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45491){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45491);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45511 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45511[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45511;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
} else
{return null;
}
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Topic"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"topic",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null)),new cljs.core.Keyword(null,"editable","editable",2616320470),false,new cljs.core.Keyword(null,"disabled","disabled",1284845038),true], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Description"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"description",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"description","description",3584325486)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional description"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label.control-label","label.control-label",3438948476),"Unit"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1017277949),"unit",new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",1127031096),"60%"], null),new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)], null)),new cljs.core.Keyword(null,"onChange","onChange",2050678241),(function (e){var value = e.target.value;return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"unit","unit",1017498870)], null),value);
}),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"optional unit of measure e.g. PM25, celcius"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.control-group","div.control-group",935401188),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn","input.btn",2719727018),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Apply"], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form.form-horizontal","form.form-horizontal",3586580245),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onSubmit","onSubmit",2520779337),(function (ev){ev.preventDefault();
var ajax_send_45613 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv_45614 = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send_45613,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"delete","delete",3973413149)], 0));var temp__4124__auto___45615 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.app_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.truth_(temp__4124__auto___45615))
{var topic_45616__$1 = temp__4124__auto___45615;var c__24520__auto___45617 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45549){var state_val_45550 = (state_45549[1]);if((state_val_45550 === 9))
{var inst_45547 = (state_45549[2]);var state_45549__$1 = state_45549;return cljs.core.async.impl.ioc_helpers.return_chan(state_45549__$1,inst_45547);
} else
{if((state_val_45550 === 8))
{var state_45549__$1 = state_45549;var statearr_45551_45618 = state_45549__$1;(statearr_45551_45618[2] = null);
(statearr_45551_45618[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 7))
{var inst_45535 = (state_45549[7]);var inst_45534 = (state_45549[8]);var inst_45533 = (state_45549[9]);var inst_45538 = [new cljs.core.Keyword(null,"topic","topic",1124450465)];var inst_45539 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45538,null));var inst_45540 = om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_45539,null);var inst_45541 = [new cljs.core.Keyword(null,"topics","topics",4440837270)];var inst_45542 = (new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45541,null));var inst_45543 = (function (){var status = inst_45535;var body = inst_45534;var map__45525 = inst_45533;return ((function (status,body,map__45525,inst_45535,inst_45534,inst_45533,inst_45538,inst_45539,inst_45540,inst_45541,inst_45542,state_val_45550){
return (function (topics){return cljs.core.remove(((function (status,body,map__45525,inst_45535,inst_45534,inst_45533,inst_45538,inst_45539,inst_45540,inst_45541,inst_45542,state_val_45550){
return (function (p1__45310_SHARP_){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(p1__45310_SHARP_),cljs.core.name);
});})(status,body,map__45525,inst_45535,inst_45534,inst_45533,inst_45538,inst_45539,inst_45540,inst_45541,inst_45542,state_val_45550))
,topics);
});
;})(status,body,map__45525,inst_45535,inst_45534,inst_45533,inst_45538,inst_45539,inst_45540,inst_45541,inst_45542,state_val_45550))
})();var inst_45544 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_45542,inst_45543);var state_45549__$1 = (function (){var statearr_45552 = state_45549;(statearr_45552[10] = inst_45540);
return statearr_45552;
})();var statearr_45553_45619 = state_45549__$1;(statearr_45553_45619[2] = inst_45544);
(statearr_45553_45619[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 6))
{var inst_45535 = (state_45549[7]);var inst_45533 = (state_45549[9]);var inst_45533__$1 = (state_45549[2]);var inst_45534 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45533__$1,new cljs.core.Keyword(null,"body","body",1016933652));var inst_45535__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_45533__$1,new cljs.core.Keyword(null,"status","status",4416389988));var inst_45536 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_45535__$1,204);var state_45549__$1 = (function (){var statearr_45554 = state_45549;(statearr_45554[7] = inst_45535__$1);
(statearr_45554[8] = inst_45534);
(statearr_45554[9] = inst_45533__$1);
return statearr_45554;
})();if(inst_45536)
{var statearr_45555_45620 = state_45549__$1;(statearr_45555_45620[1] = 7);
} else
{var statearr_45556_45621 = state_45549__$1;(statearr_45556_45621[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 5))
{var inst_45527 = (state_45549[11]);var state_45549__$1 = state_45549;var statearr_45557_45622 = state_45549__$1;(statearr_45557_45622[2] = inst_45527);
(statearr_45557_45622[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 4))
{var inst_45527 = (state_45549[11]);var inst_45530 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_45527);var state_45549__$1 = state_45549;var statearr_45558_45623 = state_45549__$1;(statearr_45558_45623[2] = inst_45530);
(statearr_45558_45623[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 3))
{var inst_45527 = (state_45549[11]);var inst_45527__$1 = (state_45549[2]);var inst_45528 = cljs.core.seq_QMARK_(inst_45527__$1);var state_45549__$1 = (function (){var statearr_45559 = state_45549;(statearr_45559[11] = inst_45527__$1);
return statearr_45559;
})();if(inst_45528)
{var statearr_45560_45624 = state_45549__$1;(statearr_45560_45624[1] = 4);
} else
{var statearr_45561_45625 = state_45549__$1;(statearr_45561_45625[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45550 === 2))
{var inst_45524 = (state_45549[2]);var state_45549__$1 = (function (){var statearr_45562 = state_45549;(statearr_45562[12] = inst_45524);
return statearr_45562;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45549__$1,3,ajax_recv_45614);
} else
{if((state_val_45550 === 1))
{var inst_45512 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_45513 = cljs.core.deref(self__.app_state);var inst_45514 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_45513);var inst_45515 = cljs.core.deref(self__.app_state);var inst_45516 = new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(inst_45515);var inst_45517 = [cljs.core.str("/users/"),cljs.core.str(inst_45516),cljs.core.str("/")].join('');var inst_45518 = cljs.core.count(inst_45517);var inst_45519 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(topic_45616__$1,inst_45518);var inst_45520 = [cljs.core.str(azondi.main.hostname),cljs.core.str("/api/1.0/users/"),cljs.core.str(inst_45514),cljs.core.str("/topics/"),cljs.core.str(inst_45519)].join('');var inst_45521 = [inst_45520];var inst_45522 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45512,inst_45521) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45512,inst_45521));var state_45549__$1 = state_45549;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45549__$1,2,ajax_send_45613,inst_45522);
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
var state_machine__24506__auto____0 = (function (){var statearr_45566 = [null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_45566[0] = state_machine__24506__auto__);
(statearr_45566[1] = 1);
return statearr_45566;
});
var state_machine__24506__auto____1 = (function (state_45549){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45549);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45567){if((e45567 instanceof Object))
{var ex__24509__auto__ = e45567;var statearr_45568_45626 = state_45549;(statearr_45568_45626[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45549);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45567;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45627 = state_45549;
state_45549 = G__45627;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45549){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45549);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45569 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45569[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___45617);
return statearr_45569;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
} else
{}
return azondi.main.update_topics_list_BANG_(new cljs.core.Keyword(null,"user","user",1017503549).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(self__.app_state)),self__.app_state);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",1013907517),"Delete topic"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"This will delete the topic permanently."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.btn.btn-danger","input.btn.btn-danger",3258750876),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"action",new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),"Delete topic"], null)], null)], null)], null);
})());
});
azondi.main.t45457.prototype.om$core$IWillUpdate$ = true;
azondi.main.t45457.prototype.om$core$IWillUpdate$will_update$arity$3 = (function (this$,next_props,next_state){var self__ = this;
var this$__$1 = this;var old_topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));var new_topic = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(next_props,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"topic","topic",1124450465)], null));if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_topic,new_topic))
{return null;
} else
{return null;
}
});
azondi.main.t45457.prototype.om$core$IWillMount$ = true;
azondi.main.t45457.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var notify_ch = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719));var c__24520__auto___45628 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45585){var state_val_45586 = (state_45585[1]);if((state_val_45586 === 7))
{var inst_45581 = (state_45585[2]);var state_45585__$1 = state_45585;var statearr_45587_45629 = state_45585__$1;(statearr_45587_45629[2] = inst_45581);
(statearr_45587_45629[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45586 === 6))
{var state_45585__$1 = state_45585;var statearr_45588_45630 = state_45585__$1;(statearr_45588_45630[2] = null);
(statearr_45588_45630[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45586 === 5))
{var inst_45572 = (state_45585[7]);var inst_45574 = [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_45575 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45574,null));var inst_45576 = (function (){var message = inst_45572;var temp__4126__auto__ = inst_45572;return ((function (message,temp__4126__auto__,inst_45572,inst_45574,inst_45575,state_val_45586){
return (function (p1__45309_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__21049__auto__ = p1__45309_SHARP_;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),[cljs.core.str(new cljs.core.Keyword(null,"time","time",1017464383).cljs$core$IFn$_invoke$arity$1(message)),cljs.core.str(" "),cljs.core.str((function (){var G__45589 = new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(message);if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"error","error",1110689146),G__45589))
{cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message], 0))], 0));
return "ERROR";
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"open","open",1017321916),G__45589))
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
;})(message,temp__4126__auto__,inst_45572,inst_45574,inst_45575,state_val_45586))
})();var inst_45577 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_45575,inst_45576);var state_45585__$1 = (function (){var statearr_45590 = state_45585;(statearr_45590[8] = inst_45577);
return statearr_45590;
})();var statearr_45591_45631 = state_45585__$1;(statearr_45591_45631[2] = null);
(statearr_45591_45631[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45586 === 4))
{var inst_45572 = (state_45585[7]);var inst_45572__$1 = (state_45585[2]);var state_45585__$1 = (function (){var statearr_45592 = state_45585;(statearr_45592[7] = inst_45572__$1);
return statearr_45592;
})();if(cljs.core.truth_(inst_45572__$1))
{var statearr_45593_45632 = state_45585__$1;(statearr_45593_45632[1] = 5);
} else
{var statearr_45594_45633 = state_45585__$1;(statearr_45594_45633[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45586 === 3))
{var inst_45583 = (state_45585[2]);var state_45585__$1 = state_45585;return cljs.core.async.impl.ioc_helpers.return_chan(state_45585__$1,inst_45583);
} else
{if((state_val_45586 === 2))
{var state_45585__$1 = state_45585;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45585__$1,4,notify_ch);
} else
{if((state_val_45586 === 1))
{var state_45585__$1 = state_45585;var statearr_45595_45634 = state_45585__$1;(statearr_45595_45634[2] = null);
(statearr_45595_45634[1] = 2);
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
var state_machine__24506__auto____0 = (function (){var statearr_45599 = [null,null,null,null,null,null,null,null,null];(statearr_45599[0] = state_machine__24506__auto__);
(statearr_45599[1] = 1);
return statearr_45599;
});
var state_machine__24506__auto____1 = (function (state_45585){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45585);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45600){if((e45600 instanceof Object))
{var ex__24509__auto__ = e45600;var statearr_45601_45635 = state_45585;(statearr_45601_45635[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45585);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45600;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45636 = state_45585;
state_45585 = G__45636;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45585){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45585);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45602 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45602[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___45628);
return statearr_45602;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return azondi.main.connect_topic_debugger(self__.owner,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"topic","topic",1124450465),new cljs.core.Keyword(null,"name","name",1017277949)], null)),notify_ch);
});
azondi.main.t45457.prototype.om$core$IInitState$ = true;
azondi.main.t45457.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"debugger-events","debugger-events",928289719),cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0()], null);
});
azondi.main.t45457.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_45459){var self__ = this;
var _45459__$1 = this;return self__.meta45458;
});
azondi.main.t45457.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_45459,meta45458__$1){var self__ = this;
var _45459__$1 = this;return (new azondi.main.t45457(self__.owner,self__.app_state,self__.topic_details_component,meta45458__$1));
});
azondi.main.__GT_t45457 = (function __GT_t45457(owner__$1,app_state__$1,topic_details_component__$1,meta45458){return (new azondi.main.t45457(owner__$1,app_state__$1,topic_details_component__$1,meta45458));
});
}
return (new azondi.main.t45457(owner,app_state,topic_details_component,null));
});
azondi.main.topics_page_component = (function topics_page_component(app_state,owner){if(typeof azondi.main.t45641 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t45641 = (function (owner,app_state,topics_page_component,meta45642){
this.owner = owner;
this.app_state = app_state;
this.topics_page_component = topics_page_component;
this.meta45642 = meta45642;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t45641.cljs$lang$type = true;
azondi.main.t45641.cljs$lang$ctorStr = "azondi.main/t45641";
azondi.main.t45641.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t45641");
});
azondi.main.t45641.prototype.om$core$IRender$ = true;
azondi.main.t45641.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var attrs45644 = om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topics_list_component,self__.app_state);if(cljs.core.map_QMARK_(attrs45644))
{return React.DOM.div(sablono.interpreter.attributes(attrs45644),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_topic_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"topic","topic",1124450465).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topic_details_component,self__.app_state):null)));
} else
{return React.DOM.div(null,sablono.interpreter.interpret(attrs45644),sablono.interpreter.interpret(om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.new_topic_button_component,self__.app_state)),sablono.interpreter.interpret((cljs.core.truth_(new cljs.core.Keyword(null,"topic","topic",1124450465).cljs$core$IFn$_invoke$arity$1(self__.app_state))?om.core.build.cljs$core$IFn$_invoke$arity$2(azondi.main.topic_details_component,self__.app_state):null)));
}
});
azondi.main.t45641.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_45643){var self__ = this;
var _45643__$1 = this;return self__.meta45642;
});
azondi.main.t45641.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_45643,meta45642__$1){var self__ = this;
var _45643__$1 = this;return (new azondi.main.t45641(self__.owner,self__.app_state,self__.topics_page_component,meta45642__$1));
});
azondi.main.__GT_t45641 = (function __GT_t45641(owner__$1,app_state__$1,topics_page_component__$1,meta45642){return (new azondi.main.t45641(owner__$1,app_state__$1,topics_page_component__$1,meta45642));
});
}
return (new azondi.main.t45641(owner,app_state,topics_page_component,null));
});
azondi.main.topics_page = (function topics_page(user){cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(azondi.main.app_model,cljs.core.assoc,new cljs.core.Keyword(null,"user","user",1017503549),user);
return om.core.root(azondi.main.topics_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.topics_page', azondi.main.topics_page);
azondi.main.test_card_page_component = (function test_card_page_component(app_state,owner){if(typeof azondi.main.t45731 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.main.t45731 = (function (owner,app_state,test_card_page_component,meta45732){
this.owner = owner;
this.app_state = app_state;
this.test_card_page_component = test_card_page_component;
this.meta45732 = meta45732;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.main.t45731.cljs$lang$type = true;
azondi.main.t45731.cljs$lang$ctorStr = "azondi.main/t45731";
azondi.main.t45731.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.main/t45731");
});
azondi.main.t45731.prototype.om$core$IRender$ = true;
azondi.main.t45731.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.div(null,React.DOM.h1(null,"Test Card"),React.DOM.p(null,"Click on the buttons to test the API."),React.DOM.p(null,"This demonstrates (and tests) that the JSON messages of the API are rendered as canonical JSON with camelCase keys. Check this by analysing the request/response of each message with the Developer Tools of your browser."),React.DOM.p(null,"The use of the ",React.DOM.code(null,"ajaj<")," core.async function ensures that the ClojureScript code doesn't have to deal with JSON. Check this by looking at the format of the messages printed below. They should be in canonical EDN format with kebab-case keywords. JSON keys, in contrast, don't work well with many ClojureScript forms, such as map destructuring."),React.DOM.p(null,React.DOM.button({"className": "btn btn-primary", "onClick": (function (){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45752){var state_val_45753 = (state_45752[1]);if((state_val_45753 === 2))
{var inst_45750 = (state_45752[2]);var state_45752__$1 = state_45752;return cljs.core.async.impl.ioc_helpers.return_chan(state_45752__$1,inst_45750);
} else
{if((state_val_45753 === 1))
{var inst_45745 = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"channel","channel",1752854645));var inst_45746 = [new cljs.core.Keyword(null,"uri","uri",1014020318)];var inst_45747 = ["/api/1.0"];var inst_45748 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45746,inst_45747) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45746,inst_45747));var state_45752__$1 = state_45752;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_45752__$1,2,inst_45745,inst_45748);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45757 = [null,null,null,null,null,null,null];(statearr_45757[0] = state_machine__24506__auto__);
(statearr_45757[1] = 1);
return statearr_45757;
});
var state_machine__24506__auto____1 = (function (state_45752){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45752);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45758){if((e45758 instanceof Object))
{var ex__24509__auto__ = e45758;var statearr_45759_45816 = state_45752;(statearr_45759_45816[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45752);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45758;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45817 = state_45752;
state_45752 = G__45817;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45752){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45752);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45760 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45760[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45760;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},"Welcome in JSON"),React.DOM.button({"className": "btn", "onClick": (function (){return om.core.update_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.Keyword(null,"messages","messages",551810238)], null),cljs.core.PersistentVector.EMPTY);
})},"Clear"),React.DOM.button({"className": "btn", "onClick": (function (ev){cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Connecting"], 0));
var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45769){var state_val_45770 = (state_45769[1]);if((state_val_45770 === 2))
{var inst_45766 = (state_45769[2]);var inst_45767 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Websocket ch",chord.client.ws_ch], 0));var state_45769__$1 = (function (){var statearr_45771 = state_45769;(statearr_45771[7] = inst_45766);
return statearr_45771;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_45769__$1,inst_45767);
} else
{if((state_val_45770 === 1))
{var inst_45761 = [new cljs.core.Keyword(null,"format","format",4040092521)];var inst_45762 = [new cljs.core.Keyword(null,"json-kw","json-kw",3998200803)];var inst_45763 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_45761,inst_45762) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_45761,inst_45762));var inst_45764 = chord.client.ws_ch.cljs$core$IFn$_invoke$arity$variadic("ws://localhost:8083/events/stream/users/alice",cljs.core.array_seq([inst_45763], 0));var state_45769__$1 = state_45769;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45769__$1,2,inst_45764);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_45775 = [null,null,null,null,null,null,null,null];(statearr_45775[0] = state_machine__24506__auto__);
(statearr_45775[1] = 1);
return statearr_45775;
});
var state_machine__24506__auto____1 = (function (state_45769){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45769);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45776){if((e45776 instanceof Object))
{var ex__24509__auto__ = e45776;var statearr_45777_45818 = state_45769;(statearr_45777_45818[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45769);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45776;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45819 = state_45769;
state_45769 = G__45819;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45769){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45769);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45778 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45778[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_45778;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
})},"Connect")),React.DOM.h2(null,"Messages"),cljs.core.into_array.cljs$core$IFn$_invoke$arity$1((function (){var iter__21766__auto__ = (function iter__45779(s__45780){return (new cljs.core.LazySeq(null,(function (){var s__45780__$1 = s__45780;while(true){
var temp__4126__auto__ = cljs.core.seq(s__45780__$1);if(temp__4126__auto__)
{var s__45780__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__45780__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__45780__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__45782 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__45781 = 0;while(true){
if((i__45781 < size__21765__auto__))
{var msg = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__45781);cljs.core.chunk_append(b__45782,(function (){var attrs45744 = msg;if(cljs.core.map_QMARK_(attrs45744))
{return React.DOM.p(sablono.interpreter.attributes(attrs45744),null);
} else
{return React.DOM.p(null,sablono.interpreter.interpret(attrs45744));
}
})());
{
var G__45820 = (i__45781 + 1);
i__45781 = G__45820;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__45782),iter__45779(cljs.core.chunk_rest(s__45780__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__45782),null);
}
} else
{var msg = cljs.core.first(s__45780__$2);return cljs.core.cons((function (){var attrs45744 = msg;if(cljs.core.map_QMARK_(attrs45744))
{return React.DOM.p(sablono.interpreter.attributes(attrs45744),null);
} else
{return React.DOM.p(null,sablono.interpreter.interpret(attrs45744));
}
})(),iter__45779(cljs.core.rest(s__45780__$2)));
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
azondi.main.t45731.prototype.om$core$IWillMount$ = true;
azondi.main.t45731.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var ajax_send = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var ajax_recv = azondi.net.ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ajax_send,new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472)], 0));var c__24520__auto___45821 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_45799){var state_val_45800 = (state_45799[1]);if((state_val_45800 === 7))
{var inst_45795 = (state_45799[2]);var state_45799__$1 = state_45799;var statearr_45801_45822 = state_45799__$1;(statearr_45801_45822[2] = inst_45795);
(statearr_45801_45822[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45800 === 6))
{var state_45799__$1 = state_45799;var statearr_45802_45823 = state_45799__$1;(statearr_45802_45823[2] = null);
(statearr_45802_45823[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45800 === 5))
{var inst_45785 = (state_45799[7]);var inst_45787 = cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_45785], 0));var inst_45788 = [new cljs.core.Keyword(null,"test-card","test-card",4082063069),new cljs.core.Keyword(null,"messages","messages",551810238)];var inst_45789 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_45788,null));var inst_45790 = (function (){var data = inst_45785;var temp__4126__auto__ = inst_45785;return ((function (data,temp__4126__auto__,inst_45785,inst_45787,inst_45788,inst_45789,state_val_45800){
return (function (p1__45645_SHARP_){return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__45645_SHARP_,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data], 0)));
});
;})(data,temp__4126__auto__,inst_45785,inst_45787,inst_45788,inst_45789,state_val_45800))
})();var inst_45791 = om.core.transact_BANG_.cljs$core$IFn$_invoke$arity$3(self__.app_state,inst_45789,inst_45790);var state_45799__$1 = (function (){var statearr_45803 = state_45799;(statearr_45803[8] = inst_45791);
(statearr_45803[9] = inst_45787);
return statearr_45803;
})();var statearr_45804_45824 = state_45799__$1;(statearr_45804_45824[2] = null);
(statearr_45804_45824[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45800 === 4))
{var inst_45785 = (state_45799[7]);var inst_45785__$1 = (state_45799[2]);var state_45799__$1 = (function (){var statearr_45805 = state_45799;(statearr_45805[7] = inst_45785__$1);
return statearr_45805;
})();if(cljs.core.truth_(inst_45785__$1))
{var statearr_45806_45825 = state_45799__$1;(statearr_45806_45825[1] = 5);
} else
{var statearr_45807_45826 = state_45799__$1;(statearr_45807_45826[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_45800 === 3))
{var inst_45797 = (state_45799[2]);var state_45799__$1 = state_45799;return cljs.core.async.impl.ioc_helpers.return_chan(state_45799__$1,inst_45797);
} else
{if((state_val_45800 === 2))
{var state_45799__$1 = state_45799;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45799__$1,4,ajax_recv);
} else
{if((state_val_45800 === 1))
{var state_45799__$1 = state_45799;var statearr_45808_45827 = state_45799__$1;(statearr_45808_45827[2] = null);
(statearr_45808_45827[1] = 2);
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
var state_machine__24506__auto____0 = (function (){var statearr_45812 = [null,null,null,null,null,null,null,null,null,null];(statearr_45812[0] = state_machine__24506__auto__);
(statearr_45812[1] = 1);
return statearr_45812;
});
var state_machine__24506__auto____1 = (function (state_45799){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_45799);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e45813){if((e45813 instanceof Object))
{var ex__24509__auto__ = e45813;var statearr_45814_45828 = state_45799;(statearr_45814_45828[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_45799);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e45813;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__45829 = state_45799;
state_45799 = G__45829;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_45799){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_45799);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_45815 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_45815[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___45821);
return statearr_45815;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(self__.owner,new cljs.core.Keyword(null,"channel","channel",1752854645),ajax_send);
});
azondi.main.t45731.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_45733){var self__ = this;
var _45733__$1 = this;return self__.meta45732;
});
azondi.main.t45731.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_45733,meta45732__$1){var self__ = this;
var _45733__$1 = this;return (new azondi.main.t45731(self__.owner,self__.app_state,self__.test_card_page_component,meta45732__$1));
});
azondi.main.__GT_t45731 = (function __GT_t45731(owner__$1,app_state__$1,test_card_page_component__$1,meta45732){return (new azondi.main.t45731(owner__$1,app_state__$1,test_card_page_component__$1,meta45732));
});
}
return (new azondi.main.t45731(owner,app_state,test_card_page_component,null));
});
azondi.main.test_card = (function test_card(){return om.core.root(azondi.main.test_card_page_component,azondi.main.app_model,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),document.getElementById("content")], null));
});
goog.exportSymbol('azondi.main.test_card', azondi.main.test_card);
//# sourceMappingURL=main.js.map