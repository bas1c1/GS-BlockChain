def transaction_c() {
	enum Transaction {
		from,
		_to,
		amount
	}

	Transaction __init__ := ldef(father, from, _to, amount) {
		father from := from
		father _to := _to
		father amount := amount
	}

	return Transaction
}
to_import("transaction_c")