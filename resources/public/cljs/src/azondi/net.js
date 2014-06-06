goog.provide('azondi.net');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.core.async');
goog.require('goog.json');
goog.require('goog.net.XhrManager');
goog.require('goog.json');
goog.require('azondi.csk');
goog.require('cljs.core.async');
goog.require('goog.events');
goog.require('goog.net.XhrManager');
goog.require('azondi.csk');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('goog.events');
goog.require('cljs.reader');
/**
* Dispatch on media type
*/
azondi.net.parse_response_body = (function (){var method_table__21907__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var prefer_table__21908__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var method_cache__21909__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__21910__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var hierarchy__21911__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy());return (new cljs.core.MultiFn("parse-response-body",(function (xhrio){return cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2(xhrio.getResponseHeader("Content-Type"),";"));
}),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__21911__auto__,method_table__21907__auto__,prefer_table__21908__auto__,method_cache__21909__auto__,cached_hierarchy__21910__auto__));
})();
azondi.net.parse_response_body.cljs$core$IMultiFn$_add_method$arity$3(null,"text/plain",(function (xhrio){return xhrio.getResponseText();
}));
azondi.net.parse_response_body.cljs$core$IMultiFn$_add_method$arity$3(null,"application/json",(function (xhrio){return xhrio.getResponseJson("");
}));
azondi.net.parse_response_body.cljs$core$IMultiFn$_add_method$arity$3(null,"text/html",(function (xhrio){return xhrio.getResponseText();
}));
azondi.net.parse_response_body.cljs$core$IMultiFn$_add_method$arity$3(null,"application/xml",(function (xhrio){return xhrio.getResponseXml();
}));
azondi.net.parse_response_body.cljs$core$IMultiFn$_add_method$arity$3(null,"application/edn",(function (xhrio){return cljs.reader.read_string(xhrio.getResponseText());
}));
azondi.net.write_json = (function write_json(data){return (new goog.json.Serializer()).serialize(cljs.core.clj__GT_js(data));
});
/**
* @param {...*} var_args
*/
azondi.net.ajax_LT_ = (function() { 
var ajax_LT___delegate = function (in$,p__63387){var map__63534 = p__63387;var map__63534__$1 = ((cljs.core.seq_QMARK_(map__63534))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63534):map__63534);var opts = map__63534__$1;var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var c__24520__auto___63680 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_63620){var state_val_63621 = (state_63620[1]);if((state_val_63621 === 7))
{var inst_63616 = (state_63620[2]);var state_63620__$1 = state_63620;var statearr_63622_63681 = state_63620__$1;(statearr_63622_63681[2] = inst_63616);
(statearr_63622_63681[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 20))
{var inst_63587 = (state_63620[7]);var inst_63597 = (state_63620[8]);var inst_63582 = (state_63620[9]);var inst_63554 = (state_63620[10]);var inst_63611 = (state_63620[2]);var inst_63612 = inst_63582.send(inst_63587,inst_63597,inst_63611,inst_63554);var state_63620__$1 = (function (){var statearr_63623 = state_63620;(statearr_63623[11] = inst_63612);
return statearr_63623;
})();var statearr_63624_63682 = state_63620__$1;(statearr_63624_63682[2] = null);
(statearr_63624_63682[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 1))
{var state_63620__$1 = state_63620;var statearr_63625_63683 = state_63620__$1;(statearr_63625_63683[2] = null);
(statearr_63625_63683[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 4))
{var inst_63537 = (state_63620[12]);var inst_63537__$1 = (state_63620[2]);var state_63620__$1 = (function (){var statearr_63626 = state_63620;(statearr_63626[12] = inst_63537__$1);
return statearr_63626;
})();if(cljs.core.truth_(inst_63537__$1))
{var statearr_63627_63684 = state_63620__$1;(statearr_63627_63684[1] = 5);
} else
{var statearr_63628_63685 = state_63620__$1;(statearr_63628_63685[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 15))
{var state_63620__$1 = state_63620;var statearr_63629_63686 = state_63620__$1;(statearr_63629_63686[2] = null);
(statearr_63629_63686[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 21))
{var inst_63580 = (state_63620[13]);var inst_63598 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_63580], 0));var state_63620__$1 = state_63620;var statearr_63630_63687 = state_63620__$1;(statearr_63630_63687[2] = inst_63598);
(statearr_63630_63687[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 13))
{var inst_63575 = (state_63620[14]);var inst_63542 = (state_63620[15]);var inst_63574 = (state_63620[2]);var inst_63575__$1 = new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(inst_63542);var state_63620__$1 = (function (){var statearr_63631 = state_63620;(statearr_63631[14] = inst_63575__$1);
(statearr_63631[16] = inst_63574);
return statearr_63631;
})();if(cljs.core.truth_(inst_63575__$1))
{var statearr_63632_63688 = state_63620__$1;(statearr_63632_63688[1] = 14);
} else
{var statearr_63633_63689 = state_63620__$1;(statearr_63633_63689[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 22))
{var inst_63580 = (state_63620[13]);var inst_63600 = azondi.net.write_json(inst_63580);var state_63620__$1 = state_63620;var statearr_63634_63690 = state_63620__$1;(statearr_63634_63690[2] = inst_63600);
(statearr_63634_63690[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 6))
{var state_63620__$1 = state_63620;var statearr_63635_63691 = state_63620__$1;(statearr_63635_63691[2] = null);
(statearr_63635_63691[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 17))
{var inst_63542 = (state_63620[15]);var inst_63591 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_63542);var inst_63592 = cljs.core.name(inst_63591);var inst_63593 = clojure.string.upper_case(inst_63592);var state_63620__$1 = state_63620;var statearr_63636_63692 = state_63620__$1;(statearr_63636_63692[2] = inst_63593);
(statearr_63636_63692[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 3))
{var inst_63618 = (state_63620[2]);var state_63620__$1 = state_63620;return cljs.core.async.impl.ioc_helpers.return_chan(state_63620__$1,inst_63618);
} else
{if((state_val_63621 === 12))
{var inst_63568 = cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"m","m",-1640531418,null),new cljs.core.Keyword(null,"uri","uri",1014020318));var inst_63569 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_63568], 0));var inst_63570 = [cljs.core.str("Assert failed: "),cljs.core.str("Missing URI"),cljs.core.str("\n"),cljs.core.str(inst_63569)].join('');var inst_63571 = (new Error(inst_63570));var inst_63572 = (function(){throw inst_63571})();var state_63620__$1 = state_63620;var statearr_63637_63693 = state_63620__$1;(statearr_63637_63693[2] = inst_63572);
(statearr_63637_63693[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 2))
{var state_63620__$1 = state_63620;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63620__$1,4,in$);
} else
{if((state_val_63621 === 23))
{var inst_63542 = (state_63620[15]);var inst_63602 = [new cljs.core.Keyword(null,"content-type","content-type",1799574400)];var inst_63603 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_63542);var inst_63604 = [inst_63603];var inst_63605 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63602,inst_63604) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63602,inst_63604));var inst_63606 = cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unsupported content type",inst_63605);var inst_63607 = (function(){throw inst_63606})();var state_63620__$1 = state_63620;var statearr_63638_63694 = state_63620__$1;(statearr_63638_63694[2] = inst_63607);
(statearr_63638_63694[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 19))
{var inst_63542 = (state_63620[15]);var inst_63597 = (state_63620[2]);var inst_63609 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_63542);var state_63620__$1 = (function (){var statearr_63639 = state_63620;(statearr_63639[8] = inst_63597);
return statearr_63639;
})();var G__63640_63695 = inst_63609;if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/json",G__63640_63695))
{var statearr_63641_63696 = state_63620__$1;(statearr_63641_63696[1] = 22);
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/edn",G__63640_63695))
{var statearr_63642_63697 = state_63620__$1;(statearr_63642_63697[1] = 21);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var statearr_63643_63698 = state_63620__$1;(statearr_63643_63698[1] = 23);
} else
{}
}
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 11))
{var state_63620__$1 = state_63620;var statearr_63644_63699 = state_63620__$1;(statearr_63644_63699[2] = null);
(statearr_63644_63699[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 9))
{var inst_63558 = cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"m","m",-1640531418,null),new cljs.core.Keyword(null,"method","method",4231316563));var inst_63559 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_63558], 0));var inst_63560 = [cljs.core.str("Assert failed: "),cljs.core.str("Missing method"),cljs.core.str("\n"),cljs.core.str(inst_63559)].join('');var inst_63561 = (new Error(inst_63560));var inst_63562 = (function(){throw inst_63561})();var state_63620__$1 = state_63620;var statearr_63645_63700 = state_63620__$1;(statearr_63645_63700[2] = inst_63562);
(statearr_63645_63700[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 5))
{var inst_63542 = (state_63620[15]);var inst_63537 = (state_63620[12]);var inst_63539 = [new cljs.core.Keyword(null,"timeout","timeout",3994960083)];var inst_63540 = [10];var inst_63541 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63539,inst_63540) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63539,inst_63540));var inst_63542__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_63541,opts,inst_63537], 0));var inst_63543 = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.second);var inst_63544 = new cljs.core.Keyword(null,"accept","accept",3885410426).cljs$core$IFn$_invoke$arity$1(inst_63542__$1);var inst_63545 = ["Accept",inst_63544];var inst_63546 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_63545,null));var inst_63547 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_63542__$1);var inst_63548 = ["Content-Type",inst_63547];var inst_63549 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_63548,null));var inst_63550 = [inst_63546,inst_63549];var inst_63551 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_63550,null));var inst_63552 = cljs.core.remove(inst_63543,inst_63551);var inst_63553 = cljs.core.into(cljs.core.PersistentHashMap.EMPTY,inst_63552);var inst_63554 = cljs.core.clj__GT_js(inst_63553);var inst_63555 = cljs.core.contains_QMARK_(inst_63542__$1,new cljs.core.Keyword(null,"method","method",4231316563));var state_63620__$1 = (function (){var statearr_63646 = state_63620;(statearr_63646[15] = inst_63542__$1);
(statearr_63646[10] = inst_63554);
return statearr_63646;
})();if(inst_63555)
{var statearr_63647_63701 = state_63620__$1;(statearr_63647_63701[1] = 8);
} else
{var statearr_63648_63702 = state_63620__$1;(statearr_63648_63702[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 14))
{var inst_63575 = (state_63620[14]);var inst_63577 = azondi.csk.__GT_js(inst_63575);var state_63620__$1 = state_63620;var statearr_63649_63703 = state_63620__$1;(statearr_63649_63703[2] = inst_63577);
(statearr_63649_63703[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 16))
{var inst_63574 = (state_63620[16]);var inst_63542 = (state_63620[15]);var inst_63582 = (state_63620[9]);var inst_63554 = (state_63620[10]);var inst_63537 = (state_63620[12]);var inst_63580 = (state_63620[13]);var inst_63580__$1 = (state_63620[2]);var inst_63582__$1 = (new goog.net.XhrIo());var inst_63583 = (function (){var G__63581 = inst_63582__$1;var content = inst_63580__$1;var _ = inst_63574;var headers = inst_63554;var m = inst_63542;var temp__4126__auto__ = inst_63537;return ((function (G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621){
return (function (ev){var xhrio = ev.target;var status = xhrio.getStatus();console.log([cljs.core.str("status "),cljs.core.str(status)].join(''));
console.log(xhrio.getLastError());
var c__24520__auto____$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621){
return (function (state_63656){var state_val_63657 = (state_63656[1]);if((state_val_63657 === 2))
{var inst_63654 = (state_63656[2]);var state_63656__$1 = state_63656;return cljs.core.async.impl.ioc_helpers.return_chan(state_63656__$1,inst_63654);
} else
{if((state_val_63657 === 1))
{var inst_63650 = [new cljs.core.Keyword(null,"status","status",4416389988),new cljs.core.Keyword(null,"body","body",1016933652)];var inst_63651 = [status,azondi.net.body];var inst_63652 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63650,inst_63651) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63650,inst_63651));var state_63656__$1 = state_63656;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_63656__$1,2,out,inst_63652);
} else
{return null;
}
}
});})(c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621))
;return ((function (switch__24505__auto__,c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_63661 = [null,null,null,null,null,null,null];(statearr_63661[0] = state_machine__24506__auto__);
(statearr_63661[1] = 1);
return statearr_63661;
});
var state_machine__24506__auto____1 = (function (state_63656){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_63656);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e63662){if((e63662 instanceof Object))
{var ex__24509__auto__ = e63662;var statearr_63663_63704 = state_63656;(statearr_63663_63704[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_63656);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e63662;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__63705 = state_63656;
state_63656 = G__63705;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_63656){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_63656);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621))
})();var state__24522__auto__ = (function (){var statearr_63664 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_63664[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto____$1);
return statearr_63664;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto____$1,xhrio,status,G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621))
);
return c__24520__auto____$1;
});
;})(G__63581,content,_,headers,m,temp__4126__auto__,inst_63574,inst_63542,inst_63582,inst_63554,inst_63537,inst_63580,inst_63580__$1,inst_63582__$1,state_val_63621))
})();var inst_63584 = goog.events.listen(inst_63582__$1,goog.net.EventType.COMPLETE,inst_63583);var inst_63585 = new cljs.core.Keyword(null,"timeout","timeout",3994960083).cljs$core$IFn$_invoke$arity$1(inst_63542);var inst_63586 = inst_63582__$1.setTimeoutInterval(inst_63585);var inst_63587 = new cljs.core.Keyword(null,"uri","uri",1014020318).cljs$core$IFn$_invoke$arity$1(inst_63542);var inst_63588 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_63542);var inst_63589 = (inst_63588 instanceof cljs.core.Keyword);var state_63620__$1 = (function (){var statearr_63665 = state_63620;(statearr_63665[7] = inst_63587);
(statearr_63665[9] = inst_63582__$1);
(statearr_63665[17] = inst_63586);
(statearr_63665[13] = inst_63580__$1);
(statearr_63665[18] = inst_63584);
return statearr_63665;
})();if(cljs.core.truth_(inst_63589))
{var statearr_63666_63706 = state_63620__$1;(statearr_63666_63706[1] = 17);
} else
{var statearr_63667_63707 = state_63620__$1;(statearr_63667_63707[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 10))
{var inst_63542 = (state_63620[15]);var inst_63564 = (state_63620[2]);var inst_63565 = cljs.core.contains_QMARK_(inst_63542,new cljs.core.Keyword(null,"uri","uri",1014020318));var state_63620__$1 = (function (){var statearr_63668 = state_63620;(statearr_63668[19] = inst_63564);
return statearr_63668;
})();if(inst_63565)
{var statearr_63669_63708 = state_63620__$1;(statearr_63669_63708[1] = 11);
} else
{var statearr_63670_63709 = state_63620__$1;(statearr_63670_63709[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 18))
{var inst_63542 = (state_63620[15]);var inst_63595 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_63542);var state_63620__$1 = state_63620;var statearr_63671_63710 = state_63620__$1;(statearr_63671_63710[2] = inst_63595);
(statearr_63671_63710[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_63621 === 8))
{var state_63620__$1 = state_63620;var statearr_63672_63711 = state_63620__$1;(statearr_63672_63711[2] = null);
(statearr_63672_63711[1] = 10);
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
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_63676 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_63676[0] = state_machine__24506__auto__);
(statearr_63676[1] = 1);
return statearr_63676;
});
var state_machine__24506__auto____1 = (function (state_63620){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_63620);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e63677){if((e63677 instanceof Object))
{var ex__24509__auto__ = e63677;var statearr_63678_63712 = state_63620;(statearr_63678_63712[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_63620);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e63677;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__63713 = state_63620;
state_63620 = G__63713;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_63620){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_63620);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_63679 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_63679[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___63680);
return statearr_63679;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
};
var ajax_LT_ = function (in$,var_args){
var p__63387 = null;if (arguments.length > 1) {
  p__63387 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return ajax_LT___delegate.call(this,in$,p__63387);};
ajax_LT_.cljs$lang$maxFixedArity = 1;
ajax_LT_.cljs$lang$applyTo = (function (arglist__63714){
var in$ = cljs.core.first(arglist__63714);
var p__63387 = cljs.core.rest(arglist__63714);
return ajax_LT___delegate(in$,p__63387);
});
ajax_LT_.cljs$core$IFn$_invoke$arity$variadic = ajax_LT___delegate;
return ajax_LT_;
})()
;
/**
* Cheeky name, Async Javascript And JSON. Does automatic conversion
* from the JSON protocol to ClojureScript structures on read.
* @param {...*} var_args
*/
azondi.net.ajaj_LT_ = (function() { 
var ajaj_LT___delegate = function (args){return cljs.core.async.map_LT_(azondi.csk.__GT_edn,cljs.core.async.map_LT_(cljs.core.js__GT_clj,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(azondi.net.ajax_LT_,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accept","accept",3885410426),"application/json",new cljs.core.Keyword(null,"content-type","content-type",1799574400),"application/json"], null)))));
};
var ajaj_LT_ = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return ajaj_LT___delegate.call(this,args);};
ajaj_LT_.cljs$lang$maxFixedArity = 0;
ajaj_LT_.cljs$lang$applyTo = (function (arglist__63715){
var args = cljs.core.seq(arglist__63715);
return ajaj_LT___delegate(args);
});
ajaj_LT_.cljs$core$IFn$_invoke$arity$variadic = ajaj_LT___delegate;
return ajaj_LT_;
})()
;
azondi.net.event__GT_clj = (function event__GT_clj(evt){return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(goog.json.parse(evt.event_.data),cljs.core.array_seq([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true], 0));
});
/**
* Return an EventSource listening on the given uri and putting events
* on the given channel.
*/
azondi.net.listen_sse = (function listen_sse(uri,ch){var source = (new EventSource(uri));goog.events.listen(source,"open",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_63772){var state_val_63773 = (state_63772[1]);if((state_val_63773 === 2))
{var inst_63770 = (state_63772[2]);var state_63772__$1 = state_63772;return cljs.core.async.impl.ioc_helpers.return_chan(state_63772__$1,inst_63770);
} else
{if((state_val_63773 === 1))
{var inst_63765 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788)];var inst_63766 = (new Date());var inst_63767 = [new cljs.core.Keyword(null,"open","open",1017321916),inst_63766,ev];var inst_63768 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63765,inst_63767) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63765,inst_63767));var state_63772__$1 = state_63772;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_63772__$1,2,ch,inst_63768);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_63777 = [null,null,null,null,null,null,null];(statearr_63777[0] = state_machine__24506__auto__);
(statearr_63777[1] = 1);
return statearr_63777;
});
var state_machine__24506__auto____1 = (function (state_63772){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_63772);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e63778){if((e63778 instanceof Object))
{var ex__24509__auto__ = e63778;var statearr_63779_63814 = state_63772;(statearr_63779_63814[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_63772);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e63778;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__63815 = state_63772;
state_63772 = G__63815;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_63772){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_63772);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_63780 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_63780[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_63780;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
goog.events.listen(source,"error",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_63788){var state_val_63789 = (state_63788[1]);if((state_val_63789 === 2))
{var inst_63786 = (state_63788[2]);var state_63788__$1 = state_63788;return cljs.core.async.impl.ioc_helpers.return_chan(state_63788__$1,inst_63786);
} else
{if((state_val_63789 === 1))
{var inst_63781 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788)];var inst_63782 = (new Date());var inst_63783 = [new cljs.core.Keyword(null,"error","error",1110689146),inst_63782,ev];var inst_63784 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63781,inst_63783) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63781,inst_63783));var state_63788__$1 = state_63788;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_63788__$1,2,ch,inst_63784);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_63793 = [null,null,null,null,null,null,null];(statearr_63793[0] = state_machine__24506__auto__);
(statearr_63793[1] = 1);
return statearr_63793;
});
var state_machine__24506__auto____1 = (function (state_63788){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_63788);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e63794){if((e63794 instanceof Object))
{var ex__24509__auto__ = e63794;var statearr_63795_63816 = state_63788;(statearr_63795_63816[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_63788);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e63794;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__63817 = state_63788;
state_63788 = G__63817;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_63788){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_63788);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_63796 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_63796[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_63796;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
goog.events.listen(source,"message",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_63805){var state_val_63806 = (state_63805[1]);if((state_val_63806 === 2))
{var inst_63803 = (state_63805[2]);var state_63805__$1 = state_63805;return cljs.core.async.impl.ioc_helpers.return_chan(state_63805__$1,inst_63803);
} else
{if((state_val_63806 === 1))
{var inst_63797 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788),new cljs.core.Keyword(null,"message","message",1968829305)];var inst_63798 = (new Date());var inst_63799 = azondi.net.event__GT_clj(ev);var inst_63800 = [new cljs.core.Keyword(null,"message","message",1968829305),inst_63798,ev,inst_63799];var inst_63801 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_63797,inst_63800) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_63797,inst_63800));var state_63805__$1 = state_63805;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_63805__$1,2,ch,inst_63801);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_63810 = [null,null,null,null,null,null,null];(statearr_63810[0] = state_machine__24506__auto__);
(statearr_63810[1] = 1);
return statearr_63810;
});
var state_machine__24506__auto____1 = (function (state_63805){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_63805);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e63811){if((e63811 instanceof Object))
{var ex__24509__auto__ = e63811;var statearr_63812_63818 = state_63805;(statearr_63812_63818[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_63805);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e63811;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__63819 = state_63805;
state_63805 = G__63819;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_63805){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_63805);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_63813 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_63813[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_63813;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
return source;
});
//# sourceMappingURL=net.js.map