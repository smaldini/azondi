goog.provide('azondi.chart');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('sablono.core');
goog.require('sablono.core');
goog.require('om.core');
goog.require('om.core');
goog.require('cljs.core.async');
azondi.chart.chart_component = (function chart_component(app_state,owner){if(typeof azondi.chart.t43062 !== 'undefined')
{} else
{
/**
* @constructor
*/
azondi.chart.t43062 = (function (owner,app_state,chart_component,meta43063){
this.owner = owner;
this.app_state = app_state;
this.chart_component = chart_component;
this.meta43063 = meta43063;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
azondi.chart.t43062.cljs$lang$type = true;
azondi.chart.t43062.cljs$lang$ctorStr = "azondi.chart/t43062";
azondi.chart.t43062.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"azondi.chart/t43062");
});
azondi.chart.t43062.prototype.om$core$IRender$ = true;
azondi.chart.t43062.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.svg({"version": "1.1", "width": 810, "height": 140},React.DOM.g({"transform": "translate(0,0)"},sablono.interpreter.interpret((function (){var now = om.core.get_state.cljs$core$IFn$_invoke$arity$2(self__.owner,new cljs.core.Keyword(null,"from-time","from-time",1048414850));return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",1017400662),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",1013904362),800,new cljs.core.Keyword(null,"y","y",1013904363),0,new cljs.core.Keyword(null,"width","width",1127031096),2,new cljs.core.Keyword(null,"height","height",4087841945),80,new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",3722789425),"12pt",new cljs.core.Keyword(null,"stroke","stroke",4416891306),"none",new cljs.core.Keyword(null,"fill","fill",1017047285),"red"], null)], null)], null)], null),(function (){var iter__21766__auto__ = (function iter__43065(s__43066){return (new cljs.core.LazySeq(null,(function (){var s__43066__$1 = s__43066;while(true){
var temp__4126__auto__ = cljs.core.seq(s__43066__$1);if(temp__4126__auto__)
{var s__43066__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(s__43066__$2))
{var c__21764__auto__ = cljs.core.chunk_first(s__43066__$2);var size__21765__auto__ = cljs.core.count(c__21764__auto__);var b__43068 = cljs.core.chunk_buffer(size__21765__auto__);if((function (){var i__43067 = 0;while(true){
if((i__43067 < size__21765__auto__))
{var map__43071 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__21764__auto__,i__43067);var map__43071__$1 = ((cljs.core.seq_QMARK_(map__43071))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__43071):map__43071);var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43071__$1,new cljs.core.Keyword(null,"value","value",1125876963));cljs.core.chunk_append(b__43068,(cljs.core.truth_(value)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",1017400662),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",1013904362),value,new cljs.core.Keyword(null,"y","y",1013904363),0,new cljs.core.Keyword(null,"width","width",1127031096),1,new cljs.core.Keyword(null,"height","height",4087841945),80,new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",3722789425),"12pt",new cljs.core.Keyword(null,"stroke","stroke",4416891306),"none",new cljs.core.Keyword(null,"fill","fill",1017047285),"#888"], null)], null)], null):null));
{
var G__43096 = (i__43067 + 1);
i__43067 = G__43096;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons(cljs.core.chunk(b__43068),iter__43065(cljs.core.chunk_rest(s__43066__$2)));
} else
{return cljs.core.chunk_cons(cljs.core.chunk(b__43068),null);
}
} else
{var map__43072 = cljs.core.first(s__43066__$2);var map__43072__$1 = ((cljs.core.seq_QMARK_(map__43072))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__43072):map__43072);var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43072__$1,new cljs.core.Keyword(null,"value","value",1125876963));return cljs.core.cons((cljs.core.truth_(value)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",1017400662),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",1013904362),value,new cljs.core.Keyword(null,"y","y",1013904363),0,new cljs.core.Keyword(null,"width","width",1127031096),1,new cljs.core.Keyword(null,"height","height",4087841945),80,new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",3722789425),"12pt",new cljs.core.Keyword(null,"stroke","stroke",4416891306),"none",new cljs.core.Keyword(null,"fill","fill",1017047285),"#888"], null)], null)], null):null),iter__43065(cljs.core.rest(s__43066__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__21766__auto__(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__43027_SHARP_){var temp__4124__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__43027_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",1968829305),new cljs.core.Keyword(null,"time","time",1017464383)], null));if(cljs.core.truth_(temp__4124__auto__))
{var then = temp__4124__auto__;return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__43027_SHARP_,new cljs.core.Keyword(null,"value","value",1125876963),(800 - (((now - then) / 1000) | 0)));
} else
{return p1__43027_SHARP_;
}
}),cljs.core.seq(self__.app_state)));
})());
})())));
});
azondi.chart.t43062.prototype.om$core$IWillMount$ = true;
azondi.chart.t43062.prototype.om$core$IWillMount$will_mount$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_43084){var state_val_43085 = (state_43084[1]);if((state_val_43085 === 4))
{var inst_43076 = (state_43084[2]);var inst_43077 = (new Date());var inst_43078 = inst_43077.getTime();var inst_43079 = om.core.set_state_BANG_.cljs$core$IFn$_invoke$arity$3(self__.owner,new cljs.core.Keyword(null,"from-time","from-time",1048414850),inst_43078);var state_43084__$1 = (function (){var statearr_43086 = state_43084;(statearr_43086[7] = inst_43076);
(statearr_43086[8] = inst_43079);
return statearr_43086;
})();var statearr_43087_43097 = state_43084__$1;(statearr_43087_43097[2] = null);
(statearr_43087_43097[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_43085 === 3))
{var inst_43082 = (state_43084[2]);var state_43084__$1 = state_43084;return cljs.core.async.impl.ioc_helpers.return_chan(state_43084__$1,inst_43082);
} else
{if((state_val_43085 === 2))
{var inst_43074 = cljs.core.async.timeout(250);var state_43084__$1 = state_43084;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_43084__$1,4,inst_43074);
} else
{if((state_val_43085 === 1))
{var state_43084__$1 = state_43084;var statearr_43088_43098 = state_43084__$1;(statearr_43088_43098[2] = null);
(statearr_43088_43098[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_43092 = [null,null,null,null,null,null,null,null,null];(statearr_43092[0] = state_machine__24506__auto__);
(statearr_43092[1] = 1);
return statearr_43092;
});
var state_machine__24506__auto____1 = (function (state_43084){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_43084);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e43093){if((e43093 instanceof Object))
{var ex__24509__auto__ = e43093;var statearr_43094_43099 = state_43084;(statearr_43094_43099[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_43084);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e43093;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__43100 = state_43084;
state_43084 = G__43100;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_43084){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_43084);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_43095 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_43095[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_43095;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
azondi.chart.t43062.prototype.om$core$IInitState$ = true;
azondi.chart.t43062.prototype.om$core$IInitState$init_state$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from-time","from-time",1048414850),(new Date()).getTime()], null);
});
azondi.chart.t43062.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_43064){var self__ = this;
var _43064__$1 = this;return self__.meta43063;
});
azondi.chart.t43062.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_43064,meta43063__$1){var self__ = this;
var _43064__$1 = this;return (new azondi.chart.t43062(self__.owner,self__.app_state,self__.chart_component,meta43063__$1));
});
azondi.chart.__GT_t43062 = (function __GT_t43062(owner__$1,app_state__$1,chart_component__$1,meta43063){return (new azondi.chart.t43062(owner__$1,app_state__$1,chart_component__$1,meta43063));
});
}
return (new azondi.chart.t43062(owner,app_state,chart_component,null));
});
//# sourceMappingURL=chart.js.map