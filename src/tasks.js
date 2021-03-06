import scrape from "./scrape/index.js"
import models from "./models/index.js"
import { getAllCars } from "./scrape/pageTasks.js"

export const main = async () => {
  const cars = await scrape(getAllCars)

  for await (let car of cars) {
    const exists = await models.Car.findOne({
      where: {
        id: car.id.toString(),
      },
    })

    if (exists) {
      await models.Car.update(
        { ...car },
        { where: { id: car.id } },
        { multi: true }
      )
    } else {
      car = await models.Car.create({ ...car })
      car.save()
    }
  }
}
