goog.provide('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.ioc_helpers.FN_IDX = 0;
cljs.core.async.impl.ioc_helpers.STATE_IDX = 1;
cljs.core.async.impl.ioc_helpers.VALUE_IDX = 2;
cljs.core.async.impl.ioc_helpers.BINDINGS_IDX = 3;
cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES = 4;
cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION = 5;
cljs.core.async.impl.ioc_helpers.USER_START_IDX = 6;
cljs.core.async.impl.ioc_helpers.aset_object = (function aset_object(arr,idx,o){return (arr[idx][o]);
});
cljs.core.async.impl.ioc_helpers.aget_object = (function aget_object(arr,idx){return (arr[idx]);
});
/**
* Returns true if the machine is in a finished state
*/
cljs.core.async.impl.ioc_helpers.finished_QMARK_ = (function finished_QMARK_(state_array){return cljs.core.keyword_identical_QMARK_((state_array[cljs.core.async.impl.ioc_helpers.STATE_IDX]),new cljs.core.Keyword(null,"finished","finished",4635210724));
});
cljs.core.async.impl.ioc_helpers.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.impl.ioc_helpers.t38724 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.impl.ioc_helpers.t38724 = (function (f,fn_handler,meta38725){
this.f = f;
this.fn_handler = fn_handler;
this.meta38725 = meta38725;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.impl.ioc_helpers.t38724.cljs$lang$type = true;
cljs.core.async.impl.ioc_helpers.t38724.cljs$lang$ctorStr = "cljs.core.async.impl.ioc-helpers/t38724";
cljs.core.async.impl.ioc_helpers.t38724.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async.impl.ioc-helpers/t38724");
});
cljs.core.async.impl.ioc_helpers.t38724.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.impl.ioc_helpers.t38724.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.impl.ioc_helpers.t38724.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.impl.ioc_helpers.t38724.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38726){var self__ = this;
var _38726__$1 = this;return self__.meta38725;
});
cljs.core.async.impl.ioc_helpers.t38724.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38726,meta38725__$1){var self__ = this;
var _38726__$1 = this;return (new cljs.core.async.impl.ioc_helpers.t38724(self__.f,self__.fn_handler,meta38725__$1));
});
cljs.core.async.impl.ioc_helpers.__GT_t38724 = (function __GT_t38724(f__$1,fn_handler__$1,meta38725){return (new cljs.core.async.impl.ioc_helpers.t38724(f__$1,fn_handler__$1,meta38725));
});
}
return (new cljs.core.async.impl.ioc_helpers.t38724(f,fn_handler,null));
});
cljs.core.async.impl.ioc_helpers.run_state_machine = (function run_state_machine(state){return cljs.core.async.impl.ioc_helpers.aget_object(state,cljs.core.async.impl.ioc_helpers.FN_IDX).call(null,state);
});
cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped = (function run_state_machine_wrapped(state){try{return cljs.core.async.impl.ioc_helpers.run_state_machine(state);
}catch (e38728){if((e38728 instanceof Object))
{var ex = e38728;cljs.core.async.impl.ioc_helpers.aget_object(state,cljs.core.async.impl.ioc_helpers.USER_START_IDX).cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1(null);
throw ex;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e38728;
} else
{return null;
}
}
}});
cljs.core.async.impl.ioc_helpers.take_BANG_ = (function take_BANG_(state,blk,c){var temp__4124__auto__ = c.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2(null,cljs.core.async.impl.ioc_helpers.fn_handler((function (x){var statearr_38731_38733 = state;(statearr_38731_38733[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = x);
(statearr_38731_38733[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
})));if(cljs.core.truth_(temp__4124__auto__))
{var cb = temp__4124__auto__;var statearr_38732_38734 = state;(statearr_38732_38734[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(cb));
(statearr_38732_38734[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
});
cljs.core.async.impl.ioc_helpers.put_BANG_ = (function put_BANG_(state,blk,c,val){var temp__4124__auto__ = c.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3(null,val,cljs.core.async.impl.ioc_helpers.fn_handler((function (){var statearr_38737_38739 = state;(statearr_38737_38739[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = null);
(statearr_38737_38739[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
})));if(cljs.core.truth_(temp__4124__auto__))
{var cb = temp__4124__auto__;var statearr_38738_38740 = state;(statearr_38738_38740[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(cb));
(statearr_38738_38740[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
});
/**
* @param {...*} var_args
*/
cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_ = (function() { 
var ioc_alts_BANG___delegate = function (state,cont_block,ports,p__38741){var map__38746 = p__38741;var map__38746__$1 = ((cljs.core.seq_QMARK_(map__38746))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__38746):map__38746);var opts = map__38746__$1;var statearr_38747_38750 = state;(statearr_38747_38750[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);
var temp__4126__auto__ = (cljs.core.async.do_alts.cljs$core$IFn$_invoke$arity$3 ? cljs.core.async.do_alts.cljs$core$IFn$_invoke$arity$3((function (val){var statearr_38748_38751 = state;(statearr_38748_38751[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts) : cljs.core.async.do_alts.call(null,(function (val){var statearr_38748_38752 = state;(statearr_38748_38752[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts));if(cljs.core.truth_(temp__4126__auto__))
{var cb = temp__4126__auto__;var statearr_38749_38753 = state;(statearr_38749_38753[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(cb));
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
};
var ioc_alts_BANG_ = function (state,cont_block,ports,var_args){
var p__38741 = null;if (arguments.length > 3) {
  p__38741 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return ioc_alts_BANG___delegate.call(this,state,cont_block,ports,p__38741);};
ioc_alts_BANG_.cljs$lang$maxFixedArity = 3;
ioc_alts_BANG_.cljs$lang$applyTo = (function (arglist__38754){
var state = cljs.core.first(arglist__38754);
arglist__38754 = cljs.core.next(arglist__38754);
var cont_block = cljs.core.first(arglist__38754);
arglist__38754 = cljs.core.next(arglist__38754);
var ports = cljs.core.first(arglist__38754);
var p__38741 = cljs.core.rest(arglist__38754);
return ioc_alts_BANG___delegate(state,cont_block,ports,p__38741);
});
ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = ioc_alts_BANG___delegate;
return ioc_alts_BANG_;
})()
;
cljs.core.async.impl.ioc_helpers.return_chan = (function return_chan(state,value){var c = (state[cljs.core.async.impl.ioc_helpers.USER_START_IDX]);if((value == null))
{} else
{c.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3(null,value,cljs.core.async.impl.ioc_helpers.fn_handler((function (){return null;
})));
}
c.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1(null);
return c;
});

/**
* @constructor
* @param {*} catch_block
* @param {*} catch_exception
* @param {*} finally_block
* @param {*} continue_block
* @param {*} prev
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
cljs.core.async.impl.ioc_helpers.ExceptionFrame = (function (catch_block,catch_exception,finally_block,continue_block,prev,__meta,__extmap){
this.catch_block = catch_block;
this.catch_exception = catch_exception;
this.finally_block = finally_block;
this.continue_block = continue_block;
this.prev = prev;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
if(arguments.length>5){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__21635__auto__,k__21636__auto__){var self__ = this;
var this__21635__auto____$1 = this;return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__21635__auto____$1,k__21636__auto__,null);
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__21637__auto__,k38756,else__21638__auto__){var self__ = this;
var this__21637__auto____$1 = this;if(cljs.core.keyword_identical_QMARK_(k38756,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893)))
{return self__.catch_block;
} else
{if(cljs.core.keyword_identical_QMARK_(k38756,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687)))
{return self__.catch_exception;
} else
{if(cljs.core.keyword_identical_QMARK_(k38756,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429)))
{return self__.finally_block;
} else
{if(cljs.core.keyword_identical_QMARK_(k38756,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097)))
{return self__.continue_block;
} else
{if(cljs.core.keyword_identical_QMARK_(k38756,new cljs.core.Keyword(null,"prev","prev",1017353637)))
{return self__.prev;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k38756,else__21638__auto__);
} else
{return null;
}
}
}
}
}
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__21649__auto__,writer__21650__auto__,opts__21651__auto__){var self__ = this;
var this__21649__auto____$1 = this;var pr_pair__21652__auto__ = (function (keyval__21653__auto__){return cljs.core.pr_sequential_writer(writer__21650__auto__,cljs.core.pr_writer,""," ","",opts__21651__auto__,keyval__21653__auto__);
});return cljs.core.pr_sequential_writer(writer__21650__auto__,pr_pair__21652__auto__,"#cljs.core.async.impl.ioc-helpers.ExceptionFrame{",", ","}",opts__21651__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),self__.catch_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),self__.catch_exception],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),self__.finally_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),self__.continue_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"prev","prev",1017353637),self__.prev],null))], null),self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__21633__auto__){var self__ = this;
var this__21633__auto____$1 = this;return self__.__meta;
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__21629__auto__){var self__ = this;
var this__21629__auto____$1 = this;return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,self__.__hash));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__21639__auto__){var self__ = this;
var this__21639__auto____$1 = this;return (5 + cljs.core.count(self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__21630__auto__){var self__ = this;
var this__21630__auto____$1 = this;var h__21460__auto__ = self__.__hash;if(!((h__21460__auto__ == null)))
{return h__21460__auto__;
} else
{var h__21460__auto____$1 = cljs.core.hash_imap(this__21630__auto____$1);self__.__hash = h__21460__auto____$1;
return h__21460__auto____$1;
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__21631__auto__,other__21632__auto__){var self__ = this;
var this__21631__auto____$1 = this;if(cljs.core.truth_((function (){var and__21037__auto__ = other__21632__auto__;if(cljs.core.truth_(and__21037__auto__))
{return ((this__21631__auto____$1.constructor === other__21632__auto__.constructor)) && (cljs.core.equiv_map(this__21631__auto____$1,other__21632__auto__));
} else
{return and__21037__auto__;
}
})()))
{return true;
} else
{return false;
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__21644__auto__,k__21645__auto__){var self__ = this;
var this__21644__auto____$1 = this;if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),null,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),null,new cljs.core.Keyword(null,"prev","prev",1017353637),null,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),null], null), null),k__21645__auto__))
{return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into(cljs.core.PersistentArrayMap.EMPTY,this__21644__auto____$1),self__.__meta),k__21645__auto__);
} else
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__21645__auto__)),null));
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__21642__auto__,k__21643__auto__,G__38755){var self__ = this;
var this__21642__auto____$1 = this;var pred__38758 = cljs.core.keyword_identical_QMARK_;var expr__38759 = k__21643__auto__;if(cljs.core.truth_((pred__38758.cljs$core$IFn$_invoke$arity$2 ? pred__38758.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),expr__38759) : pred__38758.call(null,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),expr__38759))))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(G__38755,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_((pred__38758.cljs$core$IFn$_invoke$arity$2 ? pred__38758.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),expr__38759) : pred__38758.call(null,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),expr__38759))))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,G__38755,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_((pred__38758.cljs$core$IFn$_invoke$arity$2 ? pred__38758.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),expr__38759) : pred__38758.call(null,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),expr__38759))))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,G__38755,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_((pred__38758.cljs$core$IFn$_invoke$arity$2 ? pred__38758.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),expr__38759) : pred__38758.call(null,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),expr__38759))))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,G__38755,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(cljs.core.truth_((pred__38758.cljs$core$IFn$_invoke$arity$2 ? pred__38758.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"prev","prev",1017353637),expr__38759) : pred__38758.call(null,new cljs.core.Keyword(null,"prev","prev",1017353637),expr__38759))))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,G__38755,self__.__meta,self__.__extmap,null));
} else
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__21643__auto__,G__38755),null));
}
}
}
}
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__21647__auto__){var self__ = this;
var this__21647__auto____$1 = this;return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),self__.catch_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),self__.catch_exception],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),self__.finally_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),self__.continue_block],null)),(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"prev","prev",1017353637),self__.prev],null))], null),self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__21634__auto__,G__38755){var self__ = this;
var this__21634__auto____$1 = this;return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,G__38755,self__.__extmap,self__.__hash));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__21640__auto__,entry__21641__auto__){var self__ = this;
var this__21640__auto____$1 = this;if(cljs.core.vector_QMARK_(entry__21641__auto__))
{return cljs.core._assoc(this__21640__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__21641__auto__,0),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__21641__auto__,1));
} else
{return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__21640__auto____$1,entry__21641__auto__);
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$type = true;
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrSeq = (function (this__21669__auto__){return cljs.core._conj(cljs.core.List.EMPTY,"cljs.core.async.impl.ioc-helpers/ExceptionFrame");
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrWriter = (function (this__21669__auto__,writer__21670__auto__){return cljs.core._write(writer__21670__auto__,"cljs.core.async.impl.ioc-helpers/ExceptionFrame");
});
cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame = (function __GT_ExceptionFrame(catch_block,catch_exception,finally_block,continue_block,prev){return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(catch_block,catch_exception,finally_block,continue_block,prev));
});
cljs.core.async.impl.ioc_helpers.map__GT_ExceptionFrame = (function map__GT_ExceptionFrame(G__38757){return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(new cljs.core.Keyword(null,"catch-block","catch-block",2343862893).cljs$core$IFn$_invoke$arity$1(G__38757),new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687).cljs$core$IFn$_invoke$arity$1(G__38757),new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(G__38757),new cljs.core.Keyword(null,"continue-block","continue-block",1486987097).cljs$core$IFn$_invoke$arity$1(G__38757),new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(G__38757),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__38757,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),cljs.core.array_seq([new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),new cljs.core.Keyword(null,"prev","prev",1017353637)], 0))));
});
cljs.core.async.impl.ioc_helpers.add_exception_frame = (function add_exception_frame(state,catch_block,catch_exception,finally_block,continue_block){var statearr_38762 = state;(statearr_38762[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame(catch_block,catch_exception,finally_block,continue_block,cljs.core.async.impl.ioc_helpers.aget_object(state,cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES)));
return statearr_38762;
});
cljs.core.async.impl.ioc_helpers.process_exception = (function process_exception(state){while(true){
var exception_frame = cljs.core.async.impl.ioc_helpers.aget_object(state,cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES);var catch_block = new cljs.core.Keyword(null,"catch-block","catch-block",2343862893).cljs$core$IFn$_invoke$arity$1(exception_frame);var catch_exception = new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687).cljs$core$IFn$_invoke$arity$1(exception_frame);var exception = cljs.core.async.impl.ioc_helpers.aget_object(state,cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION);if(cljs.core.truth_((function (){var and__21037__auto__ = exception;if(cljs.core.truth_(and__21037__auto__))
{return cljs.core.not(exception_frame);
} else
{return and__21037__auto__;
}
})()))
{throw exception;
} else
{if(cljs.core.truth_((function (){var and__21037__auto__ = exception;if(cljs.core.truth_(and__21037__auto__))
{var and__21037__auto____$1 = catch_block;if(cljs.core.truth_(and__21037__auto____$1))
{return (exception instanceof catch_exception);
} else
{return and__21037__auto____$1;
}
} else
{return and__21037__auto__;
}
})()))
{var statearr_38768 = state;(statearr_38768[cljs.core.async.impl.ioc_helpers.STATE_IDX] = catch_block);
(statearr_38768[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = exception);
(statearr_38768[cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION] = null);
(statearr_38768[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(exception_frame,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),null,cljs.core.array_seq([new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),null], 0)));
return statearr_38768;
} else
{if(cljs.core.truth_((function (){var and__21037__auto__ = exception;if(cljs.core.truth_(and__21037__auto__))
{return (cljs.core.not(catch_block)) && (cljs.core.not(new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame)));
} else
{return and__21037__auto__;
}
})()))
{var statearr_38769_38773 = state;(statearr_38769_38773[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(exception_frame));
{
var G__38774 = state;
state = G__38774;
continue;
}
} else
{if(cljs.core.truth_((function (){var and__21037__auto__ = exception;if(cljs.core.truth_(and__21037__auto__))
{var and__21037__auto____$1 = cljs.core.not(catch_block);if(and__21037__auto____$1)
{return new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame);
} else
{return and__21037__auto____$1;
}
} else
{return and__21037__auto__;
}
})()))
{var statearr_38770 = state;(statearr_38770[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_38770[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(exception_frame,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null));
return statearr_38770;
} else
{if(cljs.core.truth_((function (){var and__21037__auto__ = cljs.core.not(exception);if(and__21037__auto__)
{return new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame);
} else
{return and__21037__auto__;
}
})()))
{var statearr_38771 = state;(statearr_38771[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_38771[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(exception_frame,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null));
return statearr_38771;
} else
{if((cljs.core.not(exception)) && (cljs.core.not(new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame))))
{var statearr_38772 = state;(statearr_38772[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"continue-block","continue-block",1486987097).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_38772[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(exception_frame));
return statearr_38772;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{if(false)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("No matching clause"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([false], 0)))].join('')));
}
} else
{return null;
}
}
}
}
}
}
}
break;
}
});
//# sourceMappingURL=ioc_helpers.js.map