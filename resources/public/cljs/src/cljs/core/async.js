goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t38802 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38802 = (function (f,fn_handler,meta38803){
this.f = f;
this.fn_handler = fn_handler;
this.meta38803 = meta38803;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38802.cljs$lang$type = true;
cljs.core.async.t38802.cljs$lang$ctorStr = "cljs.core.async/t38802";
cljs.core.async.t38802.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38802");
});
cljs.core.async.t38802.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t38802.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t38802.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t38802.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38804){var self__ = this;
var _38804__$1 = this;return self__.meta38803;
});
cljs.core.async.t38802.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38804,meta38803__$1){var self__ = this;
var _38804__$1 = this;return (new cljs.core.async.t38802(self__.f,self__.fn_handler,meta38803__$1));
});
cljs.core.async.__GT_t38802 = (function __GT_t38802(f__$1,fn_handler__$1,meta38803){return (new cljs.core.async.t38802(f__$1,fn_handler__$1,meta38803));
});
}
return (new cljs.core.async.t38802(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__38806 = buff;if(G__38806)
{var bit__21699__auto__ = null;if(cljs.core.truth_((function (){var or__21049__auto__ = bit__21699__auto__;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return G__38806.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__38806.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,G__38806);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,G__38806);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.cljs$core$IFn$_invoke$arity$1(null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout(msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler(fn1));if(cljs.core.truth_(ret))
{var val_38807 = cljs.core.deref(ret);if(cljs.core.truth_(on_caller_QMARK_))
{(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_38807) : fn1.call(null,val_38807));
} else
{cljs.core.async.impl.dispatch.run((function (){return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_38807) : fn1.call(null,val_38807));
}));
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.cljs$core$IFn$_invoke$arity$3(port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler(fn0));if(cljs.core.truth_((function (){var and__21037__auto__ = ret;if(cljs.core.truth_(and__21037__auto__))
{return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(fn0,cljs.core.async.nop);
} else
{return and__21037__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{(fn0.cljs$core$IFn$_invoke$arity$0 ? fn0.cljs$core$IFn$_invoke$arity$0() : fn0.call(null));
} else
{cljs.core.async.impl.dispatch.run(fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__21897__auto___38808 = n;var x_38809 = 0;while(true){
if((x_38809 < n__21897__auto___38808))
{(a[x_38809] = 0);
{
var G__38810 = (x_38809 + 1);
x_38809 = G__38810;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,n))
{return a;
} else
{var j = cljs.core.rand_int(i);(a[i] = (a[j]));
(a[j] = i);
{
var G__38811 = (i + 1);
i = G__38811;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);if(typeof cljs.core.async.t38815 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38815 = (function (flag,alt_flag,meta38816){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta38816 = meta38816;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38815.cljs$lang$type = true;
cljs.core.async.t38815.cljs$lang$ctorStr = "cljs.core.async/t38815";
cljs.core.async.t38815.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38815");
});
cljs.core.async.t38815.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t38815.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref(self__.flag);
});
cljs.core.async.t38815.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_(self__.flag,null);
return true;
});
cljs.core.async.t38815.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38817){var self__ = this;
var _38817__$1 = this;return self__.meta38816;
});
cljs.core.async.t38815.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38817,meta38816__$1){var self__ = this;
var _38817__$1 = this;return (new cljs.core.async.t38815(self__.flag,self__.alt_flag,meta38816__$1));
});
cljs.core.async.__GT_t38815 = (function __GT_t38815(flag__$1,alt_flag__$1,meta38816){return (new cljs.core.async.t38815(flag__$1,alt_flag__$1,meta38816));
});
}
return (new cljs.core.async.t38815(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t38821 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38821 = (function (cb,flag,alt_handler,meta38822){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta38822 = meta38822;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38821.cljs$lang$type = true;
cljs.core.async.t38821.cljs$lang$ctorStr = "cljs.core.async/t38821";
cljs.core.async.t38821.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38821");
});
cljs.core.async.t38821.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t38821.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
});
cljs.core.async.t38821.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit(self__.flag);
return self__.cb;
});
cljs.core.async.t38821.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38823){var self__ = this;
var _38823__$1 = this;return self__.meta38822;
});
cljs.core.async.t38821.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38823,meta38822__$1){var self__ = this;
var _38823__$1 = this;return (new cljs.core.async.t38821(self__.cb,self__.flag,self__.alt_handler,meta38822__$1));
});
cljs.core.async.__GT_t38821 = (function __GT_t38821(cb__$1,flag__$1,alt_handler__$1,meta38822){return (new cljs.core.async.t38821(cb__$1,flag__$1,alt_handler__$1,meta38822));
});
}
return (new cljs.core.async.t38821(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag();var n = cljs.core.count(ports);var idxs = cljs.core.async.random_array(n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1(0) : port.call(null,0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1(1) : port.call(null,1));return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,wport], null)) : fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,wport], null)));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__38824_SHARP_){return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__38824_SHARP_,port], null)) : fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__38824_SHARP_,port], null)));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__21049__auto__ = wport;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__38825 = (i + 1);
i = G__38825;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__21049__auto__ = ret;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4126__auto__ = (function (){var and__21037__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);if(cljs.core.truth_(and__21037__auto__))
{return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else
{return and__21037__auto__;
}
})();if(cljs.core.truth_(temp__4126__auto__))
{var got = temp__4126__auto__;return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__38826){var map__38828 = p__38826;var map__38828__$1 = ((cljs.core.seq_QMARK_(map__38828))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__38828):map__38828);var opts = map__38828__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__38826 = null;if (arguments.length > 1) {
  p__38826 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__38826);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__38829){
var ports = cljs.core.first(arglist__38829);
var p__38826 = cljs.core.rest(arglist__38829);
return alts_BANG___delegate(ports,p__38826);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t38837 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38837 = (function (ch,f,map_LT_,meta38838){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta38838 = meta38838;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38837.cljs$lang$type = true;
cljs.core.async.t38837.cljs$lang$ctorStr = "cljs.core.async/t38837";
cljs.core.async.t38837.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38837");
});
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn0);
});
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){if(typeof cljs.core.async.t38840 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38840 = (function (fn1,_,meta38838,ch,f,map_LT_,meta38841){
this.fn1 = fn1;
this._ = _;
this.meta38838 = meta38838;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta38841 = meta38841;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38840.cljs$lang$type = true;
cljs.core.async.t38840.cljs$lang$ctorStr = "cljs.core.async/t38840";
cljs.core.async.t38840.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38840");
});
cljs.core.async.t38840.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t38840.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
});
cljs.core.async.t38840.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return (cljs.core.async.impl.protocols.lock_id.cljs$core$IFn$_invoke$arity$1 ? cljs.core.async.impl.protocols.lock_id.cljs$core$IFn$_invoke$arity$1(self__.fn1) : cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1));
});
cljs.core.async.t38840.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);return ((function (f1,___$4){
return (function (p1__38830_SHARP_){return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1((((p1__38830_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__38830_SHARP_) : self__.f.call(null,p1__38830_SHARP_)))) : f1.call(null,(((p1__38830_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__38830_SHARP_) : self__.f.call(null,p1__38830_SHARP_)))));
});
;})(f1,___$4))
});
cljs.core.async.t38840.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38842){var self__ = this;
var _38842__$1 = this;return self__.meta38841;
});
cljs.core.async.t38840.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38842,meta38841__$1){var self__ = this;
var _38842__$1 = this;return (new cljs.core.async.t38840(self__.fn1,self__._,self__.meta38838,self__.ch,self__.f,self__.map_LT_,meta38841__$1));
});
cljs.core.async.__GT_t38840 = (function __GT_t38840(fn1__$1,___$2,meta38838__$1,ch__$2,f__$2,map_LT___$2,meta38841){return (new cljs.core.async.t38840(fn1__$1,___$2,meta38838__$1,ch__$2,f__$2,map_LT___$2,meta38841));
});
}
return (new cljs.core.async.t38840(fn1,___$1,self__.meta38838,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__21037__auto__ = ret;if(cljs.core.truth_(and__21037__auto__))
{return !((cljs.core.deref(ret) == null));
} else
{return and__21037__auto__;
}
})()))
{return cljs.core.async.impl.channels.box((self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ret)) : self__.f.call(null,cljs.core.deref(ret))));
} else
{return ret;
}
});
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t38837.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});
cljs.core.async.t38837.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38839){var self__ = this;
var _38839__$1 = this;return self__.meta38838;
});
cljs.core.async.t38837.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38839,meta38838__$1){var self__ = this;
var _38839__$1 = this;return (new cljs.core.async.t38837(self__.ch,self__.f,self__.map_LT_,meta38838__$1));
});
cljs.core.async.__GT_t38837 = (function __GT_t38837(ch__$1,f__$1,map_LT___$1,meta38838){return (new cljs.core.async.t38837(ch__$1,f__$1,map_LT___$1,meta38838));
});
}
return (new cljs.core.async.t38837(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t38846 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38846 = (function (ch,f,map_GT_,meta38847){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta38847 = meta38847;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38846.cljs$lang$type = true;
cljs.core.async.t38846.cljs$lang$ctorStr = "cljs.core.async/t38846";
cljs.core.async.t38846.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38846");
});
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn0);
});
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t38846.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});
cljs.core.async.t38846.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38848){var self__ = this;
var _38848__$1 = this;return self__.meta38847;
});
cljs.core.async.t38846.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38848,meta38847__$1){var self__ = this;
var _38848__$1 = this;return (new cljs.core.async.t38846(self__.ch,self__.f,self__.map_GT_,meta38847__$1));
});
cljs.core.async.__GT_t38846 = (function __GT_t38846(ch__$1,f__$1,map_GT___$1,meta38847){return (new cljs.core.async.t38846(ch__$1,f__$1,map_GT___$1,meta38847));
});
}
return (new cljs.core.async.t38846(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t38852 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t38852 = (function (ch,p,filter_GT_,meta38853){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta38853 = meta38853;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t38852.cljs$lang$type = true;
cljs.core.async.t38852.cljs$lang$ctorStr = "cljs.core.async/t38852";
cljs.core.async.t38852.cljs$lang$ctorPrWriter = (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t38852");
});
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val))))
{return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box(null);
}
});
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
});
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t38852.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});
cljs.core.async.t38852.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38854){var self__ = this;
var _38854__$1 = this;return self__.meta38853;
});
cljs.core.async.t38852.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38854,meta38853__$1){var self__ = this;
var _38854__$1 = this;return (new cljs.core.async.t38852(self__.ch,self__.p,self__.filter_GT_,meta38853__$1));
});
cljs.core.async.__GT_t38852 = (function __GT_t38852(ch__$1,p__$1,filter_GT___$1,meta38853){return (new cljs.core.async.t38852(ch__$1,p__$1,filter_GT___$1,meta38853));
});
}
return (new cljs.core.async.t38852(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___38937 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_38916){var state_val_38917 = (state_38916[1]);if((state_val_38917 === 7))
{var inst_38912 = (state_38916[2]);var state_38916__$1 = state_38916;var statearr_38918_38938 = state_38916__$1;(statearr_38918_38938[2] = inst_38912);
(statearr_38918_38938[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 1))
{var state_38916__$1 = state_38916;var statearr_38919_38939 = state_38916__$1;(statearr_38919_38939[2] = null);
(statearr_38919_38939[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 4))
{var inst_38898 = (state_38916[7]);var inst_38898__$1 = (state_38916[2]);var inst_38899 = (inst_38898__$1 == null);var state_38916__$1 = (function (){var statearr_38920 = state_38916;(statearr_38920[7] = inst_38898__$1);
return statearr_38920;
})();if(cljs.core.truth_(inst_38899))
{var statearr_38921_38940 = state_38916__$1;(statearr_38921_38940[1] = 5);
} else
{var statearr_38922_38941 = state_38916__$1;(statearr_38922_38941[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 6))
{var inst_38898 = (state_38916[7]);var inst_38903 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_38898) : p.call(null,inst_38898));var state_38916__$1 = state_38916;if(cljs.core.truth_(inst_38903))
{var statearr_38923_38942 = state_38916__$1;(statearr_38923_38942[1] = 8);
} else
{var statearr_38924_38943 = state_38916__$1;(statearr_38924_38943[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 3))
{var inst_38914 = (state_38916[2]);var state_38916__$1 = state_38916;return cljs.core.async.impl.ioc_helpers.return_chan(state_38916__$1,inst_38914);
} else
{if((state_val_38917 === 2))
{var state_38916__$1 = state_38916;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38916__$1,4,ch);
} else
{if((state_val_38917 === 11))
{var inst_38906 = (state_38916[2]);var state_38916__$1 = state_38916;var statearr_38925_38944 = state_38916__$1;(statearr_38925_38944[2] = inst_38906);
(statearr_38925_38944[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 9))
{var state_38916__$1 = state_38916;var statearr_38926_38945 = state_38916__$1;(statearr_38926_38945[2] = null);
(statearr_38926_38945[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 5))
{var inst_38901 = cljs.core.async.close_BANG_(out);var state_38916__$1 = state_38916;var statearr_38927_38946 = state_38916__$1;(statearr_38927_38946[2] = inst_38901);
(statearr_38927_38946[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 10))
{var inst_38909 = (state_38916[2]);var state_38916__$1 = (function (){var statearr_38928 = state_38916;(statearr_38928[8] = inst_38909);
return statearr_38928;
})();var statearr_38929_38947 = state_38916__$1;(statearr_38929_38947[2] = null);
(statearr_38929_38947[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_38917 === 8))
{var inst_38898 = (state_38916[7]);var state_38916__$1 = state_38916;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38916__$1,11,out,inst_38898);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_38933 = [null,null,null,null,null,null,null,null,null];(statearr_38933[0] = state_machine__24506__auto__);
(statearr_38933[1] = 1);
return statearr_38933;
});
var state_machine__24506__auto____1 = (function (state_38916){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_38916);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e38934){if((e38934 instanceof Object))
{var ex__24509__auto__ = e38934;var statearr_38935_38948 = state_38916;(statearr_38935_38948[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_38916);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e38934;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__38949 = state_38916;
state_38916 = G__38949;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_38916){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_38916);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_38936 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_38936[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___38937);
return statearr_38936;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39101){var state_val_39102 = (state_39101[1]);if((state_val_39102 === 7))
{var inst_39097 = (state_39101[2]);var state_39101__$1 = state_39101;var statearr_39103_39140 = state_39101__$1;(statearr_39103_39140[2] = inst_39097);
(statearr_39103_39140[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 20))
{var inst_39072 = (state_39101[7]);var inst_39083 = (state_39101[2]);var inst_39084 = cljs.core.next(inst_39072);var inst_39058 = inst_39084;var inst_39059 = null;var inst_39060 = 0;var inst_39061 = 0;var state_39101__$1 = (function (){var statearr_39104 = state_39101;(statearr_39104[8] = inst_39058);
(statearr_39104[9] = inst_39059);
(statearr_39104[10] = inst_39061);
(statearr_39104[11] = inst_39083);
(statearr_39104[12] = inst_39060);
return statearr_39104;
})();var statearr_39105_39141 = state_39101__$1;(statearr_39105_39141[2] = null);
(statearr_39105_39141[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 1))
{var state_39101__$1 = state_39101;var statearr_39106_39142 = state_39101__$1;(statearr_39106_39142[2] = null);
(statearr_39106_39142[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 4))
{var inst_39047 = (state_39101[13]);var inst_39047__$1 = (state_39101[2]);var inst_39048 = (inst_39047__$1 == null);var state_39101__$1 = (function (){var statearr_39110 = state_39101;(statearr_39110[13] = inst_39047__$1);
return statearr_39110;
})();if(cljs.core.truth_(inst_39048))
{var statearr_39111_39143 = state_39101__$1;(statearr_39111_39143[1] = 5);
} else
{var statearr_39112_39144 = state_39101__$1;(statearr_39112_39144[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 15))
{var state_39101__$1 = state_39101;var statearr_39113_39145 = state_39101__$1;(statearr_39113_39145[2] = null);
(statearr_39113_39145[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 13))
{var inst_39058 = (state_39101[8]);var inst_39059 = (state_39101[9]);var inst_39061 = (state_39101[10]);var inst_39060 = (state_39101[12]);var inst_39068 = (state_39101[2]);var inst_39069 = (inst_39061 + 1);var tmp39107 = inst_39058;var tmp39108 = inst_39059;var tmp39109 = inst_39060;var inst_39058__$1 = tmp39107;var inst_39059__$1 = tmp39108;var inst_39060__$1 = tmp39109;var inst_39061__$1 = inst_39069;var state_39101__$1 = (function (){var statearr_39114 = state_39101;(statearr_39114[8] = inst_39058__$1);
(statearr_39114[9] = inst_39059__$1);
(statearr_39114[10] = inst_39061__$1);
(statearr_39114[12] = inst_39060__$1);
(statearr_39114[14] = inst_39068);
return statearr_39114;
})();var statearr_39115_39146 = state_39101__$1;(statearr_39115_39146[2] = null);
(statearr_39115_39146[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 6))
{var inst_39047 = (state_39101[13]);var inst_39052 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_39047) : f.call(null,inst_39047));var inst_39057 = cljs.core.seq(inst_39052);var inst_39058 = inst_39057;var inst_39059 = null;var inst_39060 = 0;var inst_39061 = 0;var state_39101__$1 = (function (){var statearr_39116 = state_39101;(statearr_39116[8] = inst_39058);
(statearr_39116[9] = inst_39059);
(statearr_39116[10] = inst_39061);
(statearr_39116[12] = inst_39060);
return statearr_39116;
})();var statearr_39117_39147 = state_39101__$1;(statearr_39117_39147[2] = null);
(statearr_39117_39147[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 17))
{var inst_39072 = (state_39101[7]);var inst_39076 = cljs.core.chunk_first(inst_39072);var inst_39077 = cljs.core.chunk_rest(inst_39072);var inst_39078 = cljs.core.count(inst_39076);var inst_39058 = inst_39077;var inst_39059 = inst_39076;var inst_39060 = inst_39078;var inst_39061 = 0;var state_39101__$1 = (function (){var statearr_39118 = state_39101;(statearr_39118[8] = inst_39058);
(statearr_39118[9] = inst_39059);
(statearr_39118[10] = inst_39061);
(statearr_39118[12] = inst_39060);
return statearr_39118;
})();var statearr_39119_39148 = state_39101__$1;(statearr_39119_39148[2] = null);
(statearr_39119_39148[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 3))
{var inst_39099 = (state_39101[2]);var state_39101__$1 = state_39101;return cljs.core.async.impl.ioc_helpers.return_chan(state_39101__$1,inst_39099);
} else
{if((state_val_39102 === 12))
{var inst_39092 = (state_39101[2]);var state_39101__$1 = state_39101;var statearr_39120_39149 = state_39101__$1;(statearr_39120_39149[2] = inst_39092);
(statearr_39120_39149[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 2))
{var state_39101__$1 = state_39101;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39101__$1,4,in$);
} else
{if((state_val_39102 === 19))
{var inst_39087 = (state_39101[2]);var state_39101__$1 = state_39101;var statearr_39121_39150 = state_39101__$1;(statearr_39121_39150[2] = inst_39087);
(statearr_39121_39150[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 11))
{var inst_39058 = (state_39101[8]);var inst_39072 = (state_39101[7]);var inst_39072__$1 = cljs.core.seq(inst_39058);var state_39101__$1 = (function (){var statearr_39122 = state_39101;(statearr_39122[7] = inst_39072__$1);
return statearr_39122;
})();if(inst_39072__$1)
{var statearr_39123_39151 = state_39101__$1;(statearr_39123_39151[1] = 14);
} else
{var statearr_39124_39152 = state_39101__$1;(statearr_39124_39152[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 9))
{var inst_39094 = (state_39101[2]);var state_39101__$1 = (function (){var statearr_39125 = state_39101;(statearr_39125[15] = inst_39094);
return statearr_39125;
})();var statearr_39126_39153 = state_39101__$1;(statearr_39126_39153[2] = null);
(statearr_39126_39153[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 5))
{var inst_39050 = cljs.core.async.close_BANG_(out);var state_39101__$1 = state_39101;var statearr_39127_39154 = state_39101__$1;(statearr_39127_39154[2] = inst_39050);
(statearr_39127_39154[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 14))
{var inst_39072 = (state_39101[7]);var inst_39074 = cljs.core.chunked_seq_QMARK_(inst_39072);var state_39101__$1 = state_39101;if(inst_39074)
{var statearr_39128_39155 = state_39101__$1;(statearr_39128_39155[1] = 17);
} else
{var statearr_39129_39156 = state_39101__$1;(statearr_39129_39156[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 16))
{var inst_39090 = (state_39101[2]);var state_39101__$1 = state_39101;var statearr_39130_39157 = state_39101__$1;(statearr_39130_39157[2] = inst_39090);
(statearr_39130_39157[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39102 === 10))
{var inst_39059 = (state_39101[9]);var inst_39061 = (state_39101[10]);var inst_39066 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_39059,inst_39061);var state_39101__$1 = state_39101;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39101__$1,13,out,inst_39066);
} else
{if((state_val_39102 === 18))
{var inst_39072 = (state_39101[7]);var inst_39081 = cljs.core.first(inst_39072);var state_39101__$1 = state_39101;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39101__$1,20,out,inst_39081);
} else
{if((state_val_39102 === 8))
{var inst_39061 = (state_39101[10]);var inst_39060 = (state_39101[12]);var inst_39063 = (inst_39061 < inst_39060);var inst_39064 = inst_39063;var state_39101__$1 = state_39101;if(cljs.core.truth_(inst_39064))
{var statearr_39131_39158 = state_39101__$1;(statearr_39131_39158[1] = 10);
} else
{var statearr_39132_39159 = state_39101__$1;(statearr_39132_39159[1] = 11);
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
var state_machine__24506__auto____0 = (function (){var statearr_39136 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_39136[0] = state_machine__24506__auto__);
(statearr_39136[1] = 1);
return statearr_39136;
});
var state_machine__24506__auto____1 = (function (state_39101){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39101);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39137){if((e39137 instanceof Object))
{var ex__24509__auto__ = e39137;var statearr_39138_39160 = state_39101;(statearr_39138_39160[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39101);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39137;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__39161 = state_39101;
state_39101 = G__39161;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39101){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39101);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39139 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39139[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_39139;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);cljs.core.async.mapcat_STAR_(f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);cljs.core.async.mapcat_STAR_(f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__24520__auto___39242 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39221){var state_val_39222 = (state_39221[1]);if((state_val_39222 === 7))
{var inst_39217 = (state_39221[2]);var state_39221__$1 = state_39221;var statearr_39223_39243 = state_39221__$1;(statearr_39223_39243[2] = inst_39217);
(statearr_39223_39243[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 1))
{var state_39221__$1 = state_39221;var statearr_39224_39244 = state_39221__$1;(statearr_39224_39244[2] = null);
(statearr_39224_39244[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 4))
{var inst_39204 = (state_39221[7]);var inst_39204__$1 = (state_39221[2]);var inst_39205 = (inst_39204__$1 == null);var state_39221__$1 = (function (){var statearr_39225 = state_39221;(statearr_39225[7] = inst_39204__$1);
return statearr_39225;
})();if(cljs.core.truth_(inst_39205))
{var statearr_39226_39245 = state_39221__$1;(statearr_39226_39245[1] = 5);
} else
{var statearr_39227_39246 = state_39221__$1;(statearr_39227_39246[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 6))
{var inst_39204 = (state_39221[7]);var state_39221__$1 = state_39221;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39221__$1,11,to,inst_39204);
} else
{if((state_val_39222 === 3))
{var inst_39219 = (state_39221[2]);var state_39221__$1 = state_39221;return cljs.core.async.impl.ioc_helpers.return_chan(state_39221__$1,inst_39219);
} else
{if((state_val_39222 === 2))
{var state_39221__$1 = state_39221;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39221__$1,4,from);
} else
{if((state_val_39222 === 11))
{var inst_39214 = (state_39221[2]);var state_39221__$1 = (function (){var statearr_39228 = state_39221;(statearr_39228[8] = inst_39214);
return statearr_39228;
})();var statearr_39229_39247 = state_39221__$1;(statearr_39229_39247[2] = null);
(statearr_39229_39247[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 9))
{var state_39221__$1 = state_39221;var statearr_39230_39248 = state_39221__$1;(statearr_39230_39248[2] = null);
(statearr_39230_39248[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 5))
{var state_39221__$1 = state_39221;if(cljs.core.truth_(close_QMARK_))
{var statearr_39231_39249 = state_39221__$1;(statearr_39231_39249[1] = 8);
} else
{var statearr_39232_39250 = state_39221__$1;(statearr_39232_39250[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 10))
{var inst_39211 = (state_39221[2]);var state_39221__$1 = state_39221;var statearr_39233_39251 = state_39221__$1;(statearr_39233_39251[2] = inst_39211);
(statearr_39233_39251[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39222 === 8))
{var inst_39208 = cljs.core.async.close_BANG_(to);var state_39221__$1 = state_39221;var statearr_39234_39252 = state_39221__$1;(statearr_39234_39252[2] = inst_39208);
(statearr_39234_39252[1] = 10);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_39238 = [null,null,null,null,null,null,null,null,null];(statearr_39238[0] = state_machine__24506__auto__);
(statearr_39238[1] = 1);
return statearr_39238;
});
var state_machine__24506__auto____1 = (function (state_39221){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39221);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39239){if((e39239 instanceof Object))
{var ex__24509__auto__ = e39239;var statearr_39240_39253 = state_39221;(statearr_39240_39253[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39221);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39239;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__39254 = state_39221;
state_39221 = G__39254;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39221){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39221);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39241 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39241[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___39242);
return statearr_39241;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);var c__24520__auto___39341 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39319){var state_val_39320 = (state_39319[1]);if((state_val_39320 === 7))
{var inst_39315 = (state_39319[2]);var state_39319__$1 = state_39319;var statearr_39321_39342 = state_39319__$1;(statearr_39321_39342[2] = inst_39315);
(statearr_39321_39342[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 1))
{var state_39319__$1 = state_39319;var statearr_39322_39343 = state_39319__$1;(statearr_39322_39343[2] = null);
(statearr_39322_39343[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 4))
{var inst_39300 = (state_39319[7]);var inst_39300__$1 = (state_39319[2]);var inst_39301 = (inst_39300__$1 == null);var state_39319__$1 = (function (){var statearr_39323 = state_39319;(statearr_39323[7] = inst_39300__$1);
return statearr_39323;
})();if(cljs.core.truth_(inst_39301))
{var statearr_39324_39344 = state_39319__$1;(statearr_39324_39344[1] = 5);
} else
{var statearr_39325_39345 = state_39319__$1;(statearr_39325_39345[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 6))
{var inst_39300 = (state_39319[7]);var inst_39306 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_39300) : p.call(null,inst_39300));var state_39319__$1 = state_39319;if(cljs.core.truth_(inst_39306))
{var statearr_39326_39346 = state_39319__$1;(statearr_39326_39346[1] = 9);
} else
{var statearr_39327_39347 = state_39319__$1;(statearr_39327_39347[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 3))
{var inst_39317 = (state_39319[2]);var state_39319__$1 = state_39319;return cljs.core.async.impl.ioc_helpers.return_chan(state_39319__$1,inst_39317);
} else
{if((state_val_39320 === 2))
{var state_39319__$1 = state_39319;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39319__$1,4,ch);
} else
{if((state_val_39320 === 11))
{var inst_39300 = (state_39319[7]);var inst_39310 = (state_39319[2]);var state_39319__$1 = state_39319;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39319__$1,8,inst_39310,inst_39300);
} else
{if((state_val_39320 === 9))
{var state_39319__$1 = state_39319;var statearr_39328_39348 = state_39319__$1;(statearr_39328_39348[2] = tc);
(statearr_39328_39348[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 5))
{var inst_39303 = cljs.core.async.close_BANG_(tc);var inst_39304 = cljs.core.async.close_BANG_(fc);var state_39319__$1 = (function (){var statearr_39329 = state_39319;(statearr_39329[8] = inst_39303);
return statearr_39329;
})();var statearr_39330_39349 = state_39319__$1;(statearr_39330_39349[2] = inst_39304);
(statearr_39330_39349[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 10))
{var state_39319__$1 = state_39319;var statearr_39331_39350 = state_39319__$1;(statearr_39331_39350[2] = fc);
(statearr_39331_39350[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39320 === 8))
{var inst_39312 = (state_39319[2]);var state_39319__$1 = (function (){var statearr_39332 = state_39319;(statearr_39332[9] = inst_39312);
return statearr_39332;
})();var statearr_39333_39351 = state_39319__$1;(statearr_39333_39351[2] = null);
(statearr_39333_39351[1] = 2);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_39337 = [null,null,null,null,null,null,null,null,null,null];(statearr_39337[0] = state_machine__24506__auto__);
(statearr_39337[1] = 1);
return statearr_39337;
});
var state_machine__24506__auto____1 = (function (state_39319){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39319);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39338){if((e39338 instanceof Object))
{var ex__24509__auto__ = e39338;var statearr_39339_39352 = state_39319;(statearr_39339_39352[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39319);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39338;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__39353 = state_39319;
state_39319 = G__39353;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39319){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39319);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39340 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39340[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___39341);
return statearr_39340;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39400){var state_val_39401 = (state_39400[1]);if((state_val_39401 === 7))
{var inst_39396 = (state_39400[2]);var state_39400__$1 = state_39400;var statearr_39402_39418 = state_39400__$1;(statearr_39402_39418[2] = inst_39396);
(statearr_39402_39418[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39401 === 6))
{var inst_39389 = (state_39400[7]);var inst_39386 = (state_39400[8]);var inst_39393 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_39386,inst_39389) : f.call(null,inst_39386,inst_39389));var inst_39386__$1 = inst_39393;var state_39400__$1 = (function (){var statearr_39403 = state_39400;(statearr_39403[8] = inst_39386__$1);
return statearr_39403;
})();var statearr_39404_39419 = state_39400__$1;(statearr_39404_39419[2] = null);
(statearr_39404_39419[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39401 === 5))
{var inst_39386 = (state_39400[8]);var state_39400__$1 = state_39400;var statearr_39405_39420 = state_39400__$1;(statearr_39405_39420[2] = inst_39386);
(statearr_39405_39420[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39401 === 4))
{var inst_39389 = (state_39400[7]);var inst_39389__$1 = (state_39400[2]);var inst_39390 = (inst_39389__$1 == null);var state_39400__$1 = (function (){var statearr_39406 = state_39400;(statearr_39406[7] = inst_39389__$1);
return statearr_39406;
})();if(cljs.core.truth_(inst_39390))
{var statearr_39407_39421 = state_39400__$1;(statearr_39407_39421[1] = 5);
} else
{var statearr_39408_39422 = state_39400__$1;(statearr_39408_39422[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39401 === 3))
{var inst_39398 = (state_39400[2]);var state_39400__$1 = state_39400;return cljs.core.async.impl.ioc_helpers.return_chan(state_39400__$1,inst_39398);
} else
{if((state_val_39401 === 2))
{var state_39400__$1 = state_39400;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39400__$1,4,ch);
} else
{if((state_val_39401 === 1))
{var inst_39386 = init;var state_39400__$1 = (function (){var statearr_39409 = state_39400;(statearr_39409[8] = inst_39386);
return statearr_39409;
})();var statearr_39410_39423 = state_39400__$1;(statearr_39410_39423[2] = null);
(statearr_39410_39423[1] = 2);
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
var state_machine__24506__auto____0 = (function (){var statearr_39414 = [null,null,null,null,null,null,null,null,null];(statearr_39414[0] = state_machine__24506__auto__);
(statearr_39414[1] = 1);
return statearr_39414;
});
var state_machine__24506__auto____1 = (function (state_39400){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39400);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39415){if((e39415 instanceof Object))
{var ex__24509__auto__ = e39415;var statearr_39416_39424 = state_39400;(statearr_39416_39424[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39400);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39415;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__39425 = state_39400;
state_39400 = G__39425;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39400){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39400);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39417 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39417[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_39417;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__24520__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39487){var state_val_39488 = (state_39487[1]);if((state_val_39488 === 7))
{var inst_39468 = (state_39487[7]);var inst_39473 = (state_39487[2]);var inst_39474 = cljs.core.next(inst_39468);var inst_39468__$1 = inst_39474;var state_39487__$1 = (function (){var statearr_39489 = state_39487;(statearr_39489[8] = inst_39473);
(statearr_39489[7] = inst_39468__$1);
return statearr_39489;
})();var statearr_39490_39508 = state_39487__$1;(statearr_39490_39508[2] = null);
(statearr_39490_39508[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 1))
{var inst_39467 = cljs.core.seq(coll);var inst_39468 = inst_39467;var state_39487__$1 = (function (){var statearr_39491 = state_39487;(statearr_39491[7] = inst_39468);
return statearr_39491;
})();var statearr_39492_39509 = state_39487__$1;(statearr_39492_39509[2] = null);
(statearr_39492_39509[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 4))
{var inst_39468 = (state_39487[7]);var inst_39471 = cljs.core.first(inst_39468);var state_39487__$1 = state_39487;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39487__$1,7,ch,inst_39471);
} else
{if((state_val_39488 === 6))
{var inst_39483 = (state_39487[2]);var state_39487__$1 = state_39487;var statearr_39493_39510 = state_39487__$1;(statearr_39493_39510[2] = inst_39483);
(statearr_39493_39510[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 3))
{var inst_39485 = (state_39487[2]);var state_39487__$1 = state_39487;return cljs.core.async.impl.ioc_helpers.return_chan(state_39487__$1,inst_39485);
} else
{if((state_val_39488 === 2))
{var inst_39468 = (state_39487[7]);var state_39487__$1 = state_39487;if(cljs.core.truth_(inst_39468))
{var statearr_39494_39511 = state_39487__$1;(statearr_39494_39511[1] = 4);
} else
{var statearr_39495_39512 = state_39487__$1;(statearr_39495_39512[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 9))
{var state_39487__$1 = state_39487;var statearr_39496_39513 = state_39487__$1;(statearr_39496_39513[2] = null);
(statearr_39496_39513[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 5))
{var state_39487__$1 = state_39487;if(cljs.core.truth_(close_QMARK_))
{var statearr_39497_39514 = state_39487__$1;(statearr_39497_39514[1] = 8);
} else
{var statearr_39498_39515 = state_39487__$1;(statearr_39498_39515[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 10))
{var inst_39481 = (state_39487[2]);var state_39487__$1 = state_39487;var statearr_39499_39516 = state_39487__$1;(statearr_39499_39516[2] = inst_39481);
(statearr_39499_39516[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39488 === 8))
{var inst_39478 = cljs.core.async.close_BANG_(ch);var state_39487__$1 = state_39487;var statearr_39500_39517 = state_39487__$1;(statearr_39500_39517[2] = inst_39478);
(statearr_39500_39517[1] = 10);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_39504 = [null,null,null,null,null,null,null,null,null];(statearr_39504[0] = state_machine__24506__auto__);
(statearr_39504[1] = 1);
return statearr_39504;
});
var state_machine__24506__auto____1 = (function (state_39487){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39487);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39505){if((e39505 instanceof Object))
{var ex__24509__auto__ = e39505;var statearr_39506_39518 = state_39487;(statearr_39506_39518[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39487);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39505;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__39519 = state_39487;
state_39487 = G__39519;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39487){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39487);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39507 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39507[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto__);
return statearr_39507;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return c__24520__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count(100,coll));cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2(ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj39521 = {};return obj39521;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__21037__auto__ = _;if(and__21037__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__21037__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__21676__auto__ = (((_ == null))?null:_);return (function (){var or__21049__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj39523 = {};return obj39523;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t39747 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t39747 = (function (cs,ch,mult,meta39748){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta39748 = meta39748;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t39747.cljs$lang$type = true;
cljs.core.async.t39747.cljs$lang$ctorStr = "cljs.core.async/t39747";
cljs.core.async.t39747.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t39747");
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t39747.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t39747.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_39749){var self__ = this;
var _39749__$1 = this;return self__.meta39748;
});})(cs))
;
cljs.core.async.t39747.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_39749,meta39748__$1){var self__ = this;
var _39749__$1 = this;return (new cljs.core.async.t39747(self__.cs,self__.ch,self__.mult,meta39748__$1));
});})(cs))
;
cljs.core.async.__GT_t39747 = ((function (cs){
return (function __GT_t39747(cs__$1,ch__$1,mult__$1,meta39748){return (new cljs.core.async.t39747(cs__$1,ch__$1,mult__$1,meta39748));
});})(cs))
;
}
return (new cljs.core.async.t39747(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__24520__auto___39970 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_39884){var state_val_39885 = (state_39884[1]);if((state_val_39885 === 7))
{var inst_39880 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39886_39971 = state_39884__$1;(statearr_39886_39971[2] = inst_39880);
(statearr_39886_39971[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 20))
{var inst_39781 = (state_39884[7]);var inst_39791 = cljs.core.first(inst_39781);var inst_39792 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39791,0,null);var inst_39793 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39791,1,null);var state_39884__$1 = (function (){var statearr_39887 = state_39884;(statearr_39887[8] = inst_39792);
return statearr_39887;
})();if(cljs.core.truth_(inst_39793))
{var statearr_39888_39972 = state_39884__$1;(statearr_39888_39972[1] = 22);
} else
{var statearr_39889_39973 = state_39884__$1;(statearr_39889_39973[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 27))
{var inst_39823 = (state_39884[9]);var inst_39821 = (state_39884[10]);var inst_39828 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_39821,inst_39823);var state_39884__$1 = (function (){var statearr_39890 = state_39884;(statearr_39890[11] = inst_39828);
return statearr_39890;
})();var statearr_39891_39974 = state_39884__$1;(statearr_39891_39974[2] = null);
(statearr_39891_39974[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 1))
{var state_39884__$1 = state_39884;var statearr_39892_39975 = state_39884__$1;(statearr_39892_39975[2] = null);
(statearr_39892_39975[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 24))
{var inst_39781 = (state_39884[7]);var inst_39798 = (state_39884[2]);var inst_39799 = cljs.core.next(inst_39781);var inst_39761 = inst_39799;var inst_39762 = null;var inst_39763 = 0;var inst_39764 = 0;var state_39884__$1 = (function (){var statearr_39893 = state_39884;(statearr_39893[12] = inst_39761);
(statearr_39893[13] = inst_39763);
(statearr_39893[14] = inst_39798);
(statearr_39893[15] = inst_39762);
(statearr_39893[16] = inst_39764);
return statearr_39893;
})();var statearr_39894_39976 = state_39884__$1;(statearr_39894_39976[2] = null);
(statearr_39894_39976[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 39))
{var inst_39841 = (state_39884[17]);var inst_39859 = (state_39884[2]);var inst_39860 = cljs.core.next(inst_39841);var inst_39820 = inst_39860;var inst_39821 = null;var inst_39822 = 0;var inst_39823 = 0;var state_39884__$1 = (function (){var statearr_39898 = state_39884;(statearr_39898[18] = inst_39822);
(statearr_39898[19] = inst_39820);
(statearr_39898[9] = inst_39823);
(statearr_39898[10] = inst_39821);
(statearr_39898[20] = inst_39859);
return statearr_39898;
})();var statearr_39899_39977 = state_39884__$1;(statearr_39899_39977[2] = null);
(statearr_39899_39977[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 4))
{var inst_39752 = (state_39884[21]);var inst_39752__$1 = (state_39884[2]);var inst_39753 = (inst_39752__$1 == null);var state_39884__$1 = (function (){var statearr_39900 = state_39884;(statearr_39900[21] = inst_39752__$1);
return statearr_39900;
})();if(cljs.core.truth_(inst_39753))
{var statearr_39901_39978 = state_39884__$1;(statearr_39901_39978[1] = 5);
} else
{var statearr_39902_39979 = state_39884__$1;(statearr_39902_39979[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 15))
{var inst_39761 = (state_39884[12]);var inst_39763 = (state_39884[13]);var inst_39762 = (state_39884[15]);var inst_39764 = (state_39884[16]);var inst_39777 = (state_39884[2]);var inst_39778 = (inst_39764 + 1);var tmp39895 = inst_39761;var tmp39896 = inst_39763;var tmp39897 = inst_39762;var inst_39761__$1 = tmp39895;var inst_39762__$1 = tmp39897;var inst_39763__$1 = tmp39896;var inst_39764__$1 = inst_39778;var state_39884__$1 = (function (){var statearr_39903 = state_39884;(statearr_39903[12] = inst_39761__$1);
(statearr_39903[13] = inst_39763__$1);
(statearr_39903[15] = inst_39762__$1);
(statearr_39903[22] = inst_39777);
(statearr_39903[16] = inst_39764__$1);
return statearr_39903;
})();var statearr_39904_39980 = state_39884__$1;(statearr_39904_39980[2] = null);
(statearr_39904_39980[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 21))
{var inst_39802 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39905_39981 = state_39884__$1;(statearr_39905_39981[2] = inst_39802);
(statearr_39905_39981[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 31))
{var inst_39828 = (state_39884[11]);var inst_39829 = (state_39884[2]);var inst_39830 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);var inst_39831 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_39828);var state_39884__$1 = (function (){var statearr_39906 = state_39884;(statearr_39906[23] = inst_39830);
(statearr_39906[24] = inst_39829);
return statearr_39906;
})();var statearr_39907_39982 = state_39884__$1;(statearr_39907_39982[2] = inst_39831);
cljs.core.async.impl.ioc_helpers.process_exception(state_39884__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 32))
{var inst_39752 = (state_39884[21]);var inst_39828 = (state_39884[11]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_39884,31,Object,null,30);var inst_39835 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_39828,inst_39752,done);var state_39884__$1 = state_39884;var statearr_39908_39983 = state_39884__$1;(statearr_39908_39983[2] = inst_39835);
cljs.core.async.impl.ioc_helpers.process_exception(state_39884__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 40))
{var inst_39850 = (state_39884[25]);var inst_39851 = (state_39884[2]);var inst_39852 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);var inst_39853 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_39850);var state_39884__$1 = (function (){var statearr_39909 = state_39884;(statearr_39909[26] = inst_39851);
(statearr_39909[27] = inst_39852);
return statearr_39909;
})();var statearr_39910_39984 = state_39884__$1;(statearr_39910_39984[2] = inst_39853);
cljs.core.async.impl.ioc_helpers.process_exception(state_39884__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 33))
{var inst_39841 = (state_39884[17]);var inst_39843 = cljs.core.chunked_seq_QMARK_(inst_39841);var state_39884__$1 = state_39884;if(inst_39843)
{var statearr_39911_39985 = state_39884__$1;(statearr_39911_39985[1] = 36);
} else
{var statearr_39912_39986 = state_39884__$1;(statearr_39912_39986[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 13))
{var inst_39771 = (state_39884[28]);var inst_39774 = cljs.core.async.close_BANG_(inst_39771);var state_39884__$1 = state_39884;var statearr_39913_39987 = state_39884__$1;(statearr_39913_39987[2] = inst_39774);
(statearr_39913_39987[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 22))
{var inst_39792 = (state_39884[8]);var inst_39795 = cljs.core.async.close_BANG_(inst_39792);var state_39884__$1 = state_39884;var statearr_39914_39988 = state_39884__$1;(statearr_39914_39988[2] = inst_39795);
(statearr_39914_39988[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 36))
{var inst_39841 = (state_39884[17]);var inst_39845 = cljs.core.chunk_first(inst_39841);var inst_39846 = cljs.core.chunk_rest(inst_39841);var inst_39847 = cljs.core.count(inst_39845);var inst_39820 = inst_39846;var inst_39821 = inst_39845;var inst_39822 = inst_39847;var inst_39823 = 0;var state_39884__$1 = (function (){var statearr_39915 = state_39884;(statearr_39915[18] = inst_39822);
(statearr_39915[19] = inst_39820);
(statearr_39915[9] = inst_39823);
(statearr_39915[10] = inst_39821);
return statearr_39915;
})();var statearr_39916_39989 = state_39884__$1;(statearr_39916_39989[2] = null);
(statearr_39916_39989[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 41))
{var inst_39752 = (state_39884[21]);var inst_39850 = (state_39884[25]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_39884,40,Object,null,39);var inst_39857 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_39850,inst_39752,done);var state_39884__$1 = state_39884;var statearr_39917_39990 = state_39884__$1;(statearr_39917_39990[2] = inst_39857);
cljs.core.async.impl.ioc_helpers.process_exception(state_39884__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 43))
{var state_39884__$1 = state_39884;var statearr_39918_39991 = state_39884__$1;(statearr_39918_39991[2] = null);
(statearr_39918_39991[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 29))
{var inst_39868 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39919_39992 = state_39884__$1;(statearr_39919_39992[2] = inst_39868);
(statearr_39919_39992[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 44))
{var inst_39877 = (state_39884[2]);var state_39884__$1 = (function (){var statearr_39920 = state_39884;(statearr_39920[29] = inst_39877);
return statearr_39920;
})();var statearr_39921_39993 = state_39884__$1;(statearr_39921_39993[2] = null);
(statearr_39921_39993[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 6))
{var inst_39812 = (state_39884[30]);var inst_39811 = cljs.core.deref(cs);var inst_39812__$1 = cljs.core.keys(inst_39811);var inst_39813 = cljs.core.count(inst_39812__$1);var inst_39814 = cljs.core.reset_BANG_(dctr,inst_39813);var inst_39819 = cljs.core.seq(inst_39812__$1);var inst_39820 = inst_39819;var inst_39821 = null;var inst_39822 = 0;var inst_39823 = 0;var state_39884__$1 = (function (){var statearr_39922 = state_39884;(statearr_39922[18] = inst_39822);
(statearr_39922[19] = inst_39820);
(statearr_39922[30] = inst_39812__$1);
(statearr_39922[9] = inst_39823);
(statearr_39922[10] = inst_39821);
(statearr_39922[31] = inst_39814);
return statearr_39922;
})();var statearr_39923_39994 = state_39884__$1;(statearr_39923_39994[2] = null);
(statearr_39923_39994[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 28))
{var inst_39820 = (state_39884[19]);var inst_39841 = (state_39884[17]);var inst_39841__$1 = cljs.core.seq(inst_39820);var state_39884__$1 = (function (){var statearr_39924 = state_39884;(statearr_39924[17] = inst_39841__$1);
return statearr_39924;
})();if(inst_39841__$1)
{var statearr_39925_39995 = state_39884__$1;(statearr_39925_39995[1] = 33);
} else
{var statearr_39926_39996 = state_39884__$1;(statearr_39926_39996[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 25))
{var inst_39822 = (state_39884[18]);var inst_39823 = (state_39884[9]);var inst_39825 = (inst_39823 < inst_39822);var inst_39826 = inst_39825;var state_39884__$1 = state_39884;if(cljs.core.truth_(inst_39826))
{var statearr_39927_39997 = state_39884__$1;(statearr_39927_39997[1] = 27);
} else
{var statearr_39928_39998 = state_39884__$1;(statearr_39928_39998[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 34))
{var state_39884__$1 = state_39884;var statearr_39929_39999 = state_39884__$1;(statearr_39929_39999[2] = null);
(statearr_39929_39999[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 17))
{var state_39884__$1 = state_39884;var statearr_39930_40000 = state_39884__$1;(statearr_39930_40000[2] = null);
(statearr_39930_40000[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 3))
{var inst_39882 = (state_39884[2]);var state_39884__$1 = state_39884;return cljs.core.async.impl.ioc_helpers.return_chan(state_39884__$1,inst_39882);
} else
{if((state_val_39885 === 12))
{var inst_39807 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39931_40001 = state_39884__$1;(statearr_39931_40001[2] = inst_39807);
(statearr_39931_40001[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 2))
{var state_39884__$1 = state_39884;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39884__$1,4,ch);
} else
{if((state_val_39885 === 23))
{var state_39884__$1 = state_39884;var statearr_39932_40002 = state_39884__$1;(statearr_39932_40002[2] = null);
(statearr_39932_40002[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 35))
{var inst_39866 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39933_40003 = state_39884__$1;(statearr_39933_40003[2] = inst_39866);
(statearr_39933_40003[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 19))
{var inst_39781 = (state_39884[7]);var inst_39785 = cljs.core.chunk_first(inst_39781);var inst_39786 = cljs.core.chunk_rest(inst_39781);var inst_39787 = cljs.core.count(inst_39785);var inst_39761 = inst_39786;var inst_39762 = inst_39785;var inst_39763 = inst_39787;var inst_39764 = 0;var state_39884__$1 = (function (){var statearr_39934 = state_39884;(statearr_39934[12] = inst_39761);
(statearr_39934[13] = inst_39763);
(statearr_39934[15] = inst_39762);
(statearr_39934[16] = inst_39764);
return statearr_39934;
})();var statearr_39935_40004 = state_39884__$1;(statearr_39935_40004[2] = null);
(statearr_39935_40004[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 11))
{var inst_39781 = (state_39884[7]);var inst_39761 = (state_39884[12]);var inst_39781__$1 = cljs.core.seq(inst_39761);var state_39884__$1 = (function (){var statearr_39936 = state_39884;(statearr_39936[7] = inst_39781__$1);
return statearr_39936;
})();if(inst_39781__$1)
{var statearr_39937_40005 = state_39884__$1;(statearr_39937_40005[1] = 16);
} else
{var statearr_39938_40006 = state_39884__$1;(statearr_39938_40006[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 9))
{var inst_39809 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39939_40007 = state_39884__$1;(statearr_39939_40007[2] = inst_39809);
(statearr_39939_40007[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 5))
{var inst_39759 = cljs.core.deref(cs);var inst_39760 = cljs.core.seq(inst_39759);var inst_39761 = inst_39760;var inst_39762 = null;var inst_39763 = 0;var inst_39764 = 0;var state_39884__$1 = (function (){var statearr_39940 = state_39884;(statearr_39940[12] = inst_39761);
(statearr_39940[13] = inst_39763);
(statearr_39940[15] = inst_39762);
(statearr_39940[16] = inst_39764);
return statearr_39940;
})();var statearr_39941_40008 = state_39884__$1;(statearr_39941_40008[2] = null);
(statearr_39941_40008[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 14))
{var state_39884__$1 = state_39884;var statearr_39942_40009 = state_39884__$1;(statearr_39942_40009[2] = null);
(statearr_39942_40009[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 45))
{var inst_39874 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39943_40010 = state_39884__$1;(statearr_39943_40010[2] = inst_39874);
(statearr_39943_40010[1] = 44);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 26))
{var inst_39812 = (state_39884[30]);var inst_39870 = (state_39884[2]);var inst_39871 = cljs.core.seq(inst_39812);var state_39884__$1 = (function (){var statearr_39944 = state_39884;(statearr_39944[32] = inst_39870);
return statearr_39944;
})();if(inst_39871)
{var statearr_39945_40011 = state_39884__$1;(statearr_39945_40011[1] = 42);
} else
{var statearr_39946_40012 = state_39884__$1;(statearr_39946_40012[1] = 43);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 16))
{var inst_39781 = (state_39884[7]);var inst_39783 = cljs.core.chunked_seq_QMARK_(inst_39781);var state_39884__$1 = state_39884;if(inst_39783)
{var statearr_39950_40013 = state_39884__$1;(statearr_39950_40013[1] = 19);
} else
{var statearr_39951_40014 = state_39884__$1;(statearr_39951_40014[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 38))
{var inst_39863 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39952_40015 = state_39884__$1;(statearr_39952_40015[2] = inst_39863);
(statearr_39952_40015[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 30))
{var inst_39822 = (state_39884[18]);var inst_39820 = (state_39884[19]);var inst_39823 = (state_39884[9]);var inst_39821 = (state_39884[10]);var inst_39837 = (state_39884[2]);var inst_39838 = (inst_39823 + 1);var tmp39947 = inst_39822;var tmp39948 = inst_39820;var tmp39949 = inst_39821;var inst_39820__$1 = tmp39948;var inst_39821__$1 = tmp39949;var inst_39822__$1 = tmp39947;var inst_39823__$1 = inst_39838;var state_39884__$1 = (function (){var statearr_39953 = state_39884;(statearr_39953[18] = inst_39822__$1);
(statearr_39953[19] = inst_39820__$1);
(statearr_39953[9] = inst_39823__$1);
(statearr_39953[10] = inst_39821__$1);
(statearr_39953[33] = inst_39837);
return statearr_39953;
})();var statearr_39954_40016 = state_39884__$1;(statearr_39954_40016[2] = null);
(statearr_39954_40016[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 10))
{var inst_39762 = (state_39884[15]);var inst_39764 = (state_39884[16]);var inst_39770 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_39762,inst_39764);var inst_39771 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39770,0,null);var inst_39772 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_39770,1,null);var state_39884__$1 = (function (){var statearr_39955 = state_39884;(statearr_39955[28] = inst_39771);
return statearr_39955;
})();if(cljs.core.truth_(inst_39772))
{var statearr_39956_40017 = state_39884__$1;(statearr_39956_40017[1] = 13);
} else
{var statearr_39957_40018 = state_39884__$1;(statearr_39957_40018[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 18))
{var inst_39805 = (state_39884[2]);var state_39884__$1 = state_39884;var statearr_39958_40019 = state_39884__$1;(statearr_39958_40019[2] = inst_39805);
(statearr_39958_40019[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 42))
{var state_39884__$1 = state_39884;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39884__$1,45,dchan);
} else
{if((state_val_39885 === 37))
{var inst_39841 = (state_39884[17]);var inst_39850 = cljs.core.first(inst_39841);var state_39884__$1 = (function (){var statearr_39959 = state_39884;(statearr_39959[25] = inst_39850);
return statearr_39959;
})();var statearr_39960_40020 = state_39884__$1;(statearr_39960_40020[2] = null);
(statearr_39960_40020[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_39885 === 8))
{var inst_39763 = (state_39884[13]);var inst_39764 = (state_39884[16]);var inst_39766 = (inst_39764 < inst_39763);var inst_39767 = inst_39766;var state_39884__$1 = state_39884;if(cljs.core.truth_(inst_39767))
{var statearr_39961_40021 = state_39884__$1;(statearr_39961_40021[1] = 10);
} else
{var statearr_39962_40022 = state_39884__$1;(statearr_39962_40022[1] = 11);
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
var state_machine__24506__auto____0 = (function (){var statearr_39966 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_39966[0] = state_machine__24506__auto__);
(statearr_39966[1] = 1);
return statearr_39966;
});
var state_machine__24506__auto____1 = (function (state_39884){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_39884);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e39967){if((e39967 instanceof Object))
{var ex__24509__auto__ = e39967;var statearr_39968_40023 = state_39884;(statearr_39968_40023[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_39884);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e39967;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40024 = state_39884;
state_39884 = G__40024;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_39884){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_39884);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_39969 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_39969[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___39970);
return statearr_39969;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_(mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_(mult);
});
cljs.core.async.Mix = (function (){var obj40026 = {};return obj40026;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__21037__auto__ = m;if(and__21037__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__21676__auto__ = (((m == null))?null:m);return (function (){var or__21049__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], null), null);var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv(((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v))))
{return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref(cs);var mode = cljs.core.deref(solo_mode);var solos = pick(new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick(new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick(new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.cljs$core$IFn$_invoke$arity$2((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove(pauses,cljs.core.keys(chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t40136 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t40136 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta40137){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta40137 = meta40137;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t40136.cljs$lang$type = true;
cljs.core.async.t40136.cljs$lang$ctorStr = "cljs.core.async/t40136";
cljs.core.async.t40136.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t40136");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);
return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);
return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode))))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))], 0)))].join('')));
}
cljs.core.reset_BANG_(self__.solo_mode,mode);
return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t40136.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_40138){var self__ = this;
var _40138__$1 = this;return self__.meta40137;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t40136.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_40138,meta40137__$1){var self__ = this;
var _40138__$1 = this;return (new cljs.core.async.t40136(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta40137__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t40136 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t40136(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta40137){return (new cljs.core.async.t40136(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta40137));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t40136(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__24520__auto___40245 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_40203){var state_val_40204 = (state_40203[1]);if((state_val_40204 === 7))
{var inst_40152 = (state_40203[7]);var inst_40157 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_40152);var state_40203__$1 = state_40203;var statearr_40205_40246 = state_40203__$1;(statearr_40205_40246[2] = inst_40157);
(statearr_40205_40246[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 20))
{var inst_40167 = (state_40203[8]);var state_40203__$1 = state_40203;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40203__$1,23,out,inst_40167);
} else
{if((state_val_40204 === 1))
{var inst_40142 = (state_40203[9]);var inst_40142__$1 = calc_state();var inst_40143 = cljs.core.seq_QMARK_(inst_40142__$1);var state_40203__$1 = (function (){var statearr_40206 = state_40203;(statearr_40206[9] = inst_40142__$1);
return statearr_40206;
})();if(inst_40143)
{var statearr_40207_40247 = state_40203__$1;(statearr_40207_40247[1] = 2);
} else
{var statearr_40208_40248 = state_40203__$1;(statearr_40208_40248[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 4))
{var inst_40142 = (state_40203[9]);var inst_40148 = (state_40203[2]);var inst_40149 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40148,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_40150 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40148,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_40151 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40148,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_40152 = inst_40142;var state_40203__$1 = (function (){var statearr_40209 = state_40203;(statearr_40209[10] = inst_40149);
(statearr_40209[7] = inst_40152);
(statearr_40209[11] = inst_40151);
(statearr_40209[12] = inst_40150);
return statearr_40209;
})();var statearr_40210_40249 = state_40203__$1;(statearr_40210_40249[2] = null);
(statearr_40210_40249[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 15))
{var state_40203__$1 = state_40203;var statearr_40211_40250 = state_40203__$1;(statearr_40211_40250[2] = null);
(statearr_40211_40250[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 21))
{var state_40203__$1 = state_40203;var statearr_40212_40251 = state_40203__$1;(statearr_40212_40251[2] = null);
(statearr_40212_40251[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 13))
{var inst_40199 = (state_40203[2]);var state_40203__$1 = state_40203;var statearr_40213_40252 = state_40203__$1;(statearr_40213_40252[2] = inst_40199);
(statearr_40213_40252[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 22))
{var inst_40160 = (state_40203[13]);var inst_40196 = (state_40203[2]);var inst_40152 = inst_40160;var state_40203__$1 = (function (){var statearr_40214 = state_40203;(statearr_40214[7] = inst_40152);
(statearr_40214[14] = inst_40196);
return statearr_40214;
})();var statearr_40215_40253 = state_40203__$1;(statearr_40215_40253[2] = null);
(statearr_40215_40253[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 6))
{var inst_40201 = (state_40203[2]);var state_40203__$1 = state_40203;return cljs.core.async.impl.ioc_helpers.return_chan(state_40203__$1,inst_40201);
} else
{if((state_val_40204 === 17))
{var inst_40182 = (state_40203[15]);var state_40203__$1 = state_40203;var statearr_40216_40254 = state_40203__$1;(statearr_40216_40254[2] = inst_40182);
(statearr_40216_40254[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 3))
{var inst_40142 = (state_40203[9]);var state_40203__$1 = state_40203;var statearr_40217_40255 = state_40203__$1;(statearr_40217_40255[2] = inst_40142);
(statearr_40217_40255[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 12))
{var inst_40182 = (state_40203[15]);var inst_40163 = (state_40203[16]);var inst_40168 = (state_40203[17]);var inst_40182__$1 = (inst_40163.cljs$core$IFn$_invoke$arity$1 ? inst_40163.cljs$core$IFn$_invoke$arity$1(inst_40168) : inst_40163.call(null,inst_40168));var state_40203__$1 = (function (){var statearr_40218 = state_40203;(statearr_40218[15] = inst_40182__$1);
return statearr_40218;
})();if(cljs.core.truth_(inst_40182__$1))
{var statearr_40219_40256 = state_40203__$1;(statearr_40219_40256[1] = 17);
} else
{var statearr_40220_40257 = state_40203__$1;(statearr_40220_40257[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 2))
{var inst_40142 = (state_40203[9]);var inst_40145 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_40142);var state_40203__$1 = state_40203;var statearr_40221_40258 = state_40203__$1;(statearr_40221_40258[2] = inst_40145);
(statearr_40221_40258[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 23))
{var inst_40193 = (state_40203[2]);var state_40203__$1 = state_40203;var statearr_40222_40259 = state_40203__$1;(statearr_40222_40259[2] = inst_40193);
(statearr_40222_40259[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 19))
{var inst_40190 = (state_40203[2]);var state_40203__$1 = state_40203;if(cljs.core.truth_(inst_40190))
{var statearr_40223_40260 = state_40203__$1;(statearr_40223_40260[1] = 20);
} else
{var statearr_40224_40261 = state_40203__$1;(statearr_40224_40261[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 11))
{var inst_40167 = (state_40203[8]);var inst_40173 = (inst_40167 == null);var state_40203__$1 = state_40203;if(cljs.core.truth_(inst_40173))
{var statearr_40225_40262 = state_40203__$1;(statearr_40225_40262[1] = 14);
} else
{var statearr_40226_40263 = state_40203__$1;(statearr_40226_40263[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 9))
{var inst_40160 = (state_40203[13]);var inst_40160__$1 = (state_40203[2]);var inst_40161 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40160__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_40162 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40160__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_40163 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40160__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_40203__$1 = (function (){var statearr_40227 = state_40203;(statearr_40227[18] = inst_40162);
(statearr_40227[13] = inst_40160__$1);
(statearr_40227[16] = inst_40163);
return statearr_40227;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_(state_40203__$1,10,inst_40161);
} else
{if((state_val_40204 === 5))
{var inst_40152 = (state_40203[7]);var inst_40155 = cljs.core.seq_QMARK_(inst_40152);var state_40203__$1 = state_40203;if(inst_40155)
{var statearr_40228_40264 = state_40203__$1;(statearr_40228_40264[1] = 7);
} else
{var statearr_40229_40265 = state_40203__$1;(statearr_40229_40265[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 14))
{var inst_40168 = (state_40203[17]);var inst_40175 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_40168);var state_40203__$1 = state_40203;var statearr_40230_40266 = state_40203__$1;(statearr_40230_40266[2] = inst_40175);
(statearr_40230_40266[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 16))
{var inst_40178 = (state_40203[2]);var inst_40179 = calc_state();var inst_40152 = inst_40179;var state_40203__$1 = (function (){var statearr_40231 = state_40203;(statearr_40231[7] = inst_40152);
(statearr_40231[19] = inst_40178);
return statearr_40231;
})();var statearr_40232_40267 = state_40203__$1;(statearr_40232_40267[2] = null);
(statearr_40232_40267[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 10))
{var inst_40167 = (state_40203[8]);var inst_40168 = (state_40203[17]);var inst_40166 = (state_40203[2]);var inst_40167__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40166,0,null);var inst_40168__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40166,1,null);var inst_40169 = (inst_40167__$1 == null);var inst_40170 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40168__$1,change);var inst_40171 = (inst_40169) || (inst_40170);var state_40203__$1 = (function (){var statearr_40233 = state_40203;(statearr_40233[8] = inst_40167__$1);
(statearr_40233[17] = inst_40168__$1);
return statearr_40233;
})();if(cljs.core.truth_(inst_40171))
{var statearr_40234_40268 = state_40203__$1;(statearr_40234_40268[1] = 11);
} else
{var statearr_40235_40269 = state_40203__$1;(statearr_40235_40269[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 18))
{var inst_40162 = (state_40203[18]);var inst_40163 = (state_40203[16]);var inst_40168 = (state_40203[17]);var inst_40185 = cljs.core.empty_QMARK_(inst_40163);var inst_40186 = (inst_40162.cljs$core$IFn$_invoke$arity$1 ? inst_40162.cljs$core$IFn$_invoke$arity$1(inst_40168) : inst_40162.call(null,inst_40168));var inst_40187 = cljs.core.not(inst_40186);var inst_40188 = (inst_40185) && (inst_40187);var state_40203__$1 = state_40203;var statearr_40236_40270 = state_40203__$1;(statearr_40236_40270[2] = inst_40188);
(statearr_40236_40270[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40204 === 8))
{var inst_40152 = (state_40203[7]);var state_40203__$1 = state_40203;var statearr_40237_40271 = state_40203__$1;(statearr_40237_40271[2] = inst_40152);
(statearr_40237_40271[1] = 9);
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
var state_machine__24506__auto____0 = (function (){var statearr_40241 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_40241[0] = state_machine__24506__auto__);
(statearr_40241[1] = 1);
return statearr_40241;
});
var state_machine__24506__auto____1 = (function (state_40203){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_40203);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e40242){if((e40242 instanceof Object))
{var ex__24509__auto__ = e40242;var statearr_40243_40272 = state_40203;(statearr_40243_40272[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_40203);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e40242;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40273 = state_40203;
state_40203 = G__40273;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_40203){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_40203);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_40244 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_40244[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___40245);
return statearr_40244;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_(mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_(mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_(mix,mode);
});
cljs.core.async.Pub = (function (){var obj40275 = {};return obj40275;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__21037__auto__ = p;if(and__21037__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__21037__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__21676__auto__ = (((p == null))?null:p);return (function (){var or__21049__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__21037__auto__ = p;if(and__21037__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__21037__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__21676__auto__ = (((p == null))?null:p);return (function (){var or__21049__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__21037__auto__ = p;if(and__21037__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__21037__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__21676__auto__ = (((p == null))?null:p);return (function (){var or__21049__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__21037__auto__ = p;if(and__21037__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__21037__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__21676__auto__ = (((p == null))?null:p);return (function (){var or__21049__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__21049__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,((function (or__21049__auto__,mults){
return (function (p1__40276_SHARP_){if(cljs.core.truth_((p1__40276_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__40276_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__40276_SHARP_.call(null,topic))))
{return p1__40276_SHARP_;
} else
{return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__40276_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
});})(or__21049__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t40401 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t40401 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta40402){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta40402 = meta40402;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t40401.cljs$lang$type = true;
cljs.core.async.t40401.cljs$lang$ctorStr = "cljs.core.async/t40401";
cljs.core.async.t40401.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__21616__auto__,writer__21617__auto__,opt__21618__auto__){return cljs.core._write(writer__21617__auto__,"cljs.core.async/t40401");
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t40401.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap(m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t40401.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_40403){var self__ = this;
var _40403__$1 = this;return self__.meta40402;
});})(mults,ensure_mult))
;
cljs.core.async.t40401.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_40403,meta40402__$1){var self__ = this;
var _40403__$1 = this;return (new cljs.core.async.t40401(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta40402__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t40401 = ((function (mults,ensure_mult){
return (function __GT_t40401(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta40402){return (new cljs.core.async.t40401(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta40402));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t40401(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__24520__auto___40525 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_40477){var state_val_40478 = (state_40477[1]);if((state_val_40478 === 7))
{var inst_40473 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40479_40526 = state_40477__$1;(statearr_40479_40526[2] = inst_40473);
(statearr_40479_40526[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 20))
{var state_40477__$1 = state_40477;var statearr_40480_40527 = state_40477__$1;(statearr_40480_40527[2] = null);
(statearr_40480_40527[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 1))
{var state_40477__$1 = state_40477;var statearr_40481_40528 = state_40477__$1;(statearr_40481_40528[2] = null);
(statearr_40481_40528[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 24))
{var inst_40406 = (state_40477[7]);var inst_40456 = (state_40477[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_40477,23,Object,null,22);var inst_40463 = cljs.core.async.muxch_STAR_(inst_40456);var state_40477__$1 = state_40477;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40477__$1,25,inst_40463,inst_40406);
} else
{if((state_val_40478 === 4))
{var inst_40406 = (state_40477[7]);var inst_40406__$1 = (state_40477[2]);var inst_40407 = (inst_40406__$1 == null);var state_40477__$1 = (function (){var statearr_40482 = state_40477;(statearr_40482[7] = inst_40406__$1);
return statearr_40482;
})();if(cljs.core.truth_(inst_40407))
{var statearr_40483_40529 = state_40477__$1;(statearr_40483_40529[1] = 5);
} else
{var statearr_40484_40530 = state_40477__$1;(statearr_40484_40530[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 15))
{var inst_40448 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40485_40531 = state_40477__$1;(statearr_40485_40531[2] = inst_40448);
(statearr_40485_40531[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 21))
{var inst_40470 = (state_40477[2]);var state_40477__$1 = (function (){var statearr_40486 = state_40477;(statearr_40486[9] = inst_40470);
return statearr_40486;
})();var statearr_40487_40532 = state_40477__$1;(statearr_40487_40532[2] = null);
(statearr_40487_40532[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 13))
{var inst_40430 = (state_40477[10]);var inst_40432 = cljs.core.chunked_seq_QMARK_(inst_40430);var state_40477__$1 = state_40477;if(inst_40432)
{var statearr_40488_40533 = state_40477__$1;(statearr_40488_40533[1] = 16);
} else
{var statearr_40489_40534 = state_40477__$1;(statearr_40489_40534[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 22))
{var inst_40467 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40490_40535 = state_40477__$1;(statearr_40490_40535[2] = inst_40467);
(statearr_40490_40535[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 6))
{var inst_40454 = (state_40477[11]);var inst_40406 = (state_40477[7]);var inst_40456 = (state_40477[8]);var inst_40454__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_40406) : topic_fn.call(null,inst_40406));var inst_40455 = cljs.core.deref(mults);var inst_40456__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_40455,inst_40454__$1);var state_40477__$1 = (function (){var statearr_40491 = state_40477;(statearr_40491[11] = inst_40454__$1);
(statearr_40491[8] = inst_40456__$1);
return statearr_40491;
})();if(cljs.core.truth_(inst_40456__$1))
{var statearr_40492_40536 = state_40477__$1;(statearr_40492_40536[1] = 19);
} else
{var statearr_40493_40537 = state_40477__$1;(statearr_40493_40537[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 25))
{var inst_40465 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40494_40538 = state_40477__$1;(statearr_40494_40538[2] = inst_40465);
cljs.core.async.impl.ioc_helpers.process_exception(state_40477__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 17))
{var inst_40430 = (state_40477[10]);var inst_40439 = cljs.core.first(inst_40430);var inst_40440 = cljs.core.async.muxch_STAR_(inst_40439);var inst_40441 = cljs.core.async.close_BANG_(inst_40440);var inst_40442 = cljs.core.next(inst_40430);var inst_40416 = inst_40442;var inst_40417 = null;var inst_40418 = 0;var inst_40419 = 0;var state_40477__$1 = (function (){var statearr_40495 = state_40477;(statearr_40495[12] = inst_40417);
(statearr_40495[13] = inst_40441);
(statearr_40495[14] = inst_40418);
(statearr_40495[15] = inst_40419);
(statearr_40495[16] = inst_40416);
return statearr_40495;
})();var statearr_40496_40539 = state_40477__$1;(statearr_40496_40539[2] = null);
(statearr_40496_40539[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 3))
{var inst_40475 = (state_40477[2]);var state_40477__$1 = state_40477;return cljs.core.async.impl.ioc_helpers.return_chan(state_40477__$1,inst_40475);
} else
{if((state_val_40478 === 12))
{var inst_40450 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40497_40540 = state_40477__$1;(statearr_40497_40540[2] = inst_40450);
(statearr_40497_40540[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 2))
{var state_40477__$1 = state_40477;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40477__$1,4,ch);
} else
{if((state_val_40478 === 23))
{var inst_40454 = (state_40477[11]);var inst_40458 = (state_40477[2]);var inst_40459 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_40454);var state_40477__$1 = (function (){var statearr_40498 = state_40477;(statearr_40498[17] = inst_40458);
return statearr_40498;
})();var statearr_40499_40541 = state_40477__$1;(statearr_40499_40541[2] = inst_40459);
cljs.core.async.impl.ioc_helpers.process_exception(state_40477__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 19))
{var state_40477__$1 = state_40477;var statearr_40500_40542 = state_40477__$1;(statearr_40500_40542[2] = null);
(statearr_40500_40542[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 11))
{var inst_40430 = (state_40477[10]);var inst_40416 = (state_40477[16]);var inst_40430__$1 = cljs.core.seq(inst_40416);var state_40477__$1 = (function (){var statearr_40501 = state_40477;(statearr_40501[10] = inst_40430__$1);
return statearr_40501;
})();if(inst_40430__$1)
{var statearr_40502_40543 = state_40477__$1;(statearr_40502_40543[1] = 13);
} else
{var statearr_40503_40544 = state_40477__$1;(statearr_40503_40544[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 9))
{var inst_40452 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40504_40545 = state_40477__$1;(statearr_40504_40545[2] = inst_40452);
(statearr_40504_40545[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 5))
{var inst_40413 = cljs.core.deref(mults);var inst_40414 = cljs.core.vals(inst_40413);var inst_40415 = cljs.core.seq(inst_40414);var inst_40416 = inst_40415;var inst_40417 = null;var inst_40418 = 0;var inst_40419 = 0;var state_40477__$1 = (function (){var statearr_40505 = state_40477;(statearr_40505[12] = inst_40417);
(statearr_40505[14] = inst_40418);
(statearr_40505[15] = inst_40419);
(statearr_40505[16] = inst_40416);
return statearr_40505;
})();var statearr_40506_40546 = state_40477__$1;(statearr_40506_40546[2] = null);
(statearr_40506_40546[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 14))
{var state_40477__$1 = state_40477;var statearr_40510_40547 = state_40477__$1;(statearr_40510_40547[2] = null);
(statearr_40510_40547[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 16))
{var inst_40430 = (state_40477[10]);var inst_40434 = cljs.core.chunk_first(inst_40430);var inst_40435 = cljs.core.chunk_rest(inst_40430);var inst_40436 = cljs.core.count(inst_40434);var inst_40416 = inst_40435;var inst_40417 = inst_40434;var inst_40418 = inst_40436;var inst_40419 = 0;var state_40477__$1 = (function (){var statearr_40511 = state_40477;(statearr_40511[12] = inst_40417);
(statearr_40511[14] = inst_40418);
(statearr_40511[15] = inst_40419);
(statearr_40511[16] = inst_40416);
return statearr_40511;
})();var statearr_40512_40548 = state_40477__$1;(statearr_40512_40548[2] = null);
(statearr_40512_40548[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 10))
{var inst_40417 = (state_40477[12]);var inst_40418 = (state_40477[14]);var inst_40419 = (state_40477[15]);var inst_40416 = (state_40477[16]);var inst_40424 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_40417,inst_40419);var inst_40425 = cljs.core.async.muxch_STAR_(inst_40424);var inst_40426 = cljs.core.async.close_BANG_(inst_40425);var inst_40427 = (inst_40419 + 1);var tmp40507 = inst_40417;var tmp40508 = inst_40418;var tmp40509 = inst_40416;var inst_40416__$1 = tmp40509;var inst_40417__$1 = tmp40507;var inst_40418__$1 = tmp40508;var inst_40419__$1 = inst_40427;var state_40477__$1 = (function (){var statearr_40513 = state_40477;(statearr_40513[18] = inst_40426);
(statearr_40513[12] = inst_40417__$1);
(statearr_40513[14] = inst_40418__$1);
(statearr_40513[15] = inst_40419__$1);
(statearr_40513[16] = inst_40416__$1);
return statearr_40513;
})();var statearr_40514_40549 = state_40477__$1;(statearr_40514_40549[2] = null);
(statearr_40514_40549[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 18))
{var inst_40445 = (state_40477[2]);var state_40477__$1 = state_40477;var statearr_40515_40550 = state_40477__$1;(statearr_40515_40550[2] = inst_40445);
(statearr_40515_40550[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40478 === 8))
{var inst_40418 = (state_40477[14]);var inst_40419 = (state_40477[15]);var inst_40421 = (inst_40419 < inst_40418);var inst_40422 = inst_40421;var state_40477__$1 = state_40477;if(cljs.core.truth_(inst_40422))
{var statearr_40516_40551 = state_40477__$1;(statearr_40516_40551[1] = 10);
} else
{var statearr_40517_40552 = state_40477__$1;(statearr_40517_40552[1] = 11);
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
var state_machine__24506__auto____0 = (function (){var statearr_40521 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_40521[0] = state_machine__24506__auto__);
(statearr_40521[1] = 1);
return statearr_40521;
});
var state_machine__24506__auto____1 = (function (state_40477){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_40477);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e40522){if((e40522 instanceof Object))
{var ex__24509__auto__ = e40522;var statearr_40523_40553 = state_40477;(statearr_40523_40553[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_40477);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e40522;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40554 = state_40477;
state_40477 = G__40554;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_40477){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_40477);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_40524 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_40524[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___40525);
return statearr_40524;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1(p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2(p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec(chs);var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var cnt = cljs.core.count(chs__$1);var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice(0));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));var c__24520__auto___40691 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_40661){var state_val_40662 = (state_40661[1]);if((state_val_40662 === 7))
{var state_40661__$1 = state_40661;var statearr_40663_40692 = state_40661__$1;(statearr_40663_40692[2] = null);
(statearr_40663_40692[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 1))
{var state_40661__$1 = state_40661;var statearr_40664_40693 = state_40661__$1;(statearr_40664_40693[2] = null);
(statearr_40664_40693[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 4))
{var inst_40625 = (state_40661[7]);var inst_40627 = (inst_40625 < cnt);var state_40661__$1 = state_40661;if(cljs.core.truth_(inst_40627))
{var statearr_40665_40694 = state_40661__$1;(statearr_40665_40694[1] = 6);
} else
{var statearr_40666_40695 = state_40661__$1;(statearr_40666_40695[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 15))
{var inst_40657 = (state_40661[2]);var state_40661__$1 = state_40661;var statearr_40667_40696 = state_40661__$1;(statearr_40667_40696[2] = inst_40657);
(statearr_40667_40696[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 13))
{var inst_40650 = cljs.core.async.close_BANG_(out);var state_40661__$1 = state_40661;var statearr_40668_40697 = state_40661__$1;(statearr_40668_40697[2] = inst_40650);
(statearr_40668_40697[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 6))
{var state_40661__$1 = state_40661;var statearr_40669_40698 = state_40661__$1;(statearr_40669_40698[2] = null);
(statearr_40669_40698[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 3))
{var inst_40659 = (state_40661[2]);var state_40661__$1 = state_40661;return cljs.core.async.impl.ioc_helpers.return_chan(state_40661__$1,inst_40659);
} else
{if((state_val_40662 === 12))
{var inst_40647 = (state_40661[8]);var inst_40647__$1 = (state_40661[2]);var inst_40648 = cljs.core.some(cljs.core.nil_QMARK_,inst_40647__$1);var state_40661__$1 = (function (){var statearr_40670 = state_40661;(statearr_40670[8] = inst_40647__$1);
return statearr_40670;
})();if(cljs.core.truth_(inst_40648))
{var statearr_40671_40699 = state_40661__$1;(statearr_40671_40699[1] = 13);
} else
{var statearr_40672_40700 = state_40661__$1;(statearr_40672_40700[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 2))
{var inst_40624 = cljs.core.reset_BANG_(dctr,cnt);var inst_40625 = 0;var state_40661__$1 = (function (){var statearr_40673 = state_40661;(statearr_40673[9] = inst_40624);
(statearr_40673[7] = inst_40625);
return statearr_40673;
})();var statearr_40674_40701 = state_40661__$1;(statearr_40674_40701[2] = null);
(statearr_40674_40701[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 11))
{var inst_40625 = (state_40661[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_40661,10,Object,null,9);var inst_40634 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_40625) : chs__$1.call(null,inst_40625));var inst_40635 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_40625) : done.call(null,inst_40625));var inst_40636 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_40634,inst_40635);var state_40661__$1 = state_40661;var statearr_40675_40702 = state_40661__$1;(statearr_40675_40702[2] = inst_40636);
cljs.core.async.impl.ioc_helpers.process_exception(state_40661__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 9))
{var inst_40625 = (state_40661[7]);var inst_40638 = (state_40661[2]);var inst_40639 = (inst_40625 + 1);var inst_40625__$1 = inst_40639;var state_40661__$1 = (function (){var statearr_40676 = state_40661;(statearr_40676[10] = inst_40638);
(statearr_40676[7] = inst_40625__$1);
return statearr_40676;
})();var statearr_40677_40703 = state_40661__$1;(statearr_40677_40703[2] = null);
(statearr_40677_40703[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 5))
{var inst_40645 = (state_40661[2]);var state_40661__$1 = (function (){var statearr_40678 = state_40661;(statearr_40678[11] = inst_40645);
return statearr_40678;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40661__$1,12,dchan);
} else
{if((state_val_40662 === 14))
{var inst_40647 = (state_40661[8]);var inst_40652 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_40647);var state_40661__$1 = state_40661;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40661__$1,16,out,inst_40652);
} else
{if((state_val_40662 === 16))
{var inst_40654 = (state_40661[2]);var state_40661__$1 = (function (){var statearr_40679 = state_40661;(statearr_40679[12] = inst_40654);
return statearr_40679;
})();var statearr_40680_40704 = state_40661__$1;(statearr_40680_40704[2] = null);
(statearr_40680_40704[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 10))
{var inst_40629 = (state_40661[2]);var inst_40630 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);var state_40661__$1 = (function (){var statearr_40681 = state_40661;(statearr_40681[13] = inst_40629);
return statearr_40681;
})();var statearr_40682_40705 = state_40661__$1;(statearr_40682_40705[2] = inst_40630);
cljs.core.async.impl.ioc_helpers.process_exception(state_40661__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40662 === 8))
{var inst_40643 = (state_40661[2]);var state_40661__$1 = state_40661;var statearr_40683_40706 = state_40661__$1;(statearr_40683_40706[2] = inst_40643);
(statearr_40683_40706[1] = 5);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_40687 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_40687[0] = state_machine__24506__auto__);
(statearr_40687[1] = 1);
return statearr_40687;
});
var state_machine__24506__auto____1 = (function (state_40661){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_40661);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e40688){if((e40688 instanceof Object))
{var ex__24509__auto__ = e40688;var statearr_40689_40707 = state_40661;(statearr_40689_40707[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_40661);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e40688;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40708 = state_40661;
state_40661 = G__40708;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_40661){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_40661);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_40690 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_40690[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___40691);
return statearr_40690;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.cljs$core$IFn$_invoke$arity$2(chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___40816 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_40792){var state_val_40793 = (state_40792[1]);if((state_val_40793 === 7))
{var inst_40771 = (state_40792[7]);var inst_40772 = (state_40792[8]);var inst_40771__$1 = (state_40792[2]);var inst_40772__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40771__$1,0,null);var inst_40773 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40771__$1,1,null);var inst_40774 = (inst_40772__$1 == null);var state_40792__$1 = (function (){var statearr_40794 = state_40792;(statearr_40794[9] = inst_40773);
(statearr_40794[7] = inst_40771__$1);
(statearr_40794[8] = inst_40772__$1);
return statearr_40794;
})();if(cljs.core.truth_(inst_40774))
{var statearr_40795_40817 = state_40792__$1;(statearr_40795_40817[1] = 8);
} else
{var statearr_40796_40818 = state_40792__$1;(statearr_40796_40818[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 1))
{var inst_40763 = cljs.core.vec(chs);var inst_40764 = inst_40763;var state_40792__$1 = (function (){var statearr_40797 = state_40792;(statearr_40797[10] = inst_40764);
return statearr_40797;
})();var statearr_40798_40819 = state_40792__$1;(statearr_40798_40819[2] = null);
(statearr_40798_40819[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 4))
{var inst_40764 = (state_40792[10]);var state_40792__$1 = state_40792;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_(state_40792__$1,7,inst_40764);
} else
{if((state_val_40793 === 6))
{var inst_40788 = (state_40792[2]);var state_40792__$1 = state_40792;var statearr_40799_40820 = state_40792__$1;(statearr_40799_40820[2] = inst_40788);
(statearr_40799_40820[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 3))
{var inst_40790 = (state_40792[2]);var state_40792__$1 = state_40792;return cljs.core.async.impl.ioc_helpers.return_chan(state_40792__$1,inst_40790);
} else
{if((state_val_40793 === 2))
{var inst_40764 = (state_40792[10]);var inst_40766 = cljs.core.count(inst_40764);var inst_40767 = (inst_40766 > 0);var state_40792__$1 = state_40792;if(cljs.core.truth_(inst_40767))
{var statearr_40801_40821 = state_40792__$1;(statearr_40801_40821[1] = 4);
} else
{var statearr_40802_40822 = state_40792__$1;(statearr_40802_40822[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 11))
{var inst_40764 = (state_40792[10]);var inst_40781 = (state_40792[2]);var tmp40800 = inst_40764;var inst_40764__$1 = tmp40800;var state_40792__$1 = (function (){var statearr_40803 = state_40792;(statearr_40803[11] = inst_40781);
(statearr_40803[10] = inst_40764__$1);
return statearr_40803;
})();var statearr_40804_40823 = state_40792__$1;(statearr_40804_40823[2] = null);
(statearr_40804_40823[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 9))
{var inst_40772 = (state_40792[8]);var state_40792__$1 = state_40792;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40792__$1,11,out,inst_40772);
} else
{if((state_val_40793 === 5))
{var inst_40786 = cljs.core.async.close_BANG_(out);var state_40792__$1 = state_40792;var statearr_40805_40824 = state_40792__$1;(statearr_40805_40824[2] = inst_40786);
(statearr_40805_40824[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 10))
{var inst_40784 = (state_40792[2]);var state_40792__$1 = state_40792;var statearr_40806_40825 = state_40792__$1;(statearr_40806_40825[2] = inst_40784);
(statearr_40806_40825[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40793 === 8))
{var inst_40773 = (state_40792[9]);var inst_40771 = (state_40792[7]);var inst_40772 = (state_40792[8]);var inst_40764 = (state_40792[10]);var inst_40776 = (function (){var c = inst_40773;var v = inst_40772;var vec__40769 = inst_40771;var cs = inst_40764;return ((function (c,v,vec__40769,cs,inst_40773,inst_40771,inst_40772,inst_40764,state_val_40793){
return (function (p1__40709_SHARP_){return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__40709_SHARP_);
});
;})(c,v,vec__40769,cs,inst_40773,inst_40771,inst_40772,inst_40764,state_val_40793))
})();var inst_40777 = cljs.core.filterv(inst_40776,inst_40764);var inst_40764__$1 = inst_40777;var state_40792__$1 = (function (){var statearr_40807 = state_40792;(statearr_40807[10] = inst_40764__$1);
return statearr_40807;
})();var statearr_40808_40826 = state_40792__$1;(statearr_40808_40826[2] = null);
(statearr_40808_40826[1] = 2);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_40812 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_40812[0] = state_machine__24506__auto__);
(statearr_40812[1] = 1);
return statearr_40812;
});
var state_machine__24506__auto____1 = (function (state_40792){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_40792);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e40813){if((e40813 instanceof Object))
{var ex__24509__auto__ = e40813;var statearr_40814_40827 = state_40792;(statearr_40814_40827[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_40792);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e40813;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40828 = state_40792;
state_40792 = G__40828;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_40792){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_40792);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_40815 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_40815[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___40816);
return statearr_40815;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___40921 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_40898){var state_val_40899 = (state_40898[1]);if((state_val_40899 === 7))
{var inst_40880 = (state_40898[7]);var inst_40880__$1 = (state_40898[2]);var inst_40881 = (inst_40880__$1 == null);var inst_40882 = cljs.core.not(inst_40881);var state_40898__$1 = (function (){var statearr_40900 = state_40898;(statearr_40900[7] = inst_40880__$1);
return statearr_40900;
})();if(inst_40882)
{var statearr_40901_40922 = state_40898__$1;(statearr_40901_40922[1] = 8);
} else
{var statearr_40902_40923 = state_40898__$1;(statearr_40902_40923[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 1))
{var inst_40875 = 0;var state_40898__$1 = (function (){var statearr_40903 = state_40898;(statearr_40903[8] = inst_40875);
return statearr_40903;
})();var statearr_40904_40924 = state_40898__$1;(statearr_40904_40924[2] = null);
(statearr_40904_40924[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 4))
{var state_40898__$1 = state_40898;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40898__$1,7,ch);
} else
{if((state_val_40899 === 6))
{var inst_40893 = (state_40898[2]);var state_40898__$1 = state_40898;var statearr_40905_40925 = state_40898__$1;(statearr_40905_40925[2] = inst_40893);
(statearr_40905_40925[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 3))
{var inst_40895 = (state_40898[2]);var inst_40896 = cljs.core.async.close_BANG_(out);var state_40898__$1 = (function (){var statearr_40906 = state_40898;(statearr_40906[9] = inst_40895);
return statearr_40906;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_40898__$1,inst_40896);
} else
{if((state_val_40899 === 2))
{var inst_40875 = (state_40898[8]);var inst_40877 = (inst_40875 < n);var state_40898__$1 = state_40898;if(cljs.core.truth_(inst_40877))
{var statearr_40907_40926 = state_40898__$1;(statearr_40907_40926[1] = 4);
} else
{var statearr_40908_40927 = state_40898__$1;(statearr_40908_40927[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 11))
{var inst_40875 = (state_40898[8]);var inst_40885 = (state_40898[2]);var inst_40886 = (inst_40875 + 1);var inst_40875__$1 = inst_40886;var state_40898__$1 = (function (){var statearr_40909 = state_40898;(statearr_40909[10] = inst_40885);
(statearr_40909[8] = inst_40875__$1);
return statearr_40909;
})();var statearr_40910_40928 = state_40898__$1;(statearr_40910_40928[2] = null);
(statearr_40910_40928[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 9))
{var state_40898__$1 = state_40898;var statearr_40911_40929 = state_40898__$1;(statearr_40911_40929[2] = null);
(statearr_40911_40929[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 5))
{var state_40898__$1 = state_40898;var statearr_40912_40930 = state_40898__$1;(statearr_40912_40930[2] = null);
(statearr_40912_40930[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 10))
{var inst_40890 = (state_40898[2]);var state_40898__$1 = state_40898;var statearr_40913_40931 = state_40898__$1;(statearr_40913_40931[2] = inst_40890);
(statearr_40913_40931[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_40899 === 8))
{var inst_40880 = (state_40898[7]);var state_40898__$1 = state_40898;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40898__$1,11,out,inst_40880);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_40917 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_40917[0] = state_machine__24506__auto__);
(statearr_40917[1] = 1);
return statearr_40917;
});
var state_machine__24506__auto____1 = (function (state_40898){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_40898);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e40918){if((e40918 instanceof Object))
{var ex__24509__auto__ = e40918;var statearr_40919_40932 = state_40898;(statearr_40919_40932[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_40898);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e40918;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__40933 = state_40898;
state_40898 = G__40933;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_40898){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_40898);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_40920 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_40920[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___40921);
return statearr_40920;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.cljs$core$IFn$_invoke$arity$2(ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___41030 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_41005){var state_val_41006 = (state_41005[1]);if((state_val_41006 === 7))
{var inst_41000 = (state_41005[2]);var state_41005__$1 = state_41005;var statearr_41007_41031 = state_41005__$1;(statearr_41007_41031[2] = inst_41000);
(statearr_41007_41031[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 1))
{var inst_40982 = null;var state_41005__$1 = (function (){var statearr_41008 = state_41005;(statearr_41008[7] = inst_40982);
return statearr_41008;
})();var statearr_41009_41032 = state_41005__$1;(statearr_41009_41032[2] = null);
(statearr_41009_41032[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 4))
{var inst_40985 = (state_41005[8]);var inst_40985__$1 = (state_41005[2]);var inst_40986 = (inst_40985__$1 == null);var inst_40987 = cljs.core.not(inst_40986);var state_41005__$1 = (function (){var statearr_41010 = state_41005;(statearr_41010[8] = inst_40985__$1);
return statearr_41010;
})();if(inst_40987)
{var statearr_41011_41033 = state_41005__$1;(statearr_41011_41033[1] = 5);
} else
{var statearr_41012_41034 = state_41005__$1;(statearr_41012_41034[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 6))
{var state_41005__$1 = state_41005;var statearr_41013_41035 = state_41005__$1;(statearr_41013_41035[2] = null);
(statearr_41013_41035[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 3))
{var inst_41002 = (state_41005[2]);var inst_41003 = cljs.core.async.close_BANG_(out);var state_41005__$1 = (function (){var statearr_41014 = state_41005;(statearr_41014[9] = inst_41002);
return statearr_41014;
})();return cljs.core.async.impl.ioc_helpers.return_chan(state_41005__$1,inst_41003);
} else
{if((state_val_41006 === 2))
{var state_41005__$1 = state_41005;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41005__$1,4,ch);
} else
{if((state_val_41006 === 11))
{var inst_40985 = (state_41005[8]);var inst_40994 = (state_41005[2]);var inst_40982 = inst_40985;var state_41005__$1 = (function (){var statearr_41015 = state_41005;(statearr_41015[7] = inst_40982);
(statearr_41015[10] = inst_40994);
return statearr_41015;
})();var statearr_41016_41036 = state_41005__$1;(statearr_41016_41036[2] = null);
(statearr_41016_41036[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 9))
{var inst_40985 = (state_41005[8]);var state_41005__$1 = state_41005;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41005__$1,11,out,inst_40985);
} else
{if((state_val_41006 === 5))
{var inst_40982 = (state_41005[7]);var inst_40985 = (state_41005[8]);var inst_40989 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_40985,inst_40982);var state_41005__$1 = state_41005;if(inst_40989)
{var statearr_41018_41037 = state_41005__$1;(statearr_41018_41037[1] = 8);
} else
{var statearr_41019_41038 = state_41005__$1;(statearr_41019_41038[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 10))
{var inst_40997 = (state_41005[2]);var state_41005__$1 = state_41005;var statearr_41020_41039 = state_41005__$1;(statearr_41020_41039[2] = inst_40997);
(statearr_41020_41039[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41006 === 8))
{var inst_40982 = (state_41005[7]);var tmp41017 = inst_40982;var inst_40982__$1 = tmp41017;var state_41005__$1 = (function (){var statearr_41021 = state_41005;(statearr_41021[7] = inst_40982__$1);
return statearr_41021;
})();var statearr_41022_41040 = state_41005__$1;(statearr_41022_41040[2] = null);
(statearr_41022_41040[1] = 2);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_41026 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_41026[0] = state_machine__24506__auto__);
(statearr_41026[1] = 1);
return statearr_41026;
});
var state_machine__24506__auto____1 = (function (state_41005){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_41005);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e41027){if((e41027 instanceof Object))
{var ex__24509__auto__ = e41027;var statearr_41028_41041 = state_41005;(statearr_41028_41041[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_41005);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e41027;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__41042 = state_41005;
state_41005 = G__41042;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_41005){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_41005);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_41029 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_41029[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___41030);
return statearr_41029;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___41177 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_41147){var state_val_41148 = (state_41147[1]);if((state_val_41148 === 7))
{var inst_41143 = (state_41147[2]);var state_41147__$1 = state_41147;var statearr_41149_41178 = state_41147__$1;(statearr_41149_41178[2] = inst_41143);
(statearr_41149_41178[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 1))
{var inst_41110 = (new Array(n));var inst_41111 = inst_41110;var inst_41112 = 0;var state_41147__$1 = (function (){var statearr_41150 = state_41147;(statearr_41150[7] = inst_41111);
(statearr_41150[8] = inst_41112);
return statearr_41150;
})();var statearr_41151_41179 = state_41147__$1;(statearr_41151_41179[2] = null);
(statearr_41151_41179[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 4))
{var inst_41115 = (state_41147[9]);var inst_41115__$1 = (state_41147[2]);var inst_41116 = (inst_41115__$1 == null);var inst_41117 = cljs.core.not(inst_41116);var state_41147__$1 = (function (){var statearr_41152 = state_41147;(statearr_41152[9] = inst_41115__$1);
return statearr_41152;
})();if(inst_41117)
{var statearr_41153_41180 = state_41147__$1;(statearr_41153_41180[1] = 5);
} else
{var statearr_41154_41181 = state_41147__$1;(statearr_41154_41181[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 15))
{var inst_41137 = (state_41147[2]);var state_41147__$1 = state_41147;var statearr_41155_41182 = state_41147__$1;(statearr_41155_41182[2] = inst_41137);
(statearr_41155_41182[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 13))
{var state_41147__$1 = state_41147;var statearr_41156_41183 = state_41147__$1;(statearr_41156_41183[2] = null);
(statearr_41156_41183[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 6))
{var inst_41112 = (state_41147[8]);var inst_41133 = (inst_41112 > 0);var state_41147__$1 = state_41147;if(cljs.core.truth_(inst_41133))
{var statearr_41157_41184 = state_41147__$1;(statearr_41157_41184[1] = 12);
} else
{var statearr_41158_41185 = state_41147__$1;(statearr_41158_41185[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 3))
{var inst_41145 = (state_41147[2]);var state_41147__$1 = state_41147;return cljs.core.async.impl.ioc_helpers.return_chan(state_41147__$1,inst_41145);
} else
{if((state_val_41148 === 12))
{var inst_41111 = (state_41147[7]);var inst_41135 = cljs.core.vec(inst_41111);var state_41147__$1 = state_41147;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41147__$1,15,out,inst_41135);
} else
{if((state_val_41148 === 2))
{var state_41147__$1 = state_41147;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41147__$1,4,ch);
} else
{if((state_val_41148 === 11))
{var inst_41127 = (state_41147[2]);var inst_41128 = (new Array(n));var inst_41111 = inst_41128;var inst_41112 = 0;var state_41147__$1 = (function (){var statearr_41159 = state_41147;(statearr_41159[7] = inst_41111);
(statearr_41159[8] = inst_41112);
(statearr_41159[10] = inst_41127);
return statearr_41159;
})();var statearr_41160_41186 = state_41147__$1;(statearr_41160_41186[2] = null);
(statearr_41160_41186[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 9))
{var inst_41111 = (state_41147[7]);var inst_41125 = cljs.core.vec(inst_41111);var state_41147__$1 = state_41147;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41147__$1,11,out,inst_41125);
} else
{if((state_val_41148 === 5))
{var inst_41120 = (state_41147[11]);var inst_41111 = (state_41147[7]);var inst_41115 = (state_41147[9]);var inst_41112 = (state_41147[8]);var inst_41119 = (inst_41111[inst_41112] = inst_41115);var inst_41120__$1 = (inst_41112 + 1);var inst_41121 = (inst_41120__$1 < n);var state_41147__$1 = (function (){var statearr_41161 = state_41147;(statearr_41161[11] = inst_41120__$1);
(statearr_41161[12] = inst_41119);
return statearr_41161;
})();if(cljs.core.truth_(inst_41121))
{var statearr_41162_41187 = state_41147__$1;(statearr_41162_41187[1] = 8);
} else
{var statearr_41163_41188 = state_41147__$1;(statearr_41163_41188[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 14))
{var inst_41140 = (state_41147[2]);var inst_41141 = cljs.core.async.close_BANG_(out);var state_41147__$1 = (function (){var statearr_41165 = state_41147;(statearr_41165[13] = inst_41140);
return statearr_41165;
})();var statearr_41166_41189 = state_41147__$1;(statearr_41166_41189[2] = inst_41141);
(statearr_41166_41189[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 10))
{var inst_41131 = (state_41147[2]);var state_41147__$1 = state_41147;var statearr_41167_41190 = state_41147__$1;(statearr_41167_41190[2] = inst_41131);
(statearr_41167_41190[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41148 === 8))
{var inst_41120 = (state_41147[11]);var inst_41111 = (state_41147[7]);var tmp41164 = inst_41111;var inst_41111__$1 = tmp41164;var inst_41112 = inst_41120;var state_41147__$1 = (function (){var statearr_41168 = state_41147;(statearr_41168[7] = inst_41111__$1);
(statearr_41168[8] = inst_41112);
return statearr_41168;
})();var statearr_41169_41191 = state_41147__$1;(statearr_41169_41191[2] = null);
(statearr_41169_41191[1] = 2);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_41173 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_41173[0] = state_machine__24506__auto__);
(statearr_41173[1] = 1);
return statearr_41173;
});
var state_machine__24506__auto____1 = (function (state_41147){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_41147);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e41174){if((e41174 instanceof Object))
{var ex__24509__auto__ = e41174;var statearr_41175_41192 = state_41147;(statearr_41175_41192[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_41147);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e41174;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__41193 = state_41147;
state_41147 = G__41193;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_41147){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_41147);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_41176 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_41176[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___41177);
return statearr_41176;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);var c__24520__auto___41336 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);cljs.core.async.impl.dispatch.run((function (){var f__24521__auto__ = (function (){var switch__24505__auto__ = (function (state_41306){var state_val_41307 = (state_41306[1]);if((state_val_41307 === 7))
{var inst_41302 = (state_41306[2]);var state_41306__$1 = state_41306;var statearr_41308_41337 = state_41306__$1;(statearr_41308_41337[2] = inst_41302);
(statearr_41308_41337[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 1))
{var inst_41265 = [];var inst_41266 = inst_41265;var inst_41267 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_41306__$1 = (function (){var statearr_41309 = state_41306;(statearr_41309[7] = inst_41266);
(statearr_41309[8] = inst_41267);
return statearr_41309;
})();var statearr_41310_41338 = state_41306__$1;(statearr_41310_41338[2] = null);
(statearr_41310_41338[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 4))
{var inst_41270 = (state_41306[9]);var inst_41270__$1 = (state_41306[2]);var inst_41271 = (inst_41270__$1 == null);var inst_41272 = cljs.core.not(inst_41271);var state_41306__$1 = (function (){var statearr_41311 = state_41306;(statearr_41311[9] = inst_41270__$1);
return statearr_41311;
})();if(inst_41272)
{var statearr_41312_41339 = state_41306__$1;(statearr_41312_41339[1] = 5);
} else
{var statearr_41313_41340 = state_41306__$1;(statearr_41313_41340[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 15))
{var inst_41296 = (state_41306[2]);var state_41306__$1 = state_41306;var statearr_41314_41341 = state_41306__$1;(statearr_41314_41341[2] = inst_41296);
(statearr_41314_41341[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 13))
{var state_41306__$1 = state_41306;var statearr_41315_41342 = state_41306__$1;(statearr_41315_41342[2] = null);
(statearr_41315_41342[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 6))
{var inst_41266 = (state_41306[7]);var inst_41291 = inst_41266.length;var inst_41292 = (inst_41291 > 0);var state_41306__$1 = state_41306;if(cljs.core.truth_(inst_41292))
{var statearr_41316_41343 = state_41306__$1;(statearr_41316_41343[1] = 12);
} else
{var statearr_41317_41344 = state_41306__$1;(statearr_41317_41344[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 3))
{var inst_41304 = (state_41306[2]);var state_41306__$1 = state_41306;return cljs.core.async.impl.ioc_helpers.return_chan(state_41306__$1,inst_41304);
} else
{if((state_val_41307 === 12))
{var inst_41266 = (state_41306[7]);var inst_41294 = cljs.core.vec(inst_41266);var state_41306__$1 = state_41306;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41306__$1,15,out,inst_41294);
} else
{if((state_val_41307 === 2))
{var state_41306__$1 = state_41306;return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41306__$1,4,ch);
} else
{if((state_val_41307 === 11))
{var inst_41274 = (state_41306[10]);var inst_41270 = (state_41306[9]);var inst_41284 = (state_41306[2]);var inst_41285 = [];var inst_41286 = inst_41285.push(inst_41270);var inst_41266 = inst_41285;var inst_41267 = inst_41274;var state_41306__$1 = (function (){var statearr_41318 = state_41306;(statearr_41318[7] = inst_41266);
(statearr_41318[11] = inst_41284);
(statearr_41318[12] = inst_41286);
(statearr_41318[8] = inst_41267);
return statearr_41318;
})();var statearr_41319_41345 = state_41306__$1;(statearr_41319_41345[2] = null);
(statearr_41319_41345[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 9))
{var inst_41266 = (state_41306[7]);var inst_41282 = cljs.core.vec(inst_41266);var state_41306__$1 = state_41306;return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41306__$1,11,out,inst_41282);
} else
{if((state_val_41307 === 5))
{var inst_41274 = (state_41306[10]);var inst_41267 = (state_41306[8]);var inst_41270 = (state_41306[9]);var inst_41274__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_41270) : f.call(null,inst_41270));var inst_41275 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_41274__$1,inst_41267);var inst_41276 = cljs.core.keyword_identical_QMARK_(inst_41267,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_41277 = (inst_41275) || (inst_41276);var state_41306__$1 = (function (){var statearr_41320 = state_41306;(statearr_41320[10] = inst_41274__$1);
return statearr_41320;
})();if(cljs.core.truth_(inst_41277))
{var statearr_41321_41346 = state_41306__$1;(statearr_41321_41346[1] = 8);
} else
{var statearr_41322_41347 = state_41306__$1;(statearr_41322_41347[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 14))
{var inst_41299 = (state_41306[2]);var inst_41300 = cljs.core.async.close_BANG_(out);var state_41306__$1 = (function (){var statearr_41324 = state_41306;(statearr_41324[13] = inst_41299);
return statearr_41324;
})();var statearr_41325_41348 = state_41306__$1;(statearr_41325_41348[2] = inst_41300);
(statearr_41325_41348[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 10))
{var inst_41289 = (state_41306[2]);var state_41306__$1 = state_41306;var statearr_41326_41349 = state_41306__$1;(statearr_41326_41349[2] = inst_41289);
(statearr_41326_41349[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_41307 === 8))
{var inst_41266 = (state_41306[7]);var inst_41274 = (state_41306[10]);var inst_41270 = (state_41306[9]);var inst_41279 = inst_41266.push(inst_41270);var tmp41323 = inst_41266;var inst_41266__$1 = tmp41323;var inst_41267 = inst_41274;var state_41306__$1 = (function (){var statearr_41327 = state_41306;(statearr_41327[7] = inst_41266__$1);
(statearr_41327[14] = inst_41279);
(statearr_41327[8] = inst_41267);
return statearr_41327;
})();var statearr_41328_41350 = state_41306__$1;(statearr_41328_41350[2] = null);
(statearr_41328_41350[1] = 2);
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
});return ((function (switch__24505__auto__){
return (function() {
var state_machine__24506__auto__ = null;
var state_machine__24506__auto____0 = (function (){var statearr_41332 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_41332[0] = state_machine__24506__auto__);
(statearr_41332[1] = 1);
return statearr_41332;
});
var state_machine__24506__auto____1 = (function (state_41306){while(true){
var ret_value__24507__auto__ = (function (){try{while(true){
var result__24508__auto__ = switch__24505__auto__(state_41306);if(cljs.core.keyword_identical_QMARK_(result__24508__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__24508__auto__;
}
break;
}
}catch (e41333){if((e41333 instanceof Object))
{var ex__24509__auto__ = e41333;var statearr_41334_41351 = state_41306;(statearr_41334_41351[5] = ex__24509__auto__);
cljs.core.async.impl.ioc_helpers.process_exception(state_41306);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e41333;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_(ret_value__24507__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__41352 = state_41306;
state_41306 = G__41352;
continue;
}
} else
{return ret_value__24507__auto__;
}
break;
}
});
state_machine__24506__auto__ = function(state_41306){
switch(arguments.length){
case 0:
return state_machine__24506__auto____0.call(this);
case 1:
return state_machine__24506__auto____1.call(this,state_41306);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__24506__auto____0;
state_machine__24506__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__24506__auto____1;
return state_machine__24506__auto__;
})()
;})(switch__24505__auto__))
})();var state__24522__auto__ = (function (){var statearr_41335 = (f__24521__auto__.cljs$core$IFn$_invoke$arity$0 ? f__24521__auto__.cljs$core$IFn$_invoke$arity$0() : f__24521__auto__.call(null));(statearr_41335[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__24520__auto___41336);
return statearr_41335;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__24522__auto__);
}));
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;
//# sourceMappingURL=async.js.map