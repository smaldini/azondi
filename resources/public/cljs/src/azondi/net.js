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
var ajax_LT___delegate = function (in$,p__71970){var map__72120 = p__71970;var map__72120__$1 = ((cljs.core.seq_QMARK_(map__72120))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__72120):map__72120);var opts = map__72120__$1;var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var c__24520__auto___72269 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_72209){var state_val_72210 = (state_72209[1]);if((state_val_72210 === 7))
{var inst_72205 = (state_72209[2]);var state_72209__$1 = state_72209;var statearr_72211_72270 = state_72209__$1;(statearr_72211_72270[2] = inst_72205);
(statearr_72211_72270[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 20))
{var inst_72186 = (state_72209[7]);var inst_72171 = (state_72209[8]);var inst_72176 = (state_72209[9]);var inst_72143 = (state_72209[10]);var inst_72200 = (state_72209[2]);var inst_72201 = inst_72171.send(inst_72176,inst_72186,inst_72200,inst_72143);var state_72209__$1 = (function (){var statearr_72212 = state_72209;(statearr_72212[11] = inst_72201);
return statearr_72212;
})();var statearr_72213_72271 = state_72209__$1;(statearr_72213_72271[2] = null);
(statearr_72213_72271[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 1))
{var state_72209__$1 = state_72209;var statearr_72214_72272 = state_72209__$1;(statearr_72214_72272[2] = null);
(statearr_72214_72272[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 4))
{var inst_72123 = (state_72209[12]);var inst_72123__$1 = (state_72209[2]);var state_72209__$1 = (function (){var statearr_72215 = state_72209;(statearr_72215[12] = inst_72123__$1);
return statearr_72215;
})();if(cljs.core.truth_(inst_72123__$1))
{var statearr_72216_72273 = state_72209__$1;(statearr_72216_72273[1] = 5);
} else
{var statearr_72217_72274 = state_72209__$1;(statearr_72217_72274[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 15))
{var state_72209__$1 = state_72209;var statearr_72218_72275 = state_72209__$1;(statearr_72218_72275[2] = null);
(statearr_72218_72275[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 21))
{var inst_72169 = (state_72209[13]);var inst_72187 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_72169], 0));var state_72209__$1 = state_72209;var statearr_72219_72276 = state_72209__$1;(statearr_72219_72276[2] = inst_72187);
(statearr_72219_72276[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 13))
{var inst_72128 = (state_72209[14]);var inst_72164 = (state_72209[15]);var inst_72163 = (state_72209[2]);var inst_72164__$1 = new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(inst_72128);var state_72209__$1 = (function (){var statearr_72220 = state_72209;(statearr_72220[16] = inst_72163);
(statearr_72220[15] = inst_72164__$1);
return statearr_72220;
})();if(cljs.core.truth_(inst_72164__$1))
{var statearr_72221_72277 = state_72209__$1;(statearr_72221_72277[1] = 14);
} else
{var statearr_72222_72278 = state_72209__$1;(statearr_72222_72278[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 22))
{var inst_72169 = (state_72209[13]);var inst_72189 = azondi.net.write_json(inst_72169);var state_72209__$1 = state_72209;var statearr_72223_72279 = state_72209__$1;(statearr_72223_72279[2] = inst_72189);
(statearr_72223_72279[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 6))
{var state_72209__$1 = state_72209;var statearr_72224_72280 = state_72209__$1;(statearr_72224_72280[2] = null);
(statearr_72224_72280[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 17))
{var inst_72128 = (state_72209[14]);var inst_72180 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_72128);var inst_72181 = cljs.core.name(inst_72180);var inst_72182 = clojure.string.upper_case(inst_72181);var state_72209__$1 = state_72209;var statearr_72225_72281 = state_72209__$1;(statearr_72225_72281[2] = inst_72182);
(statearr_72225_72281[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 3))
{var inst_72207 = (state_72209[2]);var state_72209__$1 = state_72209;return cljs.core.async.impl.ioc_helpers.return_chan(state_72209__$1,inst_72207);
} else
{if((state_val_72210 === 12))
{var inst_72157 = cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"m","m",-1640531418,null),new cljs.core.Keyword(null,"uri","uri",1014020318));var inst_72158 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_72157], 0));var inst_72159 = [cljs.core.str("Assert failed: "),cljs.core.str("Missing URI"),cljs.core.str("\n"),cljs.core.str(inst_72158)].join('');var inst_72160 = (new Error(inst_72159));var inst_72161 = (function(){throw inst_72160})();var state_72209__$1 = state_72209;var statearr_72226_72282 = state_72209__$1;(statearr_72226_72282[2] = inst_72161);
(statearr_72226_72282[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 2))
{var state_72209__$1 = state_72209;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72209__$1,4,in$);
} else
{if((state_val_72210 === 23))
{var inst_72128 = (state_72209[14]);var inst_72191 = [new cljs.core.Keyword(null,"content-type","content-type",1799574400)];var inst_72192 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_72128);var inst_72193 = [inst_72192];var inst_72194 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72191,inst_72193) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72191,inst_72193));var inst_72195 = cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unsupported content type",inst_72194);var inst_72196 = (function(){throw inst_72195})();var state_72209__$1 = state_72209;var statearr_72227_72283 = state_72209__$1;(statearr_72227_72283[2] = inst_72196);
(statearr_72227_72283[1] = 20);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 19))
{var inst_72128 = (state_72209[14]);var inst_72186 = (state_72209[2]);var inst_72198 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_72128);var state_72209__$1 = (function (){var statearr_72228 = state_72209;(statearr_72228[7] = inst_72186);
return statearr_72228;
})();var G__72229_72284 = inst_72198;if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/json",G__72229_72284))
{var statearr_72230_72285 = state_72209__$1;(statearr_72230_72285[1] = 22);
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("application/edn",G__72229_72284))
{var statearr_72231_72286 = state_72209__$1;(statearr_72231_72286[1] = 21);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var statearr_72232_72287 = state_72209__$1;(statearr_72232_72287[1] = 23);
} else
{}
}
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 11))
{var state_72209__$1 = state_72209;var statearr_72233_72288 = state_72209__$1;(statearr_72233_72288[2] = null);
(statearr_72233_72288[1] = 13);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 9))
{var inst_72147 = cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"m","m",-1640531418,null),new cljs.core.Keyword(null,"method","method",4231316563));var inst_72148 = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_72147], 0));var inst_72149 = [cljs.core.str("Assert failed: "),cljs.core.str("Missing method"),cljs.core.str("\n"),cljs.core.str(inst_72148)].join('');var inst_72150 = (new Error(inst_72149));var inst_72151 = (function(){throw inst_72150})();var state_72209__$1 = state_72209;var statearr_72234_72289 = state_72209__$1;(statearr_72234_72289[2] = inst_72151);
(statearr_72234_72289[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 5))
{var inst_72128 = (state_72209[14]);var inst_72123 = (state_72209[12]);var inst_72125 = [new cljs.core.Keyword(null,"timeout","timeout",3994960083)];var inst_72126 = [10];var inst_72127 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72125,inst_72126) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72125,inst_72126));var inst_72128__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_72127,opts,inst_72123], 0));var inst_72129 = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.second);var inst_72130 = new cljs.core.Keyword(null,"accept","accept",3885410426).cljs$core$IFn$_invoke$arity$1(inst_72128__$1);var inst_72131 = ["Accept",inst_72130];var inst_72132 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_72131,null));var inst_72133 = new cljs.core.Keyword(null,"content-type","content-type",1799574400).cljs$core$IFn$_invoke$arity$1(inst_72128__$1);var inst_72134 = ["Content-Type",inst_72133];var inst_72135 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_72134,null));var inst_72136 = new cljs.core.Symbol(null,"*'","*'",-1640530186,null);var inst_72137 = ["Access-Control-Allow-Origin",inst_72136];var inst_72138 = (new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,inst_72137,null));var inst_72139 = [inst_72132,inst_72135,inst_72138,cljs.core.PersistentVector.EMPTY];var inst_72140 = (new cljs.core.PersistentVector(null,4,5,cljs.core.PersistentVector.EMPTY_NODE,inst_72139,null));var inst_72141 = cljs.core.remove(inst_72129,inst_72140);var inst_72142 = cljs.core.into(cljs.core.PersistentHashMap.EMPTY,inst_72141);var inst_72143 = cljs.core.clj__GT_js(inst_72142);var inst_72144 = cljs.core.contains_QMARK_(inst_72128__$1,new cljs.core.Keyword(null,"method","method",4231316563));var state_72209__$1 = (function (){var statearr_72235 = state_72209;(statearr_72235[14] = inst_72128__$1);
(statearr_72235[10] = inst_72143);
return statearr_72235;
})();if(inst_72144)
{var statearr_72236_72290 = state_72209__$1;(statearr_72236_72290[1] = 8);
} else
{var statearr_72237_72291 = state_72209__$1;(statearr_72237_72291[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 14))
{var inst_72164 = (state_72209[15]);var inst_72166 = azondi.csk.__GT_js(inst_72164);var state_72209__$1 = state_72209;var statearr_72238_72292 = state_72209__$1;(statearr_72238_72292[2] = inst_72166);
(statearr_72238_72292[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 16))
{var inst_72169 = (state_72209[13]);var inst_72171 = (state_72209[8]);var inst_72128 = (state_72209[14]);var inst_72163 = (state_72209[16]);var inst_72123 = (state_72209[12]);var inst_72143 = (state_72209[10]);var inst_72169__$1 = (state_72209[2]);var inst_72171__$1 = (new goog.net.XhrIo());var inst_72172 = (function (){var G__72170 = inst_72171__$1;var content = inst_72169__$1;var _ = inst_72163;var headers = inst_72143;var m = inst_72128;var temp__4126__auto__ = inst_72123;return ((function (G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210){
return (function (ev){var xhrio = ev.target;var status = xhrio.getStatus();console.log([cljs.core.str("status "),cljs.core.str(status)].join(''));
console.log(xhrio.getLastError());
var c__24520__auto____$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210){
return (function (state_72245){var state_val_72246 = (state_72245[1]);if((state_val_72246 === 2))
{var inst_72243 = (state_72245[2]);var state_72245__$1 = state_72245;return cljs.core.async.impl.ioc_helpers.return_chan(state_72245__$1,inst_72243);
} else
{if((state_val_72246 === 1))
{var inst_72239 = [new cljs.core.Keyword(null,"status","status",4416389988),new cljs.core.Keyword(null,"body","body",1016933652)];var inst_72240 = [status,azondi.net.body];var inst_72241 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72239,inst_72240) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72239,inst_72240));var state_72245__$1 = state_72245;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72245__$1,2,out,inst_72241);
} else
{return null;
}
}
});})(c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210))
;return ((function (switch__24505__auto__,c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_72250 = [null,null,null,null,null,null,null];(statearr_72250[0] = state_machine__24506__auto__);
(statearr_72250[1] = 1);
return statearr_72250;
});
var state_machine__24506__auto____1 = (function (state_72245){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_72245);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e72251){if((e72251 instanceof Object))
{var ex__24509__auto__ = e72251;var statearr_72252_72293 = state_72245;(statearr_72252_72293[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_72245);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e72251;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__72294 = state_72245;
state_72245 = G__72294;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_72245){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_72245);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__,c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210))
})();var state__24522__auto__ = (function (){var statearr_72253 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_72253[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto____$1);
return statearr_72253;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(c__24520__auto____$1,xhrio,status,G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210))
);
return c__24520__auto____$1;
});
;})(G__72170,content,_,headers,m,temp__4126__auto__,inst_72169,inst_72171,inst_72128,inst_72163,inst_72123,inst_72143,inst_72169__$1,inst_72171__$1,state_val_72210))
})();var inst_72173 = goog.events.listen(inst_72171__$1,goog.net.EventType.COMPLETE,inst_72172);var inst_72174 = new cljs.core.Keyword(null,"timeout","timeout",3994960083).cljs$core$IFn$_invoke$arity$1(inst_72128);var inst_72175 = inst_72171__$1.setTimeoutInterval(inst_72174);var inst_72176 = new cljs.core.Keyword(null,"uri","uri",1014020318).cljs$core$IFn$_invoke$arity$1(inst_72128);var inst_72177 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_72128);var inst_72178 = (inst_72177 instanceof cljs.core.Keyword);var state_72209__$1 = (function (){var statearr_72254 = state_72209;(statearr_72254[13] = inst_72169__$1);
(statearr_72254[8] = inst_72171__$1);
(statearr_72254[9] = inst_72176);
(statearr_72254[17] = inst_72173);
(statearr_72254[18] = inst_72175);
return statearr_72254;
})();if(cljs.core.truth_(inst_72178))
{var statearr_72255_72295 = state_72209__$1;(statearr_72255_72295[1] = 17);
} else
{var statearr_72256_72296 = state_72209__$1;(statearr_72256_72296[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 10))
{var inst_72128 = (state_72209[14]);var inst_72153 = (state_72209[2]);var inst_72154 = cljs.core.contains_QMARK_(inst_72128,new cljs.core.Keyword(null,"uri","uri",1014020318));var state_72209__$1 = (function (){var statearr_72257 = state_72209;(statearr_72257[19] = inst_72153);
return statearr_72257;
})();if(inst_72154)
{var statearr_72258_72297 = state_72209__$1;(statearr_72258_72297[1] = 11);
} else
{var statearr_72259_72298 = state_72209__$1;(statearr_72259_72298[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 18))
{var inst_72128 = (state_72209[14]);var inst_72184 = new cljs.core.Keyword(null,"method","method",4231316563).cljs$core$IFn$_invoke$arity$1(inst_72128);var state_72209__$1 = state_72209;var statearr_72260_72299 = state_72209__$1;(statearr_72260_72299[2] = inst_72184);
(statearr_72260_72299[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_72210 === 8))
{var state_72209__$1 = state_72209;var statearr_72261_72300 = state_72209__$1;(statearr_72261_72300[2] = null);
(statearr_72261_72300[1] = 10);
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
var state_machine__24506__auto____0 = (function (){var statearr_72265 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_72265[0] = state_machine__24506__auto__);
(statearr_72265[1] = 1);
return statearr_72265;
});
var state_machine__24506__auto____1 = (function (state_72209){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_72209);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e72266){if((e72266 instanceof Object))
{var ex__24509__auto__ = e72266;var statearr_72267_72301 = state_72209;(statearr_72267_72301[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_72209);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e72266;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__72302 = state_72209;
state_72209 = G__72302;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_72209){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_72209);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_72268 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_72268[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___72269);
return statearr_72268;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
};
var ajax_LT_ = function (in$,var_args){
var p__71970 = null;if (arguments.length > 1) {
  p__71970 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return ajax_LT___delegate.call(this,in$,p__71970);};
ajax_LT_.cljs$lang$maxFixedArity = 1;
ajax_LT_.cljs$lang$applyTo = (function (arglist__72303){
var in$ = cljs.core.first(arglist__72303);
var p__71970 = cljs.core.rest(arglist__72303);
return ajax_LT___delegate(in$,p__71970);
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
ajaj_LT_.cljs$lang$applyTo = (function (arglist__72304){
var args = cljs.core.seq(arglist__72304);
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
azondi.net.listen_sse = (function listen_sse(uri,ch){var source = (new EventSource(uri));goog.events.listen(source,"open",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_72361){var state_val_72362 = (state_72361[1]);if((state_val_72362 === 2))
{var inst_72359 = (state_72361[2]);var state_72361__$1 = state_72361;return cljs.core.async.impl.ioc_helpers.return_chan(state_72361__$1,inst_72359);
} else
{if((state_val_72362 === 1))
{var inst_72354 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788)];var inst_72355 = (new Date());var inst_72356 = [new cljs.core.Keyword(null,"open","open",1017321916),inst_72355,ev];var inst_72357 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72354,inst_72356) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72354,inst_72356));var state_72361__$1 = state_72361;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72361__$1,2,ch,inst_72357);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_72366 = [null,null,null,null,null,null,null];(statearr_72366[0] = state_machine__24506__auto__);
(statearr_72366[1] = 1);
return statearr_72366;
});
var state_machine__24506__auto____1 = (function (state_72361){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_72361);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e72367){if((e72367 instanceof Object))
{var ex__24509__auto__ = e72367;var statearr_72368_72403 = state_72361;(statearr_72368_72403[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_72361);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e72367;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__72404 = state_72361;
state_72361 = G__72404;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_72361){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_72361);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_72369 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_72369[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_72369;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
goog.events.listen(source,"error",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_72377){var state_val_72378 = (state_72377[1]);if((state_val_72378 === 2))
{var inst_72375 = (state_72377[2]);var state_72377__$1 = state_72377;return cljs.core.async.impl.ioc_helpers.return_chan(state_72377__$1,inst_72375);
} else
{if((state_val_72378 === 1))
{var inst_72370 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788)];var inst_72371 = (new Date());var inst_72372 = [new cljs.core.Keyword(null,"error","error",1110689146),inst_72371,ev];var inst_72373 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72370,inst_72372) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72370,inst_72372));var state_72377__$1 = state_72377;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72377__$1,2,ch,inst_72373);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_72382 = [null,null,null,null,null,null,null];(statearr_72382[0] = state_machine__24506__auto__);
(statearr_72382[1] = 1);
return statearr_72382;
});
var state_machine__24506__auto____1 = (function (state_72377){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_72377);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e72383){if((e72383 instanceof Object))
{var ex__24509__auto__ = e72383;var statearr_72384_72405 = state_72377;(statearr_72384_72405[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_72377);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e72383;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__72406 = state_72377;
state_72377 = G__72406;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_72377){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_72377);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_72385 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_72385[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_72385;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
goog.events.listen(source,"message",(function (ev){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_72394){var state_val_72395 = (state_72394[1]);if((state_val_72395 === 2))
{var inst_72392 = (state_72394[2]);var state_72394__$1 = state_72394;return cljs.core.async.impl.ioc_helpers.return_chan(state_72394__$1,inst_72392);
} else
{if((state_val_72395 === 1))
{var inst_72386 = [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"time","time",1017464383),new cljs.core.Keyword(null,"event","event",1110795788),new cljs.core.Keyword(null,"message","message",1968829305)];var inst_72387 = (new Date());var inst_72388 = azondi.net.event__GT_clj(ev);var inst_72389 = [new cljs.core.Keyword(null,"message","message",1968829305),inst_72387,ev,inst_72388];var inst_72390 = (cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashMap.fromArrays.cljs$core$IFn$_invoke$arity$2(inst_72386,inst_72389) : cljs.core.PersistentHashMap.fromArrays.call(null,inst_72386,inst_72389));var state_72394__$1 = state_72394;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72394__$1,2,ch,inst_72390);
} else
{return null;
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_72399 = [null,null,null,null,null,null,null];(statearr_72399[0] = state_machine__24506__auto__);
(statearr_72399[1] = 1);
return statearr_72399;
});
var state_machine__24506__auto____1 = (function (state_72394){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_72394);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e72400){if((e72400 instanceof Object))
{var ex__24509__auto__ = e72400;var statearr_72401_72407 = state_72394;(statearr_72401_72407[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_72394);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e72400;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__72408 = state_72394;
state_72394 = G__72408;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_72394){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_72394);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_72402 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_72402[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_72402;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
}));
return source;
});
//# sourceMappingURL=net.js.map