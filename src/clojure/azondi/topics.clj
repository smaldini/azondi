(ns azondi.topics)

(defn authorized-prefixes-for
  [^String username devices]
  (set (map (fn [^String s]
              (str username "/" s))
            devices)))

(defn  authorized?
  [prefixes topic]
  ;; TODO: use a trie
  (not (nil? (some (fn [^String s]
                     (.startsWith topic s))
                   prefixes))))
