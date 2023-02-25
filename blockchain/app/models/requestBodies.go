package models

import "math/big"

type AddBlock struct {
	ImageURL   string `json:"image_url"`
	StringData string `json:"string_data"`
}

type MineBlock struct {
	BlockUid string  `json:"block_uid"`
	Nonce    big.Int `json:"nonce"`
}
