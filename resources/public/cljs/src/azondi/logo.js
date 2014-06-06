goog.provide('azondi.logo');
goog.require('cljs.core');
goog.require('dommy.core');
goog.require('cljs.core.async');
goog.require('dommy.core');
goog.require('dommy.core');
goog.require('cljs.core.async');
/**
* Pick a color, but throw away really dark ones (R + G + B <= 300)
*/
azondi.logo.random_color = (function random_color(){return [cljs.core.str("fill:rgb("),cljs.core.str(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose(",",cljs.core.first(cljs.core.filter((function (p1__42203_SHARP_){return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,p1__42203_SHARP_) > 300);
}),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1((function (){return cljs.core.take(3,cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1((function (){return cljs.core.rand_int(255);
})));
}))))))),cljs.core.str(")")].join('');
});
azondi.logo.logoarea = (function logoarea(){return (h.html.cljs$core$IFn$_invoke$arity$1 ? h.html.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#logoarea.vcenter","div#logoarea.vcenter",2718964281),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",1014018518),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"viewBox","viewBox",1468104792),"0 20 1000 100"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"circle","circle",3948654658),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"cx","cx",1013907431),400,new cljs.core.Keyword(null,"cy","cy",1013907432),50,new cljs.core.Keyword(null,"r","r",1013904356),1,new cljs.core.Keyword(null,"fill","fill",1017047285),"red",new cljs.core.Keyword(null,"opacity","opacity",4041665405),"1.0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"animate","animate",4451935827),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"attributeName","attributeName",3859603129),"r",new cljs.core.Keyword(null,"values","values",4485058708),"15; 4; 2; 1",new cljs.core.Keyword(null,"dur","dur",1014004083),"1s",new cljs.core.Keyword(null,"begin","begin",1107520539),"1s",new cljs.core.Keyword(null,"calcMode","calcMode",832760074),"linear"], null)], null)], null)], null)], null)) : h.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#logoarea.vcenter","div#logoarea.vcenter",2718964281),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",1014018518),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"viewBox","viewBox",1468104792),"0 20 1000 100"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"circle","circle",3948654658),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"cx","cx",1013907431),400,new cljs.core.Keyword(null,"cy","cy",1013907432),50,new cljs.core.Keyword(null,"r","r",1013904356),1,new cljs.core.Keyword(null,"fill","fill",1017047285),"red",new cljs.core.Keyword(null,"opacity","opacity",4041665405),"1.0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"animate","animate",4451935827),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"attributeName","attributeName",3859603129),"r",new cljs.core.Keyword(null,"values","values",4485058708),"15; 4; 2; 1",new cljs.core.Keyword(null,"dur","dur",1014004083),"1s",new cljs.core.Keyword(null,"begin","begin",1107520539),"1s",new cljs.core.Keyword(null,"calcMode","calcMode",832760074),"linear"], null)], null)], null)], null)], null)));
});
azondi.logo.make_animate = (function make_animate(){var G__42205 = document.createElementNS("http://www.w3.org/2000/svg","animate");G__42205.setAttribute("attributeName","r");
G__42205.setAttribute("dur","1s");
G__42205.setAttribute("values","12; 4; 2; 1");
G__42205.setAttribute("calcMode","linear");
return G__42205;
});
azondi.logo.init = (function init(){var svg = document.querySelector("#logoarea svg");var seq__42256 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(50));var chunk__42257 = null;var count__42258 = 0;var i__42259 = 0;while(true){
if((i__42259 < count__42258))
{var n = chunk__42257.cljs$core$IIndexed$_nth$arity$2(null,i__42259);var x_42306 = cljs.core.rand_int(1000);var anim_42307 = azondi.logo.make_animate();var el_42308 = (function (){var dom42260 = document.createElementNS("http://www.w3.org/2000/svg","circle");if(cljs.core.truth_(x_42306))
{dom42260.setAttribute("cx",x_42306);
} else
{}
if(50)
{dom42260.setAttribute("cy",50);
} else
{}
if(1)
{dom42260.setAttribute("r",1);
} else
{}
if(cljs.core.truth_(azondi.logo.random_color()))
{dom42260.setAttribute("style",(dommy.core.style_str.cljs$core$IFn$_invoke$arity$1 ? dommy.core.style_str.cljs$core$IFn$_invoke$arity$1(azondi.logo.random_color()) : dommy.core.style_str.call(null,azondi.logo.random_color())));
} else
{}
dom42260.appendChild(dommy.template.__GT_node_like(anim_42307));
return dom42260;
})();var c__24520__auto___42309 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42309,anim_42307,el_42308,x_42306,n){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42309,anim_42307,el_42308,x_42306,n){
return (function (state_42271){var state_val_42272 = (state_42271[1]);if((state_val_42272 === 4))
{var inst_42265 = (state_42271[2]);var inst_42266 = anim_42307.beginElement();var state_42271__$1 = (function (){var statearr_42273 = state_42271;(statearr_42273[7] = inst_42265);
(statearr_42273[8] = inst_42266);
return statearr_42273;
})();var statearr_42274_42310 = state_42271__$1;(statearr_42274_42310[2] = null);
(statearr_42274_42310[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42272 === 3))
{var inst_42269 = (state_42271[2]);var state_42271__$1 = state_42271;return cljs.core.async.impl.ioc_helpers.return_chan(state_42271__$1,inst_42269);
} else
{if((state_val_42272 === 2))
{var inst_42262 = cljs.core.rand_int(10000);var inst_42263 = cljs.core.async.timeout(inst_42262);var state_42271__$1 = state_42271;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42271__$1,4,inst_42263);
} else
{if((state_val_42272 === 1))
{var state_42271__$1 = state_42271;var statearr_42275_42311 = state_42271__$1;(statearr_42275_42311[2] = null);
(statearr_42275_42311[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
});})(seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42309,anim_42307,el_42308,x_42306,n))
;return ((function (seq__42256,chunk__42257,count__42258,i__42259,switch__24505__auto__,c__24520__auto___42309,anim_42307,el_42308,x_42306,n){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_42279 = [null,null,null,null,null,null,null,null,null];(statearr_42279[0] = state_machine__24506__auto__);
(statearr_42279[1] = 1);
return statearr_42279;
});
var state_machine__24506__auto____1 = (function (state_42271){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_42271);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e42280){if((e42280 instanceof Object))
{var ex__24509__auto__ = e42280;var statearr_42281_42312 = state_42271;(statearr_42281_42312[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_42271);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e42280;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__42313 = state_42271;
state_42271 = G__42313;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_42271){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_42271);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(seq__42256,chunk__42257,count__42258,i__42259,switch__24505__auto__,c__24520__auto___42309,anim_42307,el_42308,x_42306,n))
})();var state__24522__auto__ = (function (){var statearr_42282 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_42282[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___42309);
return statearr_42282;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42309,anim_42307,el_42308,x_42306,n))
);
dommy.core.append_BANG_.cljs$core$IFn$_invoke$arity$2(svg,el_42308);
{
var G__42314 = seq__42256;
var G__42315 = chunk__42257;
var G__42316 = count__42258;
var G__42317 = (i__42259 + 1);
seq__42256 = G__42314;
chunk__42257 = G__42315;
count__42258 = G__42316;
i__42259 = G__42317;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq(seq__42256);if(temp__4126__auto__)
{var seq__42256__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_(seq__42256__$1))
{var c__21797__auto__ = cljs.core.chunk_first(seq__42256__$1);{
var G__42318 = cljs.core.chunk_rest(seq__42256__$1);
var G__42319 = c__21797__auto__;
var G__42320 = cljs.core.count(c__21797__auto__);
var G__42321 = 0;
seq__42256 = G__42318;
chunk__42257 = G__42319;
count__42258 = G__42320;
i__42259 = G__42321;
continue;
}
} else
{var n = cljs.core.first(seq__42256__$1);var x_42322 = cljs.core.rand_int(1000);var anim_42323 = azondi.logo.make_animate();var el_42324 = (function (){var dom42283 = document.createElementNS("http://www.w3.org/2000/svg","circle");if(cljs.core.truth_(x_42322))
{dom42283.setAttribute("cx",x_42322);
} else
{}
if(50)
{dom42283.setAttribute("cy",50);
} else
{}
if(1)
{dom42283.setAttribute("r",1);
} else
{}
if(cljs.core.truth_(azondi.logo.random_color()))
{dom42283.setAttribute("style",(dommy.core.style_str.cljs$core$IFn$_invoke$arity$1 ? dommy.core.style_str.cljs$core$IFn$_invoke$arity$1(azondi.logo.random_color()) : dommy.core.style_str.call(null,azondi.logo.random_color())));
} else
{}
dom42283.appendChild(dommy.template.__GT_node_like(anim_42323));
return dom42283;
})();var c__24520__auto___42325 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run(((function (seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__){
return (function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = ((function (seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__){
return (function (state_42294){var state_val_42295 = (state_42294[1]);if((state_val_42295 === 4))
{var inst_42288 = (state_42294[2]);var inst_42289 = anim_42323.beginElement();var state_42294__$1 = (function (){var statearr_42296 = state_42294;(statearr_42296[7] = inst_42289);
(statearr_42296[8] = inst_42288);
return statearr_42296;
})();var statearr_42297_42326 = state_42294__$1;(statearr_42297_42326[2] = null);
(statearr_42297_42326[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_42295 === 3))
{var inst_42292 = (state_42294[2]);var state_42294__$1 = state_42294;return cljs.core.async.impl.ioc_helpers.return_chan(state_42294__$1,inst_42292);
} else
{if((state_val_42295 === 2))
{var inst_42285 = cljs.core.rand_int(10000);var inst_42286 = cljs.core.async.timeout(inst_42285);var state_42294__$1 = state_42294;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42294__$1,4,inst_42286);
} else
{if((state_val_42295 === 1))
{var state_42294__$1 = state_42294;var statearr_42298_42327 = state_42294__$1;(statearr_42298_42327[2] = null);
(statearr_42298_42327[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
});})(seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__))
;return ((function (seq__42256,chunk__42257,count__42258,i__42259,switch__24505__auto__,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_42302 = [null,null,null,null,null,null,null,null,null];(statearr_42302[0] = state_machine__24506__auto__);
(statearr_42302[1] = 1);
return statearr_42302;
});
var state_machine__24506__auto____1 = (function (state_42294){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_42294);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e42303){if((e42303 instanceof Object))
{var ex__24509__auto__ = e42303;var statearr_42304_42328 = state_42294;(statearr_42304_42328[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_42294);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e42303;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__42329 = state_42294;
state_42294 = G__42329;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_42294){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_42294);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(seq__42256,chunk__42257,count__42258,i__42259,switch__24505__auto__,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__))
})();var state__24522__auto__ = (function (){var statearr_42305 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_42305[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___42325);
return statearr_42305;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
});})(seq__42256,chunk__42257,count__42258,i__42259,c__24520__auto___42325,anim_42323,el_42324,x_42322,n,seq__42256__$1,temp__4126__auto__))
);
dommy.core.append_BANG_.cljs$core$IFn$_invoke$arity$2(svg,el_42324);
{
var G__42330 = cljs.core.next(seq__42256__$1);
var G__42331 = null;
var G__42332 = 0;
var G__42333 = 0;
seq__42256 = G__42330;
chunk__42257 = G__42331;
count__42258 = G__42332;
i__42259 = G__42333;
continue;
}
}
} else
{return null;
}
}
break;
}
});
window.onload = azondi.logo.init;
//# sourceMappingURL=logo.js.map