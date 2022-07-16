import * as trpc from '@trpc/server'

import { createRouter } from 'server/createRouter'
import {
  createEventSchema,
  deleteEventSchema,
  updateEventSchema,
} from 'server/schema/events'

export const eventRouter = createRouter()
  .query('get-all-events', {
    async resolve({ ctx, input }) {
      try {
        const events = await (await ctx).prisma.event.findMany()
        return events
      } catch (err: any) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message || 'Something went wrong',
        })
      }
    },
  })
  .mutation('create-event', {
    input: createEventSchema,
    async resolve({ ctx, input }) {
      const {
        title,
        image,
        tagline,
        shortIntro,
        description,
        venue,
        dateTime,
      } = input

      try {
        const event = await (
          await ctx
        ).prisma.event.create({
          data: {
            title,
            image,
            tagline,
            shortIntro,
            description,
            venue,
            dateTime,
          },
        })
        return event
      } catch (err: any) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message || 'Something went wrong',
        })
      }
    },
  })
  .mutation('update-event', {
    input: updateEventSchema,
    async resolve({ ctx, input }) {
      const {
        id,
        title,
        image,
        tagline,
        shortIntro,
        description,
        venue,
        dateTime,
      } = input
      try {
        const event = await (
          await ctx
        ).prisma.event.update({
          where: { id },
          data: {
            title,
            image,
            tagline,
            shortIntro,
            description,
            venue,
            dateTime,
          },
        })
        return event
      } catch (err: any) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message || 'Something went wrong',
        })
      }
    },
  })
  .mutation('delete-event', {
    input: deleteEventSchema,
    async resolve({ ctx, input }) {
      try {
        const { id } = input
        await (await ctx).prisma.event.delete({ where: { id } })
        return 'Event deleted'
      } catch (err: any) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message || 'Something went wrong',
        })
      }
    },
  })
