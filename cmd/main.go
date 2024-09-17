package main

import (
	"log"
	"test-back/config"
	"test-back/controllers"

	"github.com/gin-contrib/cors"
	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.Default()
	// Подключаем базу данных
	config.ConnectDatabase()
	// Автоматическая миграция
	// config.DB.AutoMigrate(&models.EmployeeEquipment{})
	// config.DB.AutoMigrate(&models.Employees{})
	// config.DB.AutoMigrate(&models.Technique{})

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"}, // разрешаем запросы с порта 4200 (Angular клиент)
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		// AllowCredentials: true, // если требуется авторизация через cookies или токены
	}))
	r.GET("/inventory/:office", controllers.GetInventoryByOffice)
	// r.GET("/inventory/:office", controllers.GetInventory)

	r.GET("/employee_equipments", controllers.GetEmployeeEquipments)
	r.GET("/employee_equipments/:id", controllers.GetEmployeeEquipmentByID)
	r.POST("/employee_equipments", controllers.CreateEmployeeEquipments)
	r.PUT("/employee_equipments/:id", controllers.UpdateEmployeeEquipments)
	r.DELETE("/employee_equipments/:id", controllers.DeleteEmployeeEquipments)

	r.GET("/employees", controllers.GetEmployees)
	r.GET("/employees/:id", controllers.GetEmployeeByID)
	r.POST("/employees", controllers.CreateEmployees)
	r.PUT("/employees/:id", controllers.UpdateEmployees)
	r.DELETE("/employees/:id", controllers.DeleteEmployees)

	r.GET("/techniques", controllers.GetTechniques)
	r.GET("/techniques/:id", controllers.GetTechniqueByID)
	r.POST("/techniques", controllers.CreateTechniques)
	r.PUT("/techniques/:id", controllers.UpdateTechniques)
	r.DELETE("/techniques/:id", controllers.DeleteTechniques)

	r.GET("/technique_types", controllers.GetTechniqueType)
	r.GET("/technique_types/:id", controllers.GetTechniqueTypeByID)
	r.POST("/technique_types", controllers.CreateTechniqueType)
	r.PUT("/technique_types/:id", controllers.UpdateTechniqueType)
	r.DELETE("/technique_types/:id", controllers.DeleteTechniqueType)

	r.Run(":8080")
}
