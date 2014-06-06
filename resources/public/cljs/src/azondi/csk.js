goog.provide('azondi.csk');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('cljs.reader');
goog.require('cljs.reader');
goog.require('goog.net.XhrManager');
goog.require('goog.net.XhrManager');
goog.require('clojure.string');
goog.require('clojure.string');
azondi.csk.json_key = /([a-z]+)([A-Z][a-z]+)?([A-Z][a-z]+)?([A-Z][a-z]+)?([A-Z][a-z]+)?([A-Z][a-z]+)?/;
azondi.csk.__GT_keyword = (function __GT_keyword(s){return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("-",cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.lower_case,cljs.core.rest(cljs.core.remove(cljs.core.nil_QMARK_,cljs.core.re_matches(azondi.csk.json_key,s))))));
});
azondi.csk.__GT_camelCase = (function __GT_camelCase(s){var vec__43102 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(s,/-/);var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43102,0,null);var t = cljs.core.nthnext(vec__43102,1);return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.str,h,cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.capitalize,t));
});
azondi.csk.__GT_edn = (function __GT_edn(f){return clojure.walk.postwalk((function (f__$1){if(cljs.core.map_QMARK_(f__$1))
{return cljs.core.reduce_kv((function (acc,k,v){return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,((typeof k === 'string')?azondi.csk.__GT_keyword(k):k),v);
}),cljs.core.PersistentArrayMap.EMPTY,f__$1);
} else
{if(new cljs.core.Keyword(null,"otherwise","otherwise",3364035366))
{return f__$1;
} else
{return null;
}
}
}),f);
});
azondi.csk.__GT_js = (function __GT_js(f){return clojure.walk.postwalk((function (f__$1){if(cljs.core.map_QMARK_(f__$1))
{return cljs.core.reduce_kv((function (acc,k,v){return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,(((k instanceof cljs.core.Keyword))?azondi.csk.__GT_camelCase(cljs.core.name(k)):k),v);
}),cljs.core.PersistentArrayMap.EMPTY,f__$1);
} else
{if(new cljs.core.Keyword(null,"otherwise","otherwise",3364035366))
{return f__$1;
} else
{return null;
}
}
}),f);
});
//# sourceMappingURL=csk.js.map