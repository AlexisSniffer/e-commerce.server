const { errors } = require('@strapi/utils')
const { ApplicationError } = errors

const errorMessage = {
  es: 'No es posible agregar más de 3 niveles de categorías.',
  en: 'It is not possible to add more than 3 levels of categories.',
}

module.exports = {
  async afterCreate(event) {
    const { result } = event
    await validate(result)
  },

  async afterUpdate(event) {
    const { result } = event
    await validate(result)
  },
}

// TODO: realizar 2 validaciones -> 1. root con 3 niveles, sub con 3 niveles
async function validate(result: any) {
  const parents = await findParent(result.id)

  if (
    parents.category &&
    parents.category.category &&
    result.subcategories &&
    result.subcategories.count >= 1
  ) {
    await strapi.entityService.update('api::category.category', result.id, {
      data: {
        category: [],
        subcategories: [],
      },
    })

    throw new ApplicationError(errorMessage[result.locale])
  }
}

async function findParent(id: number) {
  return await strapi.entityService.findOne('api::category.category', id, {
    fields: ['name'],
    populate: {
      category: {
        fields: ['name'],
        populate: {
          category: {
            fields: ['name'],
          },
        },
      },
    },
  })
}
