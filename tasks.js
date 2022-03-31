import getCars from "./scrape.js"
import Car from "./car.model.js"

export const main = async () => {
  const cars = await getCars()

  for await (let car of cars) {
    const exists = await Car.findOne({
      where: {
        id: car.id.toString(),
      },
    })

    if (exists) {
      await Car.update({ ...car }, { where: { id: car.id } }, { multi: true })
    } else {
      car = await Car.create({ ...car })
      car.save()
    }
  }
}