goog.provide('sablono.interpreter');
goog.require('cljs.core');
goog.require('sablono.util');
goog.require('clojure.string');
goog.require('sablono.util');
goog.require('clojure.string');
sablono.interpreter.IInterpreter = (function (){var obj42585 = {};return obj42585;
})();
sablono.interpreter.interpret = (function interpret(this$){if((function (){var and__21037__auto__ = this$;if(and__21037__auto__)
{return this$.sablono$interpreter$IInterpreter$interpret$arity$1;
} else
{return and__21037__auto__;
}
})())
{return this$.sablono$interpreter$IInterpreter$interpret$arity$1(this$);
} else
{var x__21676__auto__ = (((this$ == null))?null:this$);return (function (){var or__21049__auto__ = (sablono.interpreter.interpret[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (sablono.interpreter.interpret["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("IInterpreter.interpret",this$);
}
}
})().call(null,this$);
}
});
sablono.interpreter.wrap_form_element = (function wrap_form_element(ctor){return React.createClass({"render": (function (){var this$ = this;return this$.transferPropsTo((ctor.cljs$core$IFn$_invoke$arity$1 ? ctor.cljs$core$IFn$_invoke$arity$1({"children": (this$.props["children"]), "onChange": (this$["onChange"]), "value": (this$.state["value"])}) : ctor.call(null,{"children": (this$.props["children"]), "onChange": (this$["onChange"]), "value": (this$.state["value"])})));
}), "componentWillReceiveProps": (function (new_props){var this$ = this;return this$.setState({"value": (new_props["value"])});
}), "onChange": (function (e){var this$ = this;var handler = (this$.props["onChange"]);if((handler == null))
{return null;
} else
{(handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(e) : handler.call(null,e));
return this$.setState({"value": e.target.value});
}
}), "getInitialState": (function (){var this$ = this;return {"value": (this$.props["value"])};
})});
});
sablono.interpreter.input = sablono.interpreter.wrap_form_element(React.DOM.input);
sablono.interpreter.textarea = sablono.interpreter.wrap_form_element(React.DOM.textarea);
sablono.interpreter.dom_fn = (function dom_fn(tag){var temp__4124__auto__ = (React.DOM[cljs.core.name(tag)]);if(cljs.core.truth_(temp__4124__auto__))
{var dom_fn__$1 = temp__4124__auto__;return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"input","input",1114262332),sablono.interpreter.input,new cljs.core.Keyword(null,"textarea","textarea",4305627820),sablono.interpreter.textarea], null),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(tag),dom_fn__$1);
} else
{throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Unsupported HTML tag: "),cljs.core.str(cljs.core.name(tag))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",1014018828),tag], null));
}
});
sablono.interpreter.attributes = (function attributes(attrs){var attrs__$1 = cljs.core.clj__GT_js(sablono.util.html_to_dom_attrs(attrs));var class$ = clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.flatten(cljs.core.seq(attrs__$1.className)));if(cljs.core.not(clojure.string.blank_QMARK_(class$)))
{attrs__$1.className = class$;
} else
{}
return attrs__$1;
});
/**
* Render an element vector as a HTML element.
*/
sablono.interpreter.element = (function element(element__$1){var vec__42587 = sablono.util.normalize_element(element__$1);var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42587,0,null);var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42587,1,null);var content = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42587,2,null);return sablono.interpreter.dom_fn(tag).call(null,sablono.interpreter.attributes(attrs),(((cljs.core.sequential_QMARK_(content)) && (typeof cljs.core.first(content) === 'string') && (cljs.core.empty_QMARK_(cljs.core.rest(content))))?sablono.interpreter.interpret(cljs.core.first(content)):(cljs.core.truth_(content)?sablono.interpreter.interpret(content):((new cljs.core.Keyword(null,"else","else",1017020587))?null:null))));
});
sablono.interpreter.interpret_seq = (function interpret_seq(s){return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(sablono.interpreter.interpret,s));
});
(sablono.interpreter.IInterpreter["null"] = true);
(sablono.interpreter.interpret["null"] = (function (this$){return null;
}));
(sablono.interpreter.IInterpreter["_"] = true);
(sablono.interpreter.interpret["_"] = (function (this$){return this$;
}));
cljs.core.PersistentVector.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.PersistentVector.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.element(this$__$1);
});
cljs.core.IndexedSeq.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.IndexedSeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.interpret_seq(this$__$1);
});
cljs.core.List.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.List.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.interpret_seq(this$__$1);
});
cljs.core.LazySeq.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.LazySeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.interpret_seq(this$__$1);
});
cljs.core.ChunkedSeq.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.ChunkedSeq.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.interpret_seq(this$__$1);
});
cljs.core.Cons.prototype.sablono$interpreter$IInterpreter$ = true;
cljs.core.Cons.prototype.sablono$interpreter$IInterpreter$interpret$arity$1 = (function (this$){var this$__$1 = this;return sablono.interpreter.interpret_seq(this$__$1);
});
//# sourceMappingURL=interpreter.js.map