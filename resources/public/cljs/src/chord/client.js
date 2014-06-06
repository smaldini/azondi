goog.provide('chord.client');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('cljs.reader');
goog.require('cljs.reader');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
chord.client.read_from_ch_BANG_ = (function read_from_ch_BANG_(ch,ws){return ws.onmessage = (function (ev){var message = ev.data;return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",1968829305),message], null));
});
});
chord.client.write_to_ch_BANG_ = (function write_to_ch_BANG_(ch,ws){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_42486){var state_val_42487 = (state_42486[1]);if((state_val_42487 === 7))
{var inst_42482 = (state_42486[2]);var state_42486__$1 = state_42486;var statearr_42488_42503 = state_42486__$1;(statearr_42488_42503[2] = inst_42482);
(statearr_42488_42503[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42487 === 6))
{var state_42486__$1 = state_42486;var statearr_42489_42504 = state_42486__$1;(statearr_42489_42504[2] = null);
(statearr_42489_42504[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42487 === 5))
{var inst_42476 = (state_42486[7]);var inst_42478 = ws.send(inst_42476);var state_42486__$1 = (function (){var statearr_42490 = state_42486;(statearr_42490[8] = inst_42478);
return statearr_42490;
})();var statearr_42491_42505 = state_42486__$1;(statearr_42491_42505[2] = null);
(statearr_42491_42505[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42487 === 4))
{var inst_42476 = (state_42486[7]);var inst_42476__$1 = (state_42486[2]);var state_42486__$1 = (function (){var statearr_42492 = state_42486;(statearr_42492[7] = inst_42476__$1);
return statearr_42492;
})();if(cljs.core.truth_(inst_42476__$1))
{var statearr_42493_42506 = state_42486__$1;(statearr_42493_42506[1] = 5);
} else
{var statearr_42494_42507 = state_42486__$1;(statearr_42494_42507[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42487 === 3))
{var inst_42484 = (state_42486[2]);var state_42486__$1 = state_42486;return cljs.core.async.impl.ioc_helpers.return_chan(state_42486__$1,inst_42484);
} else
{if((state_val_42487 === 2))
{var state_42486__$1 = state_42486;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42486__$1,4,ch);
} else
{if((state_val_42487 === 1))
{var state_42486__$1 = state_42486;var statearr_42495_42508 = state_42486__$1;(statearr_42495_42508[2] = null);
(statearr_42495_42508[1] = 2);
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
var state_machine__24506__auto____0 = (function (){var statearr_42499 = [null,null,null,null,null,null,null,null,null];(statearr_42499[0] = state_machine__24506__auto__);
(statearr_42499[1] = 1);
return statearr_42499;
});
var state_machine__24506__auto____1 = (function (state_42486){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_42486);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e42500){if((e42500 instanceof Object))
{var ex__24509__auto__ = e42500;var statearr_42501_42509 = state_42486;(statearr_42501_42509[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_42486);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e42500;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__42510 = state_42486;
state_42486 = G__42510;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_42486){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_42486);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_42502 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_42502[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_42502;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
chord.client.make_open_ch = (function make_open_ch(ws,v){var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();ws.onopen = (function (){cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,v);
return cljs.core.async.close_BANG_(ch);
});
return ch;
});
chord.client.on_error = (function on_error(ws,read_ch){return ws.onerror = (function (ev){var error = ev.data;return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(read_ch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",1110689146),error], null));
});
});
chord.client.on_close = (function on_close(ws,read_ch,write_ch){return ws.onclose = (function (){cljs.core.async.close_BANG_(read_ch);
return cljs.core.async.close_BANG_(write_ch);
});
});
chord.client.combine_chs = (function combine_chs(ws,read_ch,write_ch){if(typeof chord.client.t42514 !== 'undefined')
{} else
{
/**
* @constructor
*/
chord.client.t42514 = (function (write_ch,read_ch,ws,combine_chs,meta42515){
this.write_ch = write_ch;
this.read_ch = read_ch;
this.ws = ws;
this.combine_chs = combine_chs;
this.meta42515 = meta42515;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
chord.client.t42514.cljs$lang$type = true;
chord.client.t42514.cljs$lang$ctorStr = "chord.client/t42514";
chord.client.t42514.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"chord.client/t42514");
});
chord.client.t42514.prototype.cljs$core$async$impl$protocols$Channel$ = true;
chord.client.t42514.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.close_BANG_(self__.read_ch);
cljs.core.async.impl.protocols.close_BANG_(self__.write_ch);
return self__.ws.close();
});
chord.client.t42514.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
chord.client.t42514.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,msg,handler){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_(self__.write_ch,msg,handler);
});
chord.client.t42514.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
chord.client.t42514.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,handler){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_(self__.read_ch,handler);
});
chord.client.t42514.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42516){var self__ = this;
var _42516__$1 = this;return self__.meta42515;
});
chord.client.t42514.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42516,meta42515__$1){var self__ = this;
var _42516__$1 = this;return (new chord.client.t42514(self__.write_ch,self__.read_ch,self__.ws,self__.combine_chs,meta42515__$1));
});
chord.client.__GT_t42514 = (function __GT_t42514(write_ch__$1,read_ch__$1,ws__$1,combine_chs__$1,meta42515){return (new chord.client.t42514(write_ch__$1,read_ch__$1,ws__$1,combine_chs__$1,meta42515));
});
}
return (new chord.client.t42514(write_ch,read_ch,ws,combine_chs,null));
});
chord.client.wrap_format = (function (){var method_table__21907__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var prefer_table__21908__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var method_cache__21909__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__21910__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var hierarchy__21911__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy());return (new cljs.core.MultiFn("wrap-format",(function (chs,format){return format;
}),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__21911__auto__,method_table__21907__auto__,prefer_table__21908__auto__,method_cache__21909__auto__,cached_hierarchy__21910__auto__));
})();
chord.client.try_read_edn = (function try_read_edn(p__42517){var map__42520 = p__42517;var map__42520__$1 = ((cljs.core.seq_QMARK_(map__42520))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42520):map__42520);var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42520__$1,new cljs.core.Keyword(null,"message","message",1968829305));try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",1968829305),cljs.reader.read_string(message)], null);
}catch (e42521){if((e42521 instanceof Error))
{var e = e42521;return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",1110689146),new cljs.core.Keyword(null,"invalid-edn","invalid-edn",4354543179),new cljs.core.Keyword(null,"invalid-msg","invalid-msg",4354551325),message], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e42521;
} else
{return null;
}
}
}});
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"edn","edn",1014004513),(function (p__42522,_){var map__42523 = p__42522;var map__42523__$1 = ((cljs.core.seq_QMARK_(map__42523))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42523):map__42523);var write_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42523__$1,new cljs.core.Keyword(null,"write-ch","write-ch",3462353029));var read_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42523__$1,new cljs.core.Keyword(null,"read-ch","read-ch",2094260078));return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",2094260078),cljs.core.async.map_LT_(chord.client.try_read_edn,read_ch),new cljs.core.Keyword(null,"write-ch","write-ch",3462353029),cljs.core.async.map_GT_(cljs.core.pr_str,write_ch)], null);
}));
chord.client.try_read_json = (function try_read_json(p__42524){var map__42527 = p__42524;var map__42527__$1 = ((cljs.core.seq_QMARK_(map__42527))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42527):map__42527);var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42527__$1,new cljs.core.Keyword(null,"message","message",1968829305));try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",1968829305),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(JSON.parse(message))], null);
}catch (e42528){if((e42528 instanceof Error))
{var e = e42528;return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",1110689146),new cljs.core.Keyword(null,"invalid-json","invalid-json",1494659696),new cljs.core.Keyword(null,"invalid-msg","invalid-msg",4354551325),message], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e42528;
} else
{return null;
}
}
}});
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"json","json",1017176154),(function (p__42529,_){var map__42530 = p__42529;var map__42530__$1 = ((cljs.core.seq_QMARK_(map__42530))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42530):map__42530);var write_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42530__$1,new cljs.core.Keyword(null,"write-ch","write-ch",3462353029));var read_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42530__$1,new cljs.core.Keyword(null,"read-ch","read-ch",2094260078));return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",2094260078),cljs.core.async.map_LT_(chord.client.try_read_json,read_ch),new cljs.core.Keyword(null,"write-ch","write-ch",3462353029),cljs.core.async.map_GT_(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(JSON.stringify,cljs.core.clj__GT_js),write_ch)], null);
}));
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"json-kw","json-kw",3998200803),(function (chs,_){return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3((chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2 ? chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2(chs,new cljs.core.Keyword(null,"json","json",1017176154)) : chord.client.wrap_format.call(null,chs,new cljs.core.Keyword(null,"json","json",1017176154))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"read-ch","read-ch",2094260078)], null),(function (p1__42531_SHARP_){return cljs.core.async.map_LT_(clojure.walk.keywordize_keys,p1__42531_SHARP_);
}));
}));
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"str","str",1014018467),(function (chs,_){return chs;
}));
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (chs,_){return (chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2 ? chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2(chs,new cljs.core.Keyword(null,"edn","edn",1014004513)) : chord.client.wrap_format.call(null,chs,new cljs.core.Keyword(null,"edn","edn",1014004513)));
}));
chord.client.wrap_format.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",2558708147),(function (chs,format){throw [cljs.core.str("ERROR: Invalid Chord channel format: "),cljs.core.str(format)].join('');
}));
/**
* Creates websockets connection and returns a 2-sided channel when the websocket is opened.
* Arguments:
* ws-url           - (required) link to websocket service
* opts             - (optional) map to configure reading/writing channels
* :read-ch       - (optional) (possibly buffered) channel to use for reading the websocket
* :write-ch      - (optional) (possibly buffered) channel to use for writing to the websocket
* :format        - (optional) data format to use on the channel, (at the moment)
* either :edn (default), :json, :json-kw or :str.
* 
* Usage:
* (:require [cljs.core.async :as a])
* 
* 
* (a/<! (ws-ch "ws://127.0.0.1:6437"))
* 
* (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))}))
* 
* (a/<! (ws-ch "ws://127.0.0.1:6437" {:read-ch (a/chan (a/sliding-buffer 10))
* :write-ch (a/chan (a/dropping-buffer 10))}))
* @param {...*} var_args
*/
chord.client.ws_ch = (function() { 
var ws_ch__delegate = function (ws_url,p__42532){var vec__42536 = p__42532;var map__42537 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42536,0,null);var map__42537__$1 = ((cljs.core.seq_QMARK_(map__42537))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42537):map__42537);var format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42537__$1,new cljs.core.Keyword(null,"format","format",4040092521));var write_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42537__$1,new cljs.core.Keyword(null,"write-ch","write-ch",3462353029));var read_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42537__$1,new cljs.core.Keyword(null,"read-ch","read-ch",2094260078));var web_socket = (new WebSocket(ws_url));var map__42538 = (chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2 ? chord.client.wrap_format.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",2094260078),(function (){var or__21049__auto__ = read_ch;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})(),new cljs.core.Keyword(null,"write-ch","write-ch",3462353029),(function (){var or__21049__auto__ = write_ch;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})()], null),format) : chord.client.wrap_format.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-ch","read-ch",2094260078),(function (){var or__21049__auto__ = read_ch;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})(),new cljs.core.Keyword(null,"write-ch","write-ch",3462353029),(function (){var or__21049__auto__ = write_ch;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})()], null),format));var map__42538__$1 = ((cljs.core.seq_QMARK_(map__42538))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__42538):map__42538);var write_ch__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42538__$1,new cljs.core.Keyword(null,"write-ch","write-ch",3462353029));var read_ch__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42538__$1,new cljs.core.Keyword(null,"read-ch","read-ch",2094260078));chord.client.read_from_ch_BANG_(read_ch__$1,web_socket);
chord.client.write_to_ch_BANG_(write_ch__$1,web_socket);
chord.client.on_error(web_socket,read_ch__$1);
chord.client.on_close(web_socket,read_ch__$1,write_ch__$1);
return chord.client.make_open_ch(web_socket,chord.client.combine_chs(web_socket,read_ch__$1,write_ch__$1));
};
var ws_ch = function (ws_url,var_args){
var p__42532 = null;if (arguments.length > 1) {
  p__42532 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return ws_ch__delegate.call(this,ws_url,p__42532);};
ws_ch.cljs$lang$maxFixedArity = 1;
ws_ch.cljs$lang$applyTo = (function (arglist__42539){
var ws_url = cljs.core.first(arglist__42539);
var p__42532 = cljs.core.rest(arglist__42539);
return ws_ch__delegate(ws_url,p__42532);
});
ws_ch.cljs$core$IFn$_invoke$arity$variadic = ws_ch__delegate;
return ws_ch;
})()
;
//# sourceMappingURL=client.js.map