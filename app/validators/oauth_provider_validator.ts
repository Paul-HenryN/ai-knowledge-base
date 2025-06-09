import vine from '@vinejs/vine'

export const oauthProviderValidator = vine.compile(vine.enum(['github', 'google']))
