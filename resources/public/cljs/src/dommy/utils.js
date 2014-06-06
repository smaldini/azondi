goog.provide('dommy.utils');
goog.require('cljs.core');
/**
* Dissociate this keyseq from m, removing any empty maps created as a result
* (including at the top-level).
*/
dommy.utils.dissoc_in = (function dissoc_in(m,p__41805){var vec__41807 = p__41805;var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41807,0,null);var ks = cljs.core.nthnext(vec__41807,1);if(cljs.core.truth_(m))
{var temp__4124__auto__ = (function (){var and__21037__auto__ = ks;if(and__21037__auto__)
{return dissoc_in((m.cljs$core$IFn$_invoke$arity$1 ? m.cljs$core$IFn$_invoke$arity$1(k) : m.call(null,k)),ks);
} else
{return and__21037__auto__;
}
})();if(cljs.core.truth_(temp__4124__auto__))
{var res = temp__4124__auto__;return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,res);
} else
{var res = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(m,k);if(cljs.core.empty_QMARK_(res))
{return null;
} else
{return res;
}
}
} else
{return null;
}
});
dommy.utils.__GT_Array = (function __GT_Array(array_like){return Array.prototype.slice.call(array_like);
});
//# sourceMappingURL=utils.js.map