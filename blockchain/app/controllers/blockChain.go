package controllers

import (
	"bytes"
	"context"
	"crypto/sha256"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"
	"net/http"

	"github.com/drakcoder/block-chain/app/db"
	"github.com/drakcoder/block-chain/app/helpers"
	"github.com/drakcoder/block-chain/app/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
)

func ImageTest(c *fiber.Ctx) error {
	res := struct {
		Name string
	}{
		Name: "hello",
	}
	// a := new(requestBody)
	// if err := c.BodyParser(a); err != nil {
	// 	return err
	// }
	// fmt.Println(a)
	// img, err := http.Get("https://draktest.s3.ap-south-1.amazonaws.com/bg_cla.jpg")
	// if err != nil {
	// 	return err
	// }
	// f, err := ioutil.ReadAll(img.Body)
	// fmt.Println(f)
	return c.JSON(res)
}

func AddBlock(c *fiber.Ctx) error {
	body := new(models.AddBlock)
	if err := c.BodyParser(body); err != nil {
		log.Fatal(err)
		return c.SendString("An error occured")
	}
	img, err := http.Get(body.ImageURL)
	if err != nil {
		log.Fatal(err)
		return c.SendString("An error occured")
	}
	imgBytes, err := ioutil.ReadAll(img.Body)

	imgHash := helpers.ConvertImgToHash(imgBytes)

	newBlock := models.Block{
		BlockId:       uuid.NewString(),
		StringData:    body.StringData,
		CertificateId: []byte(uuid.NewString()),
		ImageUrl:      body.ImageURL,
		Owner:         "test",
		Hash:          nil,
		Nonce:         0,
		Mined:         false,
		ImageHash:     imgHash,
	}

	_, err = db.MI.DB.Collection("blocks").InsertOne(context.TODO(), newBlock)

	if err != nil {
		log.Fatal(err)
		return c.SendString("An error occured")
	}

	return c.JSON(newBlock)
}

func MineBlock(c *fiber.Ctx) error {
	body := new(models.MineBlock)
	c.BodyParser(body)
	query := bson.D{bson.E{Key: "blockid", Value: body.BlockUid}}
	cursor := db.MI.DB.Collection("blocks").FindOne(context.TODO(), query)
	var block models.Block
	err := cursor.Decode(&block)
	if err != nil {
		log.Fatal(err)
		return c.SendString("An error occured")
	}
	if block.Mined {
		return c.SendString("Block is already mined")
	}
	nonce := body.Nonce.Bytes()
	prevBlock := db.RC.Client.Get(context.TODO(), "prevBlock").Val()
	var prevHash []byte
	if prevBlock != "" {
		query = bson.D{bson.E{Key: "blockid", Value: prevBlock}}
		cursor = db.MI.DB.Collection("blocks").FindOne(context.TODO(), query)
		var prevBlock models.Block
		err := cursor.Decode(&prevBlock)
		if err != nil {
			log.Fatal(err)
			c.SendString("an error occured")
		}
		prevHash = prevBlock.Hash
	} else {
		prevHash = []byte{}
	}
	concat := bytes.Join([][]byte{block.CertificateId, prevHash, block.ImageHash, nonce}, []byte{})
	var hashInt big.Int
	h := sha256.New()
	h.Write(concat)
	hash := h.Sum(nil)
	hashInt.SetBytes(hash)
	target := big.NewInt(1)
	target = target.Lsh(target, 256)
	if hashInt.Cmp(target) == -1 {
		fmt.Println("found")
		set := bson.D{bson.E{Key: "$set", Value: bson.D{bson.E{Key: "prevhash", Value: prevHash}, bson.E{Key: "hash", Value: hash}, bson.E{Key: "mined", Value: true}, bson.E{Key: "nonce", Value: int64(body.Nonce.Int64())}}}}
		filter := bson.D{{Key: "blockid", Value: body.BlockUid}}
		db.MI.DB.Collection("blocks").UpdateOne(context.TODO(), filter, set)
		err := db.RC.Client.Set(context.TODO(), "prevBlock", block.BlockId, 0).Err()
		if err != nil {
			log.Fatal(err)
			return c.SendString("An error occured")
		}
		return c.SendString("nonce value found")
	} else {
		fmt.Println("invalid nonce value")
	}
	return c.SendString("MineBLock")
}
