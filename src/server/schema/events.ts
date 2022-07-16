import z from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(5),
  image: z.string().min(5),
  tagline: z.string().min(5).nullish(),
  shortIntro: z.string().min(5).nullish(),
  description: z.string().min(5).nullish(),
  venue: z.string().min(5),
  dateTime: z.string().min(5),
})

export const updateEventSchema = createEventSchema.partial().extend({
  id: z.number().positive(),
})

export const deleteEventSchema = z.object({
  id: z.number().positive(),
})
