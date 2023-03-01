def nlength(val) {
	res = 0
	foreach val to "k" {
		res++
	}
	return res
}

def blockchain_c() {
	enum BlockChain {
		proofOfWorkDifficulty,
		reward,
		transactions,
		chain,
		is_valid,

		__init__,
		create_transaction,
		mine_block,
		is_valid_chain,
		get_balance,
		create_gen_block,
	}

	BlockChain __init__ := ldef(father, proofOfWorkDifficulty, reward) {
		import("transaction.gs")
		import("block.gs")

		father proofOfWorkDifficulty := proofOfWorkDifficulty
		father reward := reward
		father transactions := new_stack()

		father chain := new_stack(father : create_gen_block(father))
		father is_valid := true
	}

	BlockChain create_transaction := ldef(father, transaction) {
		temp = father : transactions
		append("temp", transaction)
		father transactions := temp
	}

	BlockChain mine_block := ldef(father, miner_addr) {
		import("transaction.gs")
		import("block.gs")

		Transaction = transaction_c()
		Block = block_c()

		Transaction inst(from, _to, amount) minerRewardTransaction
		
		minerRewardTransaction : __init__(minerRewardTransaction, NULL, miner_addr, father:reward)
		temp = father : transactions
		append("temp", minerRewardTransaction)
		father transactions := temp

		Block inst() block

		block : __init__(block, "datatime_now", father : transactions, "0 ")
		block : mine_block(block, father : proofOfWorkDifficulty)
		
		this_chain = father : chain
		last_block = this_chain[nlength(this_chain)-1]
		
		//NOT WORKING
		//block prev_hash := last_block : hash
		
		temp = father : chain
		append("temp", block)
		father chain := temp
		father transactions := new_stack()
	}

	BlockChain is_valid_f := ldef(father) {
		temp = father : chain

		for i = 1; i < length("temp"); i++ {
			prev_block = get_by_index("temp", i-1)
			curr_block = get_by_index("temp", i)
			//NOT WORKING
			/*if (curr_block : prev_hash != prev_block : hash) {
				father is_valid := false
				return 0
			}*/
		}
		father is_valid := true
	}

	BlockChain get_balance := ldef(father, addr) {
		balance = 0
		chain = father : chain
		foreach chain to "block" {
			block_transactions = block : transactions
			foreach block_transactions to "transaction" {
				if (transaction : from == addr) {
					balance -= transaction : amount
				}
				if (transaction : _to == addr) {
					balance += transaction : amount
				}
			}
		}
		return balance
	}

	BlockChain create_gen_block := ldef(father) {
		import("transaction.gs")
		import("block.gs")

		Transaction = transaction_c()
		Block = block_c()

		Transaction inst() new_transaction

		new_transaction : __init__(new_transaction, "", "", 0)
		transactions = new_stack(new_transaction)

		Block inst() new_block

		new_block : __init__(new_block, "datatime", transactions, "0")
		return new_block
	}

	return BlockChain
}
to_import("blockchain_c")
