package helpers

import "crypto/sha256"

func ConvertImgToHash(img []byte) []byte {
	imgHash := sha256.New()
	imgHash.Write(img)
	bs := imgHash.Sum(nil)
	return bs
}
