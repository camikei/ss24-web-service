import Joi from 'joi'

const TEST_DATA ={
    "avatarName":"Mark", // required, string, not empty, limit of characters
    "childAge": "12", // required, integer, min age 4, < 100
    "skinColor": "#0000ff", // required, rgb --- presets in ui later in
    "hairstyle": "short", // required/ default: 'short' / 'bald', 'short-curly', 'short-straight', 'medium-curly',
    "headShape": "oval", // required/ default: 'oval' /'oval', 'round', 'heart', 'rectangular'
    "upperClothing": "jacket", // 'jacket', 'shirt', 'hoodie', 'dress'
    "lowerClothing": "shorts", // 'shorts', 'pants', 'skirt', 'jeans'
}
const schema = Joi.object({
    avatarName: Joi
        .string()
        .max(20)
        .required(),

    childAge: Joi
        .number()
        .integer().min(0).max(100)
        .required(),

    skinColor: Joi.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .required(),

    hairstyle: Joi.string()
        .valid(
            'short',
            'bald',
            'short-curly',
            'short-straight',
            'medium-curly',
            'medium-straight',
            'long-curly',
            'long-straight',
            'dread-locks')
        .default('short'),

    headShape: Joi.string()
        .valid(
            'oval',
            'round',
            'heart',
            'square',)
        .default('oval'),

    upperClothing: Joi.string()
        .valid(
            'jacket',
            'shirt',
            'hoodie',
            'dress',)
        .default('shirt'),

    lowerClothing: Joi.alternatives()
        .conditional(
            'upperClothing', {
                is: 'dress',
                then: Joi.forbidden(), //.optional(),
                otherwise: Joi
                    .string()
                    .valid('shorts', 'pants', 'skirt')
                    .default('pants')
            }),
})