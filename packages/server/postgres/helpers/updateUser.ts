import getPg from '../getPg'
import z from '../getZapatos'
import type * as s from 'zapatos/schema'
import parseDates from '../utils/parseDates'

const updateUser = async (
  userIds: string[],
  updates: s.User.Updatable
): Promise<s.User.Selectable[]> => {
  const pg = getPg()
  const where = z.sql`${"id"} IN (${z.vals(userIds)})`
  const result = await z.update('User', updates, where).run(pg)
  const mappedRows = parseDates(result)
  console.log('result:', mappedRows)
  return mappedRows
}

export default updateUser
