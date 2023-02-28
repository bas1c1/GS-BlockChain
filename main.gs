use "std"

import("transaction.gs")
import("block.gs")
import("chain.gs")

mineraddr = "miner1"
ua1 = "A"
ua2 = "B"

block_chain = blockchain_c()

block_chain : __init__(block_chain, 2, 10)

new_transaction = transaction_c()
new_transaction : __init__(new_transaction, ua1, ua2, 200)

new_transaction2 = transaction_c()
new_transaction2 : __init__(new_transaction, ua2, ua1, 10)

block_chain : create_transaction(block_chain, new_transaction)
block_chain : create_transaction(block_chain, new_transaction2)

block_chain : is_valid_f(block_chain)
print(block_chain : is_valid)

block_chain : mine_block(block_chain, mineraddr)
block_chain : mine_block(block_chain, mineraddr)
block_chain : mine_block(block_chain, mineraddr)

stop()