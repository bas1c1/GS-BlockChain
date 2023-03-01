def block_c() {
	use "std"

	enum Block {
		datatime,
		nonce,
		prev_hash,
		transactions,
		hash,

		create_hash,
		__init__,
		mine_block,
	}

	Block __init__ := ldef(father, datatime, transactions, prev_hash) {
		father datatime := datatime
		father transactions := transactions
		father nonce := 0
		father prev_hash := prev_hash
		father hash := n(father:create_hash(father))
	}

	Block mine_block := ldef (father, proof_of_work_diff) {
		hash_val_temp = ""
		for i = 0; i <= proof_of_work_diff; i++ {
			hash_val_temp += "0"
		}
		n = split(to_string(father:hash), " ")
		while (n[0] != hash_val_temp) {
			father:create_hash(father)
			n = split(father:hash, " ")
		}
		sout "Mined block with hash: "+father:hash+"\n"
	}

	Block create_hash := ldef(father) {
		transactions = father:transactions
		typedef string raw_data = father:prev_hash + father:datatime + get_stack("transactions") + to_string(father:nonce)
		father hash := to_string(raw_data)
		return raw_data
	}
	return Block
}
to_import("block_c")
