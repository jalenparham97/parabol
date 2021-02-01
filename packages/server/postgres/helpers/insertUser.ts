import getPg from '../getPg'
import User from '../../database/types/User'
import z from '../getZapatos'
import type * as s from 'zapatos/schema'
import parseDates from '../utils/parseDates'

const insertUser = async (users: User[]): Promise<s.User.Selectable[]> => {
  const pg = getPg()
  const result = await z.insert('User', users).run(pg)
  const mappedRows = parseDates(result)
  return mappedRows
}

export default insertUser
