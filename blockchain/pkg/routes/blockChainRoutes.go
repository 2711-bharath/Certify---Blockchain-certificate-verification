package routes

import (
	"github.com/drakcoder/block-chain/app/controllers"
	"github.com/gofiber/fiber/v2"
)

func BlockChainRoutes(app *fiber.App) {
	route := app.Group("/api/v1")

	route.Post("/mine_block", controllers.MineBlock)
	route.Post("/add_block", controllers.AddBlock)
	route.Get("/get_block/:blockid", controllers.GetBlock)
}
