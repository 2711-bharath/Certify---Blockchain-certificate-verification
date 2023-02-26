package controllers

import (
	"context"
	"log"

	"github.com/drakcoder/block-chain/app/db"
	"github.com/drakcoder/block-chain/app/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetBlock(c *fiber.Ctx) error {
	blockid := c.Params("blockid")
	query := bson.D{{Key: "blockid", Value: blockid}}
	cursor := db.MI.DB.Collection("blocks").FindOne(context.TODO(), query)
	var block models.Block
	if err := cursor.Decode(&block); err != nil {
		log.Fatal(err)
		c.SendString("an error occured")
	}
	return c.JSON(block)
}
