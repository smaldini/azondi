goog.provide('dommy.template');
goog.require('cljs.core');
goog.require('dommy.attrs');
goog.require('dommy.attrs');
goog.require('clojure.string');
goog.require('clojure.string');
dommy.template._PLUS_svg_ns_PLUS_ = "http://www.w3.org/2000/svg";
dommy.template._PLUS_svg_tags_PLUS_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, ["path",null,"svg",null,"text",null,"line",null,"polygon",null,"textPath",null,"polyline",null,"g",null,"clipPath",null,"rect",null,"circle",null], null), null);
dommy.template.PElement = (function (){var obj41652 = {};return obj41652;
})();
dommy.template._elem = (function _elem(this$){if((function (){var and__21037__auto__ = this$;if(and__21037__auto__)
{return this$.dommy$template$PElement$_elem$arity$1;
} else
{return and__21037__auto__;
}
})())
{return this$.dommy$template$PElement$_elem$arity$1(this$);
} else
{var x__21676__auto__ = (((this$ == null))?null:this$);return (function (){var or__21049__auto__ = (dommy.template._elem[goog.typeOf(x__21676__auto__)]);if(or__21049__auto__)
{return or__21049__auto__;
} else
{var or__21049__auto____$1 = (dommy.template._elem["_"]);if(or__21049__auto____$1)
{return or__21049__auto____$1;
} else
{throw cljs.core.missing_protocol("PElement.-elem",this$);
}
}
})().call(null,this$);
}
});
/**
* index of css character (#,.) in base-element. bottleneck
*/
dommy.template.next_css_index = (function next_css_index(s,start_idx){var id_idx = s.indexOf("#",start_idx);var class_idx = s.indexOf(".",start_idx);var idx = Math.min(id_idx,class_idx);if((idx < 0))
{return Math.max(id_idx,class_idx);
} else
{return idx;
}
});
/**
* dom element from css-style keyword like :a.class1 or :span#my-span.class
*/
dommy.template.base_element = (function base_element(node_key){var node_str = cljs.core.name(node_key);var base_idx = dommy.template.next_css_index(node_str,0);var tag = (((base_idx > 0))?node_str.substring(0,base_idx):(((base_idx === 0))?"div":((new cljs.core.Keyword(null,"else","else",1017020587))?node_str:null)));var node = (cljs.core.truth_((dommy.template._PLUS_svg_tags_PLUS_.cljs$core$IFn$_invoke$arity$1 ? dommy.template._PLUS_svg_tags_PLUS_.cljs$core$IFn$_invoke$arity$1(tag) : dommy.template._PLUS_svg_tags_PLUS_.call(null,tag)))?document.createElementNS(dommy.template._PLUS_svg_ns_PLUS_,tag):document.createElement(tag));if((base_idx >= 0))
{var str_41655 = node_str.substring(base_idx);while(true){
var next_idx_41656 = dommy.template.next_css_index(str_41655,1);var frag_41657 = (((next_idx_41656 >= 0))?str_41655.substring(0,next_idx_41656):str_41655);var G__41654_41658 = frag_41657.charAt(0);if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("#",G__41654_41658))
{node.setAttribute("id",frag_41657.substring(1));
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(".",G__41654_41658))
{dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(node,frag_41657.substring(1));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(frag_41657.charAt(0))].join('')));
} else
{}
}
}
if((next_idx_41656 >= 0))
{{
var G__41659 = str_41655.substring(next_idx_41656);
str_41655 = G__41659;
continue;
}
} else
{}
break;
}
} else
{}
return node;
});
dommy.template.throw_unable_to_make_node = (function throw_unable_to_make_node(node_data){throw [cljs.core.str("Don't know how to make node from: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([node_data], 0)))].join('');
});
/**
* take data and return a document fragment
*/
dommy.template.__GT_document_fragment = (function() {
var __GT_document_fragment = null;
var __GT_document_fragment__1 = (function (data){return __GT_document_fragment.cljs$core$IFn$_invoke$arity$2(document.createDocumentFragment(),data);
});
var __GT_document_fragment__2 = (function (result_frag,data){if((function (){var G__41665 = data;if(G__41665)
{var bit__21699__auto__ = null;if(cljs.core.truth_((function (){var or__21049__auto__ = bit__21699__auto__;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return G__41665.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__41665.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41665);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41665);
}
})())
{result_frag.appendChild(dommy.template._elem(data));
return result_frag;
} else
{if(cljs.core.seq_QMARK_(data))
{var seq__41666_41670 = cljs.core.seq(data);var chunk__41667_41671 = null;var count__41668_41672 = 0;var i__41669_41673 = 0;while(true){
if((i__41669_41673 < count__41668_41672))
{var child_41674 = chunk__41667_41671.cljs$core$IIndexed$_nth$arity$2(null,i__41669_41673);__GT_document_fragment.cljs$core$IFn$_invoke$arity$2(result_frag,child_41674);
{
var G__41675 = seq__41666_41670;
var G__41676 = chunk__41667_41671;
var G__41677 = count__41668_41672;
var G__41678 = (i__41669_41673 + 1);
seq__41666_41670 = G__41675;
chunk__41667_41671 = G__41676;
count__41668_41672 = G__41677;
i__41669_41673 = G__41678;
continue;
}
} else
{var temp__4126__auto___41679 = cljs.core.seq(seq__41666_41670);if(temp__4126__auto___41679)
{var seq__41666_41680__$1 = temp__4126__auto___41679;if(cljs.core.chunked_seq_QMARK_(seq__41666_41680__$1))
{var c__21797__auto___41681 = cljs.core.chunk_first(seq__41666_41680__$1);{
var G__41682 = cljs.core.chunk_rest(seq__41666_41680__$1);
var G__41683 = c__21797__auto___41681;
var G__41684 = cljs.core.count(c__21797__auto___41681);
var G__41685 = 0;
seq__41666_41670 = G__41682;
chunk__41667_41671 = G__41683;
count__41668_41672 = G__41684;
i__41669_41673 = G__41685;
continue;
}
} else
{var child_41686 = cljs.core.first(seq__41666_41680__$1);__GT_document_fragment.cljs$core$IFn$_invoke$arity$2(result_frag,child_41686);
{
var G__41687 = cljs.core.next(seq__41666_41680__$1);
var G__41688 = null;
var G__41689 = 0;
var G__41690 = 0;
seq__41666_41670 = G__41687;
chunk__41667_41671 = G__41688;
count__41668_41672 = G__41689;
i__41669_41673 = G__41690;
continue;
}
}
} else
{}
}
break;
}
return result_frag;
} else
{if((data == null))
{return result_frag;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return dommy.template.throw_unable_to_make_node(data);
} else
{return null;
}
}
}
}
});
__GT_document_fragment = function(result_frag,data){
switch(arguments.length){
case 1:
return __GT_document_fragment__1.call(this,result_frag);
case 2:
return __GT_document_fragment__2.call(this,result_frag,data);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
__GT_document_fragment.cljs$core$IFn$_invoke$arity$1 = __GT_document_fragment__1;
__GT_document_fragment.cljs$core$IFn$_invoke$arity$2 = __GT_document_fragment__2;
return __GT_document_fragment;
})()
;
/**
* take data and return DOM node if it satisfies PElement and tries to
* make a document fragment otherwise
*/
dommy.template.__GT_node_like = (function __GT_node_like(data){if((function (){var G__41692 = data;if(G__41692)
{var bit__21699__auto__ = null;if(cljs.core.truth_((function (){var or__21049__auto__ = bit__21699__auto__;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return G__41692.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__41692.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41692);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41692);
}
})())
{return dommy.template._elem(data);
} else
{return dommy.template.__GT_document_fragment.cljs$core$IFn$_invoke$arity$1(data);
}
});
/**
* element with either attrs or nested children [:div [:span "Hello"]]
*/
dommy.template.compound_element = (function compound_element(p__41693){var vec__41713 = p__41693;var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41713,0,null);var maybe_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41713,1,null);var children = cljs.core.nthnext(vec__41713,2);var n = dommy.template.base_element(tag_name);var attrs = (((cljs.core.map_QMARK_(maybe_attrs)) && (!((function (){var G__41715 = maybe_attrs;if(G__41715)
{var bit__21699__auto__ = null;if(cljs.core.truth_((function (){var or__21049__auto__ = bit__21699__auto__;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return G__41715.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__41715.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41715);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41715);
}
})())))?maybe_attrs:null);var children__$1 = (cljs.core.truth_(attrs)?children:cljs.core.cons(maybe_attrs,children));var seq__41716_41732 = cljs.core.seq(attrs);var chunk__41717_41733 = null;var count__41718_41734 = 0;var i__41719_41735 = 0;while(true){
if((i__41719_41735 < count__41718_41734))
{var vec__41720_41736 = chunk__41717_41733.cljs$core$IIndexed$_nth$arity$2(null,i__41719_41735);var k_41737 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41720_41736,0,null);var v_41738 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41720_41736,1,null);var G__41721_41739 = k_41737;if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"classes","classes",1867525016),G__41721_41739))
{var seq__41722_41740 = cljs.core.seq(v_41738);var chunk__41723_41741 = null;var count__41724_41742 = 0;var i__41725_41743 = 0;while(true){
if((i__41725_41743 < count__41724_41742))
{var c_41744 = chunk__41723_41741.cljs$core$IIndexed$_nth$arity$2(null,i__41725_41743);dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,c_41744);
{
var G__41745 = seq__41722_41740;
var G__41746 = chunk__41723_41741;
var G__41747 = count__41724_41742;
var G__41748 = (i__41725_41743 + 1);
seq__41722_41740 = G__41745;
chunk__41723_41741 = G__41746;
count__41724_41742 = G__41747;
i__41725_41743 = G__41748;
continue;
}
} else
{var temp__4126__auto___41749 = cljs.core.seq(seq__41722_41740);if(temp__4126__auto___41749)
{var seq__41722_41750__$1 = temp__4126__auto___41749;if(cljs.core.chunked_seq_QMARK_(seq__41722_41750__$1))
{var c__21797__auto___41751 = cljs.core.chunk_first(seq__41722_41750__$1);{
var G__41752 = cljs.core.chunk_rest(seq__41722_41750__$1);
var G__41753 = c__21797__auto___41751;
var G__41754 = cljs.core.count(c__21797__auto___41751);
var G__41755 = 0;
seq__41722_41740 = G__41752;
chunk__41723_41741 = G__41753;
count__41724_41742 = G__41754;
i__41725_41743 = G__41755;
continue;
}
} else
{var c_41756 = cljs.core.first(seq__41722_41750__$1);dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,c_41756);
{
var G__41757 = cljs.core.next(seq__41722_41750__$1);
var G__41758 = null;
var G__41759 = 0;
var G__41760 = 0;
seq__41722_41740 = G__41757;
chunk__41723_41741 = G__41758;
count__41724_41742 = G__41759;
i__41725_41743 = G__41760;
continue;
}
}
} else
{}
}
break;
}
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"class","class",1108647146),G__41721_41739))
{dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,v_41738);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{dommy.attrs.set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(n,k_41737,v_41738);
} else
{}
}
}
{
var G__41761 = seq__41716_41732;
var G__41762 = chunk__41717_41733;
var G__41763 = count__41718_41734;
var G__41764 = (i__41719_41735 + 1);
seq__41716_41732 = G__41761;
chunk__41717_41733 = G__41762;
count__41718_41734 = G__41763;
i__41719_41735 = G__41764;
continue;
}
} else
{var temp__4126__auto___41765 = cljs.core.seq(seq__41716_41732);if(temp__4126__auto___41765)
{var seq__41716_41766__$1 = temp__4126__auto___41765;if(cljs.core.chunked_seq_QMARK_(seq__41716_41766__$1))
{var c__21797__auto___41767 = cljs.core.chunk_first(seq__41716_41766__$1);{
var G__41768 = cljs.core.chunk_rest(seq__41716_41766__$1);
var G__41769 = c__21797__auto___41767;
var G__41770 = cljs.core.count(c__21797__auto___41767);
var G__41771 = 0;
seq__41716_41732 = G__41768;
chunk__41717_41733 = G__41769;
count__41718_41734 = G__41770;
i__41719_41735 = G__41771;
continue;
}
} else
{var vec__41726_41772 = cljs.core.first(seq__41716_41766__$1);var k_41773 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41726_41772,0,null);var v_41774 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41726_41772,1,null);var G__41727_41775 = k_41773;if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"classes","classes",1867525016),G__41727_41775))
{var seq__41728_41776 = cljs.core.seq(v_41774);var chunk__41729_41777 = null;var count__41730_41778 = 0;var i__41731_41779 = 0;while(true){
if((i__41731_41779 < count__41730_41778))
{var c_41780 = chunk__41729_41777.cljs$core$IIndexed$_nth$arity$2(null,i__41731_41779);dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,c_41780);
{
var G__41781 = seq__41728_41776;
var G__41782 = chunk__41729_41777;
var G__41783 = count__41730_41778;
var G__41784 = (i__41731_41779 + 1);
seq__41728_41776 = G__41781;
chunk__41729_41777 = G__41782;
count__41730_41778 = G__41783;
i__41731_41779 = G__41784;
continue;
}
} else
{var temp__4126__auto___41785__$1 = cljs.core.seq(seq__41728_41776);if(temp__4126__auto___41785__$1)
{var seq__41728_41786__$1 = temp__4126__auto___41785__$1;if(cljs.core.chunked_seq_QMARK_(seq__41728_41786__$1))
{var c__21797__auto___41787 = cljs.core.chunk_first(seq__41728_41786__$1);{
var G__41788 = cljs.core.chunk_rest(seq__41728_41786__$1);
var G__41789 = c__21797__auto___41787;
var G__41790 = cljs.core.count(c__21797__auto___41787);
var G__41791 = 0;
seq__41728_41776 = G__41788;
chunk__41729_41777 = G__41789;
count__41730_41778 = G__41790;
i__41731_41779 = G__41791;
continue;
}
} else
{var c_41792 = cljs.core.first(seq__41728_41786__$1);dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,c_41792);
{
var G__41793 = cljs.core.next(seq__41728_41786__$1);
var G__41794 = null;
var G__41795 = 0;
var G__41796 = 0;
seq__41728_41776 = G__41793;
chunk__41729_41777 = G__41794;
count__41730_41778 = G__41795;
i__41731_41779 = G__41796;
continue;
}
}
} else
{}
}
break;
}
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"class","class",1108647146),G__41727_41775))
{dommy.attrs.add_class_BANG_.cljs$core$IFn$_invoke$arity$2(n,v_41774);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{dommy.attrs.set_attr_BANG_.cljs$core$IFn$_invoke$arity$3(n,k_41773,v_41774);
} else
{}
}
}
{
var G__41797 = cljs.core.next(seq__41716_41766__$1);
var G__41798 = null;
var G__41799 = 0;
var G__41800 = 0;
seq__41716_41732 = G__41797;
chunk__41717_41733 = G__41798;
count__41718_41734 = G__41799;
i__41719_41735 = G__41800;
continue;
}
}
} else
{}
}
break;
}
n.appendChild(dommy.template.__GT_node_like(children__$1));
return n;
});
(dommy.template.PElement["string"] = true);
(dommy.template._elem["string"] = (function (this$){if((this$ instanceof cljs.core.Keyword))
{return dommy.template.base_element(this$);
} else
{return document.createTextNode([cljs.core.str(this$)].join(''));
}
}));
(dommy.template.PElement["number"] = true);
(dommy.template._elem["number"] = (function (this$){return document.createTextNode([cljs.core.str(this$)].join(''));
}));
cljs.core.PersistentVector.prototype.dommy$template$PElement$ = true;
cljs.core.PersistentVector.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return dommy.template.compound_element(this$__$1);
});
SVGElement.prototype.dommy$template$PElement$ = true;
SVGElement.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
Document.prototype.dommy$template$PElement$ = true;
Document.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
Text.prototype.dommy$template$PElement$ = true;
Text.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
DocumentFragment.prototype.dommy$template$PElement$ = true;
DocumentFragment.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
HTMLElement.prototype.dommy$template$PElement$ = true;
HTMLElement.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
try{Window.prototype.dommy$template$PElement$ = true;
Window.prototype.dommy$template$PElement$_elem$arity$1 = (function (this$){var this$__$1 = this;return this$__$1;
});
}catch (e41801){if((e41801 instanceof ReferenceError))
{var __41802 = e41801;console.log("PElement: js/Window not defined by browser, skipping it... (running on phantomjs?)");
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e41801;
} else
{}
}
}dommy.template.node = (function node(data){if((function (){var G__41804 = data;if(G__41804)
{var bit__21699__auto__ = null;if(cljs.core.truth_((function (){var or__21049__auto__ = bit__21699__auto__;if(cljs.core.truth_(or__21049__auto__))
{return or__21049__auto__;
} else
{return G__41804.dommy$template$PElement$;
}
})()))
{return true;
} else
{if((!G__41804.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41804);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_(dommy.template.PElement,G__41804);
}
})())
{return dommy.template._elem(data);
} else
{return dommy.template.throw_unable_to_make_node(data);
}
});
dommy.template.html__GT_nodes = (function html__GT_nodes(html){var parent = document.createElement("div");parent.insertAdjacentHTML("beforeend",html);
return cljs.core.seq(Array.prototype.slice.call(parent.childNodes));
});
//# sourceMappingURL=template.js.map