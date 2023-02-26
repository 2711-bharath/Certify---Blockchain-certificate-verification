package models

import "math/big"

type Block struct {
	BlockId       string `json:"blockid"`
	StringData    string `json:"stringdata"`
	CertificateId []byte `json:"data"`
	ImageUrl      string
	Owner         string
	PrevHash      []byte `json:"prevhash"`
	Hash          []byte `json:"hash"`
	Nonce         int64  `json:"nonce"`
	Mined         bool   `json:"mined"`
	ImageHash     []byte `json:"image_hash"`
}

type BlockChain struct {
	Blocks []Block `json:"blocks"`
}

type ProofOfWork struct {
	Target *big.Int `json:"target"`
	Block  Block    `json:"block"`
}
